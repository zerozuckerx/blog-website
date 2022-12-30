const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require("lodash");

const homeContent = "This is the homeStartingContent.";
const aboutContent = "This is the aboutContent.";
const contactContent = "This is the contactContent.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const posts = [{title: "Title", content: "Content with lots of awesome text"}];

app.get("/", function(req, res) {

	res.render("home", { //.ejs not needed - {} is simply a js object (key:value)
		homeContent: homeContent,
		posts: posts
	});
});

app.get("/posts/:postName", function(req, res) {
	const requestedTitle = _.lowerCase(req.params.postName);

	posts.forEach(function(post) {
		const storedTitle = _.lowerCase(post.title);

		if(storedTitle === requestedTitle) {
			res.render("post", {
				post: post
			})
		}
	});

});

app.get("/about", function(req, res) {
	res.render("about", {
		aboutContent: aboutContent
	});
});

app.get("/contact", function(req, res) {
	res.render("contact", {
		contactContent: contactContent
	});
});

app.get("/compose", function(req, res) {
	res.render("compose");
});

app.post("/compose", function(req, res) {
	const post = {
		title:req.body.postTitle,
		content: req.body.postBody
	};

	posts.push(post);

	res.redirect("/");
});


app.listen(3000, function(req, res) {
	console.log("Server listening on port 3000");
});

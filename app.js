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

const posts = [];

app.get("/", function(req, res) {
	res.render("home", { //.ejs not needed - {} is simply a js object (key:value)
		homeContent: homeContent,
		posts: posts
	});
});

app.get("/posts/:postName", function(req, res) {

	posts.forEach(function(post) {

		if(_.lowerCase(post.title) === _.lowerCase(req.params.postName)) {
			console.log("Match found");
		} else {
			console.log("No match");
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
	console.log(post);
	res.redirect("/");
});


app.listen(3000, function(req, res) {
	console.log("Server listening on port 3000");
});

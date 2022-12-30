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

const posts = [{title: "Day 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed leo ultricies, rutrum eros facilisis, porttitor nunc. Curabitur at justo accumsan, iaculis augue id, mattis erat. Nunc tempor semper purus vel dictum. Aliquam erat volutpat. Etiam maximus turpis id imperdiet laoreet. Suspendisse venenatis magna diam, eu elementum metus ullamcorper ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec venenatis massa nec dolor rhoncus hendrerit. Donec vestibulum eu dolor at efficitur. Sed nunc ex, efficitur sed consectetur sit amet, molestie ac tellus. Aliquam purus nulla, sollicitudin sit amet ex id, tincidunt rutrum velit. Aenean eget orci mi. Suspendisse potenti. Phasellus auctor scelerisque justo, in convallis tellus porttitor sed."},
{title: "Day 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed leo ultricies, rutrum eros facilisis, porttitor nunc. Curabitur at justo accumsan, iaculis augue id, mattis erat. Nunc tempor semper purus vel dictum. Aliquam erat volutpat. Etiam maximus turpis id imperdiet laoreet. Suspendisse venenatis magna diam, eu elementum metus ullamcorper ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec venenatis massa nec dolor rhoncus hendrerit. Donec vestibulum eu dolor at efficitur. Sed nunc ex, efficitur sed consectetur sit amet, molestie ac tellus. Aliquam purus nulla, sollicitudin sit amet ex id, tincidunt rutrum velit. Aenean eget orci mi. Suspendisse potenti. Phasellus auctor scelerisque justo, in convallis tellus porttitor sed."}];

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

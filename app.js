const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const homeStartingContent = "This is the homeStartingContent.";
const aboutContent = "This is the aboutContent.";
const contactContent = "This is the contactContent.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("home", { //.ejs not needed - {} is simply a js object (key:value)
		homeContent: homeStartingContent
	});
});




app.listen(3000, function(req, res) {
	console.log("Server listening on port 3000");
});

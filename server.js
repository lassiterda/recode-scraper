const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const handlebars = require('handlebars');
const logger = require('morgan');
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const request = require("request");
const cheerio = require("cheerio");

//Connect DB and import models
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/recodeRemix_db");
const db = mongoose.connection;// Is this necessary?
const Article = require("./models/Article.js")
const Comment = require("./models/Comment.js")

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
})

//express setup and router
const app = express()
const router  = express.Router()

// ---BEGIN MIDDLEWARE---
  //logging to console
  app.use(logger("dev"));

  //mounting handlebars
  app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
  app.set("view engine", "handlebars");

  //Mounting body-parser/cookie-parser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: "application/vnd.api+json" }));

  //static assets directory
  app.use(express.static(path.join(__dirname, 'public')));
// ---END MIDDLEWARE---

// ---BEGIN ROUTES---
  const html = require("./routes/html-routes.js")

  app.use("/", html)
// ---END ROUTES---



request('http://www.recode.net', function (error, response, html) {

  let $ = cheerio.load(html);
  console.log(("yep"));
  let arrArticles = $(".c-entry-box__body").map(function(idx, ele) {
    return {
      tile: $(ele).children().length
    }
  });

  // let arrArticles = $('a').filter(function(idx, link) {
  // 	return $(link).attr("data-analytics-link") === 'article'
  // })
  // .map(function(idx, ele){
  //     return {
  //       title: $(ele).text(),
  //       link: $(ele).attr("href"),
  //       author: $(ele).parent().siblings(".c-byline").children("a").text(),
  //       authorLink: $(ele).parent().siblings(".c-byline").children("a").attr("href"),
  //       time: $(ele).parent().siblings(".c-byline").children("time").text().trim()
  //     }
  //   }).toArray()

    console.log(arrArticles);
  // Article.collection.insert(arrArticles)
  //   .then((results) => { console.log(results) })
  //   .catch((err) => { console.log(err) })
});


app.listen(3000, function() {
  console.log("App running on port 3000!");
});

const express = require('express')
const router  = express.Router()

const Article = require("./../models/Article.js")
const Comment = require("./../models/Comment.js")

router.get("/", function(req, res) {
  Article.find({})
    .then((arrArticles) => {
      res.render('articles', {
        articles: arrArticles
      })
    })
    .catch((err) => { res.render('articles') })
})

module.exports = router


//

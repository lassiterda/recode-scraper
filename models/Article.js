const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
})

module.exports = mongoose.model("Article", ArticleSchema);

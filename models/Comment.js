const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CommentSchema = new Schema({
  body: {
    type: String,
    trim: true,
    reguired: true
  }
})


module.exports = mongoose.model("Comment", CommentSchema);

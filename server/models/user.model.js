const mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({text: 'string'});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    notes: [noteSchema]
  }),"notes"
);
module.exports = User;
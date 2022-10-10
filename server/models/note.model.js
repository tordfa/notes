const mongoose = require("mongoose");
const Note = mongoose.model(
  "Note",
  new mongoose.Schema({
    text: String,
  })
);
module.exports = Note;
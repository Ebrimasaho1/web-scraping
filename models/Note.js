var mongoose = require("mongoose");

//schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: String,
    body :  String
});

var Note = mongoose.model("Note", NoteSchema);

// Note model being exported
module.exports = Note;


const mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
    timestamp : {
        type : Date,
        default : Date.now
    },
    rollNo: Number,
    title: String,
    courseID: String,
    content: String,
    tags: [String]
},
{
    toJSON: { virtuals: true } 
});

var Note = mongoose.model('Note', NotesSchema);

module.exports = Note;
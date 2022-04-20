
const mongoose = require('mongoose');

let NoteSchema = new mongoose.Schema({
    timestamp : {
        type : Date,
        default : Date.now
    },
    username: String,
    title: String,
    courseID: String,
    content: String,
    tags: {
        type: [String],
        default: []
    }
},
{
    toJSON: { virtuals: true } 
});

let Note = mongoose.model('Note', NoteSchema);

module.exports = Note;

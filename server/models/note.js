
const mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
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

var Note = mongoose.model('Note', NotesSchema);

module.exports = Note;
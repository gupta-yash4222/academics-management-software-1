const {insertNote, deleteNote, updateNote, fetchNotesByCourseID} = require('../dao/NotesDAO.js');

function apiCreateNote(req, res) {
    
    req.body.rollNo = 180639;
    var content = req.body.content,
        courseID = req.body.courseID,
        rollNo = req.body.rollNo,
        title = req.body.title,
        tags = req.body.tags;

        console.log(req.body);
    if(!title || !rollNo)
        res.status(422).json("A required field is empty");
    else {  
        insertNote(rollNo, title, courseID, content, tags)
        .then(result => {
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    }
}

function apiDeleteNote(req, res) {
    deleteNote(req.params.noteID)
    .then(result => {
        res.status(result.status).json(result.response);
    })
    .catch(error => {
        res.status(error.status).json(error.response);
    });
}

function apiUpdateNote(req, res){
    var noteID = req.params.noteID,
        content = req.body.content,
        rollNo = req.body.rollNo,
        title = req.body.title,
        tags = req.body.tags;
    if(!noteID ||!title || !rollNo)
        res.status(422).json("A required field is empty");
    else {
        updateNote(noteID, rollNo, title, content, tags)
        .then(result => {
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            res.status(error.status).json(error.response);
        });
    }
}

function apiFetchNotes(req, res){
    var courseID = req.params.courseID,
        rollNo = req.body.rollNo;
    //    console.log(courseID);
    if(!courseID)
        res.status(422).json("A required field is empty");
    else {
        // console.log("hello");
        fetchNotesByCourseID(rollNo, courseID)
        .then(result => {
            // console.log("database worked fine");
            res.status(result.status).json(result.response);
        })
        .catch(error => {
            console.log(error.status);
            console.log(error.response);
            res.status(error.status).json(error.response);
        });
    }
}

module.exports = {apiCreateNote, apiDeleteNote, apiUpdateNote, apiFetchNotes};

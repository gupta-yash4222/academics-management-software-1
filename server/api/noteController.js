const {insertNote, deleteNote, updateNote} = require('../dao/NotesDAO.js');

function apiCreateNote(req, res) {
    
    req.body.rollNo = 180639;
    var content = req.body.content,
        rollNo = req.body.rollNo,
        title = req.body.title,
        tags = req.body.tags;

        console.log(req.body);
    if(!title || !rollNo)
        res.status(422).json("A required field is empty");
    else {  
        insertNote(rollNo, title, content, tags)
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


module.exports = {apiCreateNote, apiDeleteNote, apiUpdateNote};

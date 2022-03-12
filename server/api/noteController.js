const {insertNote, deleteNote} = require('../dao/NotesDAO.js');

function apiCreateNote(req, res) {
    var content = req.body.content,
        rollNo = req.body.rollNo,
        title = req.body.title,
        tags = req.body.tags;
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


module.exports = {apiCreateNote, apiDeleteNote};

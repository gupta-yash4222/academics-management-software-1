const { getNotes, addNote, deleteNote, updateNote, fetchNotesByCourseID } = require('../dao/NotesDAO.js');

function apiGetNotes(req, res) {
    const username = req.username;
    getNotes(username)
        .then(result => {
            res.status(result.status).json({
                message: result.message,
                notes: result.notes,
            });
        })
        .catch(error => {
            res.status(error.status).json(error.message);
        });
}

function apiAddNote(req, res) {
    const username = req.username,
        content = req.body.content,
        courseID = req.params['courseID'],
        title = req.body.title,
        tags = req.body.tags;

    if (!title)
        res.status(422).json("A required field is empty");
    else {
        addNote(username, title, courseID, content, tags)
            .then(result => {
                res.status(result.status).json(result.message);
            })
            .catch(error => {
                res.status(error.status).json(error.message);
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

function apiUpdateNote(req, res) {

    const username = req.username,
        noteID = req.params.noteID,
        content = req.body.content,
        title = req.body.title,
        tags = req.body.tags;

    if (!noteID || !title)
        res.status(422).json("A required field is empty");
    else {
        updateNote(noteID, username, title, content, tags)
            .then(result => {
                res.status(result.status).json(result.response);
            })
            .catch(error => {
                res.status(error.status).json(error.response);
            });
    }
}

function apiFetchNotes(req, res) {
    var courseID = req.params.courseID,
        rollNo = req.body.rollNo;
    //    console.log(courseID);
    if (!courseID)
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

module.exports = { apiGetNotes, apiAddNote, apiDeleteNote, apiUpdateNote, apiFetchNotes };

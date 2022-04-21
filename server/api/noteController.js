const { getNotes, searchNotes, addNote, deleteNote, updateNote, fetchNotesByCourseID } = require('../dao/NotesDAO.js');

async function apiGetNotes(req, res) {
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

async function apiSearchNotes(req, res) {
    const username = req.username;
    const { courseID } = req.params
    searchNotes(username, courseID)
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

async function apiAddNote(req, res) {
    const username = req.username
    const { courseID, title, content, tags } = req.body

    if (!title)
        res.status(422).json("A required field is empty");
    else {
        addNote(username, courseID, title, content, tags)
            .then(result => {
                res.status(result.status).json(result.message);
            })
            .catch(error => {
                res.status(error.status).json(error.message);
            });
    }
}

async function apiDeleteNote(req, res) {
    const username = req.username
    const { noteID } = req.params
    deleteNote(username, noteID)
        .then(result => {
            res.status(result.status).json(result.message);
        })
        .catch(error => {
            res.status(error.status).json(error.message);
        });
}

async function apiUpdateNote(req, res) {

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

async function apiFetchNotes(req, res) {
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

module.exports = { apiGetNotes, apiSearchNotes, apiAddNote, apiDeleteNote, apiUpdateNote, apiFetchNotes };

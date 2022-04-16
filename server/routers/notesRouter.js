const express = require('express');

//const {apiCreateNote, apiDeleteNote, apiUpdateNote, apiFetchNotes} = require('../api/noteController.js');
const {apiCreateNote, apiDeleteNote, apiUpdateNote} = require("../api/noteController.js")
const {authorization} = require("../api/login.js");
const { validateCourseID } = require('../api/validation.js');

var router = express.Router();

router.post('/:courseID/createNote', authorization, validateCourseID, apiCreateNote);

router.delete('/deleteNote/:noteID', authorization, apiDeleteNote);

router.patch('/updateNote/:noteID', authorization, apiUpdateNote);

//router.get('/fetchNotes/:courseID', authorization, apiFetchNotes);

module.exports = router;
const express = require('express');

const { apiGetNotes, apiAddNote, apiDeleteNote, apiUpdateNote } = require("../api/noteController.js")
const { authorization } = require("../api/login.js");
const { validateCourseID } = require('../api/validation.js');

var router = express.Router();

router.get('/', authorization, apiGetNotes);

// router.post('/:courseID/addNote', authorization, validateCourseID, apiAddNote);
router.post('/:courseID/addNote', authorization, apiAddNote);

router.delete('/deleteNote/:noteID', authorization, apiDeleteNote);

router.patch('/updateNote/:noteID', authorization, apiUpdateNote);

//router.get('/fetchNotes/:courseID', authorization, apiFetchNotes);

module.exports = router;

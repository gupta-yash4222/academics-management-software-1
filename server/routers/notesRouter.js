const express = require('express');

const { apiGetNotes, apiSearchNotes, apiAddNote, apiDeleteNote, apiUpdateNote } = require("../api/noteController.js")
const { authorization } = require("../api/login.js");
const { validateCourseID } = require('../api/validation.js');

var router = express.Router();

router.get('/', authorization, apiGetNotes);
router.get('/:courseID', authorization, apiSearchNotes);

// router.post('/:courseID/addNote', authorization, validateCourseID, apiAddNote);
router.post('/', authorization, apiAddNote);

router.delete('/:noteID', authorization, apiDeleteNote);

router.patch('/updateNote/:noteID', authorization, apiUpdateNote);

//router.get('/fetchNotes/:courseID', authorization, apiFetchNotes);

module.exports = router;

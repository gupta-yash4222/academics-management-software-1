const express = require('express');

const {apiCreateNote, apiDeleteNote, apiUpdateNote, apiFetchNotes} = require('../api/noteController.js');

var router = express.Router();

router.post('/', apiCreateNote);
router.delete('/:noteID', apiDeleteNote);
router.patch('/:noteID', apiUpdateNote);
router.get('/fetch/:courseID', apiFetchNotes);

module.exports = router;
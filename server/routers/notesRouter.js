const express = require('express');

const {apiCreateNote, apiDeleteNote, apiUpdateNote} = require('../api/noteController.js');

var router = express.Router();

router.post('/', apiCreateNote);
router.delete('/:noteID', apiDeleteNote);
router.patch('/:noteID', apiUpdateNote);

module.exports = router;
const express = require('express');

const {apiCreateNote, apiDeleteNote} = require('../api/noteController.js');

var router = express.Router();

router.post('/', apiCreateNote);
router.delete('/:noteID', apiDeleteNote);

module.exports = router;
const express = require('express');

const { createNote } = require('../api/noteController.js');

var router = express.Router();

router.post('/', createNote);

module.exports = router;
const express = require('express');

const registerUser = require('../api/signup.js');

var router = express.Router();

router.post('/signup', registerUser);

module.exports = router;
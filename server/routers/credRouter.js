const express = require('express');

const registerUser = require('../api/signup.js');
const loginUser = require('../api/login.js');

var router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

module.exports = router;
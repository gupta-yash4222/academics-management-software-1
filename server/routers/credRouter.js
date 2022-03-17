const express = require('express');

const registerUser = require('../api/signup.js');
const {loginUser, authorization} = require('../api/login.js');

var router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get('/welcome', authorization, (req, res) => {
    return res.status(200).json({ username: req.username });
})

module.exports = router;
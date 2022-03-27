express = require('express');

const { authorization } = require('../api/login.js');
const { apiAddCompletedCourse } = require('../api/coursePlannerController');
const express = require('express');
const router = require('./notesRouter');

router = express.Router();

router.post('/completedCourse', authorization, apiAddCompletedCourse);

module.exports = router;

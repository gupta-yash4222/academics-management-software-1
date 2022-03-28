

const { authorization } = require('../api/login.js');
const { apiAddCompletedCourse } = require('../api/coursePlannerController');
const express = require('express');

router = express.Router();

router.post('/completedCourse', authorization, apiAddCompletedCourse);

module.exports = router;

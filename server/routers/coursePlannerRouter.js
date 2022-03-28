const express = require('express');

const { authorization } = require('../api/login.js');
const { apiAddCompletedCourse } = require('../api/coursePlannerController');

router = express.Router();

router.post('/completedCourse', authorization, apiAddCompletedCourse);

module.exports = router;

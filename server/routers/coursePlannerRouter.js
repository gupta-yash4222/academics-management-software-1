const express = require('express');

const { authorization } = require('../api/login.js');
const { apiAddCompletedCourse, apiAddUpcomingCourse } = require('../api/coursePlannerController');
const router = require('./notesRouter.js');

router = express.Router();

router.post('/completedCourse', authorization, apiAddCompletedCourse);
router.post('/upcomingCourse', authorization, apiAddUpcomingCourse);

module.exports = router;

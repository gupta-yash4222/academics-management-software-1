const express = require('express');

const { authorization } = require('../api/login.js');
const { apiAddCompletedCourse, apiAddUpcomingCourse, apiDeleteCompletedCourse, apiDeleteUpcomingCourse } = require('../api/coursePlannerController');
const router = require('./notesRouter.js');

router = express.Router();

router.post('/completedCourse', authorization, apiAddCompletedCourse);
router.post('/upcomingCourse', authorization, apiAddUpcomingCourse);
router.delete('/completedCourse/:id', authorization, apiDeleteCompletedCourse);
router.delete('/upcomingCourse/:id', authorization, apiDeleteUpcomingCourse);

module.exports = router;

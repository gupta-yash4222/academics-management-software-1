const express = require('express');

const { authorization } = require('../api/login.js');
const {
  apiAddCourse,
  apiDeleteCourse,
  apiAddSemester,
  apiDeleteLastSemester,
  apiGetNumberOfSemesters,
  apiGetSemester,
  apiGetCourse,
} = require('../api/coursePlannerController');

const router = express.Router();

router.get('/getNum', authorization, apiGetNumberOfSemesters);
router.get('/semester/:semNumber', authorization, apiGetSemester);
router.get('/semester/:semNumber/course/:courseID', authorization, apiGetCourse);

router.post('/semester', authorization, apiAddSemester);
router.post('/semester/:semNumber/course', authorization, apiAddCourse);

router.delete('/semester/', authorization, apiDeleteLastSemester);
router.delete('/semester/:semNumber/course/:courseID', authorization, apiDeleteCourse);

module.exports = router;

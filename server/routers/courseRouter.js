express = require('express');

const {validateCourseID} = require('../api/validation.js');
const {authorization} = require('../api/login.js');
const {apiAddReview, apiAddToFavourites} = require('../api/courseController.js');

router = express.Router();

router.get('/:courseID', authorization, validateCourseID, (req, res) => {
    const courseID = req.params['courseID'];
    res.status(200).send(courseID);
});

/****** Adding courses to the database ******/

const {addCourse} = require('../dao/courseDAO.js');

router.post('/add', (req, res) => {
    const dict = req.body;
    for(const key in dict){
        addCourse(key, dict[key]);
    }

    return res.status(200).send("Done");
})

/****** For testing purpose *******/

router.post('/:courseID/addReview', authorization, validateCourseID, apiAddReview);

router.post('/:courseID/addToFavourite', authorization, validateCourseID, apiAddToFavourites)

module.exports = router;
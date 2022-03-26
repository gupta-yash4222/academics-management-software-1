express = require('express');

const {validateCourseID} = require('../api/validation.js');
const {authorization} = require('../api/login.js');
const {apiAddReview, apiAddToFavourites, apiGetPersonalReview, apiGetFavoriteCourses, apiGetReviews, apiAddCommentToReview, apiLikeReview, apiLikeComment} = require('../api/courseController.js');

router = express.Router();

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

router.post('/:courseID/addToFavorite', authorization, validateCourseID, apiAddToFavourites)

router.get('/:courseID/getPersonalReview', authorization, validateCourseID, apiGetPersonalReview);

router.get('/:courseID/getReviews', authorization, validateCourseID, apiGetReviews);

router.get('/getFavoriteCourses', authorization, apiGetFavoriteCourses);

router.post('/:reviewID/addComment', authorization, apiAddCommentToReview);

router.post('/:reviewID/likeReview', authorization, apiLikeReview);

router.post('/:commentID/likeComment', authorization, apiLikeComment);

module.exports = router;
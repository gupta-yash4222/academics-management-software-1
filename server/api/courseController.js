const {addReview, getReviewDetails, addToFavourites, getFavoriteCourses, getReviews, addCommentToReview, likeComment, likeReview, getCourseDetails} = require('../dao/courseDAO.js');

async function apiAddReview(req, res) {
    const courseID = req.params['courseID'],
        review = req.body.review,
        rating = req.body.rating || 0,
        username = req.username;

    // console.log("hi" + req.body.rating);
    addReview(courseID, review, rating, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

<<<<<<< HEAD
async function apiGetPersonalReview(req, res) {
    const courseID = req.params['courseID'],
        username = req.username;

    getPersonalReview(courseID, username)
        .then(result => {
            res.status(result.status).json({ message: result.message, review: result.review });
        })
        .catch(error => {
            res.status(error.status).json({ message: error.message });
        })
=======
async function apiGetCourseDetails (req, res) {
    const courseID = req.params['courseID'];

    getCourseDetails(courseID)
    .then( (result) => {
        return res.status(result.status).json({message: result.message, details: result.details});
    })
    .catch( (error) => {
        return res.status(error.status).json({message: error.message});
    });
}

async function apiGetReviewDetails (req, res) {
    const reviewID = req.params['reviewID'];

    getReviewDetails(reviewID)
    .then( result => {
        res.status(result.status).json({message: result.message, review: result.details});
    })
    .catch( error => {
        res.status(error.status).json({message: error.message});
    })
>>>>>>> main
}

async function apiGetReviews(req, res) {
    const courseID = req.params['courseID'];

    getReviews(courseID)
        .then(result => {
            res.status(result.status).json({ message: result.message, reviews: result.reviewsList });
        })
        .catch(error => {
            res.status(error.status).json({ message: error.message });
        });
}

async function apiAddToFavourites(req, res) {
    const courseID = req.params['courseID'],
        username = req.username;

    addToFavourites(courseID, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiGetFavoriteCourses(req, res) {
    const username = req.username;

    console.log(username);

    getFavoriteCourses(username)
    .then( result => {
        res.status(result.status).json({message: result.message, favoriteCourses: result.favoriteCourses});
    })
    .catch( error => {
        res.status(error.status).json({message: error.message});
    });
}

async function apiAddCommentToReview (req, res) {
    const reviewID = req.params['reviewID'],
        username = req.username,
        comment = req.body.comment;

    addCommentToReview(reviewID, username, comment)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
    });
}

async function apiLikeReview (req, res) {
    const reviewID = req.params['reviewID'];

    likeReview(reviewID)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
    })
}

async function apiLikeComment (req, res) {
    const commentID = req.params['commentID'];

    likeComment(commentID)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
    })
}

<<<<<<< HEAD
module.exports = {apiAddReview, apiGetPersonalReview, apiGetReviews, apiAddToFavourites, apiGetFavoriteCourses, apiAddCommentToReview, apiLikeReview, apiLikeComment};
=======
module.exports = {apiAddReview, apiGetReviewDetails, apiGetReviews, apiGetCourseDetails, apiAddToFavourites, apiGetFavoriteCourses, apiAddCommentToReview, apiLikeReview, apiLikeComment};
>>>>>>> main

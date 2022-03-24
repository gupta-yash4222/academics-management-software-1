const {addReview, getPersonalReview, addToFavourites, getFavoriteCourses, getReviews} = require('../dao/courseDAO.js');

async function apiAddReview (req, res) {
    console.log(req.body);
    const courseID = req.params['courseID'],
        review = req.body.review,
        rating = req.body.rating || 0,
        username = req.username;

    console.log(req.body);
    addReview(courseID, review, rating, username)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
    });
}

async function apiGetPersonalReview (req, res) {
    const courseID = req.params['courseID'],
        username = req.username;

    getPersonalReview(courseID, username)
    .then( result => {
        res.status(result.status).json({message: result.message, review: result.review});
    })
    .catch( error => {
        res.status(error.status).json({message: error.message});
    })
}

async function apiGetReviews (req, res) {
    const courseID = req.params['courseID'];

    getReviews(courseID)
    .then( result => {
        res.status(result.status).json({message: result.message, reviews: result.reviewsList});
    })
    .catch( error => {
        res.status(error.status).json({message: error.message});
    });
}

async function apiAddToFavourites (req, res) {
    const courseID = req.params['courseID'],
        username = req.username;

    addToFavourites(courseID, username)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
    });
}

async function apiGetFavoriteCourses (req, res) {
    const username = req.username;

    console.log(username);

    getFavoriteCourses(username)
    .then( result => {
        console.log(result.favoriteCourses);
        res.status(result.status).json({message: result.message, favoriteCourses: result.favoriteCourses});
    })
    .catch( error => {
        console.log("Whaaat!!0")
        res.status(error.status).json({message: error.message});
    });
}

module.exports = {apiAddReview, apiGetPersonalReview, apiGetReviews, apiAddToFavourites, apiGetFavoriteCourses};
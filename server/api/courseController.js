const {addReview, addToFavourites} = require('../dao/courseDAO.js');

async function apiAddReview (req, res) {
    const courseID = req.params['courseID'],
        review = req.body.review,
        rating = req.body.rating || 0,
        username = req.username;

    addReview(courseID, review, rating, username)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
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

module.exports = {apiAddReview, apiAddToFavourites};
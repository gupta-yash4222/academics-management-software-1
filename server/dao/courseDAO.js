const {Course, Review, Comment} = require('../../models/course.js');
const User = require('../../models/user.js');

async function updateCourseRating (courseID, rating, reviewID) {
    return new Promise( (resolve, reject) => {

        Course.findOne({courseID: courseID}, (err, course) => {
            
            if(err) reject("Internal server error");

            else if(!course) reject("Invalid course id");

            course.rating = (( course.rating * course.reviews.length ) + rating ) / (course.reviews.length + 1);   // averaging the available ratings
            course.reviews.push(reviewID);

            course.save()
            .then(savedDoc => {
                resolve("Review added successfully");
            })
            .catch(error => {
                reject("Internal server error");
            });

        });

    });
}

async function addReview (courseID, review, rating, username) {
    return new Promise( (resolve, reject) => {

        Review.findOne({author: username}, (err, reviewFoundDoc) => {
            if(!reviewFoundDoc){
                const reviewDoc = new Review({
                    reviewID: courseID.concat("-", username),
                    author: username,
                    review: review
                }); 
                reviewDoc.save();

                updateCourseRating(courseID, rating, reviewDoc.reviewID)
                .then( result => {
                    resolve({status: 200, message: result});
                })
                .catch( error => {
                    if(error === "Internal server error") reject({status: 500, message: error});
                    else reject({status: 400, message: error});
                });
            } 

            else{
                reviewFoundDoc.review = review;
                reviewFoundDoc.save();
            }
        });

    });
}

async function addToFavourites (courseID, username) {
    return new Promise( (resolve, reject) => {
        User.findOne({username: username}, (err, user) => {

            if(err) reject({status: 500, message: "Internal server error"});
            else if(!user) reject({status: 400, message: "User not registered with the application"});
            else {
                
                const found = user.favoriteCourses.find(ele => ele === courseID);

                if(found) return reject({status: 409, message: "Courses already in the Favourites list"});

                user.favoriteCourses.push(courseID); user.save();
                Course.findOne({courseID: courseID}, (err, course) => {
                    if(err) reject({status: 500, message: "Internal server error"});

                    if(!course) reject({status: 400, message: "Invalid course id"});

                    course.stars = course.stars + 1; course.save();
                    resolve({status: 200, message: "Course added to favourites"});
                });
            }
            
        });
    });
}

async function addCourse (courseID, courseName) {
    const course = new Course({
        courseID: courseID,
        name: courseName
    });
    Course.findOne({courseID: courseID}, (err, result) => {
        if(!result){
            console.log(courseID);
            course.save();
        }
    })
}


module.exports = {addReview, addToFavourites, addCourse};
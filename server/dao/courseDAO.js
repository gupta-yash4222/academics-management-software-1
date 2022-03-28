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

        const tempReviewID = courseID.concat("-", username);
        console.log(tempReviewID);
        Review.findOne({reviewID: tempReviewID}, (err, reviewFoundDoc) => {
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
                console.log("Hello");
                reviewFoundDoc.review = review;
                reviewFoundDoc.save()
                .then( () => {
                    return resolve({status: 200, message: "Review edited successfully"});
                })
                .catch( () => {
                    return reject({status: 500, message: "Internal server error"});
                });
            }
        });

    });
}

async function getPersonalReview (courseID, username) {
    const reviewID = courseID.concat("-", username);

    return new Promise( (resolve, reject) => {

        Review.findOne({reviewID: reviewID}, (err, reviewDoc) => {
            if(err) return reject({status: 500, message: "Internal server error"});

            if(!reviewDoc) return reject({status: 400, message: "Course review has not been given yet"});

            return resolve({status: 200, message: "Review found successfully", review: reviewDoc.review});

        });

    });

}

async function getReviews (courseID) {
    return new Promise( (resolve, reject) => {
        Course.findOne({courseID: courseID}, (err, course) => {
            if(err) return reject({status: 500, message: "Internal server error"});
            if(!course) return reject({status: 400, message: "Invalid course id"});

            var reviewsList = [];
            var requests = [];

            for(var i = 0; i < course.reviews.length; i++) {
                var p = Review.findOne({reviewID: course.reviews[i]}).exec();
                requests.push(p);
            }

            p = Promise.all(requests)
                .then( reviewDoc => {
                    reviewsList = reviewDoc;
                });

            p.then( () => {
                return resolve({status: 200, message: "Reviews found successfully", reviewsList: reviewsList});
            });
        })
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

async function getFavoriteCourses (username) {
    return new Promise( (resolve, reject) => {
        User.findOne({username: username}, (err, user) => {
            if(err) return reject({status: 500, message: "Internal server error"});
            else if(!user) return reject({status: 400, message: "User not registered with the application"});

            else{
                return resolve({status: 200, message: "Favorite courses found successfully", favoriteCourses: user.favoriteCourses});
            }
        });
    });
}

async function addComment (reviewID, commentID) {
    return new Promise( (resolve, reject) => {
        Review.findOne({reviewID: reviewID}, (err, reviewDoc) => {
            if(err) return reject("Internal server error");
            else if(!reviewDoc) return reject("Invalid reviewID");
            else{
                reviewDoc.comments.push(commentID);
                reviewDoc.save()
                .then( () => {
                    return resolve("Comment added successfully");
                })
                .catch( () => {
                    return reject("Internal server error");
                })
            }
        })
    })
}

async function addCommentToReview (reviewID, username, comment) {

    const commentID = reviewID.concat("-", username);

    return new Promise( (resolve, reject) => {

        Comment.findOne({commentID: commentID}, (err, commentDocFound) => {

            if(err) reject({status: 500, message: "Internal server error"});

            else if(!commentDocFound){
                const commentDoc = Comment({
                    commentID: commentID,
                    author: username,
                    comment: comment
                });

                commentDoc.save();

                addComment(reviewID, commentID)
                .then( (result) => {
                    return resolve({status: 200, message: result});
                })
                .catch( (error) => {
                    if(error == "Internal server error") return reject({status: 500, message: error});
                    else return reject({status: 400, message:error});
                })
            }

            else {
                commentDocFound.comment = comment;
                commentDocFound.save()
                .then( () => {
                    return resolve({status: 200, message: "Comment edited successfully"});
                })
                .catch( () => {
                    return reject({status: 500, message: "Internal server error"});
                });
            }
        });

    });
}

async function likeReview (reviewID) {
    return new Promise( (resolve, reject) => {
        Review.findOne({reviewID: reviewID}, (err, reviewDoc) => {
            if(err) return reject({status: 500, message: "Internal server error"});
            else if(!reviewDoc) return reject({status: 400, message: "Invalid review id"});
            else{
                reviewDoc.likes = reviewDoc.likes + 1;
                reviewDoc.save()
                .then( () => {
                    return resolve({status: 200, message: "Review liked successfully"});
                })
                .catch( () => {
                    return reject({status: 500, message: "Internal server error"});
                })
            }
        });
    });
}

async function likeComment (commentID) {
    return new Promise( (resolve, reject) => {
        Comment.findOne({commentID: commentID}, (err, commentDoc) => {
            if(err) return reject({status: 500, message: "Internal server error"});
            else if(!commentDoc) return reject({status: 400, message: "Invalid comment id"});
            else{
                commentDoc.likes = commentDoc.likes + 1;
                commentDoc.save()
                .then( () => {
                    return resolve({status: 200, message: "Review liked successfully"});
                })
                .catch( () => {
                    return reject({status: 500, message: "Internal server error"});
                })
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


module.exports = {addReview, getPersonalReview, getReviews, addToFavourites, getFavoriteCourses, addCommentToReview, likeReview, likeComment, addCourse};
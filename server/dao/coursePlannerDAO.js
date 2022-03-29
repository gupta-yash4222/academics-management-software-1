const { CPCourse, Sem, CompletedCourses, UpcomingCourses } = require('../../models/coursePlanner');
const User = require('../../models/user')

async function addCompletedCourse(courseID, courseName, semNumber, username) {
    return new Promise((resolve, reject) => {
        const course = new CPCourse({
            courseID: courseID,
            name: courseName
        });
        course.save();

        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({ status: 500, message: "Internal server error" });
            }
            else if (!user) {
                reject({ status: 400, message: "User not registered with the application" });
            }
            else if (!user.completedCourses.sems[semNumber - 1]) {
                reject({ status: 400, message: `Sem ${semNumber} does not exist` });
            }
            else {
                user.completedCourses.sems[semNumber - 1].courses.push(course);
                user.save();
                resolve({ status: 200, message: "Course added to completed courses" });
            }
        });
    });
}

async function addUpcomingCourse(courseID, courseName, username) {
    return new Promise((resolve, reject) => {
        const course = new CPCourse({
            courseID: courseID,
            name: courseName
        });
        course.save();

        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({ status: 500, message: "Internal server error" });
            }
            else if (!user) {
                reject({ status: 400, message: "User not registered with the application" });
            }
            else {
                user.UpcomingCourses.courses.push(course);
                user.save();
                resolve({ status: 200, message: "Course added to upcoming courses" });
            }
        });
    });
}

async function deleteUpcomingCourse(id, username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({ status: 500, message: "Internal server error" });
            }
            else if (!user) {
                reject({ status: 400, message: "User not registered with the application" });
            }
            else {
                user.upcomingCourses.courses.findOneAndDelete(
                    {
                        _id: id
                    },
                    (err, course) => {
                        if (err) {
                            reject({ status: 500, message: "Internal server error" });
                        }
                        else if (!course) {
                            reject({ status: 400, message: "Course not found" });
                        }
                        else {
                            user.save();
                            resolve({ status: 200, message: "Course deleted" });
                        }
                    }
                );
            }
        });
    });
}

module.exports = { addCompletedCourse, addUpcomingCourse, deleteUpcomingCourse };

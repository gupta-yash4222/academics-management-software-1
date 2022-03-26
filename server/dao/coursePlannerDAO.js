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
            else {
                // check if sem exists, otherwise make new sem
                // is getter read-only?
                user.completedCourses.sems.get(semNumber).push(course);
                user.save();
                resolve({ status: 200, message: "Course added to completed courses" });
            }
        });
    });
}

module.exports = { addCompletedCourse };

const { addCompletedCourse } = require('../dao/coursePlannerDAO')

async function apiAddCompletedCourse(req, res) {
    const courseID = req.body.courseID,
        courseName = req.body.courseName,
        semNumber = req.body.semNumber,
        username = req.username;

    addCompletedCourse(courseID, courseName, semNumber, username)
        .then(result => {
            return res.status(restult.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

module.exports = { apiAddCompletedCourse };

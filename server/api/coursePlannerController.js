const { addCompletedCourse, addUpcomingCourse, deleteUpcomingCourse } = require('../dao/coursePlannerDAO')

async function apiAddCompletedCourse(req, res) {
    const { courseID, courseName, semNumber } = req.body;
    const { username } = req;

    addCompletedCourse(courseID, courseName, semNumber, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiAddUpcomingCourse(req, res) {
    const { courseID, courseName } = req.body;
    const { username } = req;

    addUpcomingCourse(courseID, courseName, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiDeleteUpcomingCourse(req, res) {
    const { id } = req.params;
    const { username } = req;

    deleteUpcomingCourse(id, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

module.exports = { apiAddCompletedCourse, apiAddUpcomingCourse, apiDeleteUpcomingCourse };

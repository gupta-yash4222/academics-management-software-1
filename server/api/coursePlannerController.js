const {
	addCourse,
	deleteCourse,
	addSemester,
	deleteLastSemester,
	getNumberOfSemesters,
	getSemester,
	getCourse,
} = require('../dao/coursePlannerDAO')

async function apiAddCourse(req, res) {
	const { semNumber } = req.params;
    const { courseID, courseName } = req.body;
    const { username } = req;

    addCourse(courseID, courseName, semNumber, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiDeleteCourse(req, res) {
    const { semNumber, courseID } = req.params;
    const { username } = req;

    deleteCourse(courseID, semNumber, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiAddSemester(req, res) {
	const { username } = req;

	addSemester(username)
		.then(result => {
			return res.status(result.status).json({ message: result.message });
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiDeleteLastSemester(req, res) {
	const { username } = req;

	deleteLastSemester(username)
		.then(result => {
			return res.status(result.status).json({ message: result.message });
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiGetNumberOfSemesters(req, res) {
	const { username } = req;

	getNumberOfSemesters(username)
		.then(result => {
			return res.status(result.status).json({
				message: result.message,
				numSem: result.numSem
			});
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiGetSemester(req, res) {
	const { username } = req;
	const { semNumber } = req.params;

	getSemester(semNumber, username)
		.then(result => {
			return res.status(result.status).json({
				message: result.message,
				semester: result.semester,
			});
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiGetCourse(req, res) {
	const { username } = req;
	const { courseID, semNumber } = req.params;

	getCourse(courseID, semNumber, username)
		.then(result => {
			return res.status(result.status).json({
				message: result.message,
				semester: result.semester,
			});
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

module.exports = {
	apiAddCourse,
	apiDeleteCourse,
	apiAddSemester,
	apiDeleteLastSemester,
	apiGetNumberOfSemesters,
	apiGetSemester,
	apiGetCourse,
};

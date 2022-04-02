const { CPCourse, Semester, CoursePlan } = require('../models/coursePlanner');
const User = require('../models/user');

const SERVER_ERROR_MSG = "Internal Server Error";
const USER_NOT_FOUND_ERROR_MSG = "User not found in the database";
const SEM_NOT_FOUND_ERROR_MSG = semNumber => `Semester ${semNumber} does not exist`;

async function addCourse(courseID, semNumber, username) {
    return new Promise((resolve, reject) => {
		CPCourse.findOne({ courseID: courseID }, (err, course) => {
			if(err) reject({ status: 500, message: SERVER_ERROR_MSG });
			else if(!course) reject({ status: 400, message: `Course ${courseID} not found` });
			else User.findOne({ username: username }, (err, user) => {
				if (err) {
					reject({ status: 500, message: SERVER_ERROR_MSG });
				}
				else if (!user) {
					reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
				}
				else if (!user.coursePlan.sems[semNumber - 1]) {
					reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
				}
				else {
					let semester = user.coursePlan.sems[semNumber - 1];
					const alreadyPresentCourse = semester.courses.find(elem => elem.courseID === course.courseID);
					if(!alreadyPresentCourse) {
						semester.courses.push(course);
						user.save();
						resolve({ status: 200, message: `Course ${courseID} added to semester ${semNumber} courses` });
					}
					else {
						reject({ status: 400, message: `Course ${courseID} already exists in semester ${semNumber}` });
					}
				}
			});
		});

    });
}

async function deleteCourse(courseID, semNumber, username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!user) {
                return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            }
			let semester = user.coursePlan.sems[semNumber - 1];
			if(!semester) {
				return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
			}
            semester.courses.findOneAndDelete(
                { courseID: courseID },
                (err, course) => {
                    if (err) {
                        reject({ status: 500, message: SERVER_ERROR_MSG });
                    }
                    else if (!course) {
						reject({ status: 400, message: "Course not found" });
                    }
                    else {
                        user.save();
                        resolve({ status: 200, message: "Course deleted successfully" });
                    }
                }
            );
        });
    });
}

async function addSemester(semNumber, username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username }, (err, user) => {
			if(err) reject({ status: 500, message: SERVER_ERROR_MSG });
			else if(!user) {
				reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
			}
			else {
				const semester = new Semester();
				semester.save();
				user.coursePlan.sems.splice(semNumber, 0, semester);
				user.save();
				resolve({ status: 200, message: "New semester added" });
			}
		});
	});
}

async function addSemesterAtEnd(username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username }, (err, user) => {
			if(err) {
				reject({ status: 500, message: SERVER_ERROR_MSG });
			}
			else if(!user) {
				reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
			}
			else {
				const semester = new Semester();
				semester.save();
				user.coursePlan.sems.push(semester);
				user.save();
				resolve({ status: 200, message: "New empty semester added!" });
			}
		});
	});
}

async function deleteSemester(semNumber, username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username }, (err, user) => {
			if(err) reject({ status: 500, message: SERVER_ERROR_MSG });
			else if(!user) {
				reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
			}
			else if(!user.coursePlan.sems[semNumber - 1]) {
				reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
			}
			else {
				user.coursePlan.sems.splice(semNumber - 1, 1); // removes semester
				user.save();
				resolve({ status: 200, message: `Deleted semester ${semNumber} successfully!` });
			}
		});
	});
}

async function getNumberOfSemesters(username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username }, (err, user) => {
			if(err) reject({ status: 500, message: SERVER_ERROR_MSG });
			else if(!user) {
				reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
			}
			else {
				const numSem = user.coursePlan.sems.length;
				resolve({
					status: 200,
					message: "Found number of semesters",
					numSem: numSem,
				});
			}
		});
	});
}

async function getSemester(semNumber, username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username }, (err, user) => {
			if(err) reject({ status: 500, message: SERVER_ERROR_MSG });
			else if(!user) {
				reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
			}
			else if(!user.coursePlan.sems[semNumber - 1]) {
				reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) })
			}
			else {
				resolve({
					status: 200,
					message: `Found semester ${semNumber} successfully!`,
					semester: user.coursePlan.sems[semNumber - 1],
				});
			}
		});
	});
}

async function getCourse(courseID, semNumber, username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username }, (err, user) => {
			if(err) return reject({ status: 500, message: SERVER_ERROR_MSG });
			else if(!user) {
				return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
			}
			const semester = user.coursePlan.sems[semNumber - 1];
			if(!semester) {
				return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
			}
			courseFound = semester.courses.findOne({ courseID: courseID });
			if(!course) {
				return reject({ status: 400, message: `Course ${courseID} not found in semester ${semNumber}` });
			}
			resolve({
				status: 200,
				message:  `Course ${courseID} in semester ${semNumber} found successfully`,
				course: course,
			});
		});
	});
}

module.exports = {
	addCourse,
	deleteCourse,
	addSemester,
	addSemesterAtEnd,
	deleteSemester,
	getNumberOfSemesters,
	getSemester,
	getCourse,
};

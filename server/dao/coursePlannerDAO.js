const { CPCourse, Semester, CoursePlan } = require('../../models/coursePlanner');
const User = require('../../models/user');

const SERVER_ERROR_MSG = "Internal Server Error";
const USER_NOT_FOUND_ERROR_MSG = "User not found in the database";
const SEM_NOT_FOUND_ERROR_MSG = semNumber => `Semester ${semNumber} does not exist`;

async function addCourse(courseID, courseName, semNumber, username) {
    return new Promise((resolve, reject) => {
        const course = new CPCourse({
            courseID: courseID,
            name: courseName
        });
        course.save();

        User.findOne({ username: username }, (err, user) => {
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
                user.coursePlan.sems[semNumber - 1].courses.push(course);
                user.save();
                resolve({ status: 200, message: "Course added to completed courses" });
            }
        });
    });
}

// async function addUpcomingCourse(courseID, courseName, username) {
//     return new Promise((resolve, reject) => {
//         const course = new CPCourse({
//             courseID: courseID,
//             name: courseName
//         });
//         course.save();

//         User.findOne({ username: username }, (err, user) => {
//             if (err) {
//                 reject({ status: 500, message: "Internal server error" });
//             }
//             else if (!user) {
//                 reject({ status: 400, message: "User not registered with the application" });
//             }
//             else {
//                 user.UpcomingCourses.courses.push(course);
//                 user.save();
//                 resolve({ status: 200, message: "Course added to upcoming courses" });
//             }
//         });
//     });
// }

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

// async function deleteUpcomingCourse(id, username) {
//     return new Promise((resolve, reject) => {
//         User.findOne({ username: username }, (err, user) => {
//             if (err) {
//                 reject({ status: 500, message: "Internal server error" });
//             }
//             else if (!user) {
//                 reject({ status: 400, message: "User not registered with the application" });
//             }
//             else {
//                 user.upcomingCourses.courses.findOneAndDelete(
//                     {
//                         _id: id
//                     },
//                     (err, course) => {
//                         if (err) {
//                             reject({ status: 500, message: "Internal server error" });
//                         }
//                         else if (!course) {
//                             reject({ status: 400, message: "Course not found" });
//                         }
//                         else {
//                             user.save();
//                             resolve({ status: 200, message: "Course deleted" });
//                         }
//                     }
//                 );
//             }
//         });
//     });
// }

async function addSemester(username) {
	return new Promise((resolve, reject) => {
		const semester = new Semester();
		semester.save();

		User.findOne({ username: username }, (err, user) => {
			if(err) {
				reject({ status: 500, message: "Internal Server Error" });
			}
			else if(!user) {
				reject({ status: 400, message: "User not found!" });
			}
			else {
				user.coursePlan.sems.push(semester);
				user.save();
				resolve({ status: 200, message: "New empty semester added!" });
			}
		});
	});
}

async function deleteLastSemester(username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username }, (err, user) => {
			if(err) reject({ status: 500, message: SERVER_ERROR_MSG });
			else if(!user) {
				reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
			}
			else if(user.coursePlan.sems.length === 0) {
				reject({ status: 400, message: "No semester present!" });
			}
			else {
				user.coursePlan.sems.pop();
				user.save();
				resolve({ status: 200, message: "Deleted last semester successfully!" });
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
	deleteLastSemester,
	getNumberOfSemesters,
	getSemester,
	getCourse,
};

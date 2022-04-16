const mongoose = require('mongoose');

const CPCourseSchema = new mongoose.Schema(
    {
        courseID: String,
        name: String,
    },
    {
        toJSON: { virtuals: true }
    }
);

const SemSchema = new mongoose.Schema(
    {
        courses: {
            type: [CPCourseSchema],
            default: []
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

const CoursePlanSchema = new mongoose.Schema(
    {
        sems: {
            type: [SemSchema],
            default: []
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

let CPCourse = mongoose.model('CPCourse', CPCourseSchema);
let Semester = mongoose.model('Semester', SemSchema)
let CoursePlan = mongoose.model('CoursePlan', CoursePlanSchema);

module.exports = {
	CoursePlanSchema,
	CPCourse,
	Semester,
	CoursePlan
};

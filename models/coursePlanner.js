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

const CompletedCoursesSchema = new mongoose.Schema(
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

const UpcomingCoursesSchema = new mongoose.Schema(
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

let CPCourse = mongoose.model('CPCourse', CPCourseSchema);
let Sem = mongoose.model('Sem', SemSchema)
let CompletedCourses = mongoose.model('CompletedCourses', CompletedCoursesSchema);
let UpcomingCourses = mongoose.model('UpcomingCourses', UpcomingCoursesSchema);

module.exports = { CompletedCoursesSchema, UpcomingCoursesSchema, CPCourse, Sem, CompletedCourses, UpcomingCourses };

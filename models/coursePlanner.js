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
        // {semNumber => SemSchema}
        sems: {
            type: Map,
            of: SemSchema
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

module.exports = { CPCourse, Sem, CompletedCourses, UpcomingCourses };

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

const CompletedCoursesSchema = new mongoose.Schema(
    {
        // {semNumber => courseID}
        courses: {
            type: Map,
            of: CPCourseSchema
        }
    },
    {
        toJSON: { virtuals: true }
    }
)

const UpcomingCoursesSchema = new mongoose.Schema(
    {
        courses: [CPCourseSchema]
    }
)

let CPCourse = mongoose.model('CPCourse', CPCourseSchema);
let CompletedCourses = mongoose.model('CompletedCourses', CompletedCoursesSchema)
let UpcomingCourses = mongoose.model('UpcomingCourses', UpcomingCoursesSchema)

module.exports = { CPCourse, CompletedCourses, UpcomingCourses }

const mongoose = require('mongoose');
const { CompletedCoursesSchema, UpcomingCoursesSchema } = require('./coursePlanner')

var UserSchema = new mongoose.Schema(
    {
        username: String,
        rollNo: Number,
        name: String,
        password: String,
        department: String,
        doubleMajor: {
            type: String,
            default: undefined
        },
        dualDegree: {
            type: String,
            default: undefined
        },
        favoriteCourses: {
            type: [String],
            default: []
        },
        numberOfSemsCompleted: Number,
        completedCourses: CompletedCoursesSchema,
        upcomingCourses: UpcomingCoursesSchema
    },
    {
        toJSON: { virtuals: true }
    }
);

var User = mongoose.model('User', UserSchema);
module.exports = User;

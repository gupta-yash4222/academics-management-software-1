const mongoose = require('mongoose');
const { CoursePlanSchema } = require('./coursePlanner')

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
        likedReviews: {
            type:[String],
            default:[]
        },
        likedComments:{
            type:[String],
            default:[]
        },
        // will coursePlan be instantiated automatically?
        coursePlan: CoursePlanSchema
        // todo: option to have multiple plans
    },
    {
        toJSON: { virtuals: true }
    }
);

var User = mongoose.model('User', UserSchema);
module.exports = User;

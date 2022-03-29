const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
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
    }
},
{
    toJSON: { virtuals: true }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
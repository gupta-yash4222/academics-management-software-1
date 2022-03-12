const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    rollNo: Number,
    name: String,
    password: String
},
{
    toJSON: { virtuals: true }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
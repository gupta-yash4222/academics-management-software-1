const { reject } = require('bcrypt/promises');
const User = require('../models/user');
const { CoursePlan } = require('../models/coursePlanner');

function findUser(username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, result) => {
            if (err) reject({ elem: null, message: err });
            else if (!result) reject({ elem: result, message: "User not found" });
            else resolve({ elem: result, message: "User found successfully" });
        });

    });
}


<<<<<<< HEAD
function addUser(username, rollNo, name, hashPassword, department) {
    return new Promise( (resolve, reject) => {
=======
function addUser(username, rollNo, name, hashPassword) {
    return new Promise((resolve, reject) => {
>>>>>>> 3c690f239bec2c33ffbc6a201134ba29276ac3f9
        const user = new User({
            username: username,
            rollNo: rollNo,
            name: name,
            password: hashPassword,
            department: department
        });

        findUser(username)
            .then(result => {
                reject({ status: 208, message: "User already exists" });
            })
            .catch(error => {
                if (error.message === "User not found") {
                    user.save(err => {
                        if (err) {
                            reject({ status: 500, message: "Internal server error" });
                        }
                        else {
                            resolve({ status: 200, message: "User successfully registered" });
                        }
                    });
                }
                else reject({ status: 500, message: "Internal server error" });
            });
    });
}

module.exports = { addUser, findUser };

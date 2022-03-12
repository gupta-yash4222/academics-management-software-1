const bcrypt = require("bcrypt")
const addUser = require("../dao/userDAO.js")

function registerUser(req, res) {
    var username = req.body.username,
        rollNo = req.body.rollNo,
        name = req.body.name,
        password = req.body.password;

    console.log(password);

    var hashPassword;

    bcrypt.hash(password, 10)
    .then( hash => {
        hashPassword = hash;
    } );

    addUser(username, rollNo, name, hashPassword)
    .then( result => {
        res.status(result.status).json(result.message);
    })
    .catch( error => {
        res.status(error.status).json(error.message);
    });
}

module.exports = registerUser;
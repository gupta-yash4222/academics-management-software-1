const bcrypt = require("bcryptjs");
const {addUser} = require("../dao/userDAO.js");

function registerUser(req, res) { // validating the username not done yet (username should be there in the list of registered iitk usernames)
    var username = req.body.username,
        rollNo = req.body.rollNo,
        name = req.body.name,
        password = req.body.password;

    var hashPassword;

    /*
    bcrypt.hash(password, 10, (err, hash) => {
        if(!err) hashPassword = hash;
        else console.log(err);
    });
    */

    hashPassword = bcrypt.hashSync(password, 10);

    addUser(username, rollNo, name, hashPassword)
    .then( result => {
        res.status(result.status).json(result.message);
    })
    .catch( error => {
        res.status(error.status).json(error.message);
    });
}

module.exports = registerUser;
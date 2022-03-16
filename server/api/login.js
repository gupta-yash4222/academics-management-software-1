const bcrypt = require("bcryptjs");
const {findUser} = require("../dao/userDAO.js");

function loginUser(req, res) {  // JWT token yet to be done
    var username = req.body.username,
        password = req.body.password;

    findUser(username)
    .then( result => {
        var user = result.elem;

        /*
        bcrypt.compare(password, user.password)
        .then( result => {
            if(result){
                res.status(200).json("User logged in successfully");
            }
            else {
                res.status(401).json("Incorrect password");
            }
        })
        */

        var isValid = bcrypt.compareSync(password, user.password);

        if(isValid){
            res.status(200).json("User logged in successfully");
        }
        else {
            res.status(401).json("Incorrect password");
        }

    })
    .catch( error => {
        if(error.message === "User not found"){
            console.log(error.message);
            res.status().json("User not registered");
        }

        else {
            console.log(error.message);
            res.status(500).json("Internal server error");
        }
    });
}

module.exports = loginUser;
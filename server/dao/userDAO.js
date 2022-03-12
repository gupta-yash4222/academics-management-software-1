const User = require('../../models/user.js');

function addUser(username, rollNo, name, hashPassword) {
    return new Promise( (resolve, reject) => {
        var user = new User({
            username: username,
            rollNo: rollNo,
            name: name,
            password: hashPassword
        });

        User.findOne({username: username}, (err, docs) => {
            
        })

        user.save( err => {
            if(err) {
                console.log(err);
                reject({
                    status: 400,
                    message: "Internal error in registering user."
                });
            }
            else {
                resolve({
                    status: 200,
                    message: "User successfully registered."
                });
            }
        });
    });
}

module.exports = addUser;
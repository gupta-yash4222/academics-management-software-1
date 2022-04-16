const mongoose = require('mongoose');

class DBConnection {
    static dial() {
        if ( this.db )
            return Promise.resolve(this.db);
        
<<<<<<< HEAD
        mongoose.connect("mongodb+srv://sachinthakan001:1029384756@cluster0.ovwhl.mongodb.net/Academics?retryWrites=true&w=majority");
=======
        //mongoose.connect(process.env.ACADEMICS_DB_URI);
        mongoose.connect(process.env.TEST_DB_URI);
>>>>>>> 0bf1d0d725f82cbc2008f18c44f079ffb13ee37d
        this.db = mongoose.connection;
        
        this.db.on('error', console.error.bind(console, '[ERROR] [MongoDB]'));
    }
}

DBConnection.db = null

module.exports = DBConnection;

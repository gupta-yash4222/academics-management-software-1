const mongoose = require('mongoose');

class DBConnection {
    static dial() {
        if ( this.db )
            return Promise.resolve(this.db);

        mongoose.connect("mongodb+srv://sachinthakan001:1029384756@cluster0.ovwhl.mongodb.net/Academics?retryWrites=true&w=majority");
        mongoose.connect(process.env.TEST_DB_URI);
        this.db = mongoose.connection;
        
        this.db.on('error', console.error.bind(console, '[ERROR] [MongoDB]'));
    }
}

DBConnection.db = null

module.exports = DBConnection;

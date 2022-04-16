const mongoose = require('mongoose');

class DBConnection {
    static dial() {
        if ( this.db )
            return Promise.resolve(this.db);
        
        mongoose.connect(process.env.ACADEMICS_DB_URI);
        // mongoose.connect(process.env.TEST_DB_URI);
        this.db = mongoose.connection;
        
        this.db.on('error', console.error.bind(console, '[ERROR] [MongoDB]'));
    }
}

DBConnection.db = null

module.exports = DBConnection;

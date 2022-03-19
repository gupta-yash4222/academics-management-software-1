const mongoose = require('mongoose');

//debug statement
typeof(mongoose);
console.log(mongoose.connections);

class DBConnection {
    static dial() {
        if ( this.db )
            return Promise.resolve(this.db);
        
        mongoose.connect(process.env.ACADEMICS_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = mongoose.connection;
        
        this.db.on('error', console.error.bind(console, '[ERROR] [MongoDB]'));
    }
}

DBConnection.db = null

module.exports = DBConnection;

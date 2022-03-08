const { MongoClient } = require('mongodb');
require('dotenv').config();

var client;
async function main() {
    const uri = process.env.TEST_DB_URI;
    client = new MongoClient(uri);
    try {
        await client.connect();

        await listAllData();
    }
    catch (e) {
        console.error(e);
    }
    finally{
        await client.close();
    }
}

async function listAllData() {

    const data = await client.db("user_data").collection("user_notes").find({}).forEach(item => console.log(` - ${item.name}`));
 
}

//call the main function
main().catch(console.error);
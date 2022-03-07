const { MongoClient } = require('mongodb');

var client;
async function main() {
    const uri = `mongodb+srv://sachinthakan001:1029384756@cluster0.ovwhl.mongodb.net/user_data?retryWrites=true&w=majority`;
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
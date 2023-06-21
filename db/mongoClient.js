const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:5000'; 
const dbName = 'ippo'; 

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function saveMinDifferenceToMongoDB(minDiff) {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('results'); 

    const result = await collection.insertOne({ minDifference: minDiff });
    console.log('Result saved to MongoDB:', result.insertedId);

    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error saving result to MongoDB:', error);
  }
}

const minDiff = 2; 
saveMinDifferenceToMongoDB(minDiff);

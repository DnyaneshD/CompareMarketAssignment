const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://dd:dd1234@ds020168.mlab.com:20168/wordcount";
let client = null;
let collectionName = null;

exports.find = async (skip, limit) => {
  try {
    client = await MongoClient.connect(url);

    const db = client.db();
    const collection = db.collection(collectionName);
    // Find some documents
    const docs = await collection
      .find({})
      .skip(Number(skip))
      .limit(limit)
      .toArray();

    return docs;
  } finally {
    if (client) {
      client.close();
    }
  }
};

exports.setCollectionName = newCollectionName => {
  collectionName = newCollectionName;
};

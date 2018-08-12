const MongoClient = require("mongodb").MongoClient;

const mongoDBurl = "mongodb://dd:dd1234@ds020168.mlab.com:20168/wordcount";

exports.connectMongoDB = async () => {
  const client = await MongoClient.connect(mongoDBurl);
  return client;
};

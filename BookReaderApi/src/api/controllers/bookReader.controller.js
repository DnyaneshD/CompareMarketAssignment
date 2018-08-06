const redis = require("redis");
const User = require("../models/user.model");
const { handler: errorHandler } = require("../middlewares/error");
const bookReaderService = require("../services/bookReader");
const reader = require("../../producers/bookReader");
var redisClient = redis.createClient();
var async = require("async");

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://dd:dd1234@ds020168.mlab.com:20168/wordcount";

/**
 * Get word list from book
 * @public
 */
exports.processWordsList = async (req, res, next) => {
  try {
    if (!req.body) {
      res.json({ message: "Request object cannot be empty" });
    }

    if (!req.body.url) {
      //TODO: throw invalid input
      res.json({ message: "Request object cannot be empty" });
    }

    //const response = await bookReaderService.readFileFromUrl(req.body.url);
    reader.KafkaService.sendRecord(req.body.url);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.getWordsList = (req, res, next) => {
  MongoClient.connect(
    url,
    function(err, client) {
      // Get the documents collection
      const db = client.db();
      const collection = db.collection("wordsdetails");
      // Find some documents
      collection
        .find({})
        .skip(Number(req.query.skip))
        .limit(100)
        .toArray(function(err, docs) {
          res.json(docs);
        });
    }
  );
};
// redisClient.keys("*", async (err, keys) => {
//   if (err) return console.log(err);
//   if (keys) {
//     async.map(
//       keys,
//       (key, cb) => {
//         redisClient.get(key, function(error, value) {
//           if (error) return cb(error);
//           let item = {};
//           item["name"] = key;
//           item["count"] = value;
//           cb(null, item);
//         });
//       },
//       function(error, results) {
//         if (error) return console.log(error);
//         console.log(results);
//         res.json(results);
//       }
//     );
//   }
// });

var async = require("async");
const producer = require("../producers/wordCountFinished");
const mongoDBService = require("../services/mongoDBService");
const redisService = require("../services/redisService");

const redisClient = redisService.connectRedis();

exports.wordCounter = async data => {
  var parts = data.split("\n");

  const result = await parts.map(part => {
    part.split(" ").map(word => {
      const ele = word.replace(/[^A-Z0-9]/gi, "");
      redisClient.get(ele, function(error, result) {
        if (error) {
          throw error;
        }

        if (!result) {
          redisClient.set(ele, "1");
        } else {
          redisClient.incr(ele);
        }
      });
    });
  });
  return result;
};

exports.checkCountIfPrime = () => {
  redisClient.keys("*", (err, keys) => {
    if (err) return console.log(err);
    if (keys) {
      async.map(
        keys,
        (key, cb) => {
          redisClient.get(key, function(error, value) {
            if (error) return cb(error);
            let item = {};
            item["name"] = key;
            item["count"] = value;
            item["isPrime"] = isPrime(Number(value));

            return cb(null, item);
          });
        },
        async function(error, results) {
          if (error) return console.log(error);

          const client = await mongoDBService.connectMongoDB();

          const db = client.db();
          const collectionName = "wordsdetails_" + new Date().getTime();
          const collection = db.collection(collectionName);

          collection.insertMany(results, function(err, result) {
            console.log("Inserted documents into the collection");
          });

          redisClient.flushall();
          client.close();
          producer.notifyWhenFinished(collectionName);
        }
      );
    }
  });
};

function isPrime(num) {
  for (var i = 2; i < num; i++) if (num % i === 0) return false;
  return num !== 1;
}

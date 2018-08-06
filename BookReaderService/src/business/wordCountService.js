var redis = require("redis");
var async = require("async");
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://dd:dd1234@ds020168.mlab.com:20168/wordcount";

var redisCleint = redis.createClient();

redisCleint.on("connect", function() {
  console.log("Redis client connected");
});

redisCleint.on("error", function(err) {
  console.log("Something went wrong " + err);
});

let accumulated = "";
exports.wordCounter = async data => {
  var parts = (accumulated + data).split("\n");
  accumulated = parts.pop();

  const result = await parts.map(part => {
    part.split(" ").map(word => {
      const ele = word.replace(/[^A-Z0-9]/gi, "");
      redisCleint.get(ele, function(error, result) {
        if (error) {
          throw error;
        }

        if (!result) {
          redisCleint.set(ele, "1");
        } else {
          redisCleint.incr(ele);
        }
      });
    });
  });
  return result;
};

exports.checkCountIfPrime = () => {
  redisCleint.keys("*", (err, keys) => {
    if (err) return console.log(err);
    if (keys) {
      async.map(
        keys,
        (key, cb) => {
          redisCleint.get(key, function(error, value) {
            if (error) return cb(error);
            let item = {};
            item["name"] = key;
            item["count"] = value;
            item["isPrime"] = isPrime(Number(value));

            return cb(null, item);
          });
        },
        function(error, results) {
          if (error) return console.log(error);

          //const dbName = "myproject";

          // Use connect method to connect to the server
          MongoClient.connect(
            url,
            function(err, client) {
              const db = client.db();
              const collection = db.collection("wordsdetails");

              collection.insertMany(results, function(err, result) {
                console.log("Inserted documents into the collection");
                //callback(result);
              });
              client.close();
            }
          );
        }
      );
    }
  });
};

function isPrime(num) {
  for (var i = 2; i < num; i++) if (num % i === 0) return false;
  return num !== 1;
}

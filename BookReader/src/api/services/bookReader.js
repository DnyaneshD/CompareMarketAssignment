const fs = require("fs");
const request = require("request");
var events = require("events");
var eventEmitter = new events.EventEmitter();
var redis = require("redis");
var async = require("async");
var client = redis.createClient();

/**
 * Read stream from give Url
 * @public
 */
exports.readFileFromUrl = async url => {
  try {
    if (!url) {
      throw new Error("Invalid argument");
    }
    const writeStream = fs.createWriteStream("./src/temp/test.txt");

    request(url).pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("HELLO I am DONE here");
      client.flushall();
      eventEmitter.emit("scream");
    });

    return "We are wrorking on it";
  } catch (error) {
    throw error;
  }
};

let accumulated = "";

// TODO: Move to seprate file
//Create an event handler to Read File:
let myEventHandler = function() {
  const readStream = fs.createReadStream("./src/temp/test.txt", {
    encoding: "utf8"
  });
  readStream.on("data", data => {
    client.on("connect", function() {
      console.log("Redis client connected");
    });

    client.on("error", function(err) {
      console.log("Something went wrong " + err);
    });

    var parts = (accumulated + data).split("\n");
    accumulated = parts.pop();

    parts.map(part => {
      part.split(" ").map(word => {
        const ele = word.replace(/[^A-Z0-9]/gi, "");
        client.get(ele, function(error, result) {
          if (error) {
            throw error;
          }

          if (!result) {
            client.set(ele, "1");
          } else {
            client.incr(ele);
          }
        });
      });
    });
  });

  readStream.on("end", () => {
    client.keys("*", (err, keys) => {
      if (err) return console.log(err);
      if (keys) {
        async.map(
          keys,
          (key, cb) => {
            client.get(key, function(error, value) {
              if (error) return cb(error);
              let item = {};
              item["name"] = key;
              item["count"] = value;
              console.log(JSON.stringify(item));
            });
          },
          function(error, results) {
            if (error) return console.log(error);
            console.log(results);
            res.json({ data: results });
          }
        );
      }
    });
  });
};

//Assign the event handler to an event:
eventEmitter.on("scream", myEventHandler);

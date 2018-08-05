// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign
const { port, env } = require("./config/vars");
const app = require("./config/express");
const reader = require("../src/producers/bookReader");
var redis = require("redis");
var async = require("async");
var redisClient = redis.createClient();

reader.registerProducer();

// listen to requests
var server = app.listen(port, () =>
  console.info(`server started on port ${port} (${env})`)
);
var io = require("socket.io").listen(server);

io.on("connection", function(socket) {
  socket.on("join", function(data) {
    //socket.emit("timer", { hello: "world" });
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
              console.log(JSON.stringify(item));
              socket.emit("timer", { item });
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
  socket.on("message", function(data) {
    socket.emit("news", { hello: "world" });
  });
});

/**
 * Exports express
 * @public
 */
module.exports = app;

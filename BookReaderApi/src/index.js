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
    socket.emit("requestProcessed", { sucess: true });
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

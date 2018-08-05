const reader = require("./consumers/wordCounterConsumer");
const redisClient = require("./business/wordCounter");

reader.registerConsumer();
//redisClient.registerRedisClient();

process.on("SIGINT", function() {
  consumer.close(true, function() {
    process.exit();
  });
});

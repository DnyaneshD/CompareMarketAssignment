const reader = require("../src/consumers/bookReader");
const redisClient = require("./business/wordCountService");
//const chunkProducer = require("../src/producers/bookChunkProducer");

reader.registerConsumer();
//chunkProducer.registerProducer();

process.on("SIGINT", function() {
  consumer.close(true, function() {
    process.exit();
  });
});

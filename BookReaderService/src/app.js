const consumer = require("../src/consumers/processWordCount");
const producer = require("../src/producers/wordCountFinished");

consumer.registerConsumer();
producer.registerProducer();

process.on("SIGINT", function() {
  consumer.close(true, function() {
    process.exit();
  });
});

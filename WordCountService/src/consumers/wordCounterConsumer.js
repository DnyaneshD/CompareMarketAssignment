var kafka = require("kafka-node");
var wordCounter = require("../business/wordCounter");

exports.registerConsumer = () => {
  var options = {
    host: "localhost:2181",
    kafkaHost: "localhost:9092",
    zk: undefined,
    batch: undefined,
    ssl: true,
    groupId: "webeventsDev",
    sessionTimeout: 15000,
    protocol: ["roundrobin"],
    fromOffset: "latest", // default
    commitOffsetsOnFirstJoin: true, // on the very first time this consumer group subscribes to a topic, record the offset returned in fromOffset (latest/earliest)
    outOfRangeOffset: "earliest", // default
    migrateHLC: false, // for details please see Migration section below
    migrateRolling: true
  };

  const consumer = new kafka.ConsumerGroup(options, "bookRederEvent.chunk");

  consumer.on("message", function(message) {
    if (message.value === "") return null;
    var buf = new Buffer(message.value, "binary");
    var decodedMessage = JSON.parse(buf.toString());
    wordCounter.wordCounter(decodedMessage.data);
  });

  consumer.on("error", function(err) {
    console.log("error", err);
  });

  consumer.commit(function(err, data) {
    console.log(data);
  });

  return consumer;
};

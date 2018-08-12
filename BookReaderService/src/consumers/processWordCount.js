var kafka = require("kafka-node");
var bookReaderBusinessLogic = require("../business/bookReaderFromWeb");

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
    fromOffset: "latest",
    commitOffsetsOnFirstJoin: true,
    outOfRangeOffset: "earliest",
    migrateHLC: false,
    migrateRolling: true
  };

  const consumer = new kafka.ConsumerGroup(
    options,
    "bookRederEvent.processWords"
  );

  consumer.on("message", function(message) {
    if (message.value === "") return null;

    var buf = new Buffer(message.value, "binary");
    var decodedMessage = JSON.parse(buf.toString());

    bookReaderBusinessLogic.readFileFromUrl(decodedMessage.data);
    return null;
  });

  consumer.on("error", function(err) {
    console.log("error", err);
  });

  return consumer;
};

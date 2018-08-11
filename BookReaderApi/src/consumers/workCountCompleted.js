var kafka = require("kafka-node");
const socketService = require("../api/services/socketConnection");
const db = require("../api/services/db");

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
    "bookRederEvent.wordCountCompleted"
  );

  consumer.on("message", function(event) {
    db.setCollectionName(JSON.parse(event.value).collectionName);
    socketService.notifyClient();
  });

  consumer.on("error", function(err) {
    console.log("error", err);
  });

  return consumer;
};

var kafka = require("kafka-node");
var bookReaderBusinessLogic = require("../business/bookReaderFromWeb");

exports.registerConsumer = () => {
  const client = new kafka.Client("localhost:2181");

  // var offset = new kafka.Offset(client);
  // offset.fetch(
  //   [{ topic: "t", partition: 0, time: Date.now(), maxNum: 1 }],
  //   function(err, data) {
  //     console.log("Print offset", data);
  //   }
  // );

  const topics = [
    {
      topic: "webevents.dev",
      partition: 0,
      autoCommit: true
    }
  ];
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

  const consumer = new kafka.ConsumerGroup(options, "webevents.dev");

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

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
  const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1,
    fetchMaxBytes: 1024 * 1024,
    time: Date.now(),
    maxNum: 1,
    fromOffset: 1
  };

  const consumer = new kafka.HighLevelConsumer(client, topics, options);

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

  consumer.commit(function(err, data) {
    console.log(data);
  });

  return consumer;
};

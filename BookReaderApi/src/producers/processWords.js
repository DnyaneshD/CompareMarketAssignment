var kafka = require("kafka-node");
var uuid = require("uuid");

let producer = null;

exports.registerProducer = () => {
  const client = new kafka.Client("localhost:2181", "my-client-id", {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });

  producer = new kafka.Producer(client);
  producer.on("ready", function() {
    console.log("Kafka Producer is connected and ready.");
  });

  producer.on("error", function(error) {
    console.error(error);
  });
};

exports.publishProcessWords = (url, callback = () => {}) => {
  const event = {
    id: uuid.v4(),
    timestamp: Date.now(),
    data: url
  };

  const buffer = new Buffer.from(JSON.stringify(event));

  // Create a new payload
  const record = [
    {
      topic: "bookRederEvent.processWords",
      messages: buffer,
      attributes: 1
    }
  ];
  //Send record to Kafka and log result/error
  producer.send(record, callback);
};

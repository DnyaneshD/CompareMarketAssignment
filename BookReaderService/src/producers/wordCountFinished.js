var kafka = require("kafka-node");
var uuid = require("uuid");

let producer = null;

exports.registerProducer = function() {
  const client = new kafka.Client("localhost:2181", "my-client-id", {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });

  producer = new kafka.Producer(client);
  producer.on("ready", function() {
    console.log("Kafka Producer is connected and ready.");
  });

  // For this demo we just log producer errors to the console.
  producer.on("error", function(error) {
    console.error(error);
  });
};

exports.KafkaService = {
  notifyWhenFinished: (data, callback = () => {}) => {
    const event = {
      id: uuid.v4(),
      timestamp: Date.now(),
      collectionName: data
    };

    const buffer = new Buffer.from(JSON.stringify(event));

    // Create a new payload
    const record = [
      {
        topic: "bookRederEvent.wordCountCompleted",
        messages: buffer,
        attributes: 1 /* Use GZip compression for the payload */
      }
    ];
    //Send record to Kafka and log result/error
    producer.send(record, callback);
  }
};

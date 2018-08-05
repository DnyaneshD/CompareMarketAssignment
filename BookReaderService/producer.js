var kafka = require("kafka-node");

const client = new kafka.Client("localhost:2181", "my-client-id", {
  sessionTimeout: 300,
  spinDelay: 100,
  retries: 2
});

const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function() {
  console.log("Kafka Producer is connected and ready.");
  KafkaService.sendRecord();
});

// For this demo we just log producer errors to the console.
producer.on("error", function(error) {
  console.error(error);
  KafkaService.sendRecord();
});

const KafkaService = {
  sendRecord: (test, callback = () => {}) => {
    // if (!userId) {
    //   return callback(new Error(`A userId must be provided.`));
    // }

    // const event = {
    //   id: 1,
    //   timestamp: Date.now(),
    //   userId: userId,
    //   sessionId: sessionId,
    //   type: type,
    //   data: data
    // };

    // const buffer = new Buffer.from(JSON.stringify(event));

    // Create a new payload
    const record = [
      {
        topic: "webevents.dev",
        messages: "Kela",
        attributes: 1 /* Use GZip compression for the payload */
      }
    ];
    console.log("Will produce");
    //Send record to Kafka and log result/error
    producer.send(record, callback);
  }
};

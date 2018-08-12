const { port, env } = require("./config/vars");
const app = require("./config/express");
const socketConnectionService = require("./api/services/socketConnection");
const producer = require("./producers/processWords");
const consumer = require("./consumers/workCountCompleted");

producer.registerProducer();
consumer.registerConsumer();

// listen to requests
var server = app.listen(port, () =>
  console.info(`server started on port ${port} (${env})`)
);

//Connect socket for pushing message to client
socketConnectionService.registerSocketService(server);

/**
 * Exports express
 * @public
 */
module.exports = app;

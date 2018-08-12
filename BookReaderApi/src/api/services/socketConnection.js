var socketObject = null;

exports.registerSocketService = server => {
  var io = require("socket.io").listen(server);
  io.on("connection", function(socket) {
    socketObject = socket;
    socket.on("join", function() {
      socketObject = socket;
    });
    socket.on("message", function() {
      socket.emit("news", { hello: "world" });
    });
  });
};

exports.notifyClient = () => {
  socketObject.emit("requestProcessed", { sucess: true });
};

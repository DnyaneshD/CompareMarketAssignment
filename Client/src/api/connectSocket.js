import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");
function subscribeToTimer(cb) {
  socket.on("timer", timestamp => {
    console.log(timestamp);
  });
  socket.emit("join", 1000);
}
export { subscribeToTimer };

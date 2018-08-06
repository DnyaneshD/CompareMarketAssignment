const fs = require("fs");
const chunkProducer = require("../producers/bookChunkProducer");
const wordCountService = require("../business/wordCountService");

let countInProgress = false;
let readStreamInProgress = false;

exports.readBookFromLocal = () => {
  const readStream = fs.createReadStream("./src/temp/test.txt", {
    encoding: "utf8"
  });
  readStream.on("data", data => {
    countInProgress = true;
    readStreamInProgress = true;
    wordCountService.wordCounter(data).then(result => {
      countInProgress = false;
      callCheckifPrime();
    });
  });
  readStream.on("end", (err, status) => {
    readStreamInProgress = false;
    callCheckifPrime();
  });
};

function callCheckifPrime() {
  if (!readStreamInProgress && !countInProgress) {
    wordCountService.checkCountIfPrime();
  }
}

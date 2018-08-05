const fs = require("fs");
const chunkProducer = require("../producers/bookChunkProducer");
const wordCountService = require("../business/wordCountService");

exports.readBookFromLocal = () => {
  let countInProgress = false;
  let readStreamInProgress = false;
  const readStream = fs.createReadStream("./src/temp/test.txt", {
    encoding: "utf8"
  });
  readStream.on("data", data => {
    countInProgress = true;
    readStreamInProgress = true;
    wordCountService.wordCounter(data, () => {
      countInProgress = false;
    });
  });
  readStream.on("end", (err, status) => {
    readStreamInProgress = false;
  });
};

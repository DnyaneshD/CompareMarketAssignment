const fs = require("fs");
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
    wordCountService.wordCounter(data).then(() => {
      countInProgress = false;
      callToCheckifPrime();
    });
  });
  readStream.on("end", (err, status) => {
    readStreamInProgress = false;
    callToCheckifPrime();
  });
};

function callToCheckifPrime() {
  if (!readStreamInProgress && !countInProgress) {
    wordCountService.checkCountIfPrime();
    readStreamInProgress = !readStreamInProgress;
    countInProgress = !countInProgress;
  }
}

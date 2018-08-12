const fs = require("fs");
const request = require("request");
const readBookFromLocal = require("./bookReaderFromLocal");

/**
 * Read stream from given Url
 * @public
 */
exports.readFileFromUrl = async url => {
  try {
    if (!url) {
      throw new Error("Invalid argument");
    }
    const writeStream = fs.createWriteStream("./src/temp/test.txt");

    request(url).pipe(writeStream);

    writeStream.on("finish", () => {
      readBookFromLocal.readBookFromLocal();
    });
  } catch (error) {
    throw error;
  }
};

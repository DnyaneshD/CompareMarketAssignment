//const httpStatus = require("http-status");
const User = require("../models/user.model");
const { handler: errorHandler } = require("../middlewares/error");
const bookReaderService = require("../services/bookReader");
const reader = require("../../producers/bookReader");

/**
 * Get word list from book
 * @public
 */
exports.getWordsList = async (req, res, next) => {
  try {
    if (!req.body) {
      res.json({ message: "Request object cannot be empty" });
    }

    if (!req.body.url) {
      //TODO: throw invalid input
      res.json({ message: "Request object cannot be empty" });
    }

    //const response = await bookReaderService.readFileFromUrl(req.body.url);
    reader.KafkaService.sendRecord(req.body.url);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

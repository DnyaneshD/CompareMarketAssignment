const processWords = require("../../producers/processWords");
const db = require("../services/db");
/**
 * Get word list from book
 * @public
 */
exports.processWordsList = (req, res, next) => {
  try {
    if (!req.body) {
      res.json({ message: "Request object cannot be empty" });
    }

    if (!req.body.url) {
      //TODO: throw invalid input
      res.json({ message: "Url in request object cannot be empty" });
    }

    processWords.publishProcessWords(req.body.url);

    res.json({ message: "We are working on request. Hold on." });
  } catch (error) {
    next(error);
  }
};

exports.getWordsList = async (req, res, next) => {
  let skip = null;
  if (!req.query || !req.query.skip) {
    skip = 50;
  } else {
    skip = req.query.skip;
  }

  db.find(Number(skip), 100).then(docs => {
    res.json(docs);
  });
};

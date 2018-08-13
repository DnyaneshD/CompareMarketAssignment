const processWords = require("../../producers/processWords");
const db = require("../services/db");
const validation = require("../validations/validation");
/**
 * Get word list from book
 * @public
 */
exports.processWordsList = (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400);
      res.json({ message: "Request object cannot be empty" });
    }

    if (!req.body.url) {
      res.status(400);
      res.json({ message: "Url in request object cannot be empty" });
    }

    if (!validation.ValidURL(req.body.url)) {
      res.status(400);
      res.json({ message: "Url format in is not valid" });
    }

    processWords.publishProcessWords(req.body.url);

    res.status(202);
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

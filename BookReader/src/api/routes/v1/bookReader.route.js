const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/bookReader.controller");
const { listWords } = require("../../validations/user.validation");

const router = express.Router();

router
  .route("/")
  /**
   * @api {get} v1/bookReader List words
   * @apiDescription Get a list of words from given URL
   * @apiVersion 1.0.0
   * @apiName ListWords
   * @apiGroup BookReader
   * @apiPermission any
   *
   * @apiHeader {String} Athorization  User's access token // TODO
   *
   * @apiParam  {String}             [url]       Book's URL to fectch words
   *
   * @apiSuccess {Object[]} words List from book.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  //.get(authorize(ADMIN), validate(listUsers), controller.list);
  .post(controller.getWordsList);

module.exports = router;

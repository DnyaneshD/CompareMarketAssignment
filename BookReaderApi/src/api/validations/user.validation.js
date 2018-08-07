const Joi = require("joi");
const User = require("../models/user.model");

module.exports = {
  // GET /v1/users
  listUsers: {
    query: {
      url: Joi.string()
    }
  }
};
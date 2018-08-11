const Joi = require("joi");

module.exports = {
  // GET /v1/users
  listUsers: {
    query: {
      url: Joi.string()
    }
  }
};

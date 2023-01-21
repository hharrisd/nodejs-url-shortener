const Joi = require("joi");

const LinkValidations = {
  createOrUpdateLink: {
    body: Joi.object({
      urlId: Joi.string().min(4).required(),
      // origUrl: Joi.string().required(),
    }),
  },
};

module.exports = LinkValidations;

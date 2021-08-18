const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    dateOfBirth: Joi.string().required()
});

const validate = (data) => {
    const result = schema.validate(data);
    data.createAt = new Date();
    data.updateAt = new Date();
    result.value = data;
    return result;
}

module.exports = validate;
const Joi = require('joi')

const validateBody = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['body']) req.value.body = {}

            req.value.body = validatorResult.value
            next()
        }
    }
}
const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({param: req.params[name]})
        if (validatorResult.error) {
            res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}
            req.value.params[name] = req.params[name]
            next()
        }
    }
}

const schemas = {
    idSchema: Joi.object({
        param: Joi.string().required().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    }),
    userSchema: Joi.object({
        firstName: Joi.string().required().min(2),
        lastName: Joi.string().required().min(2),
        email: Joi.string().required().email()
    }),
    deckOptionalSchema: Joi.object({
        name: Joi.string().min(6),
        description: Joi.string().min(10),
        owner: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    }),
    newDeckSchema: Joi.object({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(10).required(),
        owner: Joi.string().required().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    })
}

module.exports = {
    validateBody,
    validateParam,
    schemas
}
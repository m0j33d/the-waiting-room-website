const { body, validationResult } = require('express-validator')


function validateComment() {
    return [
        body('comment')
            .notEmpty()
            .isString(),
        body('article_id')
            .notEmpty()
            .isNumeric(),
    ]
}




function validate(req, res, next) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    validateComment,
    validate
}
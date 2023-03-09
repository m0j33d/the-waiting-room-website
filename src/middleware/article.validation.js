const { body, validationResult } = require('express-validator')


function validateArticle() {
    return [
        body('title')
            .notEmpty()
            .isString(),
        body('summary')
            .notEmpty()
            .isString(),
        body('article_body') 
            .notEmpty()
            .isString()
    ]
}

function validateEditArticle() {
    return [
        body('title')
            .optional()
            .isString(),
        body('summary')
            .optional()
            .isString(),
        body('article_body') 
            .optional()
            .isString()
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
    validateArticle,
    validateEditArticle,
    validate
}
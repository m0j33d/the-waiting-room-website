import { body, validationResult } from 'express-validator'


const validateArticle = () => {
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

const validateEditArticle = () => {
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




const validate = (req, res, next) => {
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

export {
    validateArticle,
    validateEditArticle,
    validate
}
import { body, validationResult } from 'express-validator'
import {db} from "../model/index.js"

const UserModel = db.users


const validateSignUp = () => {
    return [
        body('first_name')
            .notEmpty()
            .isString()
            .withMessage('First name must be a String'),
        body('last_name')
            .notEmpty()
            .isString()
            .withMessage('Last name must be a String'),
        body('email') 
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
              return UserModel.findOne({where : { email: value }}).then(userDoc => {
                if (userDoc) {
                  return Promise.reject(
                    'User exists already!'
                  );
                }
              });
            })            
            .normalizeEmail(),
        body('password')
            .isLength({ min: 8 })
            .isAlphanumeric()
            .trim(),
        
    ]
}

const validateLogin = () => {
    return [
        body('email') 
            .isEmail()
            .withMessage('Please enter a valid email.')     
            .normalizeEmail(),
        body('password')
            .isLength({ min: 8 })
            .isAlphanumeric()
            .trim(),
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
    validateSignUp,
    validateLogin,
    validate
}
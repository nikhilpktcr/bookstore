
import { check }  from "express-validator"

export const signUpValidation = [
    check('userName')
        .notEmpty()
        .withMessage('username is required'),
    check('email')
        .isEmail()
        .withMessage('Please include a valid email')
        .normalizeEmail({ gmail_remove_dots: true }),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 or more characters')
]


export const logInValidation = [
    check('email')
      .isEmail()
      .withMessage('Please include a valid email')
      .normalizeEmail({ gmail_remove_dots: true }),
    check('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be 6 or more characters')
]



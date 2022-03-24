import { body } from "express-validator"

export const signUpRequestValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 character")
]

import { body } from "express-validator"

export const signinRouteValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password required")
]

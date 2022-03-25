import express, { Request, Response } from "express"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { RequestValidationError } from "@errors/request-validation-error"
import { User } from "@models/user"
import { BadRequestError } from "@errors/bad-request-error"
import { signUpRequestValidator } from "@request-validators/signup-route-validator"

const router = express.Router()

router.post("/api/users/signup", signUpRequestValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new BadRequestError("Email in use")
  }

  const user = User.build({ email, password })
  await user.save()

  req.session = {
    jwt: jwt.sign(user.toJSON(), process.env.JWT_KEY!)
  }

  res.status(201).send(user)
})

export { router as signupRouter }

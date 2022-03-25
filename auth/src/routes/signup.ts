import express, { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "@models/user"
import { BadRequestError } from "@errors/bad-request-error"
import { signUpRequestValidator } from "@request-validators/signup-route-validator"
import { validateRequest } from "@middlewares/validate-request"

const router = express.Router()

router.post("/api/users/signup", [...signUpRequestValidator, validateRequest], async (req: Request, res: Response) => {
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

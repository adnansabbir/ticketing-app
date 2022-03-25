import express, { Request, Response } from "express"
import { signinRouteValidator } from "@request-validators/signin-route-validator"
import { User } from "@models/user"
import { BadRequestError } from "@errors/bad-request-error"
import { validateRequest } from "@middlewares/validate-request"
import { Password } from "@services/password"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/api/users/signin", [...signinRouteValidator, validateRequest], async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    throw new BadRequestError("Invalid credentials")
  }

  const passwordMatched = await Password.compare(existingUser.password, password)

  if (!passwordMatched) {
    throw new BadRequestError("Invalid credentials")
  }

  req.session = {
    jwt: jwt.sign(existingUser.toJSON(), process.env.JWT_KEY!)
  }

  res.status(200).send(existingUser)
})

export { router as signinRouter }

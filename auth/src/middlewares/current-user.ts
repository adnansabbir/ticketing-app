import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface UserPayload{
    id: string,
    email: string
}

declare global {
    // eslint-disable-next-line no-unused-vars
    namespace Express {
        // eslint-disable-next-line no-unused-vars
        interface Request{
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.session?.jwt) {
    return next()
  }

  try {
    req.currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
  } catch (e) {
  }

  next()
}

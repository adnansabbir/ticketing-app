import express, { json } from "express"
import mongoose from "mongoose"
import "express-async-errors"

import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"

import { errorHandler } from "@middlewares/error-handler"
import { NotFoundError } from "@errors/not-found-error"
import cookieSession from "cookie-session"

const app = express()

// ------------------------------------------------> Config middlewares
app.use(json())
app.set("trust proxy", true)
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}))

// ------------------------------------------------> Routes
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all("*", async () => {
  throw new NotFoundError()
})

// ------------------------------------------------> Error handler middleware
app.use(errorHandler)

// ------------------------------------------------> Initializer
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be added to env")
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
    console.log("DB connection success")
    app.listen(3000, () => {
      console.log("Listening to port 3000!!")
    })
  } catch (e) {
    console.log(e)
  }
}

start()

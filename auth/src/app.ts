import express, { json } from "express"
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

export { app }

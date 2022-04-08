import mongoose from "mongoose"
import { app } from "./app"

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

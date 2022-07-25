import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"

const app = express()
dotenv.config()

app.use(bodyParser.json({ limits: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limits: "30mb", extended: true }))
app.use(cors({ origin: "http://localhost:3000" }))

app.use("/posts", postRoutes) // prefix 'posts'
app.use("/user", userRoutes)
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch(error => console.log(error.message))

// mongoose.set('useFindAndModify', false)

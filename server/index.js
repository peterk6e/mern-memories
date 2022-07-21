import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from './routes/posts.js'

const app = express();


app.use(bodyParser.json({ limits: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limits: "30mb", extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/posts', postRoutes); // prefix 'posts'
// const pwd = process.env.MONGODB_PASSWORD;
// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL = `mongodb+srv://peterk6e:peterk6e123@cluster0.tj9a1.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

  // mongoose.set('useFindAndModify', false)

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {sendtodb} from "./routes/sendDataroute.js"

import {connectDB} from './confige/db.js'

mongoose.set("strictQuery", false);
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.post("/senddata", sendtodb);


app.listen(5000, () => {
  console.log("Server started at port 5000");
});
// "start": "concurrently \"cd ../frontend && npm start\" \"npm run server\"",
// "server": "nodemon server.js",
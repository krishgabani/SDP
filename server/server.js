import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ExcelDataModel from "./models/exceldata.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.set("strictQuery", false);
const connectOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect("mongodb://localhost:27017/Project", connectOption, () => {
  console.log("DB connected");
});

app.post("/senddata", (req, res) => {
  let arr = req.body;
  arr.forEach((obj) => {
    ExcelDataModel.create({
      Title: obj.Title,
      AuthorName: obj.AuthorName,
      Department: obj.Department,
      University: obj.University,
      City: obj.City,
      State: obj.State,
      Country: obj.Country,
      Pincode: obj.Pincode,
      Description: obj.Description,
    });
  });
  res.send("Received.");
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
// "start": "concurrently \"cd ../frontend && npm start\" \"npm run server\"",
// "server": "nodemon server.js",
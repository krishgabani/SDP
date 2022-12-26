import mongoose from "mongoose";

const ExcelDataSchema = new mongoose.Schema({
  Title: String,
  AuthorName: String,
  Department: String,
  University: String,
  City: String,
  State: String,
  Country: String,
  Pincode: Number,
  Description: String,
});

const ExcelDataModel = new mongoose.model("ExcelData", ExcelDataSchema);

export default ExcelDataModel;

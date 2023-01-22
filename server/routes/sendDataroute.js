import express from "express"
var router = express.Router()
import ExcelDataModel from "../models/exceldata.js";
import cors from "cors";

const sendtodb = (req, res) => {
    // console.log(req);
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
  }

  export {sendtodb}
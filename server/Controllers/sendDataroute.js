
const express = require('express')
const router = express.Router()

const ExcelDataModel = require('../models/exceldata');

const cors = require('cors')

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

  module.exports = {sendtodb}
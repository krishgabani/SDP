const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const {JournalDataModel} = require("../../models/journal.js");
const {DOIModel} = require("../../models/doi.js");

const addjournal = (req, res) => {
    let data = req.body;
    console.log(data);


    const journalData = {
      Sr_No: data?.Sr_No,
      Academic_Year: data?.Academic_Year,
      Data_Submitting_Author_department:
        data?.Data_Submitting_Author_department,
      Data_Submitting_Author_name: data?.Data_Submitting_Author_name,
      First_Author_name: data?.First_Author_name,
      First_Author_department: data?.First_Author_department,
      First_Author_organization: data?.First_Author_organization,
      Names_of_Other_Author_From_DDU: data?.Names_of_Other_Author_From_DDU,
      Names_of_Other_Author_From_other_Organization:
        data?.Names_of_Other_Author_From_other_Organization,
      Title_of_Research_Paper: data?.Title_of_Research_Paper,
      Publication_Level: data?.Publication_Level,
      Journal_title: data?.Journal_title,
      Journal_publisher: data?.Journal_publisher,
      Link: data?.Link,
      Publication_Date_DD_MM_YYYY: data?.Publication_Date_DD_MM_YYYY,
      Month_Number: data?.Month_Number,
      Year: data?.Year,
      Volume: data?.Volume,
      Number: data?.Number,
      Pages_xx_yy: data?.Pages_xx_yy,
      DOI: data?.DOI,
      ISSN_Print: data?.ISSN_Print,
      ISSN_Online: data?.ISSN_Online,
      Impact_Factor_Value: data?.Impact_Factor_Value,
      Impact_Factor_Year: data?.Impact_Factor_Year,
      Impact_Factor_Agency: data?.Impact_Factor_Agency,
    };

    // console.log("data[DOI]");
    // console.log(data["DOI"]);

    data?.DOI && DOIModel.create({doi : data?.DOI , documentType : "journal"});

    JournalDataModel.create(journalData, (err, data) => {
      if (err) {
        console.log(err);
        console.log("Failed");
      } else {
        console.log("Saved Successful");
        // console.log(data);
      }
    });

  res.send("Data is Received");
};

module.exports = { addjournal };

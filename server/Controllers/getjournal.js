const express = require("express");
const JournalDataModel = require("../models/journal");

exports.getjournal = async (req, res) => {
  let jou = [];
  console.log(req.body);
  if (
    req.body.Designation === "coordinator" ||
    req.body.Designation === "hod"
  ) {
    jou = await JournalDataModel.find({
      Data_Submitting_Author_department: req.body.Department,
    });
  } else if (req.body.Designation === "faculty") {
    let asFirstAuthor = await JournalDataModel.find({
      First_Author_name: "Harshadkumar B. Prajapati",
    });

    let asOtherAuthor = await JournalDataModel.find({
      Names_of_Other_Author_From_DDU: new RegExp(
        ".*" + "Harshadkumar B. Prajapati" + ".*"
      ),
    });

    jou = [].concat(asFirstAuthor, asOtherAuthor);
  }

  res.send({
    message: "user is valid",
    data: jou,
  });
};

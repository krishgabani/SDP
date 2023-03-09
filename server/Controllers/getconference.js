const express = require("express");
const {ConferenceDataModel} = require("../models/conference");

exports.getconference = async (req, res) => {
  let con = [];
  console.log(req.body);
  if (
    req.body.Designation === "coordinator" ||
    req.body.Designation === "hod"
  ) {
    con = await ConferenceDataModel.find({
      Data_Submitting_Author_department: req.body.Department,
      Publication_Type: req.body.currentPage
    });
  } else if (req.body.Designation === "faculty") {
    let asFirstAuthor = await ConferenceDataModel.find({
      Data_Submitting_Author_department: req.body.Department,
      First_Author_name: req.body.name,
      Publication_Type: req.body.currentPage
    });

    let asOtherAuthor = await ConferenceDataModel.find({
      Data_Submitting_Author_department: req.body.Department,
      Publication_Type: req.body.currentPage,
      Names_of_Other_Author_From_DDU: new RegExp(
        ".*" + req.body.name + ".*",
        ),
    });

    con = [].concat(asFirstAuthor, asOtherAuthor);
  }

  res.send({
    message: "user is valid",
    data: con,
  });
};

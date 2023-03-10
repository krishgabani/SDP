const express = require("express");
const { ConferenceDataModel } = require("../../models/conference");

exports.editconference = async (req, res) => {
  console.log("edit");
  console.log(req.body);

  const resm = await ConferenceDataModel.updateMany(
    { Sr_No: req.body.Sr_No },
    req.body
  );

  return res.status(200).send({
    message: "Edited Data Succefully",
  });
};

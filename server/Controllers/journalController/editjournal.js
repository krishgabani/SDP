const express = require("express");
const {JournalDataModel} = require("../../models/journal");

exports.editjournal = async (req, res) => {
    console.log("edit");
    console.log(req.body);

    const resm = await JournalDataModel.updateMany({ Sr_No: req.body.Sr_No }, req.body);
    // const tem = await JournalDataModel.findOne({Sr_No:req.body.Sr_No});
    // console.log(tem);
    return res.status(200).send({
        message: "Edited Data Succefully",
    })
}

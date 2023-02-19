const express = require("express");
const JournalDataModel = require("../models/journal");

exports.editjournal = async (req,res) => {
    console.log("edit");
    console.log(req.body);

    return res.send({
        message: "Edited Data Succefully",
    })
}

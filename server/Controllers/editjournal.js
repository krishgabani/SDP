const express = require("express");
const JournalDataModel = require("../models/journal");

exports.editjournal = async (req,res) => {
    console.log("edit");


    return res.send({
        message: "Edited Data Succefully",
    })
}

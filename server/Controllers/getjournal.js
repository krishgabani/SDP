const express = require('express');
const JournalDataModel = require('../models/journal')

exports.getjournal = async (req,res) => {
    console.log(req.body);
    console.log("hii");

    let jou= await JournalDataModel.find({Data_Submitting_Author_department : req.body.Department});
    console.log(jou);
    res.send({
        message: "user is valid",
        data:jou
    })
}
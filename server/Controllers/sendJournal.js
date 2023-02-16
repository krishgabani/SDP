const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const JournalDataModel = require('../models/journal.js')

const cors = require('cors');

const sendjournal = (req,res) => {
    let vect = req.body;
    // console.log(vect["Journal"][1].__EMPTY);
    // console.log(vect["Journal"][1].__EMPTY_1);

    for(let prop in vect["Journal"]) {
        console.log(prop);
        
        JournalDataModel.create({

        });        
    }
    
    res.send("Data is Received");
}

module.exports =  {sendjournal}
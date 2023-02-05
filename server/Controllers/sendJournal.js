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
            Sr_No : vect["Journal"][prop]["Sr.No."] ,
            Academic_Year:vect["Journal"][prop]["Academic Year"],
            Department: vect["Journal"][prop]["Department"],
            Name_1:vect["Journal"][prop]["Name"],
            Name_2:vect["Journal"][prop]["Name_1"],
            Department:vect["Journal"][prop]["Department_1"],
            Organization: vect["Journal"][prop]["Organization"],
            Name_3: vect["Journal"][prop]["Name(s)"] ,
            Name_4:vect["Journal"][prop]["Name(s)_1"],
            Title_of_Research_Paper : vect["Journal"][prop]["Title of Research Paper"],
            International_National : vect["Journal"][prop]["International / National (I/N)"],
            Title : vect["Journal"][prop]["Title"],
            Publisher:vect["Journal"][prop]["Publisher"],
            UGC_enlistment:vect["Journal"][prop]["Link to the recognition in UGC enlistment of the Journal"],
            Publication_date:vect["Journal"][prop]["Publication Date (DD-MM-YYYY)"],
            Month:vect["Journal"][prop]["Month (Number)"],
            Year:vect["Journal"][prop]["Year"],
            Volumn:vect["Journal"][prop]["Volume"],
            Number:vect["Journal"][prop]["Number"],
            Pages:vect["Journal"][prop]["Pages (xx-yy)"],
            DOI:vect["Journal"][prop]["DOI"],
            ISSN_P:vect["Journal"][prop]["ISSN (Print)"],
            ISSN_O:vect["Journal"][prop]["ISSN (Online)"],
            F_value:vect["Journal"][prop]["Impact Factor Value"],
            F_year:vect["Journal"][prop]["Impact Factor Year"],
            F_Agency:vect["Journal"][prop]["Impact Factor Agency"],
        });        
    }
    // vect.forEach((obj) => {
    //     console.log(obj);
    //     console.log(obj["Journal"][1].__EMPTY);
        // JournalDataModel.create({
        //     Sr_No : obj.Sr_No,
        //     Acadamic_Year : obj.Acadamic_Year,
        //     AuthorName : obj.AuthorName,
        //     Department : obj.Department,
        //     Organization:obj.Organization,
        //     Title:obj.Title,
        // });
    // });
    res.send("Data is Received");
}

module.exports =  {sendjournal}
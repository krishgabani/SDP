const express = require("express");
const {JournalDataModel} = require("../../models/journal");

exports.deletejournal = async (req, res) => { 
    try{
        console.log(req.body);
        const temp = JournalDataModel.deleteOne({
            "Sr_No": req.body?.Sr_No,
            "Academic_Year": req.body?.Academic_Year,
            "Data_Submitting_Author_department": req.body?.Data_Submitting_Author_department,
            "Data_Submitting_Author_name": req.body?.Data_Submitting_Author_name,
            "First_Author_name": req.body?.First_Author_name,
            "First_Author_department": req.body?.First_Author_department,
            "Month_Number": req.body?.Month_Number,
            "Year": req.body?.Year,
            "Volume": req.body?.Volume,
            "Number": req.body?.Number,
            "Pages_xx_yy": req.body?.Pages_xx_yy,
            "ISSN_Print": req.body?.ISSN_Print,
            "ISSN_Online": req.body?.ISSN_Online
        });
        temp.then((result) => {
            console.log(result);
            if (result.deletedCount === 1) {
                return res.status(200).send({
                    status:'1',
                    message:"deleted succefully"
                })
                console.log("Data has been deleted from the database.");
              } else {
                return res.status(200).send({
                    status:'0',
                    message:"Data was not found"
                })
                console.log("Data was not found in the database.");
              }
        })

    }catch(error){
        return res.status(200).send({
            message:"some error is occuring"
        })
    }
}
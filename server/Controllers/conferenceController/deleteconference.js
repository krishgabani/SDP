const express = require("express");
const {ConferenceDataModel} = require("../../models/conference");

exports.deleteconference = async (req, res) => { 
    try{
        console.log(req.body);
        // return res.status(200).send({
        //     status:'1',
        //     message:"deleted succefully"
        // })
        const temp = ConferenceDataModel.deleteOne({
            "Sr_No": req.body?.Sr_No,
            "Academic_Year": req.body?.Academic_Year,
            "First_Author_name": req.body?.First_Author_name,
            "Title_of_Research_Paper": req.body?.Title_of_Research_Paper,
            "Title_of_the_conference": req.body?.Title_of_the_conference,
            "Conference_Name": req.body?.Conference_Name,
            "Start_Date_DD_MM_YYYY": req.body?.Start_Date_DD_MM_YYYY,
            "End_Date_DD_MM_YYYY": req.body?.End_Date_DD_MM_YYYY,
            "DOI": req.body?.DOI,
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
              }
        })

    }catch(error){
        return res.status(200).send({
            status: '0',
            message:"some error is occuring"
        })
    }
}
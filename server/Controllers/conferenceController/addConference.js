const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const {DOIModel} = require("../../models/doi.js");
const {ConferenceDataModel} = require('../../models/conference.js')

const addConference = (req,res) => {
    try{
        let data = req.body;
        console.log(data);
    
        const Conferencedata = {
            Sr_No:data?.Sr_No,
            Academic_Year:data?.Academic_Year,
            Data_Submitting_Author_department:data?.Data_Submitting_Author_department,
            Data_Submitting_Author_name:data?.Data_Submitting_Author_name,
            First_Author_name:data?.First_Author_name,
            First_Author_department:data?.First_Author_department,
            First_Author_organization:data?.First_Author_organization,
            Names_of_Other_Author_From_DDU:data?.Names_of_Other_Author_From_DDU,
            Names_of_Other_Author_From_other_Organization:data?.Names_of_Other_Author_From_other_Organization,
            Publication_Type:data?.Publication_Type,
            Title_of_Research_Paper:data?.Title_of_Research_Paper,
            Publication_Level:data?.Publication_Level,
            Title_of_the_conference:data?.Title_of_the_conference,
            Start_Date_DD_MM_YYYY:data?.Start_Date_DD_MM_YYYY,
            End_Date_DD_MM_YYYY:data?.End_Date_DD_MM_YYYY,
            Conference_Name:data?.Conference_Name,
            Conference_Organizer:data?.Conference_Organizer,
            Conference_City:data?.Conference_City,
            Conference_State:data?.Conference_State,
            Conference_Country:data?.Conference_Country,
            Name_of_the_Publisher:data?.Name_of_the_Publisher,
            Publication_Date_DD_MM_YYYY:data?.Publication_Date_DD_MM_YYYY,
            Pages_xx_yy:data?.Pages_xx_yy,
            DOI:data?.DOI,
            ISBN_or_ISSN:data?.ISBN_or_ISSN,
            Affiliating_Institute_at_the_time_of_publication:data?.Affiliating_Institute_at_the_time_of_publication,
        }
    
        ConferenceDataModel.create(Conferencedata, (err, data) => {
            if (err) {
              console.log(err);
              return res.status(200).send({
                status:'0',
                message: "some error occure",
              });
              
            } else {
              return res.status(200).send({
                status:'1',
                message: "Saved Succefully",
              });
              
            }
          });
    }catch(error){
        return res.status(200).send({
            status:'0',
            message: "Some Error Occure",
          });
    }
}

module.exports = { addConference };
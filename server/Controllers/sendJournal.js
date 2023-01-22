import express from "express"
var router = express.Router();
import JournalDataModel from "../models/journal.js";
import cors from "cors"


const sendjournal = (req,res) => {
    let vect = req.body;

    vect.forEach((obj) => {
        JournalDataModel.create({
            Sr_No : obj.Sr_No,
            Acadamic_Year : obj.Acadamic_Year,
            AuthorName : obj.AuthorName,
            Department : obj.Department,
            Organization:obj.Organization,
            Title:obj.Title,
        });
    });
    res.send("Data is Received");
}

export {sendjournal}
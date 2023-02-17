const mongoose = require('mongoose');

const JournalDataShema = new mongoose.Schema({
    Sr_No : String,
    Academic_Year : String,
    Data_Submitting_Author_department : String,
    Data_Submitting_Author_name : String,
    First_Author_name : String,
    First_Author_department : String,
    First_Author_organization : String,
    Names_of_Other_Author_From_DDU : String,
    Names_of_Other_Author_From_other_Organization : String,
    Title_of_Research_Paper : String,
    Publication_Level : String,
    Journal_title : String,
    Journal_publisher : String,
    Link : String,
    Publication_Date_DD_MM_YYYY : String,
    Month_Number : String,
    Year : String,
    Volume : String,
    Number : String,
    Pages_xx_yy : String,
    DOI : String,
    ISSN_Print : String,
    ISSN_Online : String,
    Impact_Factor_Value : String,
    Impact_Factor_Year : String,
    Impact_Factor_Agency : String
})

const JournalDataModel = new mongoose.model("journalData", JournalDataShema);

module.exports = JournalDataModel ;
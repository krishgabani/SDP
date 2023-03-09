const mongoose = require('mongoose');

const JournalDataShema = new mongoose.Schema({
    Sr_No : {type : String},
    Academic_Year : {type : String},
    Data_Submitting_Author_department : {type : String},
    Data_Submitting_Author_name : {type : String},
    First_Author_name : {type : String},
    First_Author_department : {type : String},
    First_Author_organization : {type : String},
    Names_of_Other_Author_From_DDU : {type : String},
    Names_of_Other_Author_From_other_Organization : {type : String},
    Title_of_Research_Paper : {type : String},
    Publication_Level : {type : String},
    Journal_title : {type : String},
    Journal_publisher : {type : String},
    Link : {type : String},
    Publication_Date_DD_MM_YYYY : {type : String},
    Month_Number : {type : String},
    Year : {type : String},
    Volume : {type : String},
    Number : {type : String},
    Pages_xx_yy : {type : String},
    DOI : {type : String},
    ISSN_Print : {type : String},
    ISSN_Online : {type : String},
    Impact_Factor_Value : {type : String},
    Impact_Factor_Year : {type : String},
    Impact_Factor_Agency : {type : String}
})

const JournalDataModel = mongoose.model("journalData", JournalDataShema);

module.exports = {JournalDataModel} ;
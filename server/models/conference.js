const mongoose = require("mongoose");

const ConferenceDataShema = new mongoose.Schema({
  Sr_No: {type : String},
  Academic_Year: {type : String},
  Data_Submitting_Author_department: {type : String},
  Data_Submitting_Author_name: {type : String},
  First_Author_name: {type : String},
  First_Author_department: {type : String},
  First_Author_organization: {type : String},
  Names_of_Other_Author_From_DDU: {type : String},
  Names_of_Other_Author_From_other_Organization: {type : String},
  Publication_Type: {type : String},
  Title_of_Research_Paper: {type : String},
  Publication_Level: {type : String},
  Title_of_the_conference: {type : String},
  Start_Date_DD_MM_YYYY: {type : String},
  End_Date_DD_MM_YYYY: {type : String},
  Conference_Name: {type : String},
  Conference_Organizer: {type : String},
  Conference_City: {type : String},
  Conference_State: {type : String},
  Conference_Country: {type : String},
  Name_of_the_Publisher: {type : String},
  Publication_Date_DD_MM_YYYY: {type : String},
  Pages_xx_yy: {type : String},
  DOI: {type : String},
  ISBN_or_ISSN: {type : String},
  Affiliating_Institute_at_the_time_of_publication: {type : String},
});

const ConferenceDataModel = new mongoose.model(
  "ConferenceData",
  ConferenceDataShema
);

module.exports = {ConferenceDataModel};

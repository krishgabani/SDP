const mongoose = require("mongoose");

const ConferenceDataShema = new mongoose.Schema({
  Sr_No: String,
  Academic_Year: String,
  Data_Submitting_Author_department: String,
  Data_Submitting_Author_name: String,
  First_Author_name: String,
  First_Author_department: String,
  First_Author_organization: String,
  Names_of_Other_Author_From_DDU: String,
  Names_of_Other_Author_From_other_Organization: String,
  Publication_Type: String,
  Title_of_Research_Paper: String,
  Publication_Level: String,
  Title_of_the_conference: String,
  Start_Date_DD_MM_YYYY: String,
  End_Date_DD_MM_YYYY: String,
  Conference_Name: String,
  Conference_Organizer: String,
  Conference_City: String,
  Conference_State: String,
  Conference_Country: String,
  Name_of_the_Publisher: String,
  Publication_Date_DD_MM_YYYY: String,
  Pages_xx_yy: String,
  DOI: String,
  ISBN_or_ISSN: String,
  Affiliating_Institute_at_the_time_of_publication: String,
});

const ConferenceDataModel = new mongoose.model(
  "ConferenceData",
  ConferenceDataShema
);

module.exports = ConferenceDataModel;

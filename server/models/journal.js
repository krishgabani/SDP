import mongoose from "mongoose"

const JournalDataShema = new mongoose.Schema({
    Sr_No :String,
    Acadamic_Year:String,
    AuthorName:String,
    Department:String,
    Organization:String,
    Title:String,
})

const JournalDataModel = new mongoose.model("journalData", JournalDataShema);

export default JournalDataModel;
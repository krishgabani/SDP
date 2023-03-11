const mongoose = require("mongoose")

const DOISchema = new mongoose.Schema({
    doi : {type : String },
    documentType : {type : String}
})

const DOIModel = mongoose.model("doi",DOISchema);

module.exports = {DOIModel}   


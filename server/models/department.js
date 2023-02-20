const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    department : {type : String },
    year: {type: String}
})

const departmentModel = mongoose.model("department",departmentSchema);

module.exports = {departmentModel}   


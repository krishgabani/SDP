const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {type : String },
    email : {type : String},
    password : {type : String},
    Designation:{type:String},
    Department : {type:String},
    verified : {type : Boolean,default:false},
    emailsent : {type: Boolean,default:false},
    isAdmin:{type : Boolean,default:false}
})

const UserModel = mongoose.model("user",userSchema);

module.exports = {UserModel}   
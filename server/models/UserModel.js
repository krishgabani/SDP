const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name : {type : String },
    email : {type : String},
    password : {type : String},
    role : {type:String},
    verified : {type : Boolean,default:false},
})

const User = mongoose.model("user",userSchema);

module.exports = {userSchema}
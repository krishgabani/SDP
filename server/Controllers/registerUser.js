const express = require('express');
const {UserModel} = require('../models/UserModel')
const bcrypt = require("bcrypt");
exports.registerUser = async (req,res) => {
    console.log(req.body);
    console.log(req.body.email);
    
    let user = await UserModel.findOne({email : req.body.email});
    //console.log(user);
    if(user) {
        console.log("User is Already Exist");
        return res.json({
            message:'user is already exist',
            status:300,
        })
    }
    //console.log("hii ");
    console.log(user);
    user = await new UserModel({...req.body}).save();

    return res.json({
        message:'dontrt4rge',
        status:'res',
    });

}
const express = require('express');
const {UserModel} = require('../models/UserModel')
const Token = require('../models/token')
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require('../utils/sendEmail')

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
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    console.log(req.body.password);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log("after user")

    user = await new UserModel({...req.body,password: hashPassword}).save();

    const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    }).save();

    console.log(token);

    const url = `http://localhost:3000/users/${user.id}/verify/${token.token}`;
    console.log(url);

    await sendEmail(user.email, "Verify Email", url);

    //res.status(201).send({ message: "An Email sent to your account please verify" });
    return res.json({
        message:'dontrt4rge',
        status:'res',
    });

}
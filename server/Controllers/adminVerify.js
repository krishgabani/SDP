const Token = require('../models/token')
const express = require('express');
const {UserModel} = require('../models/UserModel')

exports.adminVerify = async (req,res) => {
    const user = await UserModel.findOne({_id:req.params.id});
    console.log("hello");
    if(!user) {
        return res.send({message: "Invalid ALink1"});
    }

    const token = await Token.findOne({
        userId: user._id,
        token:req.params.token,
    });

    if(!token) {
        return res.send({message : "Invalid ALink2"});
    }

    await UserModel.updateOne({_id:user._id,verified:true});

    await token.remove();

    res.send({message:"Admin Allowed Permission Succefully"}); 
}
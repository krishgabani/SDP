const express = require('express');
const {UserModel} = require('../models/UserModel')
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.loginUser = async (req,res) => {
    //console.log(req.body);
    console.log(req.body.email);

    let user = await UserModel.findOne({email : req.body.email});
    if(!user) {
        return res.status(200).send({
            message:'Invalid Email or Password',
        });        
    }
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword){
        return res.status(401).send({ message: "Invalid Email or Password" });
    }
    if (!user.verified) {
        return res.status(200).send({ message: "Email is not verified" });
    }
    return res.status(200).send({
        message:'Login succefully',
    })
}
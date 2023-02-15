const express = require('express');
const {UserModel} = require('../models/UserModel')
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.loginUser = async (req,res) => {
    //console.log(req.body);
    console.log(req.body.email);
    console.log("hii");
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
        return res.status(401).send({ message: "Invalid Email or Password",success:false });
    }
    if (!user.verified) {
        return res.status(200).send({ message: "Email is not verified",success:false });
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    return res.status(200).send({
        message:'Login succefully',
        success:true,
        token
    })
}
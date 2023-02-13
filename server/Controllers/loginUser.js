const express = require('express');
const {UserModel} = require('../models/UserModel')
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.loginUser = async (req,res) => {
    //console.log(req.body);
    console.log(req.body.email);

    let user = await UserModel.findOne({email : req.body.email});
    if(user) {
        return res.status(200).send({
            message:'Login Successfull',
        });        
    }else{
        return res.status(200).send({
            message:'Wrong Data is passed',
        }); 
    }


}
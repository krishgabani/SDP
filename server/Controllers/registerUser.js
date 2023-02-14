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
    let role = await UserModel.findOne({Department:req.body.Department,Designation:'coordinator'});
    if(user)  {
        return res.status(200).send({
            message:'Email is Already Exist',
        })
    }
    else{
        if(req.body.Designation === 'faculty' || req.body.Designation === 'hod') {
            //role = await UserModel.findOne({Department:req.body.Department,Designation:'coordinator'});
            //console.log(role.email);
            if(!role) {
                return res.status(200).send({
                    message:'coordinate is not found',
                })
            }
        }else{
            if(role) {
                return res.status(200).send({
                    message:'Departement Coordinate Already there',
                })
            }
        }
    }
    //console.log(role.email);
    // return res.status(200).send({
    //     message:'is Found',
    // })
    // //console.log(user);
    // if(user) {
    //     console.log("User is Already Exist");
    //     return res.status(200).send({
    //         message:'user is already exist',
    //     })
    // }
    
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

    const url = `http://localhost:3000/user/${user.id}/verify/${token.token}`;
    console.log(url);
    // console.log(role.email);
    await sendEmail(user.email, "Verify Email", url);

    //res.status(201).send({ message: "An Email sent to your account please verify" });
    return res.status(200).send({
        message:'Email sent Succefully',
        status:true,
    });

}
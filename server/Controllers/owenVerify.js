const Token = require('../models/token')
const express = require('express');
const {UserModel} = require('../models/UserModel')
const sendEmail = require('../utils/sendEmail')


exports.owenVerify = async (req,res) => {
    try{
        const user = await UserModel.findOne({_id:req.params.id});
        console.log("hello");
        if(!user) {
            return res.send({message: "Invalid Link1"});
        }

        const token = await Token.findOne({
            userId: user._id,
            token:req.params.token,
        });

        console.log(user.emailsent);
        if(!user.emailsent) {
            console.log("in  emailsent");
            await UserModel.updateOne({_id:user._id,emailsent:true});
        }else{
            return res.send({message:"Invalid Link 22"})
        }
        // if(!token) {
        //     return res.send({message : "Invalid Link2"});
        // }

        // await UserModel.updateOne({_id:user._id,verified:true});

        // await token.remove();

        // res.send({message:"Email Verifyed Succefully"});
        const url = `http://localhost:3000/user/${user.id}/adminverify/${token.token}`;

        await sendEmail(user.email, "Verify Email", url);

        return res.json({
            message:'dontrt4rge',
            status:'res',
        });
    }catch(error) {
        res.send({
            message: "Internal Server Error"
        })
    }
}   
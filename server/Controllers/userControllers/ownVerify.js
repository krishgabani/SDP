const Token = require('../../models/token')
const express = require('express');
const { UserModel } = require('../../models/UserModel')
const sendEmail = require('../../utils/sendEmail')
const sendAdmin = require('../../utils/sendAdmin')



exports.ownVerify = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.params.id });
        console.log("hello");
        if (!user) {
            return res.send({ message: "Invalid Link1" });
        }
        //console.log(req);
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        console.log(user.emailsent);
        console.log(user);

        if (user.emailsent) {
            return res.send({ message: "Invalid Link 22" })
        }
        await UserModel.updateOne({ _id: user._id }, { emailsent: true });

        if (!token.token) {
            return res.send({ message: "Token is Not Founded" });
        }
        console.log(token.token);
        const url = `http://localhost:3000/user/${user.id}/adminverify/${token.token}`;
        //console.log(user.Department);
        let role = await UserModel.findOne({ Department: user.Department, Designation: 'coordinator' });
        if (user.Designation === 'faculty' || user.Designation === 'hod') {
            if (!role) {
                return res.status(200).send({
                    message: 'coordinate is not found',
                })
            }
            console.log(role);
            if (role) {
                await sendEmail(role.email, "Verify Email", url);
            }
        } else if (user.Designation === 'coordinator') {
            console.log("send to coordiatro");
            await sendAdmin("meetgami34345@gmail.com", "Verify Email", url,user);
        }

        return res.json({
            message: 'dontrt4rge',
            status: 'res',
        });
    } catch (error) {
        res.send({
            message: "Internal Server Error"
        })
    }
}   
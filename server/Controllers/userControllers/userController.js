const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const { UserModel } = require("../../models/UserModel");
const mongoose = require("mongoose");

const authController = async (req, res) => {
  try {
    //console.log('from auth controller')
    //console.log(req.body)
    const user = await UserModel.findById({ _id: req.body.userId });
    console.log(user);
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

module.exports = { authController };

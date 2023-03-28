const decodeJWTtoken = require('../utils/decodeJWTtoken')
const { UserModel } = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

exports.protect = asyncHandler(async (req, res, next) => {
    //console.log(req.headers);
    const temp = await decodeJWTtoken(req, res);
    console.log(req.url)
    //console.log(temp)
    if (temp === undefined) {
        return;
    }
    const { id } = temp;
    console.log(id)

    try {
        req.userid = await UserModel.findOne({ id })
        console.log(req.userid)
        next();
    } catch (error) {
        res.status(401).json({
            authenticated: false
        });
    }
});


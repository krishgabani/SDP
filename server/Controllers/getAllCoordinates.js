const  {UserModel} = require('../models/UserModel');

exports.getAllCoordinates = async (req,res) =>  {

    const coordinatList = await UserModel.find({Designation: 'coordinator'});

    console.log(coordinatList);
    return res.status(200).send({
        message:"sending all the Coordinates",
        data:coordinatList
    })
}
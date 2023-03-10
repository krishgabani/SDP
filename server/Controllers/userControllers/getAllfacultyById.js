const  {UserModel} = require('../../models/UserModel');

exports.getAllfacultyById = async (req,res) =>  {
    console.log(req.body.coordinatId);
    const coordinateData  = await UserModel.findById({_id:req.body.coordinatId});
    console.log(coordinateData.Department);

    const allfaculty = await UserModel.find({Department:coordinateData.Department,Designation:'faculty'});
    console.log(allfaculty);
    return res.status(200).send({
        message:"All Faculty get successfully",
        data:allfaculty

    })
}

const { UserModel } = require("../../models/UserModel");

exports.updateProfile = async (req, res) => {
    console.log(req.body);

    const temp = await UserModel.updateOne({_id:req.body.Id},{ $set:{
        name:req.body.Name,
        email:req.body.Email,
        Designation:req.body.Designation
    } });

    const profile = await UserModel.findOne({_id:req.body.Id});
    console.log(temp);
    return res.status(200).send({
        message:"profile updated succefully",
        profile
    })
}
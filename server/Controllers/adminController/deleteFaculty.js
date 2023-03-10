const {UserModel} = require('../../models/UserModel')

exports.deleteFaculty = async (req,res) => {
    console.log(req.body);
    //const temp = await UserModel.deleteOne({_id:req.body.fact});
    return res.status(200).send({
        message:"deletedfaculty sucefully"
    })
}

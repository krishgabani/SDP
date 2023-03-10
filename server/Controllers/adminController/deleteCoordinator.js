const {UserModel} = require('../../models/UserModel')

exports.deleteCoordinator = async (req,res) => {
    console.log(req.body);
    //const temp = await UserModel.deleteOne({_id:req.body.deprt});
    return res.status(200).send({
        message:"deletedCoordinator sucefully"
    })
}
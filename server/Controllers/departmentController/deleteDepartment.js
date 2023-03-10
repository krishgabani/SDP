const { departmentModel } = require('../../models/department');

exports.deleteDepartment = async (req, res) => {
    console.log(req.body.deprt);
    //console.log(req.body._id);
    const temp = await departmentModel.deleteOne({_id:req.body.deprt});
    console.log(temp);
    return res.status(200).send({
        message: "deleted succefully",
    });
}
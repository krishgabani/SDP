const  {departmentModel} = require('../models/department');

exports.editDepartment = async (req,res) => {
    // console.log(req.body);

    const tem = await departmentModel.findOne({department:req.body.department});
    // console.log(tem);
    if(tem) {
        return res.status(404).send({
            message:"dud this is error",
        })
    }
    await departmentModel.create({department:req.body.department});
    return res.status(200).send({
        message:"hii there",
    });
    
}
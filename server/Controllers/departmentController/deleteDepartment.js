const { departmentModel } = require('../../models/department');

exports.deleteDepartment = async (req, res) => {
    try{
        console.log(req.body.deprt);
        //console.log(req.body._id);
        const temp = await departmentModel.deleteOne({_id:req.body.deprt});
        console.log(temp);
        return res.status(200).send({
            status: '1',
            message: "deleted succefully",
        });
    }catch(error){
        return res.status(200).send({
            status: '0',
            message: "Server Error",
        });
    }
}
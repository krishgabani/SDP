const  {departmentModel} = require('../models/department');

exports.getDepartment = async (req,res) =>  {
    console.log("hioehir");
    const tem = await departmentModel.find({},{'department' : true});
    console.log(tem);
    return res.status(200).send({
        message:"hi this is get request",
        data:tem
    })
}
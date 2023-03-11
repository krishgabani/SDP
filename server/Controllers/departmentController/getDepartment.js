const { departmentModel } = require('../../models/department');

exports.getDepartment = async (req, res) => {
    const ans = await departmentModel.find({}, { 'department': true });
    return res.status(200).send({
        message: "Response contains list of Department",
        data: ans
    })
}
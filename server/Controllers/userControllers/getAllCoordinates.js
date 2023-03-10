const { UserModel } = require('../../models/UserModel');
const { departmentModel } = require('../../models/department');

exports.getAllCoordinates = async (req, res) => {
    let coordinatList = [];
    const tem = await departmentModel.find({}, { 'department': true });
    //console.log(tem);
    await Promise.all(tem.map(async (val) => {
        let temp = null;
        temp = await UserModel.findOne({ Designation: "coordinator", Department: val.department });

        if (temp) {
            //coordinatList.push(temp);
        } else {
            if (val.department) {
                coordinatList.push(val);
            }
        }
    }));
    await Promise.all(tem.map(async (val) => {
        let temp = null;
        temp = await UserModel.findOne({ Designation: "coordinator", Department: val.department });
        if (temp) {
            coordinatList.push(temp);
        }
    }));

    console.log(coordinatList);
    //console.log(coordinatList);
    return res.status(200).send({
        message: "sending all the Coordinates",
        data: coordinatList
    })
}
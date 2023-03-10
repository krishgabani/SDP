const { UserModel } = require('../../models/UserModel');

exports.getfacultynames = async (req, res) => {
    const userList = await UserModel.find({});
    const names = userList.map(userData => userData.name)
    console.log(names);
    // console.log(tem);
    return res.status(200).send({
        message: "sending faculty names",
        data: names
    })
}
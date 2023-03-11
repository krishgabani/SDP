const { DOIModel } = require('../../models/doi');

exports.getdoilist = async (req, res) => {
    const ans = await DOIModel.find({});
    return res.status(200).send({
        message: "Response contains DOI and Document-Type",
        data: ans
    })
}
const {Year} = require("../../models/year");

exports.getAllyears = async (req,res) => {
    console.log("hii");
    const allyear =await Year.find({},{'year':true});
    console.log(allyear);
    res.status(200).send({
        meesage:"Years get succefully",
        allyear,
    })
}


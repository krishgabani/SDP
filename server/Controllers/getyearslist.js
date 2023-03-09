const  {JournalDataModel} = require('../models/journal');

exports.getyearslist = async (req,res) =>  {
    const journalList = await JournalDataModel.find({});
    // const years = journalList.map(userData => userData.Academic_Year)
    const years = ["2016-2017","2017-2018","2018-2019","2019-2020"];
    console.log(years);
    return res.status(200).send({
        message:"sending faculty names",
        data:years
    })
}
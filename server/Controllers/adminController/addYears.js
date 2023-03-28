const {Year} = require("../../models/year");

exports.addYears = async (req,res) => {
    //console.log(req.body);
    console.log('from add year')
    
    var dateobj = new Date();

    var dateObject = dateobj.getFullYear();
    console.log(dateObject);
    console.log(req.body.Year);
    const tem = await Year.findOne({ year: req.body.Year });
    if(tem || req.body.Year.length!=4 || req.body.Year>JSON.stringify(dateObject)){
        console.log(tem);
        res.status(200).send({
            success:0,
            message:'year is already added'
        });
    }else{
        await Year.create({year:req.body.Year})
        res.status(200).send({
            message:'Years added succefully'
        });
    }

}


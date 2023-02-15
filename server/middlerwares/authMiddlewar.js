const jwt = require('jsonwebtoken')

module.exports = async (req,res,next)=> {
    const token = req.headers.authorization.split(' ')[1];  
    try{
        
        console.log("helloe");
        console.log(token);
        jwt.verify(token,process.env.JWT_SECRET,(err,decode) => {
            if(err) {
                // console.log("err");
                return res.status(200).send({
                    message:'Auth failed',
                    success:false,
                })
            }else{
                req.body.userId = decode.id
                next();
            }
        });
    }catch(error) {
        console.log("hii");
        console.log(error);
        res.status(401).send({
            message: 'Auth Failed',
            success:false
        })
    }
}
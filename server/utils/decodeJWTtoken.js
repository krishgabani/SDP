// const verify = require('jsonwebtoken');
const jwt = require('jsonwebtoken')
module.exports = async (req, res) => {

    const { authorization } = req.headers;

    if (authorization && 'Bearer undefined' !== authorization) {
        const token = authorization.split(' ')[1];
        if ('undefined' !== token) {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            console.log('decoded data ')
            console.log(decoded)
            if (decoded === undefined) {
                res.status(401).json({
                    error: {
                        errorMessage: ['you are not authorized for this page']
                    }
                });
            }
            else {

                return decoded;
            }
        } else {
            console.log('here')
            res.status(401).json({
                error: {
                    errorMessage: ['you are not authorized for this page']
                }
            });
        }
    } else {
        console.log('baread header is not exists')
        res.status(401).json({
            error: {
                errorMessage: ['you are not authorized for this page']
            }
        });
    }
}
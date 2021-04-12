const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            auth: false,
            token: null,
            message:"missing token, please login"
        })
    }
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if(decoded.isAdmin == false) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: "Your are not an admin !"
            })
        }
        else{
            if(err) {
                return res.status(401).send({
                    auth: false,
                    token: null,
                    message:"no authorized"
                })
            }
        }
        next();
    })
}

module.exports = verifyAdmin;
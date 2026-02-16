const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

exports.generateJwtToken = (payload) => {
    const token =  jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

exports.verifyToken = (payload) => {
    const token = jwt.verify(payload,process.env.JWT_SECRET);
    return token;
}
const express = require('express');
const { RegisterUser, LoginUser, GenearteImage } = require('../controllers/RegisterAndLogin')

const RegisterRoute = express.Router();

RegisterRoute.post("/register_user", RegisterUser);
RegisterRoute.post("/login", LoginUser);
RegisterRoute.post("/image", GenearteImage);


module.exports = RegisterRoute;
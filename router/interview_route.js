const express = require('express');
const { insertData } = require('../controllers/interview')
const interviewRoute = express.Router();

interviewRoute.post("/insert",insertData);

module.exports = interviewRoute;
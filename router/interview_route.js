const express = require('express');
const { insertData, FetchData, editData, deleteData } = require('../controllers/interview')
const interviewRoute = express.Router();

interviewRoute.post("/insert", insertData);
interviewRoute.get("/getdata", FetchData);
interviewRoute.put("/updatedata", editData);
interviewRoute.delete("/deletedata", deleteData);

module.exports = interviewRoute;
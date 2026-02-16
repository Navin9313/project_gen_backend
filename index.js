const express = require('express');
const app = express();
const port = 9000;
const http = require('http');
const cors = require('cors')

// import files
const Connection = require("./connection");
const RegisterRoute = require("./router/RegisterAndLogin_Route")
const interviewRoute = require("./router/interview_route")

Connection();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.urlencoded({extended: false}));

app.use("/register",RegisterRoute);
app.use("/interview",interviewRoute);

const myserver = http.createServer(app);

myserver.listen(port,()=>{
    console.log("server connected...");
})
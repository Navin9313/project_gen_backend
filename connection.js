const mysql = require("mysql2/promise");

async function Connection(){
    try {
        const con = await mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"Navin@2005",
            database:"n8n_ai"
        });
        console.log("mysql connected...");
        return con;
    } catch (error) {
        console.log("MySQL not connected:",error.message);
        return null;
    }
}

module.exports = Connection;
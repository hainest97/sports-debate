require('dotenv').config();
const mysql = require('mysql2');

const con = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

/*con.connect(function(err) {
    if(err) throw err;
    console.log("Database Connected!!");
    con.query("CREATE DATABASE IF NOT EXISTS topic_db", function(err, result) {
        if (err) throw err;
        console.log("Database Created!");
    })
})*/
const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        con.query(sql, binding, (err, result,fields) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}
const createQuery = "CREATE DATABASE IF NOT EXISTS topic_db";
con.query(createQuery);
module.exports = {con, query};
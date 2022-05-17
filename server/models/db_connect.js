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
const createQuery = "CREATE DATABASE IF NOT EXISTS sports_debate_db";
con.query(createQuery);
//let drop = `DROP TABLE users`
//con.query(drop);
/*let sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY(user_id)
  )`;
con.query(sql);
let sql2 = `CREATE TABLE IF NOT EXISTS topics (
    topic_id INT NOT NULL AUTO_INCREMENT,
    topic_text VARCHAR(255) NOT NULL,
    create_date TIMESTAMP NOT NULL,
    CONSTRAINT topic_pk PRIMARY KEY(topic_id)
)`;
con.query(sql2);*/
module.exports = {con, query};
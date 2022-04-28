const con = require('./db_connect');

async function createTable(){
  
  let sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY(user_id)
  )`;
  await con.query(sql);
}
createTable();

/*const users = [
    {
        userID: 12345,
        fname: 'Bob',
        lname: 'Joe',
        uname: "bobjoe69",
        email: "bobjoe420@yahoo.com",
        pword: "ilovesports"
    },
    {
        userId: 55555,
        fname: 'Fred',
        lname: 'Burger',
        uname: "fredburger54",
        email: "fredburger54@gmail.com",
        pword: "georgehotdog"
    }
];*/

let getUsers = async() => {
  const sql = "SELECT * FROM users";
  return await con.query(sql);
};

async function getUser(user){
  let sql;
  if(user.userId){
    sql = `SELECT * FROM users WHERE user_id=${user.userId}`
  }
  else {
    sql = `SELECT * FROM users WHERE user_id="${user.username}"`
  }
  return await con.query(sql);
}
async function login(username,password) {
  const sql2 = `INSERT INTO users(first_name,last_name,user_name,email,password)
               VALUES ("bob", "b", "bob", "b@b", "b")`;

  const insert = await con.query(sql2);
  const sql = `SELECT * FROM users`;
  let u = await con.query(sql);
  console.log(u);
  const user = await userExists(username);
  if(!user[0]) throw new Error("User not found.");
  if(user[0].password !== password) throw Error("Password is incorrect.");

  return user[0];
    /*const user = userExists(username);
    if(!user[0]) throw Error("User not found");
    if(user[0].pword !== password) throw Error("Password is incorrect");

    return user[0];*/

}
async function register(user) {
  const u = await userExists(username);
  if(u.length>0) throw Error("Username already in use");

  const sql = `INSERT INTO users(first_name,last_name,user_name,email,password)
               VALUES "${user.firstname}", "${user.lastname}", "${user.username}", "${user.email}", "${user.password}"`;

  const insert = await con.query(sql);
  const NewUser = await getUser(user);
  return NewUser[0];
    /*const u = userExists(user.username);
    if(u.length>0) throw Error('Username already exists')
    
    const emails = users.filter((u) => u.email === user.email);
    if(emails.length>0) throw Error('Email already in use');

    const newUser = {
      userId: users[users.length-1].userId + 1,
      fname: user.firstname,
      lname: user.lastname,
      uname: user.username,
      email: user.email,
      pword: user.password
    }
    users.push(newUser);
    return newUser;*/
  }
async function deleteUser(userId) {
  const sql = `DELETE FROM users WHERE user_id = ${user.user_id}`;
  await con.query(sql);

    /*let i = users.map((user) => user.userId).indexOf(userId);
    users.splice(i, 1);
    console.log(users)*/
  }
  async function userExists(username){
    const sql = `SELECT * FROM users WHERE user_name = "${username}"`;
    return await con.query(sql);
    //return users.filter((u) => u.uname === username);
  }
  
  async function editUser(user){
    const sql = `UPDATE user SET user_name = "${user.username}" WHERE user_id= ${user.user_id}`;

    const update = await con.query(sql);
    const NewUser = await getUser(user);
    return NewUser[0];
    /*const u = userExists(user.userName);
    if(u.length > 0) throw ("Username already in use");
  
    const cUser = users.filter((u) => u.userId === user.userId);
    cUser[0].uname = user.userName;
    return cUser[0]; */
  }
module.exports = { getUsers, login, register, deleteUser,editUser };
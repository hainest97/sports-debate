const users = [
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
];

let getUsers = () => users;

function login(username,password) {
    const user = userExists(username);
    if(!user[0]) throw Error("User not found");
    if(user[0].pword !== password) throw Error("Password is incorrect");

    return user[0];
}
function register(user) {
    const u = userExists(user.username);
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
    return newUser;
  }
function deleteUser(userId) {
    let i = users.map((user) => user.userId).indexOf(userId);
    users.splice(i, 1);
    console.log(users)
  }
  function userExists(username){
    return users.filter((u) => u.uname === username);
  }
  
  function editUser(user){
    const u = userExists(user.userName);
    if(u.length > 0) throw ("Username already in use");
  
    const cUser = users.filter((u) => u.userId === user.userId);
    cUser[0].uname = user.userName;
    return cUser[0]; 
  }
module.exports = { getUsers, login, register, deleteUser,editUser };
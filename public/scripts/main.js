




/*function hideDropdown(e){
    if(!content.classList.contains("hide")){
        content.classList.add("hide");
    }
    if(!loginForm.classList.contains("hide")){
        loginForm.classList.add("hide");
    }
    if(!registerForm.classList.contains("hide")){
        registerForm.classList.add("hide");
    }
}
function toggleDisplayDropdown(e){
    e.preventDefault();
    if(content.classList.contains("hide")){
        content.classList.remove("hide");
    }
    else{
        content.classList.add("hide");
        if(!loginForm.classList.contains("hide")){
            loginForm.classList.add("hide");
        }
        if(!registerForm.classList.contains("hide")){
            registerForm.classList.add("hide");
        }
        
    }
}
function toggleDisplayLogin(e){
    e.preventDefault();
    if(loginForm.classList.contains("hide")){
        loginForm.classList.remove("hide");
        if(!registerForm.classList.contains("hide")){
            registerForm.classList.add("hide");
        }
    }
    else{
        loginForm.classList.add("hide");
    }

}
function toggleDisplayRegister(e){
    e.preventDefault();
    if(registerForm.classList.contains("hide")){
        registerForm.classList.remove("hide");
        if(!loginForm.classList.contains("hide")){
            loginForm.classList.add("hide");
        }
    }
    else{
        registerForm.classList.add("hide");
    }
}*/

const content = document.querySelector('.content');
if(getCurrentUser()){
  content.innerHTML = 
  `
        <li><a href="./viewprofile.html">Profile</a></li>
        <li><a id="logout">Logout</a></li>
  `
}
else {
  content.innerHTML = 
  `
    <li><a href="./login.html">Login</a></li>
    <li><a href="./register.html">Register</a></li>
  `
}

// Fetch method implementation:
async function fetchData(url = '', data = {}, methodType) {
    if(methodType === "GET") {
        fetch(`http://localhost:3000${url}/${topic.TopicId}`)
        .then((res)=>res.json())
    }
    const response = await fetch(`http://localhost:3000${url}`, {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }

  function setCurrentUser(user) {
    localStorage.setItem('user',JSON.stringify(user));
  }
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  function removeCurrentUser() {
    localStorage.removeItem('user');
  }
const logoutBtn = document.getElementById('logout');
if (logoutBtn) logoutBtn.addEventListener('click',logout);

function logout(){
  removeCurrentUser();
  window.location.href = "login.html";
}


  // USER

  let userAmount = 10;
class User {
    constructor(fname,lname,uname,email,pword){
        this.userID = userAmount;
        this.fname = fname;
        this.lname = lname;
        this.uname = uname;
        this.email = email;
        this.pword = pword;
        userAmount++;
    }
    getFirstName(){
        return this.fname;
    }
    setFirstName(fname){
        this.fname = fname;
    }
    getLastName(){
        return this.lname;
    }
    setLastName(lname){
        this.lname = lname;
    }
    getUserName(){
        return this.uname;
    }
    setUserName(uname){
        this.uname = uname;
    }
    getEmail(){
        return this.email;
    }
    setEmail(email){
        this.email = email;
    }
    getPassword(){
        return this.pword;
    }
    setPassword(pword){
        this.pword = pword;
    }
    
}

//let content = document.getElementById("content");
//let loginForm = document.getElementById("login-list");
//let registerForm = document.getElementById("register-list");

//document.getElementById('login-btn').addEventListener("click",toggleDisplayDropdown);
//document.getElementById('toggle-login').addEventListener("click",toggleDisplayLogin);
//document.getElementById('toggle-register').addEventListener("click",toggleDisplayRegister);

let loginForm = document.getElementById("login");
if (loginForm) loginForm.addEventListener("submit",login);
function login(e) {
    e.preventDefault();
    let uname = document.getElementById("loginUName").value;
    let pword = document.getElementById("loginPword").value;
    fetchData('/users/login', { username: uname, password: pword},"POST")
    .then((data) => {
        if(!data.message) {
            setCurrentUser(data);
            window.location.href = "./index.html";
        }
    })
    .catch((error) => {
        const errText = error.message;
        document.getElementById("err").innerHTML = errText;
        document.getElementById("loginPword").value = "";
        console.error(`Error! ${errText}`);
    });
    document.getElementById("loginUName").value = "";
    document.getElementById("loginPword").value = "";
}

let registerForm = document.getElementById("register");
if (registerForm) registerForm.addEventListener("submit",register);
function register(e) {
    e.preventDefault();
    let fname = document.getElementById("registerFName").value;
    let lname = document.getElementById("registerLName").value;
    let uname = document.getElementById("registerUName").value;
    let email = document.getElementById("registerEmail").value;
    let pword = document.getElementById("registerPword").value;
    fetchData('/users/register', {firstname: fname, lastname: lname, username: uname, 
        email: email, password: pword},"POST")
      .then((data) => {
        setCurrentUser(data);
        window.location.href = "index.html";
      })
      .catch((error) => {
        const errText = error.message;
        document.querySelector("#err").innerHTML = errText;
        document.getElementById("registerPword").value = "";
        document.getElementById("registerConfPword").value = "";
        console.log(`Error! ${errText}`)
      });
  }
function signUp(e) {
    e.preventDefault();
    let fname = document.getElementById("registerFName").value;
    let lname = document.getElementById("registerLName").value;
    let uname = document.getElementById("registerUName").value;
    let email = document.getElementById("registerEmail").value;
    let pword = document.getElementById("registerPword").value;
    let NewUser = new User(fname,lname,uname,email,pword);
    console.log(NewUser);
    document.getElementById("registerFName").value = "";
    document.getElementById("registerLName").value = "";
    document.getElementById("registerUName").value = "";
    document.getElementById("registerEmail").value = "";
    
    
}
// PROFILE

let profile = document.getElementById("profile-section");
if (profile) {
    profile.innerHTML = 
    `
    
    <ul id="profile" class="profile">
        <li>
            <h1 class="header">Profile</h1>
        </li>
        <br>
        <li>
            <p class = "key">First name</p>
            <p class = "value">${user.fname}
        <li>
        <br>
        <li>
            <p class = "key">Last name</p>
            <p class = "value">${user.lname}
        <li>
        <br>
        <li>
            <p class = "key">User name</p>
            <p class = "value">${user.uname}
        <li>
        <br>
        <li>
            <p class = "key">Email</p>
            <p class = "value">${user.email}
        <li>
        <br>
        <p id="err"></p>
        <button class="btn" id="edit">Edit Info</button>
        <button class="btn" id="delete">Delete Account</button>
    </ul>
    `
    let edit_btn = document.getElementById("edit");
    edit_btn.addEventListener("click", function(e) {
        window.location.href = "./editprofile.html";
    });
    let delete_btn = document.getElementById("delete");
    delete_btn.addEventListener("click",deleteAccount);
}
;


let edit_form = document.getElementById("edit-form");
if (edit_form) {
    edit_form.innerHTML =
    `
    <form id = "edit" class="edit">
        <h1 class="form-header">Edit Profile</h2>
        <br>
        <label for="editUName">Username</label>
        <input type="text" id="editUName" name="editUName" placeholder="${user.uname}">
        <br>
        <p id="err"></p>
        <input type="submit" value="Edit">
        <button class="btn" id="cancel">Cancel</button>
    </form>
    
    `
    edit_form.addEventListener("submit",editAccount);
    document.getElementById("cancel").addEventListener('click', (e) => {
        window.location.href = "viewprofile.html";
      })
}
function editAccount(e) {
    e.preventDefault();
  
    let userName = document.getElementById("editUName").value;
    if(userName === user.uname) {
      let err = "No changes were made";
      document.querySelector("#err").innerHTML = err;
    }
    else {
      fetchData('/users/edit', {userId: user.userId, userName: userName}, "PUT")
      .then((data) => {
        if(!data.message) {
          removeCurrentUser();
          setCurrentUser(data);
          window.location.href = "viewprofile.html";
        }
      })
     .catch((error) => {
       const errText = error.message;
       document.querySelector("#err").innerHTML = errText;
       console.log(`Error! ${errText}`)
     });
    }
  }
  function deleteAccount() {
    if(confirm('Are you sure you want to delete your account???')) {
      fetchData('/users/delete', {userId: user.userId}, "DELETE")
      .then((data) => {
        if(!data.message) {
          console.log(data.success)
          logout();
          window.location.href = "register.html"
        }
      })
      .catch((error) => {
        const errText = error.message;
        document.querySelector("#err").innerHTML = errText;
        console.log(`Error! ${errText}`)
      })
    }
  }
  
//TOPIC

let topAmount = 10; 
class Topic {
  constructor(topic) {
    this.topicId = topAmount;
    this.topicText = topic;
    let currentdate = new Date(); 
    this.datetime = "Created: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
    topAmount++;
  }
}
let form = document.getElementById("topicForm");
let topicSection = document.getElementById("topics-section");
function getAllTopics() {
    fetchData('/topics/getAllTopics',{},"POST")
    .then((data) => {
        console.log(data);
        data.forEach((topic) => {
            let li = 
            `
            <div class="topic">
                <p class="delete-btn" onclick="deleteTopic(event)">X</p>
                <p class="topic-name">${topic.topicText}</p>
                <p class="topic-date">${topic.dateTime}</p>
            </div>
            `
            topicSection.innerHTML += li;
        })
    })
    .catch((error) => {
        const errText = error.message;
        console.error(errText);
    })
}
if (topicSection) {
    form.addEventListener("submit",addTopic);
    getAllTopics();
}
function addTopic(e){
    e.preventDefault();
    let topic = document.getElementById("createTopic").value;
    fetchData('/topics/add',{topicText: topic, userId: getCurrentUser().userId},"POST")
    .then((data) => {
        
        let li = 
        `
        <div class="topic">
            <p class="delete-btn" onclick="deleteTopic(event)">X</p>
            <p class="topic-name">${data.topicText}</p>
            <p class="topic-date">${data.dateTime}</p>
        </div>
        `
        topicSection.innerHTML += li;
        document.getElementById("createTopic").value = "";
    })
    .catch((error) => {
        const errText = error.message;
        console.error(errText);
    })
    
    /*
    let topics = document.querySelectorAll(".delete-btn");
    topics.forEach(topic => {
        topic.addEventListener('click', function deleteTopic(e){
            let li = e.target.parentElement;
            topicSection.removeChild(li);
        })
    })
    */
}
function deleteTopic(e) {
    let li = e.target.parentElement;
    topicSection.removeChild(li);
}

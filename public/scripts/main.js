




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
            console.log(JSON.stringify(data));
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
        if(!data.message) {
            console.log(JSON.stringify(data));
            setCurrentUser(data);
            window.location.href = "./index.html";
        }
      })
      .catch((error) => {
        const errText = error.message;
        document.querySelector("err").innerHTML = errText;
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
let currUser = getCurrentUser();
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
            <p class = "value">${currUser.first_name}</p>
        <li>
        <br>
        <li>
            <p class = "key">Last name</p>
            <p class = "value">${currUser.last_name}</p>
        <li>
        <br>
        <li>
            <p class = "key">User name</p>
            <p class = "value">${currUser.user_name}</p>
        <li>
        <br>
        <li>
            <p class = "key">Email</p>
            <p class = "value">${currUser.email}</p>
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
        <input type="text" id="editUName" name="editUName" placeholder="${currUser.user_name}">
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
    if(userName === currUser.user_name) {
      let err = "No changes were made";
      document.querySelector("#err").innerHTML = err;
    }
    else {
      console.log(currUser.user_id);
      fetchData('/users/edit', {userId: currUser.user_id, username: userName}, "PUT")
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
      fetchData('/users/delete', {userId: currUser.user_id}, "DELETE")
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
function right(str, chr)
  {
	return str.slice(str.length-chr,str.length);
  }
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
        data.forEach((topic) => {
            //let topicUser = "Author: ";
            fetchData('/users/getUserById',{userId: topic.user_id},"POST")
            .then((data) => {
              let creator = "Creator: " + data.user_name;
              let date = new Date(topic.create_date);
              let hour = date.getHours()%12;
              let ampm;
              if(date.getHours()/12>1){
                ampm = "PM";
              }
              else{
                ampm = "AM";
              }
              let dt = "Date: "+date.getMonth()+
                  "/"+(date.getDate()+1)+
                  "/"+date.getFullYear()+
                  " "+hour+
                  ":"+right('00' + date.getMinutes(),2)+
                  ampm;
              let li;
              if(getCurrentUser()){
                if(topic.user_id==getCurrentUser().user_id){
                  li = 
                    `
                  <div class="topic">
                    <p id="edit-btn2" class="edit-btn"><i class="fa">&#xf044</i></p>
                    <p class="delete-btn" onclick="deleteTopic(event)">X</p>
                    <p class="topic-id">${topic.topic_id}</p>
                    <p class="topic-name">${topic.topic_text}</p>
                    <p class="topic-creator">${creator}</p>
                    <p class="topic-date">${dt}</p>
                  </div>
                  `
                  
                } else {
                  li = 
                  `
                  <div class="topic">
                    <p class="topic-id">${topic.topic_id}</p>
                    <p class="topic-name">${topic.topic_text}</p>
                    <p class="topic-creator">${creator}</p>
                    <p class="topic-date">${dt}</p>
                  </div>
                  `
                  }
              } else {
                li = 
                `
                <div class="topic">
                  <p class="topic-id">${topic.topic_id}</p>
                  <p class="topic-name">${topic.topic_text}</p>
                  <p class="topic-creator">${creator}</p>
                  <p class="topic-date">${dt}</p>
                </div>
                `
              }
              topicSection.innerHTML += li;
              let edit_btn2 = document.getElementById("edit-btn2");
              if (edit_btn2) edit_btn2.addEventListener("click", function(e) {
                localStorage.setItem('topicId',e.target.parentElement.parentElement.children[2].innerText);
                localStorage.setItem('topicText',e.target.parentElement.parentElement.children[3].innerText);
                window.location.href = "./editTopic.html";
              });
            })
            .catch((error) => {
              const errText = error.message;
              console.error(errText);
            })
            
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
    if(!currUser){
      window.location.href = "./login.html";
    }
    let topic = document.getElementById("createTopic").value;
    fetchData('/topics/add',{topicText: topic, userId: getCurrentUser().user_id},"POST")
    .then((topic) => {
      fetchData('/users/getUserById',{userId: topic.user_id},"POST")
            .then((data) => {
              let creator = "Creator: " + data.user_name;
              let date = new Date(topic.create_date);
              let hour = date.getHours()%12;
              let ampm;
              if(date.getHours()/12>1){
                ampm = "PM";
              }
              else{
                ampm = "AM";
              }
              let dt = "Date: "+date.getMonth()+
                  "/"+(date.getDate()+1)+
                  "/"+date.getFullYear()+
                  " "+hour+
                  ":"+right('00' + date.getMinutes(),2)+
                  ampm;
              let li;
              if(getCurrentUser()){
                if(topic.user_id==getCurrentUser().user_id){
                  li = 
                    `
                  <div class="topic">
                    <p id="edit-btn2" class="edit-btn"><i class="fa">&#xf044</i></p>
                    <p class="delete-btn" onclick="deleteTopic(event)">X</p>
                    <p class="topic-id">${topic.topic_id}</p>
                    <p class="topic-name">${topic.topic_text}</p>
                    <p class="topic-creator">${creator}</p>
                    <p class="topic-date">${dt}</p>
                  </div>
                  `
                } else {
                  li = 
                  `
                  <div class="topic">
                    <p class="topic-id">${topic.topic_id}</p>
                    <p class="topic-name">${topic.topic_text}</p>
                    <p class="topic-creator">${creator}</p>
                    <p class="topic-date">${dt}</p>
                  </div>
                  `
                  }
              } else {
                li = 
                `
                <div class="topic">
                  <p class="topic-id">${topic.topic_id}</p>
                  <p class="topic-name">${topic.topic_text}</p>
                  <p class="topic-creator">${creator}</p>
                  <p class="topic-date">${dt}</p>
                </div>
                `
              }
              topicSection.innerHTML += li;
              let edit_btn2 = document.getElementById("edit-btn2");
              if (edit_btn2) edit_btn2.addEventListener("click", function(e) {
                localStorage.setItem('topicId',e.target.parentElement.parentElement.children[2])
                localStorage.setItem('topicText',e.target.parentElement.parentElement.children[3])
                window.location.href = "./editTopic.html";
              });
            })
            .catch((error) => {
              const errText = error.message;
              console.error(errText);
            })
    })
    .catch((error) => {
        const errText = error.message;
        console.error(errText);
    })
    document.getElementById("createTopic").value = "";
    
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
let edit_topic = document.getElementById("edit-topic");
if (edit_topic) {
    edit_topic.innerHTML =
    `
    <form id="edit" class="edit">
        <h1 class="form-header">Edit Topic</h2>
        <br>
        <!--<label for="editUName">Username</label>-->
        <input type="text" id="editTopic" name="editTopic" value="${localStorage.getItem('topicText')}">
        <br>
        <p id="err"></p>
        <input type="submit" value="Edit">
        <button class="btn" id="cancel">Cancel</button>
    </form>
    
    `
    edit_topic.addEventListener("submit",editTopic);
    document.getElementById("cancel").addEventListener('click', (e) => {
        window.location.href = "index.html";
      })
}
function editTopic(e) {
  e.preventDefault();

  let topicText = document.getElementById("editTopic").value;
  if(topicText === localStorage.getItem('topicText')) {
    let err = "No changes were made";
    document.querySelector("#err").innerHTML = err;
  }
  else {
    console.log(currUser.user_id);
    fetchData('/topics/edit', {topicId: localStorage.getItem('topicId'), topicText:topicText}, "PUT")
    .then((data) => {
      if(!data.message) {
        localStorage.removeItem('topicId');
        localStorage.removeItem('topicText');
        window.location.href = "index.html";
      }
    })
   .catch((error) => {
     const errText = error.message;
     document.querySelector("#err").innerHTML = errText;
     console.log(`Error! ${errText}`)
   });
  }
}
function deleteTopic(e) {
    let topId = e.target.parentElement.children[2].innerText;
    if(confirm('Are you sure you want to delete this topic???')) {
        fetchData('/topics/delete', {topicId: topId}, "DELETE")
        .then((data) => {
          if(!data.message) {
            console.log(data.success)
          }
        })
        .catch((error) => {
          const errText = error.message;
          document.getElementById("err").innerHTML = errText;
          console.log(`Error! ${errText}`)
        })
      }
    let li = e.target.parentElement;
    topicSection.removeChild(li);
}

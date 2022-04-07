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
let content = document.getElementById("content");
let loginForm = document.getElementById("login-list");
let registerForm = document.getElementById("register-list");
document.getElementById('login-btn').addEventListener("click",toggleDisplayDropdown);
document.getElementById('toggle-login').addEventListener("click",toggleDisplayLogin);
document.getElementById('toggle-register').addEventListener("click",toggleDisplayRegister);
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
}
let form = document.getElementById("topicForm");
let topicSection = document.getElementById("topics-section");
form.addEventListener("submit",addTopic);

function addTopic(e){
    e.preventDefault();
    let topic = document.getElementById("createTopic").value;
    const newTopic= new Topic(topic);
    let li = 
    `
    <div class="topic">
        <p class="delete-btn" onclick="deleteTopic(event)">X</p>
        <p class="topic-name">${newTopic.topicText}</p>
        <p class="topic-date">${newTopic.datetime}</p>
    </div>
    `
    topicSection.innerHTML += li;
    document.getElementById("createTopic").value = "";
}
function deleteTopic(e) {
    let li = e.target.parentElement;
    topicSection.removeChild(li);
}
let login = document.getElementById("login");
login.addEventListener("submit",getUser);
function getUser(e) {
    e.preventDefault();
    let uname = document.getElementById("loginUName").value;
    let pword = document.getElementById("loginPword").value;
    console.log(uname);
    console.log(pword);
    document.getElementById("loginUName").value = "";
    document.getElementById("loginPword").value = "";
}

let register = document.getElementById("register");
register.addEventListener("submit",signUp);
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
    document.getElementById("registerPword").value = "";
    document.getElementById("registerPword").value = "";
    document.getElementById("registerConfPword").value = "";
}



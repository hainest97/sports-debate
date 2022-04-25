function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

let user = getCurrentUser();
if(user) window.location.href = "viewprofile.html";
let loginUseremail = document.getElementById("login-user-email");
let loginUserPassword = document.getElementById("login-user-passowrd");

let loginUserButton = document.getElementById("login-user");
let userAuthToken = localStorage.getItem("localAccessToken") || null;
loginUserButton.addEventListener("click", login )

async function login(){
    try {
   let res = await fetch("https://reqres.in/api/login" ,{
     method: "POST",
     body: JSON.stringify({
        email: loginUseremail.value,
        password: loginUserPassword.value
     }),
     headers:{
        "Content-Type": "application/json"
     }

   }) 
   let data = await res.json();
   console.log(data.token)
   localStorage.setItem("localAccessToken" , data.token);
   window.location.href = "http://127.0.0.1:5500/dashboard.html";

    } catch (error) {
       console.log(error) 
    }
}



/* ==========================================
   Fantasy CMS
   Admin Auth
========================================== */

import { CONFIG } from "../config/config.js";


document.addEventListener(
"DOMContentLoaded",
()=>{


const loginButton =
document.getElementById("loginButton");


if(!loginButton) return;


loginButton.onclick=async()=>{


const username =
document.getElementById("loginId")
.value.trim();


const password =
document.getElementById("loginPassword")
.value.trim();


const message =
document.getElementById("loginMessage");



try{


const form =
new FormData();


form.append(
"action",
"loginAdmin"
);


form.append(
"username",
username
);


form.append(
"password",
password
);



const response =
await fetch(
CONFIG.API_URL,
{
method:"POST",
body:form
}
);



const result =
await response.json();



if(
result.status==="success" &&
result.data.login
){


localStorage.setItem(
"fantasy_admin",
"true"
);

localStorage.setItem(
"admin_name",
result.data.name
);

localStorage.setItem(
"admin_role",
result.data.role
);

localStorage.setItem(
"admin_token",
result.data.token
);

location.href="admin.html";



}else{


message.innerText =
"IDまたはパスワードが違います";


}



}catch(e){


console.error(e);


message.innerText =
"通信エラー";


}



};


});
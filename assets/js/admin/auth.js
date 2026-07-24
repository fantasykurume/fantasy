/* ==========================================
   Fantasy CMS
   Admin Auth
========================================== */


const ADMIN_ID = "fantasy";

const ADMIN_PASSWORD = "0820";


document.addEventListener(
"DOMContentLoaded",
()=>{


const loginButton =
document.getElementById(
"loginButton"
);



if(!loginButton) return;



loginButton.onclick=()=>{


const id =
document.getElementById(
"loginId"
).value.trim();



const password =
document.getElementById(
"loginPassword"
).value.trim();



const message =
document.getElementById(
"loginMessage"
);



if(
id===ADMIN_ID &&
password===ADMIN_PASSWORD
){


localStorage.setItem(
"fantasy_admin",
"true"
);



location.href="admin.html";



}else{


message.innerText=
"IDまたはパスワードが違います";


}



};



});
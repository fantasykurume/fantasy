/* ==========================================
   Fantasy CMS
   Admin Auth Check
========================================== */

if(localStorage.getItem("fantasy_admin")!=="true"){

    location.replace("login.html");

}
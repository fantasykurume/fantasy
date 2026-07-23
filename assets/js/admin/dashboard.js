/* ==========================================
   Fantasy CMS
   Dashboard Admin
========================================== */

import { CONFIG } from "../config/config.js";

export function initDashboardAdmin(){

document.querySelector(".content").innerHTML=`

<h2>Dashboard</h2>

<div class="dashboard-grid">

<div class="dashboard-card" data-page="gallery">
<h3>📷 Gallery</h3>
<p id="dashboardGallery">読み込み中...</p>
<small>管理へ →</small>
</div>

<div class="dashboard-card" data-page="cast">
<h3>👩 Cast</h3>
<p id="dashboardCast">読み込み中...</p>
<small>管理へ →</small>
</div>

<div class="dashboard-card" data-page="news">
<h3>📰 News</h3>
<p id="dashboardNews">読み込み中...</p>
<small>管理へ →</small>
</div>

<div class="dashboard-card" data-page="system">
<h3>💰 System</h3>
<p id="dashboardSystem">読み込み中...</p>
<small>管理へ →</small>
</div>

</div>

<div class="dashboard-info">

<h3>Fantasy CMS</h3>

<p>
店舗ホームページ管理システム
</p>

</div>

`;

loadDashboard();


document
.querySelectorAll(".dashboard-card")
.forEach(card=>{

card.onclick=()=>{

const page=card.dataset.page;

const menu=
document.querySelector(
`.admin-menu li[data-page="${page}"]`
);

if(menu){
menu.click();
}

};

});

}



async function loadDashboard(){

try{

const response=
await fetch(
`${CONFIG.API_URL}?action=dashboard`
);

const result=
await response.json();


if(result.status!=="success"){
throw new Error();
}


const data=result.data;


const gallery=
document.getElementById("dashboardGallery");

if(gallery){
gallery.innerText=
`${data.gallery}件`;
}


const cast=
document.getElementById("dashboardCast");

if(cast){
cast.innerText=
`${data.cast}名`;
}


const news=
document.getElementById("dashboardNews");

if(news){
news.innerText=
`${data.news}件`;
}


const system=
document.getElementById("dashboardSystem");

if(system){
system.innerText=
`${data.system}件`;
}


}catch(e){

console.error(e);

}

}
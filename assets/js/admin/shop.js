/* ==========================================
   Fantasy CMS
   Shop Admin
========================================== */
import { CONFIG } from "../config/config.js";
import { adminGet,adminPostForm } from "./api.js";
import { openUpload } from "./upload.js";

export async function initShopAdmin(){
document.getElementById("currentPage").innerText="店舗情報管理";
document.getElementById("pageContent").innerHTML = `
<h2>店舗情報管理</h2>
<div id="shopForm">読み込み中...</div>
`;
loadShop();
}

async function loadShop(){
const area=document.getElementById("shopForm");

try{

const result=await adminGet("shop");

if(result.status!=="success"){
area.innerHTML="取得失敗";
return;
}

const shop=result.data[0];

area.innerHTML=`

<label>店舗名</label><br>
<input id="shopName" value="${shop.shop_name||""}">

<br><br>

<label>キャッチコピー</label><br>
<input id="shopCatch" value="${shop.catch_copy||""}">

<br><br>

<label>説明</label><br>
<textarea id="shopDescription">${shop.description||""}</textarea>

<br><br>

<label>住所</label><br>
<input id="shopAddress" value="${shop.address||""}">

<br><br>

<label>電話番号</label><br>
<input id="shopPhone" value="${shop.phone||""}">

<br><br>

<label>営業時間</label><br>
<input id="shopHours" value="${shop.business_hours||""}">

<br><br>

<label>定休日</label><br>
<input id="shopHoliday" value="${shop.holiday||""}">

<br><br>

<h3>Hero画像</h3>

<label>Hero画像1</label><br>
<input id="hero1" value="${shop.hero_image_1||""}" readonly>
<button id="uploadHero1">📷</button>

<br><br>

<label>Hero画像2</label><br>
<input id="hero2" value="${shop.hero_image_2||""}" readonly>
<button id="uploadHero2">📷</button>

<br><br>

<label>Hero画像3</label><br>
<input id="hero3" value="${shop.hero_image_3||""}" readonly>
<button id="uploadHero3">📷</button>

<br><br>

<label>Google Map URL</label><br>
<input id="mapUrl" value="${shop.map_url||""}">

<br><br>

<button id="saveShop">保存</button>

`;

document.getElementById("uploadHero1").onclick=()=>uploadHero("hero1");
document.getElementById("uploadHero2").onclick=()=>uploadHero("hero2");
document.getElementById("uploadHero3").onclick=()=>uploadHero("hero3");
document.getElementById("saveShop").onclick=saveShop;

}catch(e){

console.error(e);
area.innerHTML="通信エラー";

}
}

function uploadHero(id){

openUpload(url=>{
document.getElementById(id).value=url;
});

}

async function saveShop(){

const form=new FormData();

form.append("action","updateShop");

[
"shopName",
"shopCatch",
"shopDescription",
"shopAddress",
"shopPhone",
"shopHours",
"shopHoliday",
"hero1",
"hero2",
"hero3",
"mapUrl"
].forEach(id=>{
const el=document.getElementById(id);
if(el) form.append(id,el.value);
});

/* Workerへ送る名前修正 */

form.append("shop_name",document.getElementById("shopName").value);
form.append("catch_copy",document.getElementById("shopCatch").value);
form.append("description",document.getElementById("shopDescription").value);
form.append("address",document.getElementById("shopAddress").value);
form.append("phone",document.getElementById("shopPhone").value);
form.append("business_hours",document.getElementById("shopHours").value);
form.append("holiday",document.getElementById("shopHoliday").value);
form.append("hero_image_1",document.getElementById("hero1").value);
form.append("hero_image_2",document.getElementById("hero2").value);
form.append("hero_image_3",document.getElementById("hero3").value);
form.append("map_url",document.getElementById("mapUrl").value);

try{

const result=await adminPostForm(form);

if(result.status==="success"){

alert("保存しました");

}else{

alert(result.message||"保存失敗");

}

}catch(e){

console.error(e);
alert("通信エラー");

}

}


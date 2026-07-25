/* ==========================================
   Fantasy CMS
   Settings
========================================== */

import { CONFIG } from "../config/config.js";
import { adminGet,adminPost } from "./api.js";
import { openModal,closeModal } from "./modal.js";

export async function initSettings(user){

const content=document.querySelector(".content");

content.innerHTML=`

<h2>Settings</h2>

<div class="tabMenu">

${user.role==="owner"||user.role==="admin"?`<button class="tab active" data-tab="admins">管理者</button>`:""}

<button class="tab ${user.role==="staff"?"active":""}" data-tab="account">アカウント</button>

${user.role==="owner"||user.role==="admin"?`
<button class="tab" data-tab="system">システム</button>
<button class="tab" data-tab="seo">SEO</button>
`:""}

</div>

${user.role==="owner"||user.role==="admin"?`

<div class="tabContent active" id="admins">

<div class="toolbar">
<button id="addAdminBtn" class="primary">＋ 管理者追加</button>
</div>

<div id="adminList">読込み中...</div>

</div>

`:""}

<div class="tabContent ${user.role==="staff"?"active":""}" id="account">

<div class="admin-card">

<h3>パスワード変更</h3>

<div class="form-group">
<label>現在のパスワード</label>
<input type="password" id="currentPassword">
</div>

<div class="form-group">
<label>新しいパスワード</label>
<input type="password" id="newPassword">
</div>

<div class="form-group">
<label>確認</label>
<input type="password" id="confirmPassword">
</div>

<button id="changePasswordBtn" class="primary">パスワード変更</button>

</div>

</div>

${user.role==="owner"||user.role==="admin"?`

<div class="tabContent" id="system">

<div class="admin-card">

<h3>システム情報</h3>

<table class="admin-table">

<tr><th>項目</th><th>状態</th></tr>
<tr><td>Fantasy CMS</td><td>${CONFIG.VERSION}</td></tr>
<tr><td>Worker</td><td id="workerStatus">確認中...</td></tr>
<tr><td>GAS</td><td id="gasStatus">確認中...</td></tr>
<tr><td>Cloudinary</td><td>接続済み</td></tr>

</table>

</div>

</div>

<div class="tabContent" id="seo">

<div class="admin-card">

<h3>SEO</h3>

<p>準備中</p>

</div>

</div>

`:""}

`;

initTabs();

if(user.role==="owner"||user.role==="admin"){
loadAdmins();
checkSystem();
const btn=document.querySelector("#addAdminBtn");
if(btn)btn.onclick=openAddAdminModal;
}

document.querySelector("#changePasswordBtn").onclick=changePassword;

}

/* ==========================================
   タブ
========================================== */

function initTabs(){

document.querySelectorAll(".tab").forEach(tab=>{

tab.onclick=()=>{

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
document.querySelectorAll(".tabContent").forEach(t=>t.classList.remove("active"));

tab.classList.add("active");
document.getElementById(tab.dataset.tab).classList.add("active");

};

});

}

/* ==========================================
   管理者一覧
========================================== */

async function loadAdmins(){

const area=document.querySelector("#adminList");

area.innerHTML="読込み中...";

try{

const result=await adminGet("admins");

if(!result.success){

area.innerHTML=result.message;
return;

}

let html=`
<table class="admin-table">
<tr>
<th>名前</th>
<th>ID</th>
<th>権限</th>
<th>状態</th>
<th>操作</th>
</tr>
`;

result.admins.forEach(admin=>{

html+=`
<tr>
<td>${admin.name}</td>
<td>${admin.username}</td>
<td>${admin.role}</td>
<td>${admin.status}</td>
<td>
<button class="editAdmin" data-id="${admin.id}">編集</button>
</td>
</tr>
`;

});

html+="</table>";

area.innerHTML=html;

document.querySelectorAll(".editAdmin").forEach(btn=>{

btn.onclick=()=>{

const id=
Number(btn.dataset.id);

const admin=
result.admins.find(
item=>Number(item.id)===id
);

if(!admin){
return;
}

openEditAdminModal(admin);

};

});
}catch(error){

console.error(error);
area.innerHTML="読込みに失敗しました";

}

}

/* ==========================================
   管理者追加
========================================== */

function openAddAdminModal(){

const loginRole=localStorage.getItem("admin_role")||"staff";

openModal({

title:"管理者追加",

width:"520px",

body:`

<div class="form-group">
<label>ユーザーID</label>
<input type="text" id="adminUsername">
</div>

<div class="form-group">
<label>名前</label>
<input type="text" id="adminNameInput">
</div>

<div class="form-group">
<label>権限</label>
<select id="adminRole">
${loginRole==="owner"?`<option value="owner">owner</option>`:""}
<option value="admin">admin</option>
<option value="staff" selected>staff</option>
</select>
</div>

<div class="form-group">
<label>状態</label>
<select id="adminStatus">
<option value="active" selected>active</option>
<option value="inactive">inactive</option>
</select>
</div>

<p>初期パスワード：<strong>Fantasy@123</strong></p>

`,

buttons:[
{text:"キャンセル",click:closeModal},
{text:"保存",class:"primary",click:saveAdmin}
]

});

}

/* ==========================================
   保存
========================================== */

async function saveAdmin(){

const username=document.querySelector("#adminUsername").value.trim();
const name=document.querySelector("#adminNameInput").value.trim();
const role=document.querySelector("#adminRole").value;
const status=document.querySelector("#adminStatus").value;

if(!username){alert("ユーザーIDを入力してください");return;}
if(!name){alert("名前を入力してください");return;}

const result=await adminPost({
action:"saveAdmin",
username,
name,
role,
status
});

if(result.status!=="success"){
alert(result.message||"保存できませんでした");
return;
}

alert("管理者を追加しました");

closeModal();

loadAdmins();

}

/* ==========================================
   システム確認
========================================== */

async function checkSystem(){

try{

const worker=document.querySelector("#workerStatus");
const gas=document.querySelector("#gasStatus");

const result=await adminGet("dashboard");

if(result.status==="success"){

worker.textContent="正常";
gas.textContent="正常";

}else{

worker.textContent="異常";
gas.textContent="異常";

}

}catch(error){

document.querySelector("#workerStatus").textContent="異常";
document.querySelector("#gasStatus").textContent="異常";

}

}

/* ==========================================
   パスワード変更
========================================== */

async function changePassword(){

const current=document.querySelector("#currentPassword").value.trim();
const password=document.querySelector("#newPassword").value.trim();
const confirm=document.querySelector("#confirmPassword").value.trim();

if(!current){alert("現在のパスワードを入力してください");return;}
if(!password){alert("新しいパスワードを入力してください");return;}
if(password!==confirm){alert("確認用パスワードが一致しません");return;}

const result=await adminPost({
action:"changePassword",
currentPassword:current,
newPassword:password
});

if(result.status==="success"){

alert("変更しました");

document.querySelector("#currentPassword").value="";
document.querySelector("#newPassword").value="";
document.querySelector("#confirmPassword").value="";

}else{

alert(result.message);

}

}

/* ==========================================
   管理者編集
========================================== */

function openEditAdminModal(admin){

const loginRole=
localStorage.getItem("admin_role")||"staff";

openModal({

title:"管理者編集",

width:"520px",

body:`

<div class="form-group">

<label>ユーザーID</label>

<input value="${admin.username}" disabled>

</div>


<div class="form-group">

<label>名前</label>

<input id="editAdminName" value="${admin.name}">

</div>


<div class="form-group">

<label>権限</label>

<select id="editAdminRole">

<option value="admin" ${admin.role==="admin"?"selected":""}>
admin
</option>

<option value="staff" ${admin.role==="staff"?"selected":""}>
staff
</option>

${loginRole==="owner"?
`
<option value="owner" ${admin.role==="owner"?"selected":""}>
owner
</option>
`
:""}

</select>

</div>


<div class="form-group">

<label>状態</label>

<select id="editAdminStatus">

<option value="active" ${admin.status==="active"?"selected":""}>
active
</option>

<option value="inactive" ${admin.status==="inactive"?"selected":""}>
inactive
</option>

</select>

</div>

`,

buttons:[

{
text:"キャンセル",
click:closeModal
},

{
text:"保存",
class:"primary",
click:()=>updateAdminData(admin.id)
}

]

});

}

/* ==========================================
   管理者更新
========================================== */

async function updateAdminData(id){

const name=
document.querySelector("#editAdminName").value.trim();

const role=
document.querySelector("#editAdminRole").value;

const status=
document.querySelector("#editAdminStatus").value;


const result=
await adminPost({

action:"updateAdmin",

id,

name,

role,

status

});


if(result.success){

alert("更新しました");

closeModal();

loadAdmins();

}else{

alert(result.message);

}

}

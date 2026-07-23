/* ==========================================
   Fantasy CMS
   System Admin
========================================== */

import { CONFIG } from "../config/config.js";

let editId=null;

const typeLabels={
    keep:"ボトルキープあり",
    no_keep:"ボトルキープなし",
    option:"追加料金",
    vip:"VIP"
};

export async function initSystemAdmin(){

document.querySelector(".content").innerHTML=`

<h2>System管理</h2>

<button id="addSystem">＋料金追加</button>

<hr>

<div id="systemList">読み込み中...</div>

<div id="systemForm" style="display:none;margin-top:30px;">

<h3>料金追加・編集</h3>

<label>種類</label><br>

<select id="systemType">

<option value="keep">ボトルキープあり</option>
<option value="no_keep">ボトルキープなし</option>
<option value="option">追加料金</option>
<option value="vip">VIP</option>

</select>

<br><br>

<label>項目名</label><br>
<input id="systemName">

<br><br>

<label>料金</label><br>
<input id="systemPrice">

<br><br>

<label>説明</label><br>
<input id="systemDescription">

<br><br>

<label>表示順</label><br>
<input id="systemSort" type="number" value="1">

<br><br>

<label>状態</label><br>

<select id="systemStatus">

<option value="公開">公開</option>
<option value="非公開">非公開</option>

</select>

<br><br>

<button id="saveSystem">保存</button>

</div>
`;

registerEvents();
loadSystem();

}


function registerEvents(){

addSystem.onclick=()=>{

editId=null;
resetForm();
systemForm.style.display="block";

};

saveSystem.onclick=saveSystem;

}


async function loadSystem(){

const list=systemList;

try{

const res=await fetch(`${CONFIG.API_URL}?action=system`);
const result=await res.json();

if(result.status!=="success"){
list.innerHTML="取得失敗";
return;
}

renderSystem(result.data);

}catch(e){

console.error(e);
list.innerHTML="通信エラー";

}

}



function renderSystem(items){

systemList.innerHTML="";

items.forEach(item=>{

systemList.innerHTML+=`

<div class="gallery-row">

<div class="gallery-info">

<h3>
${typeLabels[item.type] || item.type}
</h3>

<p>${item.name}</p>

<p>
¥${Number(item.price).toLocaleString()}
</p>

<small>
${item.description || ""}
</small>

</div>

<button class="edit" data-id="${item.id}">
編集
</button>

<button class="delete" data-id="${item.id}">
削除
</button>

</div>

`;

});


registerRowEvents();

}



function registerRowEvents(){

document.querySelectorAll(".edit")
.forEach(btn=>{

btn.onclick=()=>editSystem(btn.dataset.id);

});


document.querySelectorAll(".delete")
.forEach(btn=>{

btn.onclick=()=>deleteSystem(btn.dataset.id);

});

}



async function editSystem(id){

const res=
await fetch(`${CONFIG.API_URL}?action=system`);

const result=
await res.json();

const item=
result.data.find(
x=>Number(x.id)===Number(id)
);

if(!item)return;


editId=id;

systemType.value=item.type;
systemName.value=item.name;
systemPrice.value=item.price;
systemDescription.value=item.description;
systemSort.value=item.sort;
systemStatus.value=item.status;

systemForm.style.display="block";

}



async function saveSystem(){

const form=new FormData();

form.append(
"action",
editId?"updateSystem":"saveSystem"
);

if(editId){
form.append("id",editId);
}

form.append("type",systemType.value);
form.append("name",systemName.value);
form.append("price",systemPrice.value);
form.append("description",systemDescription.value);
form.append("sort",systemSort.value);
form.append("status",systemStatus.value);


const res=
await fetch(
CONFIG.API_URL,
{
method:"POST",
body:form
}
);


const result=
await res.json();


if(result.status==="success"){

alert("保存しました");

resetForm();

loadSystem();

}else{

alert(result.message);

}

}



async function deleteSystem(id){

if(!confirm("削除しますか？"))
return;


const form=new FormData();

form.append("action","deleteSystem");
form.append("id",id);


const res=
await fetch(
CONFIG.API_URL,
{
method:"POST",
body:form
}
);


const result=
await res.json();


if(result.status==="success"){

loadSystem();

}

}



function resetForm(){

systemType.value="keep";
systemName.value="";
systemPrice.value="";
systemDescription.value="";
systemSort.value=1;
systemStatus.value="公開";

}
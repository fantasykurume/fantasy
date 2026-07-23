/* ==========================================
   Fantasy CMS
   System Module
========================================== */

export function initSystem(items){

if(!items){
console.error("System Data Error");
return;
}

items=items
.filter(item=>item.status==="公開")
.sort((a,b)=>Number(a.sort)-Number(b.sort));


renderSystem(
"systemKeep",
items.filter(item=>item.type==="keep")
);

renderSystem(
"systemNoKeep",
items.filter(item=>item.type==="no_keep")
);

renderSystem(
"systemOption",
items.filter(item=>item.type==="option")
);

renderSystem(
"systemVip",
items.filter(item=>item.type==="vip")
);

}


function renderSystem(target,items){

const area=document.getElementById(target);

if(!area)return;

area.innerHTML="";


items.forEach(item=>{

const card=document.createElement("div");

card.className="system-item";

card.innerHTML=`

<h4>${item.name}</h4>

<p class="price">
¥${Number(item.price).toLocaleString()}
</p>

<p>
${item.description||""}
</p>

`;

area.appendChild(card);

});

}
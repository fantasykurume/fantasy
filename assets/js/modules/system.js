/* ==========================================
   Fantasy CMS
   System Module
========================================== */

export function initSystem(items){

    if(!items){
        console.error("System Data Error");
        return;
    }

    items = items
    .filter(item=>item.status==="公開")
    .sort((a,b)=>Number(a.sort)-Number(b.sort));


    const groups={};


    items.forEach(item=>{

        if(!groups[item.type]){
            groups[item.type]=[];
        }

        groups[item.type].push(item);

    });


    Object.keys(groups).forEach(type=>{

        let target =
        document.getElementById(
            "system"+capitalize(type)
        );


        if(!target){

            target =
            createSystemArea(type);

        }


        renderSystem(
            target,
            groups[type]
        );

    });

}


/* ==========================================
   表示エリア作成
========================================== */

function createSystemArea(type){

    const parent =
    document.querySelector(
        ".system-area"
    );


    if(!parent){
        return null;
    }


    const title =
    document.createElement("h3");

    const labels = {

    keep:"ボトルキープのお客様",

    no_keep:"ボトルキープなしのお客様",

    option:"追加料金",

    vip:"VIPプラン"

    };


    title.innerText =
    labels[type] || type;


    const area =
    document.createElement("div");


    area.id =
    "system"+capitalize(type);


    parent.appendChild(title);

    parent.appendChild(area);


    return area;

}


/* ==========================================
   System表示
========================================== */

function renderSystem(area,items){

    if(!area) return;


    area.innerHTML="";


    items.forEach(item=>{


        const card =
        document.createElement("div");


        card.className =
        "system-item";


        card.innerHTML=`

            <h4>
            ${item.name}
            </h4>

            <p class="price">
            ¥${Number(item.price).toLocaleString()}
            </p>

            <p>
            ${item.description || ""}
            </p>

        `;


        area.appendChild(card);


    });

}


/* ==========================================
   文字変換
========================================== */

function capitalize(str){

    return str.charAt(0).toUpperCase()
    + str.slice(1);

}
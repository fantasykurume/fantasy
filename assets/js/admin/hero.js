import { CONFIG } from "../config/config.js";

export async function initGalleryAdmin(){

    document.querySelector(".content").innerHTML = `

        <h2>Gallery管理</h2>

        <button id="addGallery">

            ＋画像追加

        </button>

        <hr style="margin:20px 0;">

        <div id="galleryList">

            読み込み中...

        </div>

    `;

    loadGallery();

}

async function loadGallery(){

    const list = document.getElementById("galleryList");

    try{

        const response = await fetch(

            `${CONFIG.API_URL}?action=gallery`

        );

        const result = await response.json();

        if(result.status!=="success"){

            list.innerHTML="取得できません";

            return;

        }

        renderGallery(result.data);

    }catch(e){

        console.error(e);

        list.innerHTML="通信エラー";

    }

}

function renderGallery(items){

    const list=document.getElementById("galleryList");

    list.innerHTML="";

    items.forEach(item=>{

        list.innerHTML+=`

        <div class="gallery-row">

            <img
                src="${item.image_url}"
                class="thumb">

            <div class="gallery-info">

                <h3>${item.title}</h3>

                <p>${item.description}</p>

            </div>

            <button class="edit">

                編集

            </button>

            <button class="delete">

                削除

            </button>

        </div>

        `;

    });

}
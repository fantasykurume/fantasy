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

    document
     .getElementById("addGallery")
     .addEventListener("click",()=>{

    document
    .getElementById("galleryForm")
    .style.display="block";

    });

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
            
          <button id="addGallery">

    ＋画像追加

</button>

<div id="galleryForm" style="display:none;">

    <h3>Gallery追加</h3>

    <input
        id="galleryTitle"
        type="text"
        placeholder="タイトル">

    <textarea
        id="galleryDescription"
        placeholder="説明"></textarea>

    <select id="galleryCategory">

        <option value="interior">
            interior
        </option>

        <option value="food">
            food
        </option>

        <option value="event">
            event
        </option>

    </select>

    <input
        id="gallerySort"
        type="number"
        value="1">

    <button id="uploadButton">

        📷画像アップロード

    </button>

    <input
        id="galleryImage"
        readonly
        placeholder="画像URL">

    <img
        id="previewImage"
        style="
            max-width:300px;
            display:block;
            margin-top:15px;
        ">

    <button id="saveGallery">

        保存

    </button>

</div><button id="addGallery">

    ＋画像追加

</button>

<div id="galleryForm" style="display:none;">

    <h3>Gallery追加</h3>

    <input
        id="galleryTitle"
        type="text"
        placeholder="タイトル">

    <textarea
        id="galleryDescription"
        placeholder="説明"></textarea>

    <select id="galleryCategory">

        <option value="interior">
            interior
        </option>

        <option value="food">
            food
        </option>

        <option value="event">
            event
        </option>

    </select>

    <input
        id="gallerySort"
        type="number"
        value="1">

    <button id="uploadButton">

        📷画像アップロード

    </button>

    <input
        id="galleryImage"
        readonly
        placeholder="画像URL">

    <img
        id="previewImage"
        style="
            max-width:300px;
            display:block;
            margin-top:15px;
        ">

    <button id="saveGallery">

        保存

    </button>

</div>

        </div>

        `;

    });

}
import { CONFIG } from "../config/config.js";
import { openUpload } from "./upload.js";

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

        <div
            id="galleryForm"
            style="display:none;margin-top:30px;">

            <h3>Gallery追加</h3>

            <input
                id="galleryTitle"
                type="text"
                placeholder="タイトル">

            <br><br>

            <textarea
                id="galleryDescription"
                placeholder="説明"></textarea>

            <br><br>

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

            <br><br>

            <input
                id="gallerySort"
                type="number"
                value="1">

            <br><br>

            <button id="uploadButton">

                📷画像アップロード

            </button>

            <br><br>

            <input
                id="galleryImage"
                readonly
                placeholder="画像URL">

            <br><br>

            <img
                id="previewImage"
                style="
                    max-width:300px;
                    display:block;
                ">

            <br>

            <button id="saveGallery">

                保存

            </button>

        </div>

    `;

    document
        .getElementById("addGallery")
        .addEventListener("click",()=>{

            document
                .getElementById("galleryForm")
                .style.display="block";

        });

    document
        .getElementById("uploadButton")
        .addEventListener("click",()=>{

            openUpload(url=>{

                document
                    .getElementById("galleryImage")
                    .value=url;

                document
                    .getElementById("previewImage")
                    .src=url;

            });

        });

    document
        .getElementById("saveGallery")
        .addEventListener("click",saveGallery);

    loadGallery();

}

async function loadGallery(){

    const list =
        document.getElementById("galleryList");

    try{

        const response =
            await fetch(

                `${CONFIG.API_URL}?action=gallery`

            );

        const result =
            await response.json();

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

    const list =
        document.getElementById("galleryList");

    list.innerHTML = "";

    items.forEach(item=>{

        list.innerHTML += `

            <div class="gallery-row">

                <img
                    src="${item.image_url}"
                    class="thumb">

                <div class="gallery-info">

                    <h3>${item.title}</h3>

                    <p>${item.description}</p>

                </div>

                <button
                    class="edit">

                    編集

                </button>

                <button
                    class="delete">

                    削除

                </button>

            </div>

        `;

    });

}

async function saveGallery(){

    const title =
        document
            .getElementById("galleryTitle")
            .value
            .trim();

    const description =
        document
            .getElementById("galleryDescription")
            .value
            .trim();

    const image_url =
        document
            .getElementById("galleryImage")
            .value
            .trim();

    const category =
        document
            .getElementById("galleryCategory")
            .value;

    const sort =
        document
            .getElementById("gallerySort")
            .value;

    if(title===""){

        alert("タイトルを入力してください");

        return;

    }

    if(image_url===""){

        alert("画像をアップロードしてください");

        return;

    }

    const form = new FormData();

    form.append("action","saveGallery");

    form.append("title",title);

    form.append("description",description);

    form.append("image_url",image_url);

    form.append("category",category);

    form.append("sort",sort);

    try{

        const response =
            await fetch(

                CONFIG.API_URL,

                {

                    method:"POST",

                    body:form

                }

            );

        const result =
            await response.json();

        if(result.status==="success"){

            alert("保存しました");

            document
                .getElementById("galleryForm")
                .style.display="none";

            document
                .getElementById("galleryTitle")
                .value="";

            document
                .getElementById("galleryDescription")
                .value="";

            document
                .getElementById("galleryImage")
                .value="";

            document
                .getElementById("previewImage")
                .src="";

            document
                .getElementById("gallerySort")
                .value="1";

            loadGallery();

        }else{

            alert("保存に失敗しました");

        }

    }catch(e){

        console.error(e);

        alert("通信エラー");

    }

}
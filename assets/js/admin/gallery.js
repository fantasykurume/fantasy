/* ==========================================
   Gallery Admin
========================================== */

import { CONFIG } from "../config/config.js";
import { openUpload } from "./upload.js";

/* ==========================================
   編集モード
========================================== */

let editId = null;

/* ==========================================
   初期化
========================================== */

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
            style="
                display:none;
                margin-top:30px;
            ">

            <h3>

                Gallery追加・編集

            </h3>

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

            <button
                id="uploadButton">

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
                    display:none;
                    border-radius:8px;
                ">

            <br><br>

            <button
                id="saveGallery">

                保存

            </button>

        </div>

    `;

    registerEvents();

    loadGallery();

}

/* ==========================================
   イベント登録
========================================== */

function registerEvents(){

    document
        .getElementById("addGallery")
        .addEventListener(
            "click",
            showForm
        );

    document
        .getElementById("uploadButton")
        .addEventListener(
            "click",
            uploadImage
        );

    document
        .getElementById("saveGallery")
        .addEventListener(
            "click",
            saveGallery
        );

}

/* ==========================================
   フォーム表示
========================================== */

function showForm(){

    editId = null;

    resetForm();

    document
        .getElementById("galleryForm")
        .style.display = "block";

}

/* ==========================================
   Cloudinary Upload
========================================== */

function uploadImage(){

    openUpload(url=>{

        document
            .getElementById("galleryImage")
            .value = url;

        const preview =
            document.getElementById("previewImage");

        preview.src = url;

        preview.style.display = "block";

    });

}

/* ==========================================
   Gallery取得
========================================== */

async function loadGallery(){

    const list =
        document.getElementById("galleryList");

    list.innerHTML = "読み込み中...";

    try{

        const response =
            await fetch(

                `${CONFIG.API_URL}?action=gallery`

            );

        const result =
            await response.json();

        if(result.status !== "success"){

            list.innerHTML = "取得できません";

            return;

        }

        renderGallery(result.data || []);

    }catch(error){

        console.error(error);

        list.innerHTML = "通信エラー";

    }

}

/* ==========================================
   Gallery一覧
========================================== */

function renderGallery(items){

    const list =
        document.getElementById("galleryList");

    list.innerHTML = "";

    if(items.length===0){

        list.innerHTML = `

            <p>

                Galleryはまだありません。

            </p>

        `;

        return;

    }

    items.forEach(item=>{

        list.innerHTML += `

            <div
                class="gallery-row">

                <img
                    src="${item.image_url}"
                    class="thumb">

                <div class="gallery-info">

                    <h3>

                        ${item.title}

                    </h3>

                    <p>

                        ${item.description}

                    </p>

                    <small>

                        ${item.category}

                    </small>

                </div>

                <button
                    class="edit"
                    data-id="${item.id}">

                    編集

                </button>

                <button
                    class="delete"
                    data-id="${item.id}">

                    削除

                </button>

            </div>

        `;

    });

    registerRowEvents();

}

/* ==========================================
   一覧イベント
========================================== */

function registerRowEvents(){

    document
        .querySelectorAll(".edit")
        .forEach(button=>{

            button.addEventListener(

                "click",

                ()=>{

                    editGallery(

                        button.dataset.id

                    );

                }

            );

        });

    document
        .querySelectorAll(".delete")
        .forEach(button=>{

            button.addEventListener(

                "click",

                ()=>{

                    deleteGallery(

                        button.dataset.id

                    );

                }

            );

        });

}

/* ==========================================
   編集
========================================== */

async function editGallery(id){

    try{

        const response =
            await fetch(

                `${CONFIG.API_URL}?action=gallery`

            );

        const result =
            await response.json();

        if(result.status!=="success"){

            alert("データ取得失敗");

            return;

        }

        const item =
            result.data.find(

                x=>Number(x.id)===Number(id)

            );

        if(!item){

            alert("データがありません");

            return;

        }

        editId = id;

        document
            .getElementById("galleryForm")
            .style.display="block";

        document
            .getElementById("galleryTitle")
            .value=item.title;

        document
            .getElementById("galleryDescription")
            .value=item.description;

        document
            .getElementById("galleryCategory")
            .value=item.category;

        document
            .getElementById("gallerySort")
            .value=item.sort;

        document
            .getElementById("galleryImage")
            .value=item.image_url;

        const preview =
            document.getElementById("previewImage");

        preview.src=item.image_url;

        preview.style.display="block";

    }catch(error){

        console.error(error);

        alert("通信エラー");

    }

}

/* ==========================================
   保存
========================================== */

async function saveGallery(){

    const title =
        document.getElementById("galleryTitle").value.trim();

    const description =
        document.getElementById("galleryDescription").value.trim();

    const image_url =
        document.getElementById("galleryImage").value.trim();

    const category =
        document.getElementById("galleryCategory").value;

    const sort =
        document.getElementById("gallerySort").value;

    if(title===""){

        alert("タイトルを入力してください");

        return;

    }

    if(image_url===""){

        alert("画像をアップロードしてください");

        return;

    }

    const form =
        new FormData();

    if(editId){

        form.append("action","updateGallery");

        form.append("id",editId);

    }else{

        form.append("action","saveGallery");

    }

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

            resetForm();

            loadGallery();

        }else{

            alert(result.message);

        }

    }catch(error){

        console.error(error);

        alert("通信エラー");

    }

}

/* ==========================================
   フォーム初期化
========================================== */

function resetForm(){

    editId = null;

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
        .getElementById("galleryCategory")
        .value="interior";

    document
        .getElementById("gallerySort")
        .value=1;

    const preview =
        document.getElementById("previewImage");

    preview.src="";

    preview.style.display="none";

    document
        .getElementById("galleryForm")
        .style.display="none";

}

/* ==========================================
   削除
========================================== */

async function deleteGallery(id){

    if(!confirm("この画像を削除しますか？")){

        return;

    }

    const form = new FormData();

    form.append("action","deleteGallery");

    form.append("id",id);

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

            loadGallery();

        }else{

            alert(result.message);

        }

    }catch(error){

        console.error(error);

        alert("通信エラー");

    }

}

/* ==========================================
   終了
========================================== */
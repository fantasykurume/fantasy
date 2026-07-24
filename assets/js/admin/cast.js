/* ==========================================
   Cast Admin
========================================== */

import { CONFIG } from "../config/config.js";
import { adminGet,adminPostForm } from "./api.js";
import { openUpload } from "./upload.js";


let editId = null;



/* ==========================================
   初期化
========================================== */

export async function initCastAdmin(){

    document.getElementById("currentPage").innerText="Cast管理";
    document.getElementById("pageContent").innerHTML = `


    <h2>CAST管理</h2>


    <button id="addCast">

        ＋CAST追加

    </button>


    <hr>


    <div id="castList">

        読み込み中...

    </div>



    <div id="castForm"
    style="display:none;">


        <h3>
            CAST追加・編集
        </h3>



        <input
        id="castName"
        placeholder="名前">



        <br><br>



        <button id="uploadButton">

            📷画像アップロード

        </button>



        <br><br>



        <input
        id="castImage"
        readonly
        placeholder="画像URL">



        <br><br>



        <img
        id="previewImage"
        style="
        max-width:300px;
        display:none;
        ">



        <br><br>



        表示順



        <input
        id="castSort"
        type="number"
        placeholder="自動">



        <br><br>



        公開状態



        <select id="castStatus">


            <option value="公開">
                公開
            </option>


            <option value="非公開">
                非公開
            </option>


        </select>



        <br><br>



        <button id="saveCast">

            保存

        </button>



    </div>


    `;



    registerEvents();


    loadCast();


}





/* ==========================================
   Events
========================================== */


function registerEvents(){


    document
    .getElementById("addCast")
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
    .getElementById("saveCast")
    .addEventListener(
        "click",
        saveCast
    );


}





/* ==========================================
   Form
========================================== */
function showForm(){

    editId = null;

    resetForm();

    const form = document.getElementById("castForm");

    form.style.display = "block";

    form.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });

}

/* ==========================================
   Upload
========================================== */


function uploadImage(){


    openUpload(url=>{


        document
        .getElementById("castImage")
        .value=url;



        const img =
        document.getElementById(
            "previewImage"
        );



        img.src =
        getThumb(url);



        img.style.display="block";


    });


}






/* ==========================================
   Load
========================================== */


async function loadCast(){


    const result=
    await adminGet("cast");



    if(result.status!=="success"){

        return;

    }



    renderCast(
        result.data || []
    );


}

/* ==========================================
   Render
========================================== */


function renderCast(items){


    const list =
    document.getElementById(
        "castList"
    );



    list.innerHTML="";



    items

    .sort(
        (a,b)=>
        Number(a.sort || 999)
        -
        Number(b.sort || 999)
    )

    .forEach(item=>{



        list.innerHTML += `



        <div class="gallery-row">


            <img

            src="${getThumb(item.image_url)}"

            class="thumb">



            <div>


                <h3>

                ${item.name}

                </h3>


                <p>

                表示順:${item.sort}

                <br>

                状態:${item.status}

                </p>


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
   Thumbnail
========================================== */


function getThumb(url){


    if(!url)
    return "";



    return url.replace(

        "/upload/",

        "/upload/w_300,h_300,c_fill,g_face,q_auto,f_auto/"

    );


}







/* ==========================================
   Row Events
========================================== */


function registerRowEvents(){


    document
    .querySelectorAll(".edit")
    .forEach(btn=>{


        btn.onclick=()=>{

            editCast(
                btn.dataset.id
            );

        };


    });




    document
    .querySelectorAll(".delete")
    .forEach(btn=>{


        btn.onclick=()=>{

            deleteCast(
                btn.dataset.id
            );

        };


    });


}







/* ==========================================
   Edit
========================================== */


async function editCast(id){


    const result=
      await adminGet("cast");



    const item =
    result.data.find(
        x=>Number(x.id)===Number(id)
    );



    if(!item)
    return;



    editId=id;



    document
    .getElementById("castForm")
    .style.display="block";



    document
    .getElementById("castName")
    .value=item.name;



    document
    .getElementById("castImage")
    .value=item.image_url;



    document
    .getElementById("castSort")
    .value=item.sort;



    document
    .getElementById("castStatus")
    .value=item.status;



    const img =
    document.getElementById(
        "previewImage"
    );



    img.src =
    getThumb(item.image_url);



    img.style.display="block";


}








/* ==========================================
   Save
========================================== */


async function saveCast(){



    const form =
    new FormData();




    if(editId){


        form.append(
            "action",
            "updateCast"
        );


        form.append(
            "id",
            editId
        );



    }else{


        form.append(
            "action",
            "saveCast"
        );


    }






    form.append(
        "name",
        document
        .getElementById("castName")
        .value.trim()
    );



    form.append(
        "image_url",
        document
        .getElementById("castImage")
        .value
    );



    form.append(
        "sort",
        document
        .getElementById("castSort")
        .value
    );



    form.append(
        "status",
        document
        .getElementById("castStatus")
        .value
    );


    const result=
await adminPostForm(form);


    if(result.status==="success"){


        alert("保存しました");


        resetForm();


        loadCast();



    }else{


        alert(
            result.message
        );


    }



}







/* ==========================================
   Delete
========================================== */


async function deleteCast(id){



    if(
        !confirm(
            "削除しますか？"
        )
    )
    return;

    const form =
    new FormData();



    form.append(
        "action",
        "deleteCast"
    );



    form.append(
        "id",
        id
    );

    const result=
      await adminPostForm(form);

    if(result.status==="success"){


        loadCast();


    }else{


        alert(
            result.message
        );


    }


}






/* ==========================================
   Reset
========================================== */


function resetForm(){


    editId=null;



    document
    .getElementById("castName")
    .value="";



    document
    .getElementById("castImage")
    .value="";



    document
    .getElementById("castSort")
    .value="";



    document
    .getElementById("castStatus")
    .value="公開";



    const img =
    document.getElementById(
        "previewImage"
    );



    img.src="";

    img.style.display="none";



    document
    .getElementById("castForm")
    .style.display="none";


}
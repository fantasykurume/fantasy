/* ==========================================
   Fantasy CMS
   System Admin
========================================== */

import { CONFIG } from "../config/config.js";


let editId = null;



export async function initSystemAdmin(){


    document.querySelector(".content").innerHTML = `

        <h2>System管理</h2>


        <button id="addSystem">

            ＋料金追加

        </button>


        <hr style="margin:20px 0;">


        <div id="systemList">

            読み込み中...

        </div>



        <div
        id="systemForm"
        style="display:none;margin-top:30px;">


            <h3>

                料金追加・編集

            </h3>



            <label>
            種類
            </label>

            <br>


            <select id="systemType">

                <option value="keep">
                    ボトルキープあり
                </option>


                <option value="no_keep">
                    ボトルキープなし
                </option>


            </select>


            <br><br>



            <label>
            項目名
            </label>

            <br>


            <input
            id="systemName"
            >


            <br><br>



            <label>
            料金
            </label>

            <br>


            <input
            id="systemPrice"
            >


            <br><br>



            <label>
            説明
            </label>

            <br>


            <input
            id="systemDescription"
            >


            <br><br>



            <label>
            表示順
            </label>

            <br>


            <input
            id="systemSort"
            type="number"
            value="1"
            >


            <br><br>



            <label>
            状態
            </label>

            <br>


            <select id="systemStatus">


                <option value="公開">
                    公開
                </option>


                <option value="非公開">
                    非公開
                </option>


            </select>


            <br><br>


            <button id="saveSystem">

                保存

            </button>


        </div>


    `;



    registerEvents();

    loadSystem();


}





function registerEvents(){


    document
    .getElementById("addSystem")
    .onclick=()=>{


        editId=null;

        resetForm();


        document
        .getElementById("systemForm")
        .style.display="block";


    };


    document
    .getElementById("saveSystem")
    .onclick=saveSystem;


}







async function loadSystem(){


    const list =
    document.getElementById("systemList");


    try{


        const response =
        await fetch(

            `${CONFIG.API_URL}?action=system`

        );


        const result =
        await response.json();



        if(result.status!=="success"){

            list.innerHTML=
            "取得失敗";

            return;

        }



        renderSystem(result.data);



    }catch(e){


        console.error(e);


        list.innerHTML=
        "通信エラー";


    }


}






function renderSystem(items){


    const list =
    document.getElementById("systemList");


    list.innerHTML="";



    items.forEach(item=>{


        list.innerHTML += `


        <div class="gallery-row">


            <div class="gallery-info">


                <h3>

                ${
                    item.type==="keep"
                    ?
                    "ボトルキープあり"
                    :
                    "ボトルキープなし"
                }

                </h3>


                <p>
                ${item.name}
                </p>


                <p>
                ¥${Number(item.price).toLocaleString()}
                </p>


                <small>
                ${item.description}
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







function registerRowEvents(){


    document
    .querySelectorAll(".edit")
    .forEach(btn=>{


        btn.onclick=()=>{

            editSystem(btn.dataset.id);

        };


    });



    document
    .querySelectorAll(".delete")
    .forEach(btn=>{


        btn.onclick=()=>{

            deleteSystem(btn.dataset.id);

        };


    });


}








async function editSystem(id){


    const response =
    await fetch(

        `${CONFIG.API_URL}?action=system`

    );


    const result =
    await response.json();



    const item =
    result.data.find(

        x=>Number(x.id)===Number(id)

    );



    if(!item)return;



    editId=id;



    document
    .getElementById("systemType")
    .value=item.type;


    document
    .getElementById("systemName")
    .value=item.name;


    document
    .getElementById("systemPrice")
    .value=item.price;


    document
    .getElementById("systemDescription")
    .value=item.description;


    document
    .getElementById("systemSort")
    .value=item.sort;


    document
    .getElementById("systemStatus")
    .value=item.status;



    document
    .getElementById("systemForm")
    .style.display="block";


}








async function saveSystem(){


    const form =
    new FormData();



    form.append(

        "action",

        editId
        ?
        "updateSystem"
        :
        "saveSystem"

    );



    if(editId){

        form.append(
            "id",
            editId
        );

    }



    form.append(
        "type",
        systemType.value
    );


    form.append(
        "name",
        systemName.value
    );


    form.append(
        "price",
        systemPrice.value
    );


    form.append(
        "description",
        systemDescription.value
    );


    form.append(
        "sort",
        systemSort.value
    );


    form.append(
        "status",
        systemStatus.value
    );




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


        loadSystem();


    }else{


        alert(result.message);


    }


}








async function deleteSystem(id){


    if(!confirm("削除しますか？"))
    return;



    const form =
    new FormData();


    form.append(
        "action",
        "deleteSystem"
    );


    form.append(
        "id",
        id
    );



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
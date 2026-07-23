/* ==========================================
   Fantasy CMS
   News Admin
========================================== */

import { CONFIG } from "../config/config.js";


export async function initNewsAdmin(){


    document.querySelector(".content").innerHTML = `


        <h2>News管理</h2>


        <button id="addNews">
            ＋新規追加
        </button>


        <hr>


        <div id="newsForm"></div>


        <div id="newsList">
            読み込み中...
        </div>


    `;


    document
    .getElementById("addNews")
    .onclick = ()=>{

        showNewsForm();

    };


    loadNews();

}







async function loadNews(){


    const list =
    document.getElementById("newsList");


    try{


        const res =
        await fetch(
            `${CONFIG.API_URL}?action=news`
        );


        const result =
        await res.json();



        if(result.status!=="success"){

            list.innerHTML =
            "取得失敗";

            return;

        }



        renderNews(result.data);



    }catch(e){


        console.error(e);


        list.innerHTML =
        "通信エラー";


    }


}







function renderNews(items){


    const list =
    document.getElementById("newsList");


    list.innerHTML="";



    items
    .sort(
        (a,b)=>
        Number(a.sort)-Number(b.sort)
    )
    .forEach(item=>{


        list.innerHTML += `


        <div class="news-row">


            <div>


                <h3>
                ${item.title}
                </h3>


                <p>
                ${item.date}
                </p>


                <p>
                ${item.description || ""}
                </p>


                <span>
                ${item.status}
                </span>


            </div>



            <button
            class="edit-news"
            data-id="${item.id}">
                編集
            </button>



            <button
            class="delete-news"
            data-id="${item.id}">
                削除
            </button>


        </div>


        `;


    });



    document
    .querySelectorAll(".edit-news")
    .forEach(btn=>{


        btn.onclick=()=>{


            const item =
            items.find(
                x=>String(x.id)
                ===
                btn.dataset.id
            );


            showNewsForm(item);


        };


    });





    document
    .querySelectorAll(".delete-news")
    .forEach(btn=>{


        btn.onclick=()=>{


            deleteNews(
                btn.dataset.id
            );


        };


    });


}







function showNewsForm(item={}){


    document
    .getElementById("newsForm")
    .innerHTML = `


    <div class="news-form">


        <input
        id="newsId"
        type="hidden"
        value="${item.id || ""}">



        <input
        id="newsDate"
        placeholder="日付"
        value="${item.date || ""}">



        <input
        id="newsTitle"
        placeholder="タイトル"
        value="${item.title || ""}">



        <textarea
        id="newsDescription"
        placeholder="概要">${item.description || ""}</textarea>



        <textarea
        id="newsContent"
        placeholder="本文">${item.content || ""}</textarea>



        <input
        id="newsImage"
        placeholder="画像URL"
        value="${item.image_url || ""}">



        <input
        id="newsSort"
        placeholder="表示順"
        value="${item.sort || 1}">



        <select id="newsStatus">

            <option
            ${item.status==="公開"?"selected":""}>
                公開
            </option>

            <option
            ${item.status==="非公開"?"selected":""}>
                非公開
            </option>

        </select>



        <button id="saveNews">
            保存
        </button>



    </div>


    `;



    document
    .getElementById("saveNews")
    .onclick =
    saveNews;


}








async function saveNews(){


    const id =
    document.getElementById("newsId").value;



    const params =
    new URLSearchParams();


    params.append(
        "action",
        id
        ?
        "updateNews"
        :
        "saveNews"
    );


    params.append(
        "id",
        id
    );


    params.append(
        "date",
        document.getElementById("newsDate").value
    );


    params.append(
        "title",
        document.getElementById("newsTitle").value
    );


    params.append(
        "description",
        document.getElementById("newsDescription").value
    );


    params.append(
        "content",
        document.getElementById("newsContent").value
    );


    params.append(
        "image_url",
        document.getElementById("newsImage").value
    );


    params.append(
        "sort",
        document.getElementById("newsSort").value
    );


    params.append(
        "status",
        document.getElementById("newsStatus").value
    );



    const res =
    await fetch(

        CONFIG.API_URL,

        {

            method:"POST",

            body:params

        }

    );



    const result =
    await res.json();



    if(result.status==="success"){


        alert(
            "保存しました"
        );


        initNewsAdmin();


    }else{


        alert(
            result.message
        );


    }


}







async function deleteNews(id){


    if(!confirm("削除しますか？"))
    return;



    const params =
    new URLSearchParams();


    params.append(
        "action",
        "deleteNews"
    );


    params.append(
        "id",
        id
    );



    const res =
    await fetch(

        CONFIG.API_URL,

        {

            method:"POST",

            body:params

        }

    );



    const result =
    await res.json();



    if(result.status==="success"){

        initNewsAdmin();

    }else{

        alert(
            result.message
        );

    }


}
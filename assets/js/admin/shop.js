/* ==========================================
   Fantasy CMS
   Shop Admin
========================================== */

import { adminGet } from "./api.js";


export async function initShopAdmin(){


    document.querySelector(".content").innerHTML = `


    <h2>店舗情報管理</h2>


    <div id="shopForm">

        読み込み中...

    </div>


    `;


    loadShop();


}




async function loadShop(){


    const area =
        document.getElementById(
            "shopForm"
        );


    try{


        const result =
            await adminGet("shop");



        if(result.status!=="success"){

            area.innerHTML =
            "取得失敗";

            return;

        }



        const shop =
            result.data[0];



        area.innerHTML = `


        <label>
        店舗名
        </label>

        <br>

        <input
        id="shopName"
        value="${shop.shop_name || ""}"
        >


        <br><br>



        <label>
        キャッチコピー
        </label>

        <br>

        <input
        id="shopCatch"
        value="${shop.catch_copy || ""}"
        >


        <br><br>


        <label>
        説明
        </label>

        <br>

        <textarea
        id="shopDescription">${shop.description || ""}</textarea>


        <br><br>

        <label>
        住所
        </label>

        <br>

        <input
        id="shopAddress"
        value="${shop.address || ""}"
        >

        <br><br>

        <label>
        電話番号
        </label>

        <br>

        <input
        id="shopPhone"
        value="${shop.phone || ""}"
        >


        <br><br>



        <label>
        営業時間
        </label>

        <br>

        <input
        id="shopHours"
        value="${shop.business_hours || ""}"
        >


        <br><br>



        <label>
        定休日
        </label>

        <br>

        <input
        id="shopHoliday"
        value="${shop.holiday || ""}"
        >


        <br><br>



        <button id="saveShop">

            保存

        </button>



        `;



        document
        .getElementById("saveShop")
        .addEventListener(
            "click",
            saveShop
        );



    }catch(e){


        console.error(e);

        area.innerHTML =
        "通信エラー";


    }


}






async function saveShop(){


    const form =
        new FormData();



    form.append(
        "action",
        "updateShop"
    );



    form.append(
        "shop_name",
        document
        .getElementById("shopName")
        .value
    );



    form.append(
        "catch_copy",
        document
        .getElementById("shopCatch")
        .value
    );



    form.append(
        "description",
        document
        .getElementById("shopDescription")
        .value
    );

    form.append(
        "address",
        document
        .getElementById("shopAddress")
        .value
    );

    form.append(
        "phone",
        document
        .getElementById("shopPhone")
        .value
    );



    form.append(
        "business_hours",
        document
        .getElementById("shopHours")
        .value
    );



    form.append(
        "holiday",
        document
        .getElementById("shopHoliday")
        .value
    );




    try{


        const response =
            await fetch(

                "https://fantasy-api.fantasykurume0820.workers.dev",

                {

                    method:"POST",

                    body:form

                }

            );



        const result =
            await response.json();



        if(result.status==="success"){


            alert("保存しました");


        }else{


            alert(
                result.message ||
                "保存失敗"
            );


        }



    }catch(e){


        console.error(e);

        alert("通信エラー");


    }


}
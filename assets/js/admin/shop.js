/* ==========================================
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
        id="shopDescription">

        ${shop.description || ""}

        </textarea>


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


        <button id="saveShop">

            保存

        </button>


        `;



    }catch(e){

        console.error(e);

        area.innerHTML =
        "通信エラー";

    }


}
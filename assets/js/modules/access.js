/* ==========================================
   Fantasy CMS
   Access Module
========================================== */


import {
    fetchAPI
}
from "../api/api.js";



/**
 * Access 初期化
 */

export async function initAccess(){


    const result =

        await fetchAPI(
            "shop"
        );



    if(
        !result ||
        result.status !== "success"
    ){

        console.error(
            "Shop API Error"
        );

        return;

    }



    const shop =

        result.data[0];



    renderAccess(shop);


}




/**
 * Access表示
 */

function renderAccess(shop){


    const address =
        document.getElementById(
            "shopAddress"
        );


    const phone =
        document.getElementById(
            "shopPhone"
        );


    const sns =
        document.getElementById(
            "snsLinks"
        );



    if(address){

        address.textContent =
            shop.address || "";

    }



    if(phone){

        phone.textContent =
            shop.phone || "";

    }



    if(sns){

        sns.innerHTML = `


            <a
            href="${shop.instagram}"
            target="_blank">

                Instagram

            </a>


            <a
            href="${shop.line}"
            target="_blank">

                LINE

            </a>


        `;

    }


}
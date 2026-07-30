/* ==========================================
   Fantasy CMS
   Main
========================================== */

import { fetchAll } from "./api/api.js";

import { initMenu } from "./modules/menu.js";
import { initScroll } from "./modules/scroll.js";
import { initModal } from "./components/modal.js";
import { initShop } from "./modules/shop.js";
import { initHero } from "./modules/hero.js";
import { initGallery } from "./modules/gallery.js";
import { initNews } from "./modules/news.js";
import { initSystem } from "./modules/system.js";
import { initAccess } from "./modules/access.js";
import { initCast } from "./modules/cast.js";
import { applySEO } from "./modules/seo.js";


document.addEventListener(
"DOMContentLoaded",
async()=>{


    initMenu();

    initScroll();

    initModal();



    const data =
    await fetchAll();



    if(
        !data ||
        data.status!=="success"
    ){

        console.error(
            "API Error"
        );

        return;

    }



    /*
    ==============================
       SEO反映
    ==============================
    */

    applySEO(
        data.seo
    );



    const shop =
    data.shop?.[0];



    if(!shop){

        console.error(
            "Shop Data Missing"
        );

        return;

    }



    /*
    ==============================
       各モジュール初期化
    ==============================
    */


    initShop(
        shop
    );


    initHero(
        shop
    );


    initGallery(
        data.gallery
    );


    initNews(
        data.news
    );


    initSystem(
        data.system
    );


    initAccess(
        shop
    );


    initCast(
        data.cast
    );



    /*
    ==============================
       店舗名表示
    ==============================
    */


    const shopName =
    document.getElementById(
        "shopName"
    );


    if(shopName){

        shopName.innerText =
        shop.shop_name ||
        "Fantasy";

    }



    const footerShopName =
    document.getElementById(
        "footerShopName"
    );


    if(footerShopName){

        footerShopName.innerText =
        shop.shop_name ||
        "Fantasy";

    }



});

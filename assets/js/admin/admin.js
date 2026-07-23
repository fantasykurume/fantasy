/* ==========================================
   Fantasy CMS
   Admin Controller
========================================== */


import { initShopAdmin } from "./shop.js";
import { initGalleryAdmin } from "./gallery.js";
import { initCastAdmin } from "./cast.js";
import { initDashboardAdmin } from "./dashboard.js";


const pages = {


    dashboard:initDashboardAdmin,


    shop:initShopAdmin,


    gallery:initGalleryAdmin,


    cast:initCastAdmin


};






document.addEventListener(
"DOMContentLoaded",
()=>{


    const menu =
        document.querySelectorAll(
            ".admin-menu li"
        );



    menu.forEach(item=>{


        item.addEventListener(
            "click",
            ()=>{


                const page =
                    item.dataset.page;



                /*
                    active変更
                */


                menu.forEach(
                    m=>
                    m.classList.remove(
                        "active"
                    )
                );


                item.classList.add(
                    "active"
                );



                /*
                    ページ表示
                */


                if(pages[page]){


                    pages[page]();


                }



            }
        );


    });




    /*
        初期表示

        最初はDashboardではなく
        Gallery表示にしている
        必要なら変更可能
    */


    initDashboardAdmin();



});
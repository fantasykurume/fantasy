/* ==========================================
   Fantasy CMS
   Admin Controller
========================================== */


import { initGalleryAdmin } from "./gallery.js";
import { initCastAdmin } from "./cast.js";



const pages = {


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
                    m=>m.classList.remove(
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
    */

    initGalleryAdmin();



});
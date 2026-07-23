/* ==========================================
   Fantasy CMS
   Admin Controller
========================================== */


import { initGalleryAdmin } from "./gallery.js";
import { initCastAdmin } from "./cast.js";
import { initSystemAdmin } from "./system.js";
import { initDashboardAdmin } from "./dashboard.js";
import { initNewsAdmin } from "./news.js";

const pages = {

    dashboard:initDashboardAdmin,
    
    gallery:initGalleryAdmin,

    cast:initCastAdmin,

    news:initNewsAdmin,

    system:initSystemAdmin


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
                    m=>{

                        m.classList.remove(
                            "active"
                        );

                    }
                );



                item.classList.add(
                    "active"
                );



                /*
                    ページ表示
                */


                if(pages[page]){


                    pages[page]();


                }else{


                    document
                    .querySelector(".content")
                    .innerHTML = `

                        <h2>${item.innerText}</h2>

                        <p>
                            準備中です
                        </p>

                    `;


                }



            }
        );


    });




/*
    初期表示

    Dashboard
*/


const dashboard =
    document.querySelector(
        '[data-page="dashboard"]'
    );


if(dashboard){

    dashboard.classList.add(
        "active"
    );

}


initDashboardAdmin();

});
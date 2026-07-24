/* ==========================================
   Fantasy CMS
   Admin Auth Check
========================================== */

if(
    localStorage.getItem("fantasy_admin")
    !==
    "true"
){

    location.href="login.html";

}

/* ==========================================
   Fantasy CMS
   Admin Controller
========================================== */


import { initGalleryAdmin } from "./gallery.js";
import { initCastAdmin } from "./cast.js";
import { initSystemAdmin } from "./system.js";
import { initDashboardAdmin } from "./dashboard.js";
import { initNewsAdmin } from "./news.js";
import { initShopAdmin } from "./shop.js";

const adminName=
localStorage.getItem("admin_name")||"";


document.addEventListener(
"DOMContentLoaded",
()=>{

const nameBox=
document.getElementById("adminName");

if(nameBox){

nameBox.innerText=
"管理者："+adminName;

}

});

const pages = {

    dashboard:initDashboardAdmin,
    
    shop:initShopAdmin,
    
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

        /* 現在ページ表示追加 */

        const title =
        document.getElementById(
        "currentPage"
        );

        if(title){

        const labels={

        dashboard:"📊 Dashboard",
        shop:"🏢 店舗情報",
        gallery:"📷 Gallery",
        cast:"👩 Cast",
        news:"📰 News",
        system:"💰 System",
        settings:"⚙ Settings"

        };

        title.innerText =
        labels[page] || page;

        }

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

/* ==========================================
   Logout
========================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

const logoutButton=
document.getElementById(
"logoutButton"
);

if(!logoutButton)return;

logoutButton.onclick=()=>{

if(!confirm("ログアウトしますか？")){
return;
}

localStorage.removeItem(
"fantasy_admin"
);

localStorage.removeItem(
"admin_name"
);

localStorage.removeItem(
"admin_role"
);

location.replace(
"login.html"
);

};

});
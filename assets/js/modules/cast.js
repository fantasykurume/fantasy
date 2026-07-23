/* ==========================================
   Fantasy CMS
   Cast Module
========================================== */

import { fetchAPI } from "../api/api.js";
import { openModal } from "../components/modal.js";


export async function initCast(){


    const result =
        await fetchAPI("cast");


    if(!result || result.status !== "success"){

        console.error("Cast API Error");

        return;

    }



    const items =
        result.data

        .filter(
            item => item.status === "公開"
        )

        .sort(
            (a,b)=>Number(a.sort)-Number(b.sort)
        );



    renderCast(items);


}



/* ==========================================
   Cast表示
========================================== */

function renderCast(items){


    const grid =
        document.getElementById("castGrid");


    if(!grid) return;



    grid.innerHTML = "";



    items.forEach((item,index)=>{


        const box =
            document.createElement("div");


        box.className =
            "cast-item";



        box.innerHTML = `


            <div class="cast-name">

                ${item.name}

            </div>



            <div class="cast-photo">


                <img

               src="${getCastThumbnail(item.image_url)}"

               alt="${item.name}"

               loading="lazy">

            </div>

        `;

        /*
            名前クリック
            開閉
        */

        const name =
            box.querySelector(
                ".cast-name"
            );

        name.addEventListener(
            "click",
            ()=>{

                box.classList.toggle(
                    "open"
                );

            }
        );

        /*
            写真クリック
            Modal表示
        */

        const img =
            box.querySelector(
                ".cast-photo img"
            );



        img.addEventListener(
            "click",
            (e)=>{


                e.stopPropagation();



                openModal(

                    items,

                    index

                );


            }
        );



        grid.appendChild(box);



    });


}

function getCastImage(url){


    if(!url) return "";



    return url.replace(

        "/upload/",

        "/upload/c_fill,w_700,h_900,g_face,q_auto,f_auto/"

    );


}

function getCastThumbnail(url){

    if(!url) return "";

    return url.replace(

        "/upload/",

        "/upload/c_fill,w_700,h_900,g_face,q_auto,f_auto/"

    );

}
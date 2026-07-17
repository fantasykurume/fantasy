/* ==========================================
   Fantasy CMS
   Gallery Module
========================================== */

import {
    fetchAPI
}
from "../api/api.js";

import {
    CONFIG
}
from "../config/config.js";

import {
    openModal
}
from "../components/modal.js";


/**
 * Gallery 初期化
 */

export async function initGallery(){


    const result =

        await fetchAPI(
            "gallery"
        );


    if(
        !result ||
        result.status !== "success"
    ){

        console.error(
            "Gallery API Error"
        );

        return;

    }


    const gallery =

        result.data

        .filter(
            item =>
            item.status === "公開"
        )

        .sort(
            (a,b)=>
            Number(a.sort) -
            Number(b.sort)
        )

        .slice(
            0,
            CONFIG.GALLERY_LIMIT
        );


    renderGallery(
        gallery
    );

}


/**
 * Gallery表示
 */

function renderGallery(items){


    const grid =

        document.getElementById(
            "galleryGrid"
        );


    if(!grid){

        return;

    }


    grid.innerHTML = "";


    items.forEach(
        item=>{


            const card =

                document.createElement(
                    "article"
                );


            card.className =
                "gallery-card";


            card.innerHTML = `

                <img
                    src="${item.image_url}"
                    alt="${item.title}"
                    loading="lazy"
                >

                <div class="gallery-info">

                    <h3>

                        ${item.title}

                    </h3>

                    <p>

                        ${item.description || ""}

                    </p>

                </div>

            `;


            /* モーダル表示 */

            card.addEventListener(
                "click",
                ()=>{

                    openModal({

                        image:
                            item.image_url,

                        title:
                            item.title,

                        description:
                            item.description || ""

                    });

                }
            );


            grid.appendChild(
                card
            );


        }
    );

}
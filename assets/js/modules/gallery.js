/* ==========================================
   Fantasy CMS
   Gallery Module
========================================== */


import { openModal } from "../components/modal.js";



/*
    仮データ

    後でGASへ変更

    const galleryItems =
    await fetchAPI("/gallery");

*/

const galleryItems = [


    {
        id:1,

        title:"Main Floor",

        description:
        "落ち着いた雰囲気のメインフロア",

        image:
        "assets/images/gallery/gallery01.jpg",

        sort:1

    },


    {
        id:2,

        title:"VIP Room",

        description:
        "特別なお客様のためのVIP空間",

        image:
        "assets/images/gallery/gallery02.jpg",

        sort:2

    },


    {
        id:3,

        title:"Counter",

        description:
        "会話を楽しめるカウンター席",

        image:
        "assets/images/gallery/gallery03.jpg",

        sort:3

    }


];



/**
 * Gallery 初期化
 */

export function initGallery(){


    renderGallery();


}



/**
 * Gallery表示
 */

function renderGallery(){


    const container =
        document.getElementById(
            "galleryGrid"
        );


    if(!container) return;



    container.innerHTML = "";



    galleryItems

        .sort(
            (a,b)=>
            a.sort-b.sort
        )

        .forEach(item => {



            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "gallery-item fade-up";



            article.innerHTML = `


                <img

                    src="${item.image}"

                    alt="${item.title}"

                    loading="lazy"

                >



                <div class="gallery-overlay">


                    <h3>

                        ${item.title}

                    </h3>


                    <p>

                        ${item.description}

                    </p>


                </div>


            `;



            article.addEventListener(
                "click",
                ()=>{


                    openModal(item);


                }
            );



            container.appendChild(
                article
            );


        });


}
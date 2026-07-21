/* ==========================================
   Fantasy CMS
   Hero Module
========================================== */


import {
    fetchAPI
}
from "../api/api.js";


import {
    CONFIG
}
from "../config/config.js";



let heroTimer = null;



/**
 * Hero 初期化
 */

export async function initHero(){


    const result =

        await fetchAPI(
            "shop"
        );



    if(
        !result ||
        result.status !== "success"
    ){

        console.error(
            "Hero API Error"
        );

        return;

    }



    const shop =

        result.data[0];



    renderHeroText(shop);


    renderHeroImages(shop);


}



/**
 * タイトル・キャッチ表示
 */

function renderHeroText(shop){


    const title =

        document.getElementById(
            "heroTitle"
        );


    const catchCopy =

        document.getElementById(
            "heroCatch"
        );



    if(title){

        title.textContent =
            shop.shop_name || "";

    }



    if(catchCopy){

        catchCopy.textContent =
            shop.catch_copy || "";

    }


}



/**
 * Hero画像表示
 */

function renderHeroImages(shop){


    const slider =

        document.getElementById(
            "heroSlider"
        );



    if(!slider){

        return;

    }



    const images = [

        shop.hero_image_1,

        shop.hero_image_2,

        shop.hero_image_3

    ]

    .filter(
        image => image
    );



    if(
        images.length === 0
    ){

        return;

    }



    slider.innerHTML = "";



    images.forEach(
        (image,index)=>{


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "hero-slide";



            div.style.backgroundImage =

                `url(${image})`;



            if(index === 0){

                div.classList.add(
                    "active"
                );

            }



            slider.appendChild(
                div
            );


        }
    );



    startSlider();

}



/**
 * スライダー
 */

function startSlider(){


    const slides =

        document.querySelectorAll(
            ".hero-slide"
        );



    if(
        slides.length <= 1
    ){

        return;

    }



    let current = 0;



    heroTimer =

        setInterval(()=>{


            slides[current]
            .classList.remove(
                "active"
            );



            current++;



            if(
                current >= slides.length
            ){

                current = 0;

            }



            slides[current]
            .classList.add(
                "active"
            );



        },

        CONFIG.HERO_INTERVAL

    );


}
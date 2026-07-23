/* ==========================================
   Fantasy CMS
   Hero Module
========================================== */

import { CONFIG } from "../config/config.js";

let heroTimer = null;

/* Hero 初期化 */

export function initHero(shop){

    if(!shop){
        console.error("Hero Data Error");
        return;
    }

    renderHeroText(shop);
    renderHeroImages(shop);

}

/* タイトル・キャッチ表示 */

function renderHeroText(shop){

    const title = document.getElementById("heroTitle");
    const catchCopy = document.getElementById("heroCatch");

    if(title) title.textContent = shop.shop_name || "";
    if(catchCopy) catchCopy.textContent = shop.catch_copy || "";

}

/* Hero画像 */

function renderHeroImages(shop){

    const slider = document.getElementById("heroSlider");

    if(!slider) return;

    const images = [
        shop.hero_image_1,
        shop.hero_image_2,
        shop.hero_image_3
    ].filter(Boolean);

    if(images.length === 0) return;

    slider.innerHTML = "";

    images.forEach((image,index)=>{

        const slide = document.createElement("div");

        slide.className = "hero-slide";

        if(index===0){
            slide.classList.add("active");
        }

        slide.style.backgroundImage = `url(${image})`;

        slider.appendChild(slide);

    });

    startSlider();

}

/* スライダー */

function startSlider(){

    clearInterval(heroTimer);

    const slides = document.querySelectorAll(".hero-slide");

    if(slides.length <= 1) return;

    let current = 0;

    heroTimer = setInterval(()=>{

        slides[current].classList.remove("active");

        current = (current + 1) % slides.length;

        slides[current].classList.add("active");

    }, CONFIG.HERO_INTERVAL);

}
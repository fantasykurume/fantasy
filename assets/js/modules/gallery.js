/* ==========================================
   Fantasy CMS
   Gallery Module
========================================== */

import { CONFIG } from "../config/config.js";
import { openModal } from "../components/modal.js";

export function initGallery(items){

    if(!items) return;

    items = items
        .filter(item => item.status === "公開")
        .sort((a,b) => Number(a.sort) - Number(b.sort))
        .slice(0, CONFIG.GALLERY_LIMIT);

    renderGallery(items);

}

/* ==========================================
   Gallery表示
========================================== */

function renderGallery(items){

    const grid = document.getElementById("galleryGrid");

    if(!grid) return;

    grid.innerHTML = "";

    items.forEach((item,index)=>{

        const card = document.createElement("article");

        card.className = "gallery-card";

        card.innerHTML = `
            <img
                src="${item.image_url}"
                alt="${item.title}"
                loading="lazy">
            <div class="gallery-info">
                <h3>${item.title}</h3>
                <p>${item.description || ""}</p>
            </div>
        `;

        card.addEventListener("click",()=>{
            openModal(items,index);
        });

        grid.appendChild(card);

    });

}
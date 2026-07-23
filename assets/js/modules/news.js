/* ==========================================
   Fantasy CMS
   News Module
========================================== */

import { CONFIG } from "../config/config.js";

/* ==========================================
   初期化
========================================== */

export function initNews(items){

    if(!items){
        console.error("News Data Error");
        return;
    }

    items = items
        .filter(item=>item.status==="公開")
        .sort((a,b)=>Number(a.sort)-Number(b.sort))
        .slice(0,CONFIG.NEWS_LIMIT);

    renderNews(items);

}

/* ==========================================
   News表示
========================================== */

function renderNews(items){

    const list = document.getElementById("newsList");

    if(!list) return;

    list.innerHTML = "";

    items.forEach(item=>{

        const article = document.createElement("article");

        article.className = "news-card";

        article.innerHTML = `
            ${item.image_url ? `
                <img
                    src="${item.image_url}"
                    alt="${item.title}"
                    loading="lazy">
            ` : ""}

            <div class="news-content">
                <time>${item.date}</time>
                <h3>${item.title}</h3>
                <p>${item.description || ""}</p>
            </div>
        `;

        list.appendChild(article);

    });

}
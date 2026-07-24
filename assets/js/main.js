/* ==========================================
   Fantasy CMS
   Main
========================================== */

import { fetchAll } from "./api/api.js";

import { initMenu } from "./modules/menu.js";
import { initScroll } from "./modules/scroll.js";
import { initModal } from "./components/modal.js";
import { initShop } from "./modules/shop.js";
import { initHero } from "./modules/hero.js";
import { initGallery } from "./modules/gallery.js";
import { initNews } from "./modules/news.js";
import { initSystem } from "./modules/system.js";
import { initAccess } from "./modules/access.js";
import { initCast } from "./modules/cast.js";

document.addEventListener("DOMContentLoaded", async()=>{

    initMenu();
    initScroll();
    initModal();

    const data = await fetchAll();

    if(!data || data.status!=="success"){
        console.error("API Error");
        return;
    }

    const shop = data.shop[0];
    initShop(shop);
    initHero(shop);
    initGallery(data.gallery);
    initNews(data.news);
    initSystem(data.system);
    initAccess(shop);
    initCast(data.cast);

    document.getElementById("shopName").innerText =
shop.shop_name || "Fantasy";


document.getElementById("footerShopName").innerText =
shop.shop_name || "Fantasy";


document.getElementById("shopDescription").innerText =
shop.description || "";


document.getElementById("shopHours").innerText =
"営業時間："+(shop.business_hours || "");


document.getElementById("shopHoliday").innerText =
"定休日："+(shop.holiday || "");


document.title =
shop.shop_name || "Fantasy";


document.getElementById("metaDescription").content =
shop.meta_description || "";
   
});

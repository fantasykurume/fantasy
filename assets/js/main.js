/* ==========================================
   Fantasy CMS
   Main
========================================== */


import { initMenu } from "./modules/menu.js";

import { initScroll } from "./modules/scroll.js";

import { initHero } from "./modules/hero.js";

import { initModal } from "./components/modal.js";

import { initGallery } from "./modules/gallery.js";

import { initNews } from "./modules/news.js";

import { initSystem } from "./modules/system.js";

import { initAccess } from "./modules/access.js";

import { initCast } from "./modules/cast.js";

document.addEventListener(
"DOMContentLoaded",
async ()=>{


    initMenu();


    initScroll();


    await initHero();


    initModal();


    await initGallery();


    await initNews();


    await initSystem();


    await initAccess();

    await initCast();

});
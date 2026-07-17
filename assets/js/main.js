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



document.addEventListener(
"DOMContentLoaded",
()=>{


    initMenu();


    initScroll();


    initHero();


    initModal();


    initGallery();


    initNews();


    initSystem();


    initAccess();


});
/* ==========================================
   Main
   ========================================== */

import { initMenu } from "./modules/menu.js";
import { initScroll } from "./modules/scroll.js";
import { initHero } from "./modules/hero.js";
import { initGallery } from "./modules/gallery.js";

document.addEventListener("DOMContentLoaded", () => {

    initMenu();

    initScroll();

    initHero();

    initGallery();

});
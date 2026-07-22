import { initGalleryAdmin } from "./gallery.js";
import { initCastAdmin } from "./cast.js";


const pages = {

    gallery:initGalleryAdmin,

    cast:initCastAdmin

};



document.addEventListener(
"DOMContentLoaded",
()=>{


const menu =
document.querySelectorAll(
".admin-menu li"
);



menu.forEach(item=>{


item.addEventListener(
"click",
()=>{


const page =
item.dataset.page;



if(pages[page]){

    pages[page]();

}


});

});


initGalleryAdmin();


});
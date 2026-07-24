/* ==========================================
   Fantasy CMS
   Shop Display
========================================== */

export function initShop(shop){

if(!shop)return;


const name =
document.getElementById("shopName");

if(name){
name.innerText =
shop.shop_name || "Fantasy";
}


const title =
document.getElementById("heroTitle");

if(title){
title.innerText =
shop.shop_name || "Fantasy";
}


const catchCopy =
document.getElementById("heroCatch");

if(catchCopy){
catchCopy.innerText =
shop.catch_copy || "";
}


const description =
document.getElementById("shopDescription");

if(description){
description.innerText =
shop.description || "";
}


const address =
document.getElementById("shopAddress");

if(address){
address.innerText =
shop.address || "";
}


const phone =
document.getElementById("shopPhone");

if(phone){
phone.innerText =
shop.phone || "";
}


const footer =
document.getElementById("footerShopName");

if(footer){
footer.innerText =
shop.shop_name || "Fantasy";
}


const meta =
document.getElementById("metaDescription");

if(meta){
meta.content =
shop.meta_description || "";
}


}

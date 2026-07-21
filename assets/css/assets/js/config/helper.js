/* ==========================================
   Helper
========================================== */

export function $(selector){

    return document.querySelector(selector);

}

export function $$(selector){

    return document.querySelectorAll(selector);

}

export function createElement(tag,className=""){

    const element=document.createElement(tag);

    if(className){

        element.className=className;

    }

    return element;

}
/* ==========================================
   Fantasy CMS
   Admin API
========================================== */


import { CONFIG } from "../config/config.js";


// GET
export async function adminGet(action){

    const response = await fetch(
        `${CONFIG.API_URL}?action=${action}&t=${Date.now()}`
    );

    return await response.json();

}


// POST
export async function adminPost(data){

    const response = await fetch(
        CONFIG.API_URL,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:
            JSON.stringify(data)

        }
    );


    return await response.json();

}
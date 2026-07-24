/* ==========================================
   Fantasy CMS
   Admin API
========================================== */

import { CONFIG } from "../config/config.js";


// GET
export async function adminGet(action){

    const response=await fetch(
        `${CONFIG.API_URL}?action=${action}&t=${Date.now()}`,
        {
            headers:{
                "x-admin-token":
                localStorage.getItem("admin_token")||""
            }
        }
    );

    return await response.json();

}


// POST(JSON)
export async function adminPost(data){

    const response=await fetch(
        CONFIG.API_URL,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "x-admin-token":
                localStorage.getItem("admin_token")||""
            },

            body:JSON.stringify(data)

        }
    );

    return await response.json();

}


// POST(FormData)
export async function adminPostForm(form){

    const response=await fetch(
        CONFIG.API_URL,
        {
            method:"POST",

            headers:{
                "x-admin-token":
                localStorage.getItem("admin_token")||""
            },

            body:form

        }
    );

    return await response.json();

}
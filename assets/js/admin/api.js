/* ==========================================
   Fantasy CMS
   Admin API
========================================== */

import { CONFIG } from "../config/config.js";


// GET
export async function adminGet(action){

    const token =
    localStorage.getItem("admin_token")||"";


    const response=
    await fetch(
        `${CONFIG.API_URL}?action=${action}&token=${token}&t=${Date.now()}`,
        {
            headers:{
                "x-admin-token":token
            }
        }
    );


    return await response.json();

}

// POST
export async function adminPost(data){

    const form=new FormData();

    Object.keys(data).forEach(key=>{
        form.append(key,data[key]);
    });

    const response=
    await fetch(
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

// POST(FormData)
export async function adminPostForm(form){

    const response=
    await fetch(
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

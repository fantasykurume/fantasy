/* ==========================================
   Fantasy CMS
   API
========================================== */


import { CONFIG }
from "../config/config.js";



export async function fetchAPI(
    action
){


    const response = await fetch(

        `${CONFIG.API_URL}?action=${action}`

    );


    return await response.json();


}
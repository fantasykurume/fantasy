/* ==========================================
   API
========================================== */

import { CONFIG } from "../config/config.js";

export async function fetchAPI(endpoint){

    const response = await fetch(

        CONFIG.API_URL + endpoint

    );

    return await response.json();

}
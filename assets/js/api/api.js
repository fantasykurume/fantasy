/* ==========================================
   Fantasy CMS
   API
========================================== */

import { CONFIG } from "../config/config.js";

let cache = null;

/* 全データ取得（キャッシュ付き） */
export async function fetchAll(force=false){

    if(cache && !force) return cache;

    const response = await fetch(
        `${CONFIG.API_URL}?action=all&t=${Date.now()}`
    );

    cache = await response.json();

    return cache;

}

/* 個別取得（管理画面用など） */
export async function fetchAPI(action){

    const response = await fetch(
        `${CONFIG.API_URL}?action=${action}&t=${Date.now()}`
    );

    return await response.json();

}

/* キャッシュクリア */
export function clearCache(){
    cache = null;
}
/* ==========================================
   Fantasy CMS
   Access Module
========================================== */

/* ==========================================
   初期化
========================================== */

export function initAccess(shop){

    if(!shop){
        console.error("Shop Data Error");
        return;
    }

    renderAccess(shop);

}

/* ==========================================
   Access表示
========================================== */

function renderAccess(shop){

    const address = document.getElementById("shopAddress");
    const phone = document.getElementById("shopPhone");
    const sns = document.getElementById("snsLinks");

    if(address) address.textContent = shop.address || "";
    if(phone) phone.textContent = shop.phone || "";

    if(sns){

        sns.innerHTML = `
            <a href="${shop.instagram || "#"}" target="_blank">
                Instagram
            </a>

            <a href="${shop.line || "#"}" target="_blank">
                LINE
            </a>
        `;

    }

}
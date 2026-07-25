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

    const address=document.getElementById("shopAddress");
    const phone=document.getElementById("shopPhone");
    const hours=document.getElementById("shopHours");
    const holiday=document.getElementById("shopHoliday");
    const sns=document.getElementById("snsLinks");
    const map=document.getElementById("googleMap");

    if(address){
        address.textContent=shop.address||"";
    }

    if(phone){
        phone.textContent=shop.phone||"";
    }

    if(hours){
        hours.textContent="営業時間："+(shop.business_hours||"");
    }

    if(holiday){
        holiday.textContent="定休日："+(shop.holiday||"");
    }

    if(sns){

        sns.innerHTML=`
            <a href="${shop.instagram||"#"}" target="_blank">
                Instagram
            </a>

            <a href="${shop.line||"#"}" target="_blank">
                LINE
            </a>
        `;

    }

    if(map && shop.map_url){

        map.innerHTML=`
            <iframe
                src="${shop.map_url}"
                width="100%"
                height="400"
                style="border:0;border-radius:12px;"
                loading="lazy"
                allowfullscreen>
            </iframe>
        `;

    }

}

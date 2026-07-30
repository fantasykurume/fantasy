/* ==========================================
   Fantasy CMS
   Access Module
========================================== */

export function initAccess(shop){

    if(!shop){
        console.error("Shop Data Error");
        return;
    }

    renderAccess(shop);

}

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
        hours.textContent="営業時間：" + (shop.business_hours||"");
    }

    if(holiday){
        holiday.textContent="定休日：" + (shop.holiday||"");
    }

    /* SNS */

    if(sns){

        let html="";

        if(shop.instagram){
            html+=`
                <a href="${shop.instagram}" target="_blank" rel="noopener">
                    Instagram
                </a>
            `;
        }

        if(shop.line){
            html+=`
                <a href="${shop.line}" target="_blank" rel="noopener">
                    LINE
                </a>
            `;
        }

        sns.innerHTML=html;

    }

    /* Google Map */

    if(map){

        if(shop.map_url){

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

        }else{

            map.innerHTML="";

        }

    }

}

/* ==========================================
   Fantasy CMS
   Cast Module
========================================== */

/* ==========================================
   初期化
========================================== */

export function initCast(items){

    if(!items){
        console.error("Cast Data Error");
        return;
    }

    items = items
        .filter(item=>item.status==="公開")
        .sort((a,b)=>Number(a.sort||999)-Number(b.sort||999));

    renderCast(items);

}

/* ==========================================
   Cast表示
========================================== */

function renderCast(items){

    const grid = document.getElementById("castGrid");

    if(!grid) return;

    grid.innerHTML = "";

    items.forEach(item=>{

        const box = document.createElement("article");

        box.className = "cast-item";

        box.innerHTML = `
            <button class="cast-name" type="button">
                ${item.name}
            </button>

            <div class="cast-photo">
                <img
                    src="${getCastImage(item.image_url)}"
                    alt="${item.name}"
                    loading="lazy">
            </div>
        `;

        const button = box.querySelector(".cast-name");

        button.addEventListener("click",()=>{

            box.classList.toggle("open");
            button.classList.toggle("active");

        });

        grid.appendChild(box);

    });

}

/* ==========================================
   Cloudinary画像加工
========================================== */

function getCastImage(url){

    if(!url) return "";

    return url.replace(
        "/upload/",
        "/upload/c_fill,w_700,h_900,g_face,q_auto,f_auto/"
    );

}
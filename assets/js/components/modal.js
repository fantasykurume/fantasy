/* ==========================================
   Fantasy CMS
   Modal Component
========================================== */

let modal = null;

let currentItems = [];

let currentIndex = 0;


/**
 * 初期化
 */
export function initModal(){

    createModal();

    bindEvents();

}


/**
 * Modal生成
 */
function createModal(){

    if(document.getElementById("globalModal")){

        modal = document.getElementById("globalModal");

        return;

    }

    modal = document.createElement("div");

    modal.id = "globalModal";

    modal.className = "modal";

    modal.innerHTML = `

        <div class="modal-content">

            <button
                class="modal-close">

                ×

            </button>

            <button
                class="modal-prev">

                ❮

            </button>

            <button
                class="modal-next">

                ❯

            </button>

            <div class="modal-body">

                <div class="modal-image">

                    <img
                        id="modalImage"
                        src=""
                        alt="">

                </div>

                <div class="modal-info">

                    <h2
                        id="modalTitle"
                        class="modal-title">

                    </h2>

                    <p
                        id="modalDescription"
                        class="modal-description">

                    </p>

                </div>

            </div>

        </div>

    `;

    document.body.appendChild(
        modal
    );

}


/**
 * イベント
 */
function bindEvents(){

    document.addEventListener(

        "click",

        event=>{

            if(
                !modal ||
                !modal.classList.contains("active")
            ){

                return;

            }

            if(

                event.target.classList.contains("modal") ||

                event.target.classList.contains("modal-close")

            ){

                closeModal();

            }

            if(
                event.target.classList.contains("modal-prev")
            ){

                prevImage();

            }

            if(
                event.target.classList.contains("modal-next")
            ){

                nextImage();

            }

        }

    );


    document.addEventListener(

        "keydown",

        event=>{

            if(
                !modal ||
                !modal.classList.contains("active")
            ){

                return;

            }

            switch(event.key){

                case "Escape":

                    closeModal();

                    break;

                case "ArrowLeft":

                    prevImage();

                    break;

                case "ArrowRight":

                    nextImage();

                    break;

            }

        }

    );

}


/**
 * 開く
 */
export function openModal(items,index=0){

    console.log("openModal", items, index);
   
    currentItems = items;

    currentIndex = index;

    render();

    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}


/**
 * 描画
 */
function render(){

    const item = currentItems[currentIndex];

    document.getElementById("modalImage").src =
        item.image_url;

    document.getElementById("modalImage").alt =
        item.title;

    document.getElementById("modalTitle").textContent =
        item.title;

    document.getElementById("modalDescription").textContent =
        item.description || "";

}


/**
 * 前
 */
function prevImage(){

    currentIndex--;

    if(currentIndex<0){

        currentIndex=currentItems.length-1;

    }

    render();

}


/**
 * 次
 */
function nextImage(){

    currentIndex++;

    if(currentIndex>=currentItems.length){

        currentIndex=0;

    }

    render();

}


/**
 * 閉じる
 */
export function closeModal(){

    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

}

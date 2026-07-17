/* ==========================================
   Fantasy CMS
   Modal Component
========================================== */


let modalElement = null;


/**
 * Modal初期化
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

        modalElement =
            document.getElementById("globalModal");

        return;

    }


    const modal = document.createElement("div");


    modal.id = "globalModal";

    modal.className = "modal";


    modal.innerHTML = `

        <div class="modal-content">


            <button
                class="modal-close"
                aria-label="close">

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


    document.body.appendChild(modal);


    modalElement = modal;

}



/**
 * イベント登録
 */
function bindEvents(){


    document.addEventListener(
        "click",
        event => {


            if(
                event.target.classList.contains(
                    "modal-close"
                )
            ){

                closeModal();

            }



            if(
                event.target.classList.contains(
                    "modal"
                )
            ){

                closeModal();

            }


        }
    );


    document.addEventListener(
        "keydown",
        event => {


            if(event.key === "Escape"){

                closeModal();

            }


        }
    );


}



/**
 * Modal表示
 */
export function openModal(data){


    if(!modalElement){

        initModal();

    }


    document.getElementById(
        "modalImage"
    ).src = data.image;



    document.getElementById(
        "modalImage"
    ).alt = data.title;



    document.getElementById(
        "modalTitle"
    ).textContent = data.title;



    document.getElementById(
        "modalDescription"
    ).textContent = data.description;



    modalElement.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


}



/**
 * Modal閉じる
 */
export function closeModal(){


    if(!modalElement) return;


    modalElement.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}
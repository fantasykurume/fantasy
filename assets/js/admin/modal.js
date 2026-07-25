/* ==========================================
   Fantasy CMS
   Modal
========================================== */

export function openModal(title,content){

    closeModal();

    const modal=document.createElement("div");

    modal.id="modalOverlay";

    modal.innerHTML=`

    <div class="modal">

        <div class="modal-header">

            <h3>${title}</h3>

            <button id="modalCloseBtn">&times;</button>

        </div>

        <div class="modal-body">

            ${content}

        </div>

    </div>

    `;

    document.body.appendChild(modal);

    document
        .getElementById("modalCloseBtn")
        .onclick=closeModal;

    modal.onclick=(e)=>{

        if(e.target.id==="modalOverlay"){

            closeModal();

        }

    };

}

export function closeModal(){

    const modal=
        document.getElementById("modalOverlay");

    if(modal){

        modal.remove();

    }

}

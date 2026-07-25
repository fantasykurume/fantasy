/* ==========================================
   Fantasy CMS
   Common Modal
========================================== */

let currentModal=null;

/* ==========================================
   Open
========================================== */

export function openModal(options={}){

    closeModal();

    const {

        title="",

        body="",

        width="520px",

        buttons=[],

        onOpen=null,

        onClose=null

    }=options;

    const overlay=document.createElement("div");

    overlay.id="modalOverlay";

    overlay.innerHTML=`

        <div
            class="modalWindow"
            style="max-width:${width};">

            <div class="modalHeader">

                <h3>${title}</h3>

                <button
                    id="modalClose"
                    class="modalClose">

                    &times;

                </button>

            </div>

            <div
                class="modalBody">

                ${body}

            </div>

            <div
                class="modalFooter">

            </div>

        </div>

    `;

    document.body.appendChild(overlay);

    currentModal={

        element:overlay,

        onClose

    };

    const footer=
        overlay.querySelector(".modalFooter");

    buttons.forEach(button=>{

        const btn=
            document.createElement("button");

        btn.type="button";

        btn.textContent=button.text;

        btn.className=
            button.class||"";

        btn.onclick=button.click;

        footer.appendChild(btn);

    });

    overlay
        .querySelector("#modalClose")
        .onclick=closeModal;

    overlay.onclick=(e)=>{

        if(e.target===overlay){

            closeModal();

        }

    };

    if(typeof onOpen==="function"){

        onOpen();

    }

}

/* ==========================================
   Close
========================================== */

export function closeModal(){

    if(!currentModal){

        return;

    }

    if(typeof currentModal.onClose==="function"){

        currentModal.onClose();

    }

    currentModal.element.remove();

    currentModal=null;

}

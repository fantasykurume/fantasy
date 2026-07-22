/* ==========================================
   Fantasy CMS
   Modal Component
========================================== */

let modal = null;
let currentItems = [];
let currentIndex = 0;

export function initModal() {

    createModal();

}

function createModal() {

    if (document.getElementById("globalModal")) {

        modal = document.getElementById("globalModal");
        return;

    }

    modal = document.createElement("div");

    modal.id = "globalModal";
    modal.className = "modal";

    modal.innerHTML = `

        <div class="modal-content">

            <button class="modal-close">×</button>

            <button class="modal-prev">❮</button>

            <button class="modal-next">❯</button>

            <img
                id="modalImage"
                class="modal-image"
                src=""
                alt="">

            <div class="modal-info">

                <h2 id="modalTitle"></h2>

                <p id="modalDescription"></p>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    /* 閉じる */

    modal.querySelector(".modal-close")
        .addEventListener("click", closeModal);

    modal.addEventListener("click", e => {

        if (e.target === modal) {

            closeModal();

        }

    });

    /* 前へ */

    modal.querySelector(".modal-prev")
        .addEventListener("click", e => {

            e.stopPropagation();

            prev();

        });

    /* 次へ */

    modal.querySelector(".modal-next")
        .addEventListener("click", e => {

            e.stopPropagation();

            next();

        });

    /* キーボード */

    document.addEventListener("keydown", e => {

        if (!modal.classList.contains("active")) return;

        switch (e.key) {

            case "Escape":

                closeModal();
                break;

            case "ArrowLeft":

                prev();
                break;

            case "ArrowRight":

                next();
                break;

        }

    });

}

export function openModal(items, index = 0) {

    currentItems = items;
    currentIndex = index;

    render();

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function render() {

    const item = currentItems[currentIndex];


    const img =
        document.getElementById("modalImage");


    img.style.opacity = "0";


    img.onload = ()=>{

        img.style.opacity="1";

    };


    img.src =
        item.image_url.replace(
            "/upload/",
            "/upload/w_1000,q_auto,f_auto/"
        );


    document.getElementById("modalTitle").textContent =
        item.title;


    document.getElementById("modalDescription").textContent =
        item.description || "";

}

function prev() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentItems.length - 1;

    }

    render();

}

function next() {

    currentIndex++;

    if (currentIndex >= currentItems.length) {

        currentIndex = 0;

    }

    render();

}

export function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}
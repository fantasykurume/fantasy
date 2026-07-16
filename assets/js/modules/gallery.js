/* ==========================================
 * Gallery Module
 * Fantasy CMS
 * ========================================== */

import { CONFIG } from "../config/config.js";

/**
 * Gallery Data
 * TODO:
 * Replace with GAS API
 */
let galleryItems = [
    {
        id: 1,
        title: "Main Floor",
        description: "落ち着いたメインフロア",
        image: "assets/images/gallery/gallery01.jpg",
        sort: 1,
        visible: true
    },
    {
        id: 2,
        title: "VIP Room",
        description: "完全個室VIPルーム",
        image: "assets/images/gallery/gallery02.jpg",
        sort: 2,
        visible: true
    },
    {
        id: 3,
        title: "Counter",
        description: "高級感あるカウンター",
        image: "assets/images/gallery/gallery03.jpg",
        sort: 3,
        visible: true
    }
];

let currentIndex = 0;

/**
 * Initialize Gallery
 */
export function initGallery() {

    renderGallery();

    initializeModal();

}

/**
 * Render Gallery
 */
function renderGallery() {

    const container = document.getElementById("galleryGrid");

    if (!container) return;

    container.innerHTML = "";

    galleryItems
        .filter(item => item.visible)
        .sort((a, b) => a.sort - b.sort)
        .forEach((item, index) => {

            const article = document.createElement("article");
            article.className = "gallery-item fade-up";

            article.innerHTML = `
                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy">

                <div class="gallery-overlay">

                    <h3>${item.title}</h3>

                    <p>${item.description}</p>

                </div>
            `;

            article.addEventListener("click", () => {

                openModal(index);

            });

            container.appendChild(article);

        });

}

/**
 * Initialize Modal
 */
function initializeModal() {

    if (document.getElementById("galleryModal")) return;

    const modal = document.createElement("div");

    modal.id = "galleryModal";

    modal.className = "gallery-modal";

    modal.innerHTML = `

        <div class="gallery-modal-backdrop"></div>

        <div class="gallery-modal-content">

            <button
                class="gallery-close"
                id="galleryClose">

                ×

            </button>

            <button
                class="gallery-prev"
                id="galleryPrev">

                ❮

            </button>

            <img
                id="galleryModalImage"
                src=""
                alt="">

            <button
                class="gallery-next"
                id="galleryNext">

                ❯

            </button>

            <div
                class="gallery-caption">

                <h3 id="galleryTitle"></h3>

                <p id="galleryDescription"></p>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    bindModalEvents();

}

/**
 * Modal Events
 */
function bindModalEvents() {

    document
        .getElementById("galleryClose")
        .addEventListener("click", closeModal);

    document
        .getElementById("galleryPrev")
        .addEventListener("click", previousImage);

    document
        .getElementById("galleryNext")
        .addEventListener("click", nextImage);

    document
        .querySelector(".gallery-modal-backdrop")
        .addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeModal();

        }

        if (event.key === "ArrowLeft") {

            previousImage();

        }

        if (event.key === "ArrowRight") {

            nextImage();

        }

    });

}

/**
 * Open Modal
 */
function openModal(index) {

    currentIndex = index;

    updateModal();

    document
        .getElementById("galleryModal")
        .classList.add("active");

}

/**
 * Close Modal
 */
function closeModal() {

    document
        .getElementById("galleryModal")
        .classList.remove("active");

}

/**
 * Next Image
 */
function nextImage() {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {

        currentIndex = 0;

    }

    updateModal();

}

/**
 * Previous Image
 */
function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = galleryItems.length - 1;

    }

    updateModal();

}

/**
 * Update Modal
 */
function updateModal() {

    const item = galleryItems[currentIndex];

    document.getElementById("galleryModalImage").src = item.image;

    document.getElementById("galleryModalImage").alt = item.title;

    document.getElementById("galleryTitle").textContent = item.title;

    document.getElementById("galleryDescription").textContent = item.description;

}
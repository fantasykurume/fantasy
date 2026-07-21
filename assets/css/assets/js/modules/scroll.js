/* ==========================================
   Scroll
   ========================================== */

export function initScroll() {

    const header = document.querySelector(".header");

    const fadeElements = document.querySelectorAll(

        ".fade-in, .fade-up, .fade-down, .fade-left, .fade-right, .zoom-in"

    );

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

        fadeElements.forEach(element => {

            const top = element.getBoundingClientRect().top;

            if (top < window.innerHeight - 120) {

                element.classList.add("show");

            }

        });

    });

    window.dispatchEvent(new Event("scroll"));

}
/* ==========================================
   Menu
   ========================================== */

export function initMenu() {

    const menuButton = document.getElementById("menuButton");
    const navigation = document.querySelector(".nav");

    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("active");
        menuButton.classList.toggle("active");

    });

    const menuLinks = navigation.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");
            menuButton.classList.remove("active");

        });

    });

}
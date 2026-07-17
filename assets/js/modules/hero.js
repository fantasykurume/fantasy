/* ==========================================
   Hero Slider
   ========================================== */

const slides = [

    {
        image: "assets/images/hero/hero01.jpg",
        title: "Fantasy",
        catch: "特別な夜をあなたへ"
    },

    {
        image: "assets/images/hero/hero02.jpg",
        title: "Luxury Lounge",
        catch: "上質な時間と最高のおもてなし"
    },

    {
        image: "assets/images/hero/hero03.jpg",
        title: "Elegant Space",
        catch: "心に残るひとときを"
    }

];

const SLIDE_INTERVAL = 8000;

let currentIndex = 0;

export function initHero() {

    const slider = document.getElementById("heroSlider");

    const title = document.getElementById("heroTitle");

    const text = document.getElementById("heroCatch");

    if (!slider || !title || !text) return;

    createSlides(slider);

    showSlide(title, text);

    setInterval(() => {

        currentIndex++;

        if (currentIndex >= slides.length) {

            currentIndex = 0;

        }

        showSlide(title, text);

    }, SLIDE_INTERVAL);

}

function createSlides(slider) {

    slider.innerHTML = "";

    slides.forEach((slide, index) => {

        const image = document.createElement("img");

        image.src = slide.image;

        image.alt = slide.title;

        image.loading = "eager";

        if (index === 0) {

            image.classList.add("active");

        }

        slider.appendChild(image);

    });

}

function showSlide(title, text) {

    const images = document.querySelectorAll(".hero-slider img");

    images.forEach(image => {

        image.classList.remove("active");

    });

    images[currentIndex].classList.add("active");

    title.classList.remove("hero-fade");

    text.classList.remove("hero-fade");

    void title.offsetWidth;

    title.classList.add("hero-fade");

    text.classList.add("hero-fade");

    title.textContent = slides[currentIndex].title;

    text.textContent = slides[currentIndex].catch;

}
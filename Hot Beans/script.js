function toggleMenu() {
    const nav = document.getElementById("mainNav");
    nav.classList.toggle("open");
}

// Modal Functions
function closeModal() {
    const modal = document.getElementById('submissionModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function showModal() {
    const modal = document.getElementById('submissionModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Form Submission Handler
const applicationForm = document.querySelector('.job-application-form');
if (applicationForm) {
    applicationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        showModal();
        this.reset();
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('submissionModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(document.querySelectorAll('.carousel-indicator'));
let autoSlideInterval = null;

if (carouselTrack && slides.length > 0) {
    const setSlidePosition = (slide, index) => {
        slide.style.left = `${100 * index}%`;
    };

    slides.forEach(setSlidePosition);

    const moveToSlide = (currentSlide, targetSlide) => {
        carouselTrack.style.transform = `translateX(-${targetSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const moveToIndex = (index) => {
        const currentSlide = carouselTrack.querySelector('.current-slide');
        const targetSlide = slides[index];
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetDot = dots[index];
        moveToSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    };

    const moveNext = () => {
        const currentSlide = carouselTrack.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = nextSlide ? dots[slides.indexOf(nextSlide)] : dots[0];
        moveToSlide(currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    };

    const movePrev = () => {
        const currentSlide = carouselTrack.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = prevSlide ? dots[slides.indexOf(prevSlide)] : dots[dots.length - 1];
        moveToSlide(currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    };

    const startAutoSlide = () => {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(moveNext, 6000);
    };

    prevButton?.addEventListener('click', () => {
        movePrev();
        startAutoSlide();
    });

    nextButton?.addEventListener('click', () => {
        moveNext();
        startAutoSlide();
    });

    dotsNav?.addEventListener('click', (event) => {
        const targetDot = event.target.closest('button');
        if (!targetDot) return;
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        if (targetIndex >= 0) {
            moveToIndex(targetIndex);
            startAutoSlide();
        }
    });

    startAutoSlide();
}

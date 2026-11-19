document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. 首頁圖片輪播功能
    // ==========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let slideIndex = 0;
    let slideInterval;

    function showSlides(n) {
        if (!slides.length) return;

        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;

        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));

        slides[slideIndex].style.display = 'block';
        if (dots[slideIndex]) dots[slideIndex].classList.add('active');
    }

    function nextSlide() {
        slideIndex++;
        showSlides(slideIndex);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            showSlides(slideIndex);
            resetTimer();
        });
    });

    function startTimer() { slideInterval = setInterval(nextSlide, 3500); }
    function resetTimer() { clearInterval(slideInterval); startTimer(); }

    if (slides.length > 0) {
        showSlides(slideIndex);
        startTimer();
    }

    // ==========================================
    // 2. 點擊按鈕彈出優惠訊息 (Modal)
    // ==========================================
    const promoBtn = document.getElementById('promoBtn');
    const promoModal = document.getElementById('promoModal');
    const closeBtn = document.querySelector('.close-btn');

    if (promoBtn && promoModal) {
        promoBtn.addEventListener('click', () => {
            promoModal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            promoModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === promoModal) {
                promoModal.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 3. 表單送出攔截 (防止頁面重新整理)
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('感謝您的訊息！我們將盡快與您聯繫。');
            contactForm.reset();
        });
    }

});

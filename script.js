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
    // 3. 表單送出 - 使用 mailto 寄送郵件
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 取得表單資料
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // 設定收件者信箱
            const to = "20251119@blcwc.edu.hk";
            
            // 設定郵件主旨與內容 (使用 encodeURIComponent 處理中文與換行)
            const subject = encodeURIComponent("【霓虹競技場】來自 " + name + " 的訊息");
            const body = encodeURIComponent(
                "玩家 ID / 姓名：" + name + "\n" +
                "聯絡信箱：" + email + "\n\n" +
                "訊息內容：\n" + message
            );

            // 組合 mailto 連結並開啟預設郵件軟體
            const mailtoLink = "mailto:" + to + "?subject=" + subject + "&body=" + body;
            window.location.href = mailtoLink;

            // 顯示提示並重置表單
            alert('已為您開啟郵件軟體，請確認內容後按下寄送。');
            contactForm.reset();
        });
    }

});

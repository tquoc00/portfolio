// Đảm bảo mã nguồn chạy sau khi toàn bộ HTML đã được tải xong
document.addEventListener("DOMContentLoaded", () => {

    // ===== HAMBURGER MENU TOGGLE =====
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Đóng menu khi bấm vào link (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // ===== SCROLL FADE-IN ANIMATIONS =====
    // Cấu hình bộ quan sát hiệu ứng cuộn trang
    const observerOptions = {
        root: null, // Sử dụng màn hình thiết bị làm khung nhìn (viewport)
        rootMargin: "0px",
        threshold: 0.15 // Kích hoạt hiệu ứng khi thành phần lộ diện 15% diện tích
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Khi thành phần lọt vào tầm mắt của người dùng
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Hủy quan sát sau khi đã thực hiện hiệu ứng xong (tiết kiệm tài nguyên)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tìm và thiết lập trạng thái ban đầu cho các khối nội dung cần hiệu ứng
    const animatedElements = document.querySelectorAll('.hero-content, .about-image-wrapper, .about-text, .section-title');

    animatedElements.forEach(element => {
        // Thiết lập trạng thái ban đầu bằng JS để nếu người dùng tắt JS, trang web vẫn hiển thị bình thường
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

        // Đưa vào danh sách giám sát
        fadeInObserver.observe(element);
    });

    // ===== MOBILE: TAP TO TOGGLE TIMELINE EXPAND =====
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const timelineContents = document.querySelectorAll('.timeline-content');
        timelineContents.forEach(content => {
            content.addEventListener('click', (e) => {
                // Đóng tất cả các timeline khác
                timelineContents.forEach(other => {
                    if (other !== content) other.classList.remove('touch-active');
                });
                // Toggle current
                content.classList.toggle('touch-active');
            });
        });
    }
});
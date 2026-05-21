// Hiệu ứng xuất hiện mượt mà cho danh sách dự án khi cuộn trang
document.addEventListener("DOMContentLoaded", () => {
    const projectItems = document.querySelectorAll('.project-item');

    if (!projectItems.length) return;

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // Khôi phục lại transition của CSS để hover effect hoạt động mượt mà
                const index = parseInt(entry.target.dataset.index || 0);
                setTimeout(() => {
                    entry.target.style.transition = '';
                }, 600 + index * 120);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Thiết lập trạng thái ẩn ban đầu và stagger animation
    projectItems.forEach((item, index) => {
        item.dataset.index = index;
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`;
        projectObserver.observe(item);
    });
});

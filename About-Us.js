document.addEventListener("DOMContentLoaded", () => {
function toggleNav() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active'); // Thêm hoặc xóa class active
}

// Gắn sự kiện click cho nút nav-toggle
const navToggle = document.querySelector(".nav-toggle");
if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
}});
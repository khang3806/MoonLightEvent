document.addEventListener("DOMContentLoaded", () => {
const faqs = document.querySelectorAll('.faq-question');
function toggleNav() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active'); // Thêm hoặc xóa class active
}

// Gắn sự kiện click cho nút nav-toggle
const navToggle = document.querySelector(".nav-toggle");
if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
}

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.parentNode.classList.toggle('active');
        
        const answer = faq.nextElementSibling;
        if (faq.parentNode.classList.contains('active')) {
            answer.style.display = 'block';
            faq.querySelector('.arrow').textContent = '▲'; // Change arrow direction
        } else {
            answer.style.display = 'none';
            faq.querySelector('.arrow').textContent = '▼'; // Revert arrow direction
        }
    });
})});

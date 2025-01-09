document.addEventListener("DOMContentLoaded", () => {
    // Hàm toggleNav để mở/đóng menu khi nhấn nút
    function toggleNav() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active'); // Thêm hoặc xóa class active
    }

    // Gắn sự kiện click cho nút nav-toggle
    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
        navToggle.addEventListener("click", toggleNav);
    }

    // Hàm kiểm tra giá trị đầu vào
    function isValidInput(input) {
        const regex = /^[a-zA-Z0-9\s]+$/; // Chỉ cho phép ký tự chữ, số và khoảng trắng
        return regex.test(input);
    }

    // Hàm xử lý khi người dùng gửi form
    function handleSubmit(event) {
        event.preventDefault(); // Ngừng việc gửi form mặc định

        // Lấy giá trị từ ô input
        var userName = document.getElementById('name').value;

        if (isValidInput(userName)) {
            alert(`Thank you for your feedback, ${userName}!\nWe appreciate your input.`);

            // Reset form sau khi submit thành công
            var feedbackForm = document.querySelector('form');
            feedbackForm.reset();
        } else {
            alert("Invalid input! Please enter only letters, numbers, and spaces without special characters.");
        }
    }

    // Gắn sự kiện submit vào form
    var feedbackForm = document.querySelector('form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleSubmit);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    function toggleNav() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    }

    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
        navToggle.addEventListener("click", toggleNav);
    }

    function validateForm(event) {
        event.preventDefault(); 
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
        const phone = document.getElementById("phone").value; // Số điện thoại
        const birthDate = document.getElementById("birthdate").value; 
        const errorMessage = document.getElementById("error-message");
        const successMessage = document.getElementById("success-message");
        const currentDate = new Date(); 

        // Kiểm tra khoảng trắng trong username
        if (/\s/.test(username)) {
            errorMessage.textContent = "Username must not contain spaces.";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
            return false;
        }

        // Kiểm tra ngày sinh < ngày hiện tại
        if (birthDate) {
            const birthDateObj = new Date(birthDate);
            if (birthDateObj >= currentDate) {
                errorMessage.textContent = "Birth date must be before today.";
                errorMessage.style.display = "block";
                successMessage.style.display = "none";
                return false;
            }
        } else {
            errorMessage.textContent = "Please enter a valid birth date.";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
            return false;
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^\+\d{1,3}[0-9]{6,15}$/; // Mã quốc gia (vd: +84) theo sau là từ 6-15 chữ số
        if (!phoneRegex.test(phone)) {
            errorMessage.textContent = "Phone number must include country code (e.g., +84) and contain only digits.";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
            return false;
        }
        
        if (/\s/.test(password)) {
            errorMessage.textContent = "Password must not contain spaces.";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
            return false;
        }

        // Kiểm tra độ dài password
        if (password.length < 5) {
            errorMessage.textContent = "Password must be at least 5 characters long.";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
            return false;
        }

        // Kiểm tra password khớp với confirmPassword
        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
            return false;
        }
        
        // Nếu tất cả điều kiện thỏa mãn
        errorMessage.style.display = "none"; 
        successMessage.style.display = "block"; 

        alert('Sign Up Successful!');

        // Chuyển hướng sau 3 giây
        setTimeout(function() {
            window.location.href = 'Login-Account.html'; 
        }, 3000); 

        return true;
    }

    // Gắn sự kiện validateForm cho form
    const form = document.getElementById("registrationForm"); 
    if (form) {
        form.addEventListener("submit", validateForm);
    }
});

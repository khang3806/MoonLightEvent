document.addEventListener("DOMContentLoaded", () => {
    // Toggle menu khi nhấn vào nút
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Xử lý sự kiện form đăng nhập
    const loginForm = document.getElementById("login-form");
    const loginLink = document.getElementById("login-link");

    // Hàm cập nhật giao diện sau đăng nhập/đăng xuất
    function updateLoginState() {
        const loggedIn = localStorage.getItem("loggedIn");
        const username = localStorage.getItem("username");

        if (loggedIn === "true" && username) {
            loginLink.textContent = "Logout";
            loginLink.href = "#";
            loginLink.removeEventListener("click", handleLogout);
            loginLink.addEventListener("click", handleLogout);
        } else {
            loginLink.textContent = "Login";
            loginLink.href = "Login-Account.html";
        }
    }

    // Hàm xử lý đăng xuất
    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        updateLoginState();
        alert("You have successfully logged out.");
    }

    // Hàm xử lý form đăng nhập
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username && password) {
                // Giả lập đăng nhập thành công
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("username", username);

                // Cập nhật giao diện và hiển thị thông báo thành công
                updateLoginState();
                alert("Login successful. Welcome, " + username + "!");

                // Chuyển hướng đến trang chủ
                window.location.href = "Home.html";
            } else {
                // Hiển thị lỗi nếu không nhập đủ thông tin
                alert("Please enter both username and password.");
            }
        });
    }

    // Cập nhật trạng thái khi trang được tải
    updateLoginState();
});

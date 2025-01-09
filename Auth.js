document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.getElementById("login-link");

    // Hàm cập nhật trạng thái đăng nhập
    function updateLoginState() {
        const loggedIn = localStorage.getItem("loggedIn");
        const username = localStorage.getItem("username");

        if (loggedIn === "true" && username) {
            loginLink.textContent = "Logout";
            loginLink.href = "#";
            loginLink.onclick = handleLogout; // Gắn sự kiện trực tiếp
            console.log("Logout link activated");
        } else {
            loginLink.textContent = "Login";
            loginLink.href = "Login-Account.html";
            loginLink.onclick = null; // Xóa sự kiện nếu có
            console.log("Login link activated");
        }
    }

    // Hàm xử lý đăng xuất
    function handleLogout(event) {
        event.preventDefault();
        console.log("Logout clicked");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        updateLoginState();
        alert("You have successfully logged out.");
    }

    // Cập nhật trạng thái ngay khi tải trang
    updateLoginState();
});

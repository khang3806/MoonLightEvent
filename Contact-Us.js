document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        let formValid = true;

        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        removeErrorMessages();

        if (!firstName.value.trim() || !validateName(firstName.value.trim())) {
            formValid = false;
            showError(firstName, "First name is required and should not contain special characters.");
        }

        if (!lastName.value.trim() || !validateName(lastName.value.trim())) {
            formValid = false;
            showError(lastName, "Last name is required and should not contain special characters.");
        }

        if (!email.value.trim() || !validateEmail(email.value.trim())) {
            formValid = false;
            showError(email, "A valid email address is required.");
        }

        if (!message.value.trim()) {
            formValid = false;
            showError(message, "Message is required.");
        }

        if (formValid) {
            alert("Your question has been submitted successfully! We will get back to you soon.");
            form.reset(); 
        } else {
            alert("Please fix the errors in the form and try again.");
        }
    });

    function toggleNav() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active'); // Thêm hoặc xóa class active
    }

    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
        navToggle.addEventListener("click", toggleNav);
    }

    function showError(field, message) {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error-message");
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "12px";
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }

    function removeErrorMessages() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => error.remove());
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }

    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        return nameRegex.test(name);
    }
});

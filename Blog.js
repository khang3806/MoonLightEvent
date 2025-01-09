document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const newsletterForm = document.getElementById('newsletter-form');
    function toggleNav() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active'); // Thêm hoặc xóa class active
    }

    // Gắn sự kiện click cho nút nav-toggle
    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
        navToggle.addEventListener("click", toggleNav);
    }

 
    const newsArticles = [
        {
            title: 'Exciting New Festival Announced!',
            date: '2024-12-01',
            content: 'A brand-new festival has been announced for the upcoming season. Stay tuned for more details!',
        },
        {
            title: 'Tips for Attending Winter Events',
            date: '2024-11-20',
            content: 'Prepare for the cold with these tips to enjoy your winter festival experience.',
        },
        {
            title: 'Major Event Venue Change',
            date: '2024-11-15',
            content: 'The venue for the upcoming New Year Festival has been changed. Check the event page for updated information.',
        },
    ];


    newsArticles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');
        articleDiv.innerHTML = `
            <h3>${article.title}</h3>
            <p><em>${article.date}</em></p>
            <p>${article.content}</p>
        `;
        newsContainer.appendChild(articleDiv);
    });

  
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('email').value.trim();

        if (validateEmail(emailInput)) {
            alert(`Thank you, ${emailInput}, for subscribing to our newsletter!`);
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });


    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const favoritesList = document.getElementById('favorites-list');
    const clearFavoritesBtn = document.getElementById('clear-favorites-btn');
    function toggleNav() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active'); // Thêm hoặc xóa class active
    }

    // Gắn sự kiện click cho nút nav-toggle
    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
        navToggle.addEventListener("click", toggleNav);
    }

    // Lấy danh sách yêu thích từ localStorage
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem('favorites')) || [];
        } catch (error) {
            console.error("Error parsing favorites from localStorage:", error);
            return [];
        }
    }

    // Cập nhật danh sách yêu thích vào localStorage
    function updateFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Hiển thị danh sách yêu thích
    function renderFavorites() {
        const favorites = getFavorites();
        favoritesList.innerHTML = ''; // Xóa danh sách hiện tại

        fetch('assets/data/festivals.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load festival data");
                }
                return response.json();
            })
            .then(festivals => {
                if (favorites.length > 0) {
                    favorites.forEach(festivalId => {
                        const festival = festivals.find(f => f.id.toString() === festivalId);

                        if (festival) {
                            const card = document.createElement('div');
                            card.classList.add('festival-card');
                            card.innerHTML = `
                                <a href="Festival-Detail.html?id=${festival.id}">
                                    <img src="${festival.image}" alt="${festival.name}">
                                    <h3>${festival.name}</h3>
                                    <p class="month">Month: ${festival.month}</p>
                                    <p>Popular in: ${festival.country}</p>
                                </a>
                                <button class="delete-btn" data-id="${festival.id}" title="Remove from favorites">✖</button>
                            `;
                            favoritesList.appendChild(card);
                        }
                    });
                } else {
                    favoritesList.innerHTML = '<p>No favorite festivals yet.</p>';
                }
            })
            .catch(error => {
                console.error('Error loading festival data:', error);
                favoritesList.innerHTML = '<p>Failed to load favorite festivals. Please try again later.</p>';
            });
    }

    // Xóa một mục yêu thích
    favoritesList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            event.preventDefault(); // Ngăn chặn hành động mặc định
            const festivalId = event.target.getAttribute('data-id');
            const favorites = getFavorites();
            const updatedFavorites = favorites.filter(id => id !== festivalId);
            updateFavorites(updatedFavorites);
            renderFavorites(); // Cập nhật lại danh sách
        }
    });

    // Xóa tất cả mục yêu thích
    clearFavoritesBtn.addEventListener('click', function () {
        if (confirm("Are you sure you want to clear all favorite festivals?")) {
            localStorage.removeItem('favorites');
            renderFavorites();
        }
    });

    // Mở/đóng menu điều hướng
    // Khởi động
    renderFavorites();
});

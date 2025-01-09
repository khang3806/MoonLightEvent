document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/data/festivals.json', { method: 'GET' })
        .then(response => response.json())
        .then(festivals => {
            const religionSelect = document.getElementById('filter-religion');
            const monthSelect = document.getElementById('filter-month');
            const festivalList = document.getElementById('festival-list');

            function toggleNav() {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.toggle('active'); // Thêm hoặc xóa class active
            }

            // Gắn sự kiện click cho nút nav-toggle
            const navToggle = document.querySelector(".nav-toggle");
            if (navToggle) {
                navToggle.addEventListener("click", toggleNav);
            }

            // Populate religion filter
            const religions = new Set();
            festivals.forEach(festival => religions.add(festival.religion));
            religions.forEach(religion => {
                const option = document.createElement('option');
                option.value = religion;
                option.textContent = religion;
                religionSelect.appendChild(option);
            });

            // Populate month filter
            const months = new Set();
            festivals.forEach(festival => months.add(festival.month));
            months.forEach(month => {
                const option = document.createElement('option');
                option.value = month;
                option.textContent = month;
                monthSelect.appendChild(option);
            });

            // Function to display festivals
            function displayFestivals(festivals) {
                festivalList.innerHTML = ''; // Clear the list
                festivals.forEach(festival => {
                    const item = document.createElement('div');
                    item.classList.add('festival-item');
                    item.innerHTML = `
                        <img src="${festival.image}" alt="${festival.name}">
                        <h3>${festival.name}</h3>
                        <p>${festival.country} - Month: ${festival.month}</p>
                        <a href="festival-detail.html?id=${festival.id}" class="btn">More</a>
                        <span class="favorite-icon" data-id="${festival.id}">&#10084;</span> <!-- Heart icon for favorite -->
                    `;
                    festivalList.appendChild(item);
                });

                // Add functionality for favorite icons
                const favoriteIcons = document.querySelectorAll('.favorite-icon');
                favoriteIcons.forEach(icon => {
                    icon.addEventListener('click', function () {
                        const festivalId = this.getAttribute('data-id');
                        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                        if (!favorites.includes(festivalId)) {
                            favorites.push(festivalId);
                            localStorage.setItem('favorites', JSON.stringify(favorites));
                            alert('Festival added to favorites!');
                        } else {
                            alert('Festival is already in your favorites.');
                        }

                        // Thêm hiệu ứng hoặc thay đổi màu trái tim khi đã yêu thích
                        this.style.color = '#c0392b'; // Đổi màu trái tim sau khi được yêu thích
                    });
                });
            }

            // Initially display all festivals
            displayFestivals(festivals);

            // Filter festivals when user clicks "Filter"
            document.getElementById('filter-btn').addEventListener('click', () => {
                const selectedReligion = religionSelect.value;
                const selectedMonth = monthSelect.value;

                // Filter by religion and month
                const filteredFestivals = festivals.filter(festival => {
                    const matchReligion = selectedReligion ? festival.religion === selectedReligion : true;
                    const matchMonth = selectedMonth ? festival.month === selectedMonth : true;
                    return matchReligion && matchMonth;
                });

                displayFestivals(filteredFestivals);
            });
        })
        .catch(error => console.error('Error loading data:', error));
});

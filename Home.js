document.addEventListener("DOMContentLoaded", () => {
    const festivalList = document.getElementById("festivalList");

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

    // Lấy dữ liệu từ JSON và hiển thị các lễ hội sắp tới
    fetch("assets/data/festivals.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load festival data");
            }
            return response.json();
        })
        .then(festivals => {
            const currentMonth = new Date().getMonth(); 
            const monthMapping = {
                "January": 0,
                "February": 1,
                "March": 2,
                "April": 3,
                "May": 4,
                "June": 5,
                "July": 6,
                "August": 7,
                "September": 8,
                "October": 9,
                "November": 10,
                "December": 11,
            };

            // Lọc các lễ hội sắp tới trong 3 tháng tiếp theo
            const getUpcomingFestivals = (festivals) => {
                return festivals.filter(festival => {
                    const months = festival.month.split(" or ").map(m => monthMapping[m]);
                    return months.some(month => {
                        const monthDiff = (month - currentMonth + 12) % 12;
                        return monthDiff > 0 && monthDiff <= 3;
                    });
                });
            };

            const upcomingFestivals = getUpcomingFestivals(festivals);

            // Hiển thị các lễ hội sắp tới
            if (upcomingFestivals.length > 0) {
                upcomingFestivals.forEach(festival => {
                    const card = document.createElement("a");
                    card.classList.add("festival-card");
                    card.href = `festival-detail.html?id=${festival.id}`;
                    card.innerHTML = `
                        <img src="${festival.image}" alt="${festival.name}">
                        <h3>${festival.name}</h3>
                        <p class="month">Month: ${festival.month}</p>
                        <p>Popular in: ${festival.country}</p>
                    `;
                    festivalList.appendChild(card);
                });
            } else {
                festivalList.innerHTML = "<p>No upcoming festivals within the next 3 months.</p>";
            }
        })
        .catch(error => {
            console.error("Error loading festival data:", error);
            festivalList.innerHTML = "<p>Failed to load festival data. Please try again later.</p>";
        });    
});

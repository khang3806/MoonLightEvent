document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const festivalId = params.get('id'); // Get festival id from URL

    // Fetch festival data from JSON file
    fetch('assets/data/festivals.json')
        .then(response => response.json())
        .then(festivals => {
            const festival = festivals.find(f => f.id.toString() === festivalId);

            if (festival) {
                // Update the page with the festival data
                document.getElementById('festival-title').textContent = festival.name;
                document.getElementById('festival-location').textContent = `Location: ${festival.country}`;
                document.getElementById('festival-date').textContent = `Date: ${festival.month}`;
                document.getElementById('main-image').src = festival.image;
                document.getElementById('festival-description').textContent = festival.description || "No detailed description available.";
                document.getElementById('required-age').textContent = festival.ageRequirement || "No specific age requirement";

                // Handle "Add to Favorites" with Star Icon inside a square
                const addToFavoritesBtn = document.getElementById('add-to-favorites-btn');
                addToFavoritesBtn.addEventListener('click', function () {
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                    // Check if festival is already in favorites
                    if (!favorites.includes(festivalId)) {
                        favorites.push(festivalId);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        alert(`${festival.name} has been added to your favorites!`);
                    } else {
                        alert(`${festival.name} is already in your favorites.`);
                    }
                });

                // Populate the highlights list (optional, since JSON doesn't include highlights)
                const highlightsList = document.getElementById('festival-highlights');
                if (festival.highlights) {
                    festival.highlights.forEach(highlight => {
                        const listItem = document.createElement('li');
                        listItem.textContent = highlight;
                        highlightsList.appendChild(listItem);
                    });
                } else {
                    highlightsList.innerHTML = '<li>No highlights available for this festival.</li>';
                }
            } else {
                alert('Festival not found!');
            }
        })
        .catch(error => console.error('Error fetching festival data:', error));
        
});
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active"); // Bật/tắt menu
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const festivalPricing = {
        "Chinese_New_Year": { regular: 150, vip: 300 },
        "Carnival_of_Brazil": { regular: 180, vip: 350 },
        "Holi": { regular: 100, vip: 250 },
        "Cinco_de_Mayo": { regular: 130, vip: 280 },
        "Glastonbury": { regular: 160, vip: 320 },
        "Bastille_Day": { regular: 140, vip: 290 },
        "Obon": { regular: 110, vip: 220 },
        "Oktoberfest": { regular: 170, vip: 340 },
        "Halloween": { regular: 120, vip: 260 },
        "Loy_Krathong": { regular: 130, vip: 270 },
        "Christmas": { regular: 160, vip: 320 },
    };

    let ticketPrices = { regular: 0, vip: 0 };

    // Xử lý toggle menu ☰
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    function updateFestivalPricing() {
        const selectedFestival = document.getElementById("festival-selection").value;

        if (selectedFestival !== "none" && festivalPricing[selectedFestival]) {
            const festival = festivalPricing[selectedFestival];
            document.getElementById("regular-price").textContent = `${festival.regular} USD`;
            document.getElementById("vip-price").textContent = `${festival.vip} USD`;

            ticketPrices.regular = festival.regular;
            ticketPrices.vip = festival.vip;
        } else {
            document.getElementById("regular-price").textContent = "Select a festival";
            document.getElementById("vip-price").textContent = "Select a festival";

            ticketPrices = { regular: 0, vip: 0 };
        }

        updateTotalPrice();
    }

    function updateQuantity(ticketType, change) {
        const quantityInput = document.getElementById(`${ticketType}-quantity`);
        let currentQuantity = parseInt(quantityInput.value) || 0;

        currentQuantity = Math.max(0, currentQuantity + change);
        quantityInput.value = currentQuantity;

        updateTotalPrice();
    }

    function updateTotalPrice() {
        const regularQuantity = parseInt(document.getElementById("regular-quantity").value) || 0;
        const vipQuantity = parseInt(document.getElementById("vip-quantity").value) || 0;

        const totalPriceUSD = (regularQuantity * ticketPrices.regular) + (vipQuantity * ticketPrices.vip);
        document.getElementById("total-price-usd").textContent = `${totalPriceUSD.toFixed(2)} USD`;
    }

    function processPayment(paymentType) {
        const selectedFestival = document.getElementById("festival-selection").value;
        const selectedBank = document.getElementById("bank-selection").value;
        const regularQuantity = parseInt(document.getElementById("regular-quantity").value) || 0;
        const vipQuantity = parseInt(document.getElementById("vip-quantity").value) || 0;

        if (selectedFestival === "none") {
            alert("Please select a festival.");
            return;
        }

        if (selectedBank === "none") {
            alert("Please select a bank.");
            return;
        }

        if (regularQuantity === 0 && vipQuantity === 0) {
            alert("Please select at least one ticket.");
            return;
        }

        alert(`Tickets purchased successfully using ${paymentType}!`);

        const confirmation = document.getElementById("confirmation");
        confirmation.style.display = "block";

        setTimeout(() => {
            confirmation.style.display = "none";
        }, 5000);
    }

    // Gắn các sự kiện
    document.getElementById("festival-selection").addEventListener("change", updateFestivalPricing);

    document.querySelectorAll(".quantity-increase, .quantity-decrease").forEach(button => {
        button.addEventListener("click", function () {
            const ticketType = this.getAttribute("data-ticket-type"); // Lấy loại vé (regular/vip)
            const change = this.classList.contains("quantity-increase") ? 1 : -1; // Xác định tăng hay giảm
            updateQuantity(ticketType, change); // Gọi hàm cập nhật số lượng
        });
    });
    

    document.querySelectorAll(".payment-button").forEach(button => {
        button.addEventListener("click", event => {
            const paymentType = event.target.textContent.includes("Credit Card") ? "Credit Card" : "E-Wallet";
            processPayment(paymentType);
        });
    });
});
function displayTicketSales(festivalId) {
    const festival = festivalData.find(item => item.id === festivalId);
    if (!festival || !festival.ticketSales) {
        console.error("Festival not found or ticket sales data missing.");
        return;
    }

    document.getElementById("regular-price").textContent = `${festival.ticketSales.price.regular} USD`;
    document.getElementById("vip-price").textContent = `${festival.ticketSales.price.vip} USD`;
}
document.getElementById("buy-ticket-btn").addEventListener("click", () => {
    const selectedFestivalId = parseInt(document.getElementById("festival-id").value);
    displayTicketSales(selectedFestivalId);
});

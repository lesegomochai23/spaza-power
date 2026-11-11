const API_URL = 'http://localhost:5158/api/products';  

let products = [];
let cart = [];

const zarFormatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(API_URL);
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});

function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${zarFormatter.format(product.priceZAR)}</div>
            <div class="product-bulk">Box of ${product.bulkQuantity}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Order</button>
        `;
        grid.appendChild(card);
    });

    // Initialize the 3D Tilt effect
    VanillaTilt.init(document.querySelectorAll(".product-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
    });
}

function updateRecommendation() {
    const stage = parseInt(document.getElementById('eskomStage').value);
    const banner = document.getElementById('recommendationBanner');

    if (stage >= 4) {
        banner.classList.remove('hidden');
        banner.innerHTML = `⚠️ <strong>Stage ${stage} Alert:</strong> Severe power outages. We recommend the <em>Solar Power Bank</em> and <em>12V Deep Cycle Battery</em> to protect your stock and security.`;
    } else if (stage > 0) {
        banner.classList.remove('hidden');
        banner.innerHTML = `💡 <strong>Stage ${stage} Alert:</strong> Moderate outages. Ensure you have enough <em>Rechargeable LED Bulbs</em> to keep trading.`;
    } else {
        banner.classList.add('hidden');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    document.getElementById('cartDrawer').classList.add('open');
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const discountMsg = document.getElementById('discountMessage');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        total += item.priceZAR;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${zarFormatter.format(item.priceZAR)}</div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartCount.innerText = cart.length;

    let finalTotal = total;
    if (total >= 10000) {
        const discount = total * 0.10;
        finalTotal = total - discount;
        discountMsg.innerText = `🎉 Bulk Discount Applied: 10% Off (-${zarFormatter.format(discount)})`;
    } else {
        discountMsg.innerText = `Spend ${zarFormatter.format(10000 - total)} more to unlock 10% Bulk Discount!`;
    }

    cartTotalPrice.innerText = zarFormatter.format(finalTotal);
}

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
}
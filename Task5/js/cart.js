const CART_KEY = 'shopease_cart';

const cartContainer = document.getElementById('cart-container');
const cartCount = document.getElementById('cart-count');
const itemCount = document.getElementById('item-count');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
});

// Cart Storage Functions
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Render Cart
function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        renderEmptyCart();
        return;
    }

    const total = calculateTotal(cart);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    itemCount.textContent = `(${totalItems} item${totalItems !== 1 ? 's' : ''})`;

    cartContainer.innerHTML = `
        <!-- Cart Items -->
        <div class="cart-items">
            ${cart.map((item, index) => `
                <div class="cart-item" style="animation-delay: ${index * 0.1}s">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-category">${item.category}</span>
                        <h3 class="cart-item-title">${item.title}</h3>
                        <span class="cart-item-price">₹${item.price.toLocaleString()}</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-btn" onclick="removeItem(${item.id})" title="Remove item" aria-label="Remove ${item.title}">
                            ✕
                        </button>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" ${item.quantity <= 1 ? 'disabled' : ''} aria-label="Decrease quantity">
                                −
                            </button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Increase quantity">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Cart Summary -->
        <div class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-row">
                <span>Subtotal (${totalItems} items)</span>
                <span class="value">₹${total.toLocaleString()}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span class="value" style="color: var(--success)">Free</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span class="value">₹${total.toLocaleString()}</span>
            </div>
            <div class="summary-actions">
                <button class="checkout-btn" onclick="checkout()">
                    Proceed to Checkout
                </button>
                <button class="clear-cart-btn" onclick="clearCart()">
                    Clear Cart
                </button>
            </div>
        </div>
    `;
}

// Render Empty Cart
function renderEmptyCart() {
    itemCount.textContent = '';

    cartContainer.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <a href="index.html" class="continue-shopping-btn">
                ← Continue Shopping
            </a>
        </div>
    `;
}

// Calculate Total
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update Quantity
function updateQuantity(productId, delta) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    saveCart(cart);
    renderCart();
    updateCartCount();
}

// Remove Item
function removeItem(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);

    saveCart(cart);
    renderCart();
    updateCartCount();
}

// Clear Cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem(CART_KEY);
        renderCart();
        updateCartCount();
    }
}

// Checkout (Demo)
function checkout() {
    const cart = getCart();
    const total = calculateTotal(cart);

    alert(`Thank you for your order!\n\nTotal: ₹${total.toLocaleString()}\n\nThis is a demo. In a real application, you would be redirected to a payment gateway.`);
}

// Update Cart Count
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Hide count if zero
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

let allProducts = [];
let visibleProducts = [];
const CART_KEY = 'shopease_cart';

const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('category-filter');
const sortFilter = document.getElementById('sort-filter');
const cartCount = document.getElementById('cart-count');
const loading = document.getElementById('loading');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartCount();
    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
});

// Fetch Products from JSON
async function fetchProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        allProducts = await response.json();
        visibleProducts = [...allProducts];
        renderProducts(visibleProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        productList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">⚠️</div>
                <h3>Failed to load products</h3>
                <p>Please try refreshing the page.</p>
            </div>
        `;
    }
}

// Render Products
function renderProducts(products) {
    if (loading) loading.remove();
    
    if (products.length === 0) {
        productList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters.</p>
            </div>
        `;
        return;
    }
    
    productList.innerHTML = products.map((product, index) => `
        <article class="product-card" role="listitem" style="animation-delay: ${index * 0.05}s">
            <div class="product-image">
                ${renderBadge(product.badge)}
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-footer">
                    <div class="product-meta">
                        <div class="rating">
                            <div class="stars">${renderStars(product.rating)}</div>
                            <span class="review-count">(${product.reviewCount})</span>
                        </div>
                        <div class="price-container">
                            <span class="price">₹${product.price.toLocaleString()}</span>
                            ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                        </div>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" data-product-id="${product.id}">
                        <span>🛒</span> Add to Cart
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Render Badge
function renderBadge(badge) {
    if (!badge) return '';
    
    const badgeText = {
        'new': 'New',
        'sale': 'Sale',
        'bestseller': 'Bestseller'
    };
    
    return `<span class="badge badge-${badge}">${badgeText[badge]}</span>`;
}

// Render Star Rating
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star filled">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<span class="star half">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star empty">☆</span>';
    }
    
    return starsHTML;
}

// Apply Filters and Sorting
function applyFilters() {
    const category = categoryFilter.value;
    const sortOption = sortFilter.value;
    visibleProducts = category === 'All' 
        ? [...allProducts]
        : allProducts.filter(product => product.category === category);
    
    sortProducts(sortOption);
    renderProducts(visibleProducts);
}

// Sort Products
function sortProducts(criteria) {
    switch (criteria) {
        case 'price-low':
            visibleProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            visibleProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating-high':
            visibleProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'rating-low':
            visibleProducts.sort((a, b) => a.rating - b.rating);
            break;
        default:
            visibleProducts.sort((a, b) => a.id - b.id);
    }
}

// Cart Functions
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartCount();
    
    // Visual feedback
    const button = document.querySelector(`[data-product-id="${productId}"]`);
    if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span>✓</span> Added!';
        button.classList.add('added');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('added');
        }, 1500);
    }
    
    // Animate cart icon
    const cartLink = document.getElementById('cart-link');
    cartLink.classList.add('animate-pulse');
    setTimeout(() => cartLink.classList.remove('animate-pulse'), 300);
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Hide count if zero
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

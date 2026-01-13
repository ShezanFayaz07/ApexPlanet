// Product Data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 2999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 4999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        title: "Cotton T-Shirt",
        price: 799,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        title: "Denim Jacket",
        price: 2499,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        title: "Leather Wallet",
        price: 1299,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        title: "Sunglasses",
        price: 1599,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        title: "Bluetooth Speaker",
        price: 3499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        title: "Running Shoes",
        price: 3999,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        title: "Backpack",
        price: 1899,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        title: "Laptop Stand",
        price: 2199,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
    },
    {
        id: 11,
        title: "Hoodie",
        price: 1999,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        title: "Wrist Watch",
        price: 5999,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=300&fit=crop"
    }
];


const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('category-filter');
const sortFilter = document.getElementById('sort-filter');

let currentProducts = [...products];


function renderProducts(productsToRender) {
    productList.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('role', 'listitem');

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">₹${product.price}</p>
        `;
        
        productList.appendChild(productCard);
    });
}
function filterProducts() {
        const selectedCategory = categoryFilter.value;
     const sortOption = sortFilter.value;

    const filtered = selectedCategory === "All" 
    ? [...products]
    : products.filter(product => product.category === selectedCategory);

    currentProducts = filtered;
    applySorting(sortOption);
}
function applySorting(sortOption){
    sorted = [...currentProducts]

    if(sortOption === 'Low to High'){
        sorted.sort((a,b) => a.price - b.price)
    }
    else if (sortOption === 'High to Low'){
        sorted.sort((a,b) => b.price - a.price)
    }

    renderProducts(sorted)
}


categoryFilter.addEventListener('change', filterProducts);

sortFilter.addEventListener('change', () => {
    applySorting(sortFilter.value);
});

// Initial render
renderProducts(products);
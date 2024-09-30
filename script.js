// script.js

// API de FakeStore para obtener los productos
const API_URL = 'https://fakestoreapi.com/products';

// Elementos del DOM
const productsContainer = document.getElementById('products-container');
const categoriesContainer = document.getElementById('categories-container');
const searchInput = document.getElementById('search-input');

// Variables globales
let products = [];
let filteredProducts = [];

// Función para cargar los productos desde la API
const loadProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        products = await response.json();
        filteredProducts = products; 
        displayProducts(products);
        loadCategories();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        productsContainer.innerHTML = '<p>Error al cargar productos. Por favor, inténtelo más tarde.</p>';
    }
};

// Función para mostrar los productos en la interfaz
const displayProducts = (products) => {
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        productsContainer.appendChild(productCard);
    });
};

// Función para cargar las categorías dinámicamente
const loadCategories = () => {
    const categories = [...new Set(products.map(product => product.category))];
    categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.innerText = capitalize(category);
        categoryButton.classList.add('category-btn');
        categoryButton.onclick = () => filterByCategory(category);
        categoriesContainer.appendChild(categoryButton);
    });
};

// Función para filtrar productos por categoría
const filterByCategory = (category) => {
    filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
};

// Función para buscar productos por título o descripción
const searchProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
};

// Función para agregar productos al carrito usando localStorage
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.title} añadido al carrito!`);
};

// Función auxiliar para capitalizar palabras
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// Evento para buscar productos cuando el usuario escribe en el input de búsqueda
searchInput.addEventListener('input', searchProducts);

// Cargar los productos cuando se carga la página
window.onload = loadProducts;

// Evento para buscar productos cuando se hace clic en el botón de búsqueda
document.getElementById('search-btn').addEventListener('click', searchProducts);

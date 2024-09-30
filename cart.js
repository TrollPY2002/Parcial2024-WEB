// cart.js

// Función para cargar los productos del carrito desde el localStorage
const loadCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalAmountEl = document.getElementById('total-amount');
    let totalAmount = 0;

    cartContainer.innerHTML = '';

    // Mostrar cada producto en el carrito
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50">
            <h3>${item.title}</h3>
            <p>Precio: $${item.price.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);

        // Calcular el total
        totalAmount += item.price;
    });

    // Mostrar el total
    totalAmountEl.innerText = totalAmount.toFixed(2);
};

// Función para procesar el pago (simulada)
const checkout = () => {
    alert('Pago realizado con éxito!');
    localStorage.removeItem('cart');  // Limpiar el carrito después del pago
    window.location.href = 'shop.html';  // Redirigir a la tienda
};

// Cargar los productos del carrito al cargar la página
window.onload = loadCartItems;

// Evento para el botón de pagar
document.getElementById('checkout-btn').addEventListener('click', checkout);

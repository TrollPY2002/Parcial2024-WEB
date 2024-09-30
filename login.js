// login.js

// Función para manejar el login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Credenciales simuladas
    const validUsername = 'mor_2314';
    const validPassword = '83r5^_';

    // Validar las credenciales
    if (username === validUsername && password === validPassword) {
        alert('Login exitoso! Redirigiendo a la tienda...');
        window.location.href = 'shop.html';  // Redirigir a la tienda
    } else {
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
});

const path = window.location.pathname;
const pathSegments = path.split('/');
const productId = pathSegments[pathSegments.length - 1];

const products = [
    {
        productId,
        quantity: 1,
    },
];

const addProductToCart = document.getElementById('addToCart');

addProductToCart.addEventListener('click', async () => {
    const response = await fetch('/api/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
    });

    if (response.ok) {
        const data = await response.json();

        sessionStorage.setItem('cart', JSON.stringify(data.cart));

        const cartCount = document.getElementById('countItems');
        if (cartCount) {
            cartCount.textContent = data.cart.products.length;
        }

        const cartLink = document.getElementById('cartLink');
        if (cartLink) {
            cartLink.href = `/cart/${data.cart._id}`;
        }
    } else {
        console.error('Hubo un error al agregar el producto al carrito');
    }
});

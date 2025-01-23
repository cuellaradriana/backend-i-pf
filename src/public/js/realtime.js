const socket = io();

const renderProducts = document.getElementById('renderProducts');

const createDivProduct = (product) => {
    let divProduct = document.createElement('div');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let price = document.createElement('p');
    let image = document.createElement('img');
    divProduct.id = product.id;
    title.textContent = product.title;
    description.textContent = product.description;
    price.textContent = `$${product.price}`;
    image.src = product.thumbnails[0];
    image.alt = product.title;
    divProduct.append(title, description, price, image);
    renderProducts.append(divProduct);
};

socket.on('newProduct', (product) => {
    createDivProduct(product);
});

socket.on('deleteProduct', (productId) => {
    const product = document.getElementById(productId);
    if (product) {
        product.remove();
    }
});

const dataProducts = async () => {
    const response = await fetch('/api/products');
    const { products } = await response.json();

    products.forEach((product) => {
        createDivProduct(product);
    });
};

dataProducts();

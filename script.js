let cart = [];

// Carregar o carrinho salvo no LocalStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage(); // Carregar o carrinho salvo
});

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('siteCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart(); // Atualiza o carrinho com os dados recuperados
    }
}

function addToCart(product, price) {
    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    updateCart();
    saveCartToLocalStorage(); // Salva o carrinho atualizado no LocalStorage
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
    saveCartToLocalStorage(); // Salva o carrinho atualizado no LocalStorage após remover item
}
//NÃO MEXER, DIFICL PRA KRL, SE MEXER TOMA CACETE
function updateCart() {
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    cartContent.innerHTML = '';
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <span>${item.product} - R$ ${item.price.toFixed(2)}/unidade</span>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            <button onclick="removeItem(${index})">Remover</button>`;
        cartContent.appendChild(cartItem);
    });
    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}
//NÃO MEXER, DIFICL PRA KRL, SE MEXER TOMA CACETE
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    updateCart();
    saveCartToLocalStorage(); // Salva o carrinho atualizado no LocalStorage após atualizar quantidade
}

function saveCartToLocalStorage() {
    localStorage.setItem('siteCart', JSON.stringify(cart));
}

function sendWhatsAppMessage() {
    let message = "Olá! Gostaria de encomendar os seguintes itens:\n";
    cart.forEach(item => {
        message += `${item.product} - R$ ${item.price.toFixed(2)}/unidade (Quantidade: ${item.quantity})\n`;
    });
    // Substitua o número de telefone abaixo pelo número do WhatsApp do mercado
    let phoneNumber = "+5511981081189";
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
}
//NÃO MEXER, DIFICL PRA KRL, SE MEXER TOMA CACETE
// Função de pesquisa de produtos
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const promoItems = document.querySelectorAll('.product-item');

    promoItems.forEach(item => {
        const productName = item.querySelector('h3').innerText.toLowerCase();
        if (productName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
let currentIndex = 0;

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    currentIndex = (currentIndex + direction + items.length) % items.length;

    document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function moveToSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    currentIndex = index;

    document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Optional: Automatic Carousel
setInterval(() => moveCarousel(1), 3000);

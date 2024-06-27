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
    let phoneNumber = "+55123456789";
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
}

// Carrossel
let currentSlide = 0;
const carouselInner = document.getElementById('carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentSlide * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

// Função de pesquisa de produtos
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const promoItems = document.querySelectorAll('.promo-item');

    promoItems.forEach(item => {
        const productName = item.dataset.productName.toLowerCase();
        if (productName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

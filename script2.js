let cart = [];

function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

function buyProduct(name, price) {
    cart.push({ name, price });
    updateCartCount();
    showCartToast(name + ' added to cart!');
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function openCart() {
    renderCart();
    document.getElementById('cartModal').classList.add('active');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function renderCart() {
    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#6B5D54;padding:2rem 0;">Your cart is empty</p>';
        document.getElementById('cartTotal').textContent = 'R 0';
        return;
    }
    let total = 0;
    container.innerHTML = cart.map((item, i) => {
        total += item.price;
        return '<div class="cart-item"><span class="cart-item-name">' + item.name + '</span><span class="cart-item-price">R ' + item.price + ' <button onclick="removeItem(' + i + ')" style="background:none;border:none;color:#c0392b;cursor:pointer;font-size:1.1rem;margin-left:0.5rem;">&times;</button></span></div>';
    }).join('');
    document.getElementById('cartTotal').textContent = 'R ' + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

function checkout() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert('Thank you for your order!\n\nTotal: R ' + total + '\n\nThis is a demo checkout. To enable real payments, connect a payment provider like Stripe or PayPal.');
}

function submitForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
    return false;
}

function showCartToast(message) {
    let toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:5.5rem;right:2rem;background:#3E2210;color:#F5EDE0;padding:0.8rem 1.5rem;border-radius:10px;font-size:0.9rem;z-index:300;opacity:0;transition:opacity 0.3s;box-shadow:0 4px 20px rgba(0,0,0,0.2);';
    document.body.appendChild(toast);
    setTimeout(function() { toast.style.opacity = '1'; }, 10);
    setTimeout(function() { toast.style.opacity = '0'; setTimeout(function() { toast.remove(); }, 300); }, 2500);
}

document.addEventListener('click', function(e) { if (e.target.id === 'cartModal') closeCart(); });
document.querySelectorAll('.nav-menu a').forEach(function(link) { link.addEventListener('click', function() { document.getElementById('navMenu').classList.remove('active'); }); });

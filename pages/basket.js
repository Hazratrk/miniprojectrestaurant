
class BasketSystem {
    constructor() {
        this.basket = JSON.parse(localStorage.getItem('basket')) || [];
        this.init();
    }

    init() {
        this.updateBasketCount();
        this.loadBasketItems();
        this.setupEventListeners();
    }

    setupEventListeners() {
  
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.basket.length === 0) {
                    alert('Your basket is empty!');
                    return;
                }
                alert('Order placed successfully!');
                this.clearBasket();
            });
        }
    }

    addToBasket(dishId, name, price, image, quantity = 1) {
        const existingItem = this.basket.find(item => item.id === dishId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.basket.push({
                id: dishId,
                name,
                price,
                image,
                quantity
            });
        }

        this.saveBasket();
        this.updateBasketCount();
    }

    removeFromBasket(dishId) {
        this.basket = this.basket.filter(item => item.id !== dishId);
        this.saveBasket();
        this.loadBasketItems();
        this.updateBasketCount();
    }

    updateQuantity(dishId, newQuantity) {
        const item = this.basket.find(item => item.id === dishId);
        if (item) {
            item.quantity = newQuantity;
            this.saveBasket();
            this.loadBasketItems();
        }
    }

    clearBasket() {
        this.basket = [];
        this.saveBasket();
        this.loadBasketItems();
        this.updateBasketCount();
    }

    saveBasket() {
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }

    updateBasketCount() {
        const count = this.basket.reduce((sum, item) => sum + item.quantity, 0);
        const basketCountElements = document.querySelectorAll('#basketCount');
        
        basketCountElements.forEach(el => {
            el.textContent = count;
        });
    }

    loadBasketItems() {
        const basketItemsContainer = document.getElementById('basketItems');
        const emptyBasketMessage = document.getElementById('emptyBasketMessage');
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');

        if (!basketItemsContainer) return;

        basketItemsContainer.innerHTML = '';

        if (this.basket.length === 0) {
            if (emptyBasketMessage) emptyBasketMessage.classList.remove('hidden');
            if (subtotalElement) subtotalElement.textContent = '$0.00';
            if (totalElement) totalElement.textContent = '$2.50';
            return;
        }

        if (emptyBasketMessage) emptyBasketMessage.classList.add('hidden');

        let subtotal = 0;

        this.basket.forEach(item => {
            subtotal += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center py-4 border-b';
            itemElement.innerHTML = `
                <div class="flex-shrink-0 w-20 h-20">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded">
                </div>
                <div class="ml-4 flex-grow">
                    <h3 class="font-medium">${item.name}</h3>
                    <p class="text-amber-700 font-semibold">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center mx-4">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="px-3 quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <div class="w-20 text-right font-semibold">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="ml-4 text-red-600 remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            basketItemsContainer.appendChild(itemElement);
        });

        // Quantity buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const item = this.basket.find(item => item.id === id);
                if (item && item.quantity > 1) {
                    this.updateQuantity(id, item.quantity - 1);
                } else {
                    this.removeFromBasket(id);
                }
            });
        });

        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const item = this.basket.find(item => item.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity + 1);
                }
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('button').getAttribute('data-id');
                this.removeFromBasket(id);
            });
        });

        // Update totals
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${(subtotal + 2.5).toFixed(2)}`;
    }
}


const basketSystem = new BasketSystem();

// Add to basket functionality for detail page
if (document.getElementById('addToBasket')) {
    document.getElementById('addToBasket').addEventListener('click', () => {
        const dishId = new URLSearchParams(window.location.search).get('id');
        const name = document.getElementById('dishName')?.textContent;
        const priceText = document.getElementById('dishPrice')?.textContent;
        const price = priceText ? parseFloat(priceText.replace('$', '')) : 0;
        const image = document.getElementById('dishImage')?.src;
        const quantity = parseInt(document.getElementById('quantity')?.textContent) || 1;

        if (!dishId || !name || !price || !image) {
            console.error('Missing required dish information');
            return;
        }

        basketSystem.addToBasket(dishId, name, price, image, quantity);
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center animate-fade-in';
        notification.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            ${name} added to basket!
        `;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('animate-fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    });
}


if (document.getElementById('increaseQty')) {
    document.getElementById('increaseQty').addEventListener('click', () => {
        const quantityElement = document.getElementById('quantity');
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    });

    document.getElementById('decreaseQty').addEventListener('click', () => {
        const quantityElement = document.getElementById('quantity');
        const current = parseInt(quantityElement.textContent);
        if (current > 1) {
            quantityElement.textContent = current - 1;
        }
    });
}
// Menu data
const menuItems = [
    {
        id: "1",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
        price: 12.99,
        category: "pizza",
        rating: 4.5,
        prepTime: "20-25 mins",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "2",
        name: "Pepperoni Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and pepperoni.",
        price: 14.99,
        category: "pizza",
        rating: 4.7,
        prepTime: "20-25 mins",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "3",
        name: "Grilled Steak",
        description: "Premium cut steak grilled to perfection with roasted vegetables.",
        price: 22.99,
        category: "main",
        rating: 4.8,
        prepTime: "25-30 mins",
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "4",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan.",
        price: 7.99,
        category: "salad",
        rating: 4.2,
        prepTime: "10-15 mins",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "5",
        name: "Sushi Platter",
        description: "Assorted fresh sushi including nigiri, sashimi, and maki rolls.",
        price: 18.50,
        category: "sushi",
        rating: 4.9,
        prepTime: "15-20 mins",
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "6",
        name: "Cheeseburger",
        description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce.",
        price: 9.49,
        category: "burger",
        rating: 4.3,
        prepTime: "15-20 mins",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
];

class MenuSystem {
    constructor() {
        this.filteredItems = [...menuItems];
        this.currentSort = 'default';
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.renderMenu();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterItems();
            });
        }

        // Sort functionality
        const sortSelect = document.getElementById('sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortItems();
                this.renderMenu();
            });
        }
    }

    filterItems() {
        if (!this.searchTerm) {
            this.filteredItems = [...menuItems];
        } else {
            this.filteredItems = menuItems.filter(item =>
                item.name.toLowerCase().includes(this.searchTerm) ||
                item.description.toLowerCase().includes(this.searchTerm) ||
                item.category.toLowerCase().includes(this.searchTerm)
            );
        }
        this.sortItems();
        this.renderMenu();
    }

    sortItems() {
        switch (this.currentSort) {
            case 'price-low':
                this.filteredItems.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredItems.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                this.filteredItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                this.filteredItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'rating':
                this.filteredItems.sort((a, b) => b.rating - a.rating);
                break;
            default:
                this.filteredItems = [...menuItems];
        }
    }

    renderMenu() {
        const menuContainer = document.getElementById('menuItems');
        if (!menuContainer) return;

        menuContainer.innerHTML = '';

        if (this.filteredItems.length === 0) {
            menuContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-utensils text-4xl text-amber-500 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">No dishes found</h3>
                    <p class="text-gray-600">Try adjusting your search or filter</p>
                </div>
            `;
            return;
        }

        this.filteredItems.forEach(item => {
            const dishCard = document.createElement('div');
            dishCard.className = 'dish-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all';
            dishCard.innerHTML = `
                <a href="detail.html?id=${item.id}">
                    <div class="relative">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                        <span class="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                            ${item.category}
                        </span>
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-start">
                            <h3 class="font-bold text-lg mb-1">${item.name}</h3>
                            <span class="text-amber-700 font-bold">$${item.price.toFixed(2)}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${item.description}</p>
                        <div class="flex justify-between items-center text-sm">
                            <div class="flex items-center">
                                <i class="fas fa-star text-amber-500 mr-1"></i>
                                <span>${item.rating}</span>
                            </div>
                            <span class="text-gray-500">${item.prepTime}</span>
                        </div>
                    </div>
                </a>
                <div class="px-4 pb-4">
                    <button class="add-to-basket-btn w-full" data-id="${item.id}">
                        <i class="fas fa-shopping-cart mr-2"></i> Add to Basket
                    </button>
                </div>
            `;
            menuContainer.appendChild(dishCard);
        });

        
        document.querySelectorAll('.add-to-basket-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const dishId = button.getAttribute('data-id');
                const dish = menuItems.find(item => item.id === dishId);
                
                if (dish) {
                  
                    if (typeof basketSystem !== 'undefined') {
                        basketSystem.addToBasket(dish.id, dish.name, dish.price, dish.image);
                        
                     
                        const notification = document.createElement('div');
                        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center';
                        notification.innerHTML = `
                            <i class="fas fa-check-circle mr-2"></i>
                            ${dish.name} added to basket!
                        `;
                        document.body.appendChild(notification);
                        
                       
                        setTimeout(() => {
                            notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
                            setTimeout(() => notification.remove(), 300);
                        }, 3000);
                    }
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuSystem = new MenuSystem();
});
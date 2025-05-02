
const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
        price: 12.99,
        category: "pizza",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and pepperoni.",
        price: 14.99,
        category: "pizza",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Grilled Steak",
        description: "Premium cut steak grilled to perfection with roasted vegetables.",
        price: 22.99,
        category: "main",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan.",
        price: 7.99,
        category: "salad",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Sushi Platter",
        description: "Assorted fresh sushi including nigiri, sashimi, and maki rolls.",
        price: 18.5,
        category: "sushi",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Cheeseburger",
        description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce.",
        price: 9.49,
        category: "burger",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
    }
  ];
  
  class MenuSystem {
    constructor() {
        this.filteredItems = [...menuItems];
        this.currentSort = 'default';
        this.initEventListeners();
        this.renderMenu();
    }
  
    initEventListeners() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterItems(e.target.value);
            });
        }
  
        const sortSelect = document.getElementById('sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortItems();
                this.renderMenu();
            });
        }
    }
  
    filterItems(searchTerm) {
        if (!searchTerm) {
            this.filteredItems = [...menuItems];
        } else {
            this.filteredItems = menuItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            menuContainer.innerHTML = '<p class="text-center py-8 text-lg">No dishes found matching your search.</p>';
            return;
        }
  
        this.filteredItems.forEach(item => {
            const dishCard = document.createElement('div');
            dishCard.className = 'dish-card p-4 rounded-2xl shadow-lg bg-white hover:shadow-xl transition duration-300';
  
            dishCard.innerHTML = `
                <a href="detail.html?id=${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-xl mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-1">${item.name}</h3>
                        <p class="text-sm text-gray-600 mb-2">${item.description}</p>
                        <div class="flex justify-between items-center mt-2">
                            <span class="font-bold text-green-600">$${item.price.toFixed(2)}</span>
                            <span class="text-yellow-500">
                                <i class="fas fa-star"></i> ${item.rating}
                            </span>
                        </div>
                        <button class="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">View Details</button>
                    </div>
                </a>
            `;
            menuContainer.appendChild(dishCard);
        });
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new MenuSystem();
  });
  
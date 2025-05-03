
document.addEventListener('DOMContentLoaded', function() {
   
    const urlParams = new URLSearchParams(window.location.search);
    const dishId = urlParams.get('id');
    
    if (!dishId) {
        window.location.href = 'menu.html';
        return;
    }
    
    const dishes = [
        {
            id: "1",
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
            price: 12.99,
            ingredients: ["Hand-tossed pizza dough", "San Marzano tomato sauce", "Fresh mozzarella di bufala", "Fresh basil leaves", "Extra virgin olive oil", "Sea salt"],
            nutrition: { calories: 850, protein: "35g", carbs: "95g", fat: "35g" },
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            reviews: []
        },
        
    ];

    const dish = dishes.find(d => d.id === dishId);
    if (dish) {
       
        document.getElementById('dishName').textContent = dish.name;
        document.getElementById('dishPrice').textContent = `$${dish.price.toFixed(2)}`;
        document.getElementById('dishImage').src = dish.image;
        document.getElementById('dishDescription').textContent = dish.description;
        document.getElementById('reviewDishName').textContent = dish.name;

       
        const ingredientsList = document.getElementById('dishIngredients');
        ingredientsList.innerHTML = '';
        dish.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });

     
        document.getElementById('calories').textContent = dish.nutrition.calories;
        document.getElementById('protein').textContent = dish.nutrition.protein;
        document.getElementById('carbs').textContent = dish.nutrition.carbs;
        document.getElementById('fat').textContent = dish.nutrition.fat;

        // Reviews
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (dish.reviews.length === 0) {
            reviewsContainer.innerHTML = `<p class="text-gray-600">Not any reviews for <span class="font-semibold">${dish.name}</span> yet!</p>`;
        } else {
            
        }

        // Review form
        const reviewForm = document.getElementById('reviewForm');
        const stars = document.querySelectorAll('.rating-stars i');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                document.getElementById('reviewRating').value = rating;
                
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });

        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const reviewText = document.getElementById('reviewText').value;
            const rating = document.getElementById('reviewRating').value;

            if (!rating) {
                alert('Please select a rating');
                return;
            }

            
            alert('Thank you for your review!');
            reviewForm.reset();
            
           
            stars.forEach(star => {
                star.classList.remove('fas');
                star.classList.add('far');
            });
        });
    } else {
    
        window.location.href = 'menu.html';
    }
});

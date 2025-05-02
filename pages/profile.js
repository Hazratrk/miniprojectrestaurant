
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    
    document.getElementById('userProfile').innerHTML = `
        <div class="flex items-center">
            <div class="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 text-2xl font-bold mr-4">
                ${user.username.charAt(0).toUpperCase()}
            </div>
            <div>
                <h3 class="text-xl font-bold">${user.username}</h3>
                <p class="text-gray-600">${user.email}</p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="bg-amber-50 p-3 rounded">
                <p class="text-sm text-gray-500">Member Since</p>
                <p class="font-medium">${new Date().toLocaleDateString()}</p>
            </div>
            <div class="bg-amber-50 p-3 rounded">
                <p class="text-sm text-gray-500">Status</p>
                <p class="font-medium">Active</p>
            </div>
        </div>
    `;
    
   
    document.getElementById('profileNavItem').querySelector('a').textContent = `Welcome, ${user.username}`;
    
    
    document.getElementById('logoutNavItem').querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const messageEl = document.getElementById('registerMessage');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            
            const result = authSystem.register(username, email, password);
            
            if (result.success) {
                authSystem.showMessage(messageEl, result.message, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                authSystem.showMessage(messageEl, result.message, 'error');
            }
        });
    }

    
    if (authSystem.currentUser) {
        window.location.href = 'profile.html';
    }
});
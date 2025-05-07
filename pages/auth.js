class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.initAuthUI();
    }

 
    initAuthUI() {
        this.updateNavbar();
    }


    updateNavbar() {
        const authNavItem = document.getElementById('authNavItem');
        if (!authNavItem) return;

        if (this.currentUser) {
            authNavItem.innerHTML = `
                <li class="flex items-center">
                    <a href="profile.html" class="nav-link">
                        <i class="fas fa-user-circle mr-1"></i> ${this.currentUser.username}
                    </a>
                </li>
                <li>
                    <a href="#" id="logoutBtn" class="nav-link">
                        <i class="fas fa-sign-out-alt mr-1"></i> Logout
                    </a>
                </li>
            `;

            
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        } else {
            authNavItem.innerHTML = `
                <li><a href="login.html" class="nav-link">Login</a></li>
            `;
        }
    }

    
    register(username, email, password) {

    }

   
    login(usernameOrEmail, password) {
      
    }

 
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Bütün səhifələrdə navbarı yenilə
        this.updateNavbar();
        
        
        window.location.href = 'index.html';
    }

   
    showMessage(element, message, type = 'error') {
     
    }
}


const authSystem = new AuthSystem();
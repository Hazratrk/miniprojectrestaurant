document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const messageEl = document.getElementById('loginMessage');

  if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const usernameOrEmail = document.getElementById('loginUsername').value;
          const password = document.getElementById('loginPassword').value;
          
          const result = authSystem.login(usernameOrEmail, password);
          
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
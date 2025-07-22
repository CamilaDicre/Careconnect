console.log("login.js loaded!");

const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "usuario", password: "pass123", role: "paciente" },
    { username: "Ameth", password: "password123", role: "admin" },
    { username: "Josue", password: "testpass456", role: "cuidador" },
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const loginToggle = document.getElementById("loginToggle");
    const loginForm = document.getElementById("loginForm");
    const signupButton = document.getElementById("signupButton");
  
    // Only add event if both elements exist
    if (loginToggle && loginForm) {
      // Close login form when clicking outside
      document.addEventListener("click", (event) => {
        if (!loginForm.contains(event.target) && !loginToggle.contains(event.target)) {
          loginForm.classList.add("d-none");
        }
      });
  
      loginToggle.addEventListener("click", (event) => {
        console.log("Login button clicked!");
        event.stopPropagation();
        loginForm.classList.toggle("d-none");
      });
    }
  
    if (signupButton) {
      signupButton.addEventListener("click", redirectToSignup);
    }
  
    updateLoginUI();

    // Conectar el submit del formulario de login.html
    const loginFormHTML = document.querySelector('#login-card form');
    if (loginFormHTML) {
      loginFormHTML.addEventListener('submit', function(e) {
        e.preventDefault();
        login();
      });
    }

    // Registro de usuario desde el formulario de register-card
    const registerFormHTML = document.querySelector('#register-card form');
    if (registerFormHTML) {
      registerFormHTML.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-pass').value.trim();
        const role = document.getElementById('reg-role').value;
        if (!name || !email || !password || !role) {
          alert('Please fill in all fields.');
          return;
        }
        let users = getUsers();
        if (users.find(u => u.username === name)) {
          alert('Username already exists.');
          return;
        }
        users.push({ username: name, email, password, role });
        saveUsers(users);
        showBanner('¡Se creó su cuenta!', 'success');
        document.getElementById('show-login').click();
      });
    }

    // --- AGREGADO: Alternar entre login y registro ---
    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');
    const toRegisterLink = document.getElementById('to-register');
    const toLoginLink = document.getElementById('to-login');
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');

    function showLogin() {
      loginCard.style.display = '';
      registerCard.style.display = 'none';
      showLoginBtn.classList.add('active');
      showRegisterBtn.classList.remove('active');
    }
    function showRegister() {
      loginCard.style.display = 'none';
      registerCard.style.display = '';
      showLoginBtn.classList.remove('active');
      showRegisterBtn.classList.add('active');
    }
    if (showLoginBtn) showLoginBtn.addEventListener('click', showLogin);
    if (showRegisterBtn) showRegisterBtn.addEventListener('click', showRegister);
    if (toRegisterLink) toRegisterLink.addEventListener('click', function(e) { e.preventDefault(); showRegister(); });
    if (toLoginLink) toLoginLink.addEventListener('click', function(e) { e.preventDefault(); showLogin(); });
    // --- FIN AGREGADO ---
  });
  
  // Utilidad para obtener usuarios desde localStorage o usar los hardcodeados
  function getUsers() {
    const stored = localStorage.getItem('users');
    if (stored) {
      return JSON.parse(stored);
    }
    // Si no hay usuarios guardados, usar los de ejemplo y guardarlos
    const defaultUsers = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "usuario", password: "pass123", role: "paciente" },
      { username: "Ameth", password: "password123", role: "admin" },
      { username: "Josue", password: "testpass456", role: "cuidador" },
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  function login() {
    const username = document.getElementById("login-user").value.trim();
    const password = document.getElementById("login-pass").value;
    console.log('Intentando login con:', username, password);
  
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem("loggedInUser", username);
      localStorage.setItem("userRole", user.role);
      updateLoginUI();
      showBanner('¡Se inició sesión!', 'success');
      // Redirigir según el rol
      setTimeout(() => {
        if (user.role === "admin") {
          window.location.href = "../dashboard/admin-dashboard.html";
        } else if (user.role === "cuidador") {
          window.location.href = "../dashboard/caregivers/caregiver-dashboard.html";
        } else {
          window.location.href = "../dashboard/dashboard.html";
        }
      }, 1200);
    } else {
      console.log('Login fallido, mostrando mensaje de error');
      showAlert('Usuario o contraseña incorrecto, revise y vuelva a intentar', 'danger', 'loginError');
    }
  }
  
  function logout() {
    showBanner('Logging out...', 'success');
    setTimeout(() => {
      localStorage.removeItem("loggedInUser");
      updateLoginUI();
      // Si quieres redirigir a la página principal después de logout, descomenta la siguiente línea:
      // window.location.href = '../index.html';
    }, 1200);
  }
  
  function updateLoginUI() {
    const user = localStorage.getItem("loggedInUser");
    const loginSection = document.getElementById("loginSection");
    const userSection = document.getElementById("userSection");
    const userGreeting = document.getElementById("userGreeting");
  
    if (user) {
      loginSection?.classList.add("d-none");
      userSection?.classList.remove("d-none");
      if (userGreeting) {
        userGreeting.textContent = `Hola, ${user}`;
      }
    } else {
      loginSection?.classList.remove("d-none");
      userSection?.classList.add("d-none");
    }
  }
  
  // Add function to handle signup button click
  function redirectToSignup() {
    window.location.href = "/signup.html";
  }
  
  // Reemplazar el manejo de errores para mostrar alertas visuales
  function showAlert(message, type = 'danger', target = 'loginError') {
    console.log('showAlert:', message, type, target);
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-2`;
    alertDiv.role = 'alert';
    alertDiv.style.background = type === 'danger' ? '#ffdddd' : '#ddffdd';
    alertDiv.style.color = type === 'danger' ? '#b30000' : '#155724';
    alertDiv.style.border = '1px solid #b30000';
    alertDiv.style.padding = '10px 16px';
    alertDiv.style.fontWeight = 'bold';
    alertDiv.style.fontSize = '1rem';
    alertDiv.style.borderRadius = '8px';
    alertDiv.innerHTML = message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="float:right;"></button>';
    const targetElem = document.getElementById(target);
    if (targetElem) {
        targetElem.innerHTML = '';
        targetElem.appendChild(alertDiv);
        setTimeout(() => {
          if (targetElem.contains(alertDiv)) {
            targetElem.innerHTML = '';
          }
        }, 5000);
    } else {
      console.log('No se encontró el elemento para mostrar el error:', target);
    }
  }

  function showBanner(message, type = 'success') {
    const banner = document.getElementById('messageBanner');
    if (!banner) return;
    banner.innerHTML = `<div style="display:inline-block;margin:16px auto;padding:16px 32px;background:${type==='success'?'#d1fae5':'#fee2e2'};color:${type==='success'?'#065f46':'#991b1b'};border-radius:8px;font-size:1.2rem;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.08);border:1px solid ${type==='success'?'#10b981':'#ef4444'};">${message}</div>`;
    banner.style.display = 'block';
    setTimeout(()=>{ banner.style.display = 'none'; banner.innerHTML = ''; }, 3000);
  }
  
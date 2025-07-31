console.log("login.js loaded!");

const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "pass123", role: "patient" },
    { username: "Ameth", password: "password123", role: "admin" },
    { username: "Josue", password: "testpass456", role: "caregiver" },
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
        
        // Obtener y validar campos
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-pass').value.trim();
        const role = document.getElementById('reg-role').value;
        const gender = document.getElementById('reg-gender').value;
        
        // Validar campos requeridos
        if (!name || !email || !password || !role || !gender) {
          alert('Please fill in all fields.');
          return;
        }
        
        // Validar longitud de campos
        if (name.length > 100) {
          alert('Name is too long. Maximum 100 characters.');
          return;
        }
        
        if (email.length > 100) {
          alert('Email is too long. Maximum 100 characters.');
          return;
        }
        
        if (password.length < 6) {
          alert('Password must be at least 6 characters long.');
          return;
        }
        
        if (password.length > 50) {
          alert('Password is too long. Maximum 50 characters.');
          return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        
        // Verificar si localStorage está disponible
        if (!LocalStorageUtils.isAvailable()) {
          alert('localStorage is not available in your browser. Please enable it or try a different browser.');
          return;
        }
        
        try {
          let users = getUsers();
          
          // Verificar duplicados por email
          if (users.find(u => u.email === email.toLowerCase())) {
            alert('A user with this email is already registered.');
            return;
          }
          
          // Crear usuario con sanitización
          const newUser = { 
            username: LocalStorageUtils.sanitizeText(name), 
            email: email.toLowerCase().trim(), 
            password: password, // No sanitizar password
            role: role, 
            gender: gender,
            registrationDate: new Date().toISOString(),
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
          };
          
          // Agregar nuevo usuario
          users.push(newUser);
          
          // Guardar usuarios actualizados
          if (!saveUsers(users)) {
            alert('Error al guardar los datos. Por favor, verifica que tienes suficiente espacio de almacenamiento.');
            return;
          }
          
          // If it's a patient, automatically log in and redirect
          if (role === 'paciente') {
            LocalStorageUtils.setItem('loggedInUser', newUser.username);
            LocalStorageUtils.setItem('userRole', newUser.role);
            LocalStorageUtils.setItem('currentUserId', newUser.id);
            showBanner('Patient account created and logged in!', 'success');
            setTimeout(() => {
              window.location.href = '../dashboard/dashboard.html';
            }, 1200);
          } else {
            showBanner('Your account has been created!', 'success');
            document.getElementById('show-login').click();
          }
          
        } catch (error) {
          console.error('Error during registration:', error);
          alert('Error durante el registro. Por favor, intenta de nuevo.');
        }
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
    try {
      // Verificar si localStorage está disponible
      if (!LocalStorageUtils.isAvailable()) {
        console.warn('localStorage is not available');
        return getDefaultUsers();
      }
      
      const users = LocalStorageUtils.getItem('users', []);
      
      // Validar que sea un array
      if (!Array.isArray(users)) {
        console.warn('Users data is not an array, resetting to default');
        return getDefaultUsers();
      }
      
      // Validar que cada usuario tenga los campos requeridos
      const validUsers = users.filter(user => {
        return user && 
               typeof user === 'object' && 
               user.username && 
               user.email && 
               user.role;
      });
      
      if (validUsers.length !== users.length) {
        console.warn('Some users were invalid, filtering out');
        saveUsers(validUsers);
      }
      
      return validUsers;
    } catch (error) {
      console.error('Error getting users from localStorage:', error);
      return getDefaultUsers();
    }
  }
  
  function getDefaultUsers() {
    const defaultUsers = [
      { username: "admin", password: "admin123", role: "admin", email: "admin@careconnect.com", id: "admin1" },
      { username: "usuario", password: "pass123", role: "paciente", email: "usuario@careconnect.com", id: "user1" },
      { username: "Ameth", password: "password123", role: "admin", email: "ameth@careconnect.com", id: "ameth1" },
      { username: "Josue", password: "testpass456", role: "cuidador", email: "josue@careconnect.com", id: "josue1" },
    ];
    
    if (LocalStorageUtils.isAvailable()) {
      LocalStorageUtils.setItem('users', defaultUsers);
    }
    return defaultUsers;
  }
  
  function saveUsers(users) {
    try {
      // Validar que users sea un array
      if (!Array.isArray(users)) {
        throw new Error('Users must be an array');
      }
      
      // Validar que cada usuario tenga los campos requeridos
      const validUsers = users.filter(user => {
        return user && 
               typeof user === 'object' && 
               user.username && 
               user.email && 
               user.role;
      });
      
      if (validUsers.length !== users.length) {
        console.warn('Some users were invalid and were filtered out');
      }
      
      // Guardar usando las utilidades
      return LocalStorageUtils.setItem('users', validUsers, 5000000); // 5MB límite
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
      alert('Error al guardar usuarios. Por favor, verifica el espacio de almacenamiento.');
      return false;
    }
  }
  
  function login() {
    try {
      const username = document.getElementById("login-user").value.trim();
      const password = document.getElementById("login-pass").value;
      
      // Validar campos de entrada
      if (!username || !password) {
        showAlert('Please enter both username and password', 'danger', 'loginError');
        return;
      }
      
      if (username.length > 100) {
        showAlert('Username is too long', 'danger', 'loginError');
        return;
      }
      
      console.log('Intentando login con:', username, password);
    
      const users = getUsers();
      const user = users.find(u => u.username === username && u.password === password);
    
      if (user) {
        try {
          // Guardar datos de sesión usando utilidades
          LocalStorageUtils.setItem("loggedInUser", username);
          LocalStorageUtils.setItem("userRole", user.role);
          if (user.id) {
            LocalStorageUtils.setItem("currentUserId", user.id);
          }
          
          updateLoginUI();
          showBanner('Signed in!', 'success');
          // Redirigir según el rol
          setTimeout(() => {
            if (user.role === "admin") {
              window.location.href = "../dashboard/admin-dashboard.html";
            } else if (user.role === "cuidador") {
              window.location.href = "../dashboard/caregivers pro/Caregiver-pro.html";
            } else {
              window.location.href = "../dashboard/dashboard.html";
            }
          }, 1200);
        } catch (storageError) {
          console.error('Error saving login data:', storageError);
          showAlert('Error saving login data', 'danger', 'loginError');
        }
      } else {
        console.log('Login fallido, mostrando mensaje de error');
        showAlert('Incorrect username or password, please check and try again', 'danger', 'loginError');
      }
    } catch (error) {
      console.error('Error during login:', error);
      showAlert('Error during login. Please try again.', 'danger', 'loginError');
    }
  }
  
  function logout() {
    try {
      showBanner('Logging out...', 'success');
      setTimeout(() => {
        // Limpiar todos los datos de sesión usando utilidades
        LocalStorageUtils.removeItem("loggedInUser");
        LocalStorageUtils.removeItem("userRole");
        LocalStorageUtils.removeItem("currentUserId");
        updateLoginUI();
        // Si quieres redirigir a la página principal después de logout, descomenta la siguiente línea:
        // window.location.href = '../index.html';
      }, 1200);
    } catch (error) {
      console.error('Error during logout:', error);
      // Forzar limpieza en caso de error
      try {
        LocalStorageUtils.removeItem("loggedInUser");
        LocalStorageUtils.removeItem("userRole");
        LocalStorageUtils.removeItem("currentUserId");
        updateLoginUI();
      } catch (cleanupError) {
        console.error('Error during cleanup:', cleanupError);
      }
    }
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
        userGreeting.textContent = `Hello, ${user}`;
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
      console.log('Could not find the element to display the error:', target);
    }
  }

  function showBanner(message, type = 'success') {
    const banner = document.getElementById('messageBanner');
    if (!banner) return;
    banner.innerHTML = `<div style="display:inline-block;margin:16px auto;padding:16px 32px;background:${type==='success'?'#d1fae5':'#fee2e2'};color:${type==='success'?'#065f46':'#991b1b'};border-radius:8px;font-size:1.2rem;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.08);border:1px solid ${type==='success'?'#10b981':'#ef4444'};">${message}</div>`;
    banner.style.display = 'block';
    setTimeout(()=>{ banner.style.display = 'none'; banner.innerHTML = ''; }, 3000);
  }
  
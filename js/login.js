console.log("login.js loaded!");

const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "pass123", role: "patient" },
    { username: "Ameth", password: "password123", role: "admin" },
    { username: "Josue", password: "testpass456", role: "caregiver" },
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    // Verificar y restaurar admin Ameth al cargar la página
    verifyAndRestoreAmethAdmin();
    
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
      // Verificar si LocalStorageUtils está disponible
      if (typeof LocalStorageUtils === 'undefined') {
        console.warn('LocalStorageUtils is not loaded, using fallback');
        return ensureAmethAdmin(getDefaultUsers());
      }
      
      // Verificar si localStorage está disponible
      if (!LocalStorageUtils.isAvailable()) {
        console.warn('localStorage is not available');
        return ensureAmethAdmin(getDefaultUsers());
      }
      
      const users = LocalStorageUtils.getItem('users', []);
      
      // Validar que sea un array
      if (!Array.isArray(users)) {
        console.warn('Users data is not an array, resetting to default');
        return ensureAmethAdmin(getDefaultUsers());
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
      
      // Siempre asegurar que Ameth esté presente
      const usersWithAmeth = ensureAmethAdmin(validUsers);
      
      // Si se agregó Ameth, guardar los cambios
      if (usersWithAmeth.length > validUsers.length) {
        saveUsers(usersWithAmeth);
      }
      
      return usersWithAmeth;
    } catch (error) {
      console.error('Error getting users from localStorage:', error);
      return ensureAmethAdmin(getDefaultUsers());
    }
  }
  
  function getDefaultUsers() {
    const defaultUsers = [
      { username: "admin", password: "admin123", role: "admin", email: "admin@careconnect.com", id: "admin1" },
      { username: "usuario", password: "pass123", role: "paciente", email: "usuario@careconnect.com", id: "user1" },
      { username: "Josue", password: "testpass456", role: "cuidador", email: "josue@careconnect.com", id: "josue1" },
    ];
    
    if (LocalStorageUtils.isAvailable()) {
      LocalStorageUtils.setItem('users', defaultUsers);
    }
    return defaultUsers;
  }
  
  // Función para crear el admin permanente Ameth
  function createPermanentAdminAmeth() {
    const amethAdmin = {
      username: "Ameth",
      password: "Ameth2024!", // Contraseña más segura
      role: "admin",
      email: "ameth@careconnect.com",
      id: "ameth-permanent-admin",
      isPermanent: true, // Marca para identificar admin permanente
      createdAt: new Date().toISOString(),
      permissions: ["all"], // Permisos completos
      canDelete: false, // No se puede eliminar
      canModify: false // No se puede modificar
    };
    
    return amethAdmin;
  }
  
  // Función para asegurar que Ameth siempre esté presente
  function ensureAmethAdmin(users) {
    const amethExists = users.find(u => u.username === "Ameth" && u.isPermanent);
    
    if (!amethExists) {
      const amethAdmin = createPermanentAdminAmeth();
      users.push(amethAdmin);
      console.log('✅ Admin permanente Ameth creado/restaurado');
    }
    
    return users;
  }
  
  // Función para verificar y restaurar el admin Ameth
  function verifyAndRestoreAmethAdmin() {
    try {
      const users = getUsers();
      const amethExists = users.find(u => u.username === "Ameth" && u.isPermanent);
      
      if (!amethExists) {
        console.log('🔄 Restaurando admin permanente Ameth...');
        const usersWithAmeth = ensureAmethAdmin(users);
        saveUsers(usersWithAmeth);
        console.log('✅ Admin Ameth restaurado exitosamente');
        return true;
      }
      
      // console.log('✅ Admin Ameth ya existe y está protegido');
      return true;
    } catch (error) {
      console.error('❌ Error al verificar/restaurar admin Ameth:', error);
      return false;
    }
  }
  
  // Función para verificar el estado del admin Ameth (disponible globalmente)
  window.checkAmethAdminStatus = function() {
    try {
      const users = getUsers();
      const ameth = users.find(u => u.username === "Ameth");
      
      if (!ameth) {
        console.log('❌ Admin Ameth NO existe');
        return false;
      }
      
      console.log('🔍 Estado del Admin Ameth:');
      console.log('  - Usuario:', ameth.username);
      console.log('  - Email:', ameth.email);
      console.log('  - Rol:', ameth.role);
      console.log('  - Es permanente:', ameth.isPermanent);
      console.log('  - Puede eliminar:', ameth.canDelete);
      console.log('  - Puede modificar:', ameth.canModify);
      console.log('  - Permisos:', ameth.permissions);
      console.log('  - ID:', ameth.id);
      
      if (ameth.isPermanent) {
        console.log('✅ Admin Ameth está protegido y es permanente');
        return true;
      } else {
        console.log('⚠️ Admin Ameth existe pero NO está protegido');
        return false;
      }
    } catch (error) {
      console.error('❌ Error al verificar estado de Ameth:', error);
      return false;
    }
  };
  
  // Función para restaurar manualmente el admin Ameth (disponible globalmente)
  window.restoreAmethAdmin = function() {
    console.log('🔄 Restaurando admin Ameth manualmente...');
    const result = verifyAndRestoreAmethAdmin();
    if (result) {
      console.log('✅ Admin Ameth restaurado exitosamente');
    } else {
      console.log('❌ Error al restaurar admin Ameth');
    }
    return result;
  };
  
  function saveUsers(users) {
    try {
      // Verificar si LocalStorageUtils está disponible
      if (typeof LocalStorageUtils === 'undefined') {
        console.warn('LocalStorageUtils is not loaded, cannot save users');
        return false;
      }
      
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
      
      // Proteger al admin permanente Ameth
      const usersToSave = ensureAmethAdmin(validUsers);
      
      // Guardar usando las utilidades
      return LocalStorageUtils.setItem('users', usersToSave, 5000000); // 5MB límite
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
      alert('Error al guardar usuarios. Por favor, verifica el espacio de almacenamiento.');
      return false;
    }
  }
  
  function login() {
    try {
      const usernameOrEmail = document.getElementById("login-user").value.trim();
      const password = document.getElementById("login-pass").value;
      
      // Validar campos de entrada
      if (!usernameOrEmail || !password) {
        showAlert('Please enter both username/email and password', 'danger', 'loginError');
        return;
      }
      
      if (usernameOrEmail.length > 100) {
        showAlert('Username/email is too long', 'danger', 'loginError');
        return;
      }
      
      console.log('Intentando login con:', usernameOrEmail, password);
    
      const users = getUsers();
      // Buscar usuario por username o email
      const user = users.find(u => 
        (u.username === usernameOrEmail || u.email === usernameOrEmail.toLowerCase()) && 
        u.password === password
      );
    
      if (user) {
        try {
          // Guardar datos de sesión usando utilidades
          LocalStorageUtils.setItem("loggedInUser", user.username);
          LocalStorageUtils.setItem("userRole", user.role);
          if (user.id) {
            LocalStorageUtils.setItem("currentUserId", user.id);
          }
          
          updateLoginUI();
          showBanner('Signed in successfully!', 'success');
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
        showAlert('Incorrect username/email or password, please check and try again', 'danger', 'loginError');
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
  
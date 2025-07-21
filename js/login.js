console.log("login.js loaded!");

const users = [
    { username: "admin", password: "admin123" },
    { username: "usuario", password: "pass123" },
    { username: "Ameth", password: "password123" },
    { username: "Josue", password: "testpass456" },
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
  });
  
  function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem("loggedInUser", username);
      updateLoginUI();
      // Redirect to home page after successful login
      window.location.href = "/index.html";
    } else {
      document.getElementById("loginError").textContent = "Invalid credentials";
      // Redirect to signup page after failed login
      setTimeout(() => {
        window.location.href = "/signup.html";
      }, 1500); // Wait 1.5 seconds before redirecting to show the error message
    }
  }
  
  function logout() {
    localStorage.removeItem("loggedInUser");
    updateLoginUI();
  }
  
  function updateLoginUI() {
    const user = localStorage.getItem("loggedInUser");
    const loginSection = document.getElementById("loginSection");
    const userSection = document.getElementById("userSection");
    const userGreeting = document.getElementById("userGreeting");
  
    if (user) {
      loginSection?.classList.add("d-none");
      userSection?.classList.remove("d-none");
      userGreeting.textContent = `Hola, ${user}`;
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
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-2`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
    const targetElem = document.getElementById(target);
    if (targetElem) {
        targetElem.innerHTML = '';
        targetElem.appendChild(alertDiv);
    }
  }
  
  // Login form event
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) {
        showAlert('Incorrect username or password.', 'danger', 'loginError');
      } else {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'dashboard.html';
      }
    });
  }
  
  // Register form event
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('regUsername').value.trim();
      const password = document.getElementById('regPassword').value.trim();
      const password2 = document.getElementById('regPassword2').value.trim();
      if (!username || !password || !password2) {
        showAlert('All fields are required.', 'danger', 'registerError');
        return;
      }
      if (password !== password2) {
        showAlert('Passwords do not match.', 'danger', 'registerError');
        return;
      }
      // Simulación de registro exitoso
      showAlert('Registration successful! You can now log in.', 'success', 'registerError');
    });
  }
  
console.log("login.js loaded!");

const users = [
    { username: "admin", password: "admin123" },
    { username: "usuario", password: "pass123" },
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
  
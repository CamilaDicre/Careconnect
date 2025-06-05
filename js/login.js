const users = [
    { username: "admin", password: "admin123" },
    { username: "usuario", password: "pass123" },
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const loginToggle = document.getElementById("loginToggle");
    const loginForm = document.getElementById("loginForm");
  
    if (loginToggle) {
      loginToggle.addEventListener("click", () => {
        loginForm.classList.toggle("d-none");
      });
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
    } else {
      document.getElementById("loginError").textContent = "Credenciales incorrectas";
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
  
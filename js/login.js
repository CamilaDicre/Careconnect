// CareConnect login — conectado a Supabase

if (typeof window.careconnectUsers === 'undefined') {
  window.careconnectUsers = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'pass123', role: 'patient' },
    { username: 'Ameth', password: 'password123', role: 'admin' },
    { username: 'Josue', password: 'testpass456', role: 'caregiver' }
  ];
}

document.addEventListener('DOMContentLoaded', async () => {
  await CareConnectDB.verifyAndRestoreAmethAdmin();
  await preloadUsersCache();

  const loginToggle = document.getElementById('loginToggle');
  const loginForm = document.getElementById('loginForm');
  const signupButton = document.getElementById('signupButton');

  if (loginToggle && loginForm) {
    document.addEventListener('click', (event) => {
      if (!loginForm.contains(event.target) && !loginToggle.contains(event.target)) {
        loginForm.classList.add('d-none');
      }
    });

    loginToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      loginForm.classList.toggle('d-none');
    });
  }

  if (signupButton) {
    signupButton.addEventListener('click', redirectToSignup);
  }

  updateLoginUI();

  const loginFormHTML = document.querySelector('#login-card form');
  if (loginFormHTML) {
    loginFormHTML.addEventListener('submit', (e) => {
      e.preventDefault();
      login();
    });
  }

  const regGenderSelect = document.getElementById('reg-gender');
  const regGenderOtherWrap = document.getElementById('reg-gender-other-wrap');
  const regGenderOtherInput = document.getElementById('reg-gender-other');

  if (regGenderSelect && regGenderOtherWrap) {
    regGenderSelect.addEventListener('change', function () {
      const isOther = this.value === 'other';
      regGenderOtherWrap.classList.toggle('visible', isOther);
      if (regGenderOtherInput) {
        regGenderOtherInput.required = isOther;
        if (!isOther) regGenderOtherInput.value = '';
      }
    });
  }

  const registerFormHTML = document.querySelector('#register-card form');
  if (registerFormHTML) {
    registerFormHTML.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-pass').value.trim();
      const role = document.getElementById('reg-role').value;
      const genderSelect = document.getElementById('reg-gender').value;
      let gender = genderSelect;

      if (genderSelect === 'other') {
        const customGender = regGenderOtherInput ? regGenderOtherInput.value.trim() : '';
        if (!customGender) {
          alert('Please tell us how you identify.');
          return;
        }
        if (customGender.length > 50) {
          alert('Gender identity is too long. Maximum 50 characters.');
          return;
        }
        gender = ValidationUtils.sanitizeText(customGender);
      }

      if (!name || !email || !password || !role || !genderSelect) {
        alert('Please fill in all fields.');
        return;
      }

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

      if (!ValidationUtils.isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (!CareConnectDB.isReady()) {
        alert('La base de datos no está configurada. Revisa js/supabase-config.js');
        return;
      }

      try {
        const users = await getUsers();
        if (users.find((u) => u.email === email.toLowerCase())) {
          alert('A user with this email is already registered.');
          return;
        }

        const newUser = {
          username: ValidationUtils.sanitizeText(name),
          email: email.toLowerCase().trim(),
          password: password,
          role: role,
          gender: gender,
          registrationDate: new Date().toISOString(),
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).substr(2, 9)
        };

        const saved = await CareConnectDB.saveUser(newUser);
        if (!saved) {
          alert('Error al guardar los datos. Verifica la conexión con Supabase.');
          return;
        }

        if (role === 'paciente') {
          CareConnectSession.setUserSession(saved);
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
  if (toRegisterLink) toRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showRegister(); });
  if (toLoginLink) toLoginLink.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });
});

let _usersCacheSync = null;

async function preloadUsersCache() {
  _usersCacheSync = await CareConnectDB.getUsers();
  return _usersCacheSync;
}

async function getUsers() {
  try {
    const users = await CareConnectDB.getUsers();
    _usersCacheSync = users;
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    return CareConnectDB._getDefaultUsers();
  }
}

function getDefaultUsers() {
  return CareConnectDB._getDefaultUsers();
}

function createPermanentAdminAmeth() {
  return CareConnectDB.createPermanentAdminAmeth();
}

function ensureAmethAdmin(users) {
  return CareConnectDB._ensureAmethAdmin([...users]);
}

async function verifyAndRestoreAmethAdmin() {
  return CareConnectDB.verifyAndRestoreAmethAdmin();
}

window.checkAmethAdminStatus = async function () {
  try {
    const users = await getUsers();
    const ameth = users.find((u) => u.username === 'Ameth');

    if (!ameth) {
      console.log('❌ Admin Ameth NO existe');
      return false;
    }

    console.log('🔍 Estado del Admin Ameth:');
    console.log('  - Usuario:', ameth.username);
    console.log('  - Email:', ameth.email);
    console.log('  - Rol:', ameth.role);
    console.log('  - Es permanente:', ameth.isPermanent);
    return !!ameth.isPermanent;
  } catch (error) {
    console.error('❌ Error al verificar estado de Ameth:', error);
    return false;
  }
};

window.restoreAmethAdmin = async function () {
  return CareConnectDB.verifyAndRestoreAmethAdmin();
};

async function saveUsers(users) {
  try {
    if (!Array.isArray(users)) throw new Error('Users must be an array');

    const validUsers = users.filter(
      (user) => user && typeof user === 'object' && user.username && user.email && user.role
    );

    const usersToSave = ensureAmethAdmin(validUsers);
    return CareConnectDB.saveUsers(usersToSave);
  } catch (error) {
    console.error('Error saving users:', error);
    alert('Error al guardar usuarios. Verifica la conexión con Supabase.');
    return false;
  }
}

async function login() {
  try {
    const usernameOrEmail = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value;

    if (!usernameOrEmail || !password) {
      showAlert('Please enter both username/email and password', 'danger', 'loginError');
      return;
    }

    if (usernameOrEmail.length > 100) {
      showAlert('Username/email is too long', 'danger', 'loginError');
      return;
    }

    const user = await CareConnectDB.login(usernameOrEmail, password);

    if (user) {
      try {
        CareConnectSession.setUserSession(user);
        updateLoginUI();
        showBanner('Signed in successfully!', 'success');
        setTimeout(() => {
          if (user.role === 'admin') {
            window.location.href = '../dashboard/admin-dashboard.html';
          } else if (user.role === 'cuidador') {
            window.location.href = '../dashboard/caregivers pro/Caregiver-pro.html';
          } else {
            window.location.href = '../dashboard/dashboard.html';
          }
        }, 1200);
      } catch (storageError) {
        console.error('Error saving login data:', storageError);
        showAlert('Error saving login data', 'danger', 'loginError');
      }
    } else {
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
      CareConnectSession.clear();
      updateLoginUI();
    }, 1200);
  } catch (error) {
    console.error('Error during logout:', error);
    CareConnectSession.clear();
    updateLoginUI();
  }
}

function updateLoginUI() {
  const user = CareConnectSession.getLoggedInUser();
  const loginSection = document.getElementById('loginSection');
  const userSection = document.getElementById('userSection');
  const userGreeting = document.getElementById('userGreeting');

  if (user) {
    loginSection?.classList.add('d-none');
    userSection?.classList.remove('d-none');
    if (userGreeting) {
      userGreeting.textContent = `Hello, ${user}`;
    }
  } else {
    loginSection?.classList.remove('d-none');
    userSection?.classList.add('d-none');
  }
}

function redirectToSignup() {
  window.location.href = '/signup.html';
}

function showAlert(message, type = 'danger', target = 'loginError') {
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
  alertDiv.innerHTML =
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="float:right;"></button>';
  const targetElem = document.getElementById(target);
  if (targetElem) {
    targetElem.innerHTML = '';
    targetElem.appendChild(alertDiv);
    setTimeout(() => {
      if (targetElem.contains(alertDiv)) {
        targetElem.innerHTML = '';
      }
    }, 5000);
  }
}

function showBanner(message, type = 'success') {
  const banner = document.getElementById('messageBanner');
  if (!banner) return;
  banner.innerHTML = `<div style="display:inline-block;margin:16px auto;padding:16px 32px;background:${type === 'success' ? '#d1fae5' : '#fee2e2'};color:${type === 'success' ? '#065f46' : '#991b1b'};border-radius:8px;font-size:1.2rem;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.08);border:1px solid ${type === 'success' ? '#10b981' : '#ef4444'};">${message}</div>`;
  banner.style.display = 'block';
  setTimeout(() => {
    banner.style.display = 'none';
    banner.innerHTML = '';
  }, 3000);
}

window.getUsers = getUsers;
window.saveUsers = saveUsers;
window.login = login;
window.logout = logout;

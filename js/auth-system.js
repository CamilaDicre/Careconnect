// Sistema de Autenticación y Gestión de Usuarios
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.getCurrentUser();
        this.initializeEventListeners();
    }

    // Cargar usuarios desde localStorage o usar datos por defecto
    loadUsers() {
        // Forzar reset de usuarios para cargar los nuevos admins
        localStorage.removeItem('careconnect_users'); // Forzar reset para cargar nuevos admins
        
        const storedUsers = localStorage.getItem('careconnect_users');
        if (storedUsers) {
            return JSON.parse(storedUsers);
        }
        
        // Datos de ejemplo
        const defaultUsers = [
            {
                id: 1,
                username: 'ameth',
                email: 'ameth@careconnect.com',
                password: 'ameth123',
                fullName: 'Ameth',
                role: 'admin',
                userType: 'admin',
                permissions: ['super_admin'],
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 2,
                username: 'camila',
                email: 'camila@careconnect.com',
                password: 'camila123',
                fullName: 'Camila',
                role: 'admin',
                userType: 'admin',
                permissions: ['super_admin'],
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 3,
                username: 'josue',
                email: 'josue@careconnect.com',
                password: 'josue123',
                fullName: 'Josué',
                role: 'admin',
                userType: 'admin',
                permissions: ['basic_admin'],
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 4,
                username: 'david',
                email: 'david@careconnect.com',
                password: 'david123',
                fullName: 'David',
                role: 'admin',
                userType: 'admin',
                permissions: ['basic_admin'],
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 5,
                username: 'ariel',
                email: 'ariel@careconnect.com',
                password: 'ariel123',
                fullName: 'Ariel',
                role: 'admin',
                userType: 'admin',
                permissions: ['basic_admin'],
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 6,
                username: 'nixon',
                email: 'nixon@careconnect.com',
                password: 'nixon123',
                fullName: 'Nixon',
                role: 'admin',
                userType: 'admin',
                permissions: ['basic_admin'],
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 7,
                username: 'jenny',
                email: 'jenny@careconnect.com',
                password: 'jenny123',
                fullName: 'Jenny',
                role: 'admin',
                userType: 'admin',
                permissions: ['basic_admin'],
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 8,
                username: 'paciente1',
                email: 'paciente1@example.com',
                password: 'pass123',
                fullName: 'María González',
                role: 'patient',
                userType: 'patient',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 9,
                username: 'cuidador1',
                email: 'cuidador1@example.com',
                password: 'pass123',
                fullName: 'Carlos Rodríguez',
                role: 'caregiver',
                userType: 'caregiver',
                createdAt: new Date().toISOString(),
                lastLogin: null
            }
        ];
        
        localStorage.setItem('careconnect_users', JSON.stringify(defaultUsers));
        return defaultUsers;
    }

    // Obtener usuario actual
    getCurrentUser() {
        const userId = localStorage.getItem('current_user_id');
        if (userId) {
            return this.users.find(user => user.id == userId);
        }
        return null;
    }

    // Inicializar event listeners
    initializeEventListeners() {
        // Login form
        const loginForm = document.querySelector('#login-card form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Register form
        const registerForm = document.querySelector('#register-card form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Logout functionality
        const logoutBtn = document.querySelector('[data-logout]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
    }

    // Manejar login
    handleLogin() {
        const username = document.getElementById('login-user').value.trim();
        const password = document.getElementById('login-pass').value;

        if (!username || !password) {
            this.showNotification('Por favor complete todos los campos', 'error');
            return;
        }

        const user = this.users.find(u => 
            (u.username === username || u.email === username) && u.password === password
        );

        if (user) {
            // Actualizar último login
            user.lastLogin = new Date().toISOString();
            this.updateUser(user);
            
            // Guardar sesión actual
            localStorage.setItem('current_user_id', user.id);
            this.currentUser = user;

            this.showNotification(`Bienvenido, ${user.fullName}!`, 'success');
            
            // Redirigir según el tipo de usuario
            setTimeout(() => {
                this.redirectToDashboard(user);
            }, 1500);
        } else {
            this.showNotification('Credenciales incorrectas', 'error');
        }
    }

    // Manejar registro
    handleRegister() {
        const fullName = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-pass').value;
        const role = document.getElementById('reg-role').value;

        if (!fullName || !email || !password || !role) {
            this.showNotification('Por favor complete todos los campos', 'error');
            return;
        }

        // Verificar si el usuario ya existe
        const existingUser = this.users.find(u => u.email === email || u.username === email);
        if (existingUser) {
            this.showNotification('El usuario ya existe', 'error');
            return;
        }

        // Crear nuevo usuario
        const newUser = {
            id: this.users.length + 1,
            username: email.split('@')[0],
            email: email,
            password: password,
            fullName: fullName,
            role: role === 'cuidador' ? 'caregiver' : 'patient',
            userType: role === 'cuidador' ? 'caregiver' : 'patient',
            createdAt: new Date().toISOString(),
            lastLogin: null
        };

        this.users.push(newUser);
        this.saveUsers();

        this.showNotification('Registro exitoso!', 'success');
        
        // Redirigir según el rol
        setTimeout(() => {
            this.redirectToDashboard(newUser);
        }, 1500);
    }

    // Redirigir al dashboard según el tipo de usuario
    redirectToDashboard(user) {
        // Mostrar transición personalizada según el tipo de usuario
        this.showTransitionOverlay(user);
        
        setTimeout(() => {
            if (user.userType === 'caregiver') {
                window.location.href = 'register-caregiver.html';
            } else if (user.userType === 'patient') {
                window.location.href = 'dashboard.html';
            } else if (user.userType === 'admin') {
                window.location.href = 'admin-dashboard.html';
            }
        }, 2000); // Transición más rápida (2 segundos)
    }

    // Mostrar overlay de transición personalizada
    showTransitionOverlay(user) {
        const overlay = document.createElement('div');
        overlay.id = 'transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 99999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.8s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;

        // Mensaje personalizado según el tipo de usuario
        let message, icon, color;
        switch(user.userType) {
            case 'patient':
                message = '¡Bienvenido al Dashboard de Pacientes!';
                icon = 'bi-heart-pulse';
                color = 'linear-gradient(135deg, #4facfe, #00f2fe)';
                break;
            case 'caregiver':
                message = '¡Bienvenido al Registro de Cuidadores!';
                icon = 'bi-people';
                color = 'linear-gradient(135deg, #a8edea, #fed6e3)';
                break;
            case 'admin':
                message = '¡Bienvenido al Panel de Administración!';
                icon = 'bi-shield-check';
                color = 'linear-gradient(135deg, #ffecd2, #fcb69f)';
                break;
            default:
                message = '¡Bienvenido!';
                icon = 'bi-person-check';
                color = 'linear-gradient(135deg, #667eea, #764ba2)';
        }

        overlay.innerHTML = `
            <div style="text-align: center; color: white; font-family: 'Poppins', sans-serif;">
                <div style="background: ${color}; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
                    <i class="bi ${icon}" style="font-size: 36px;"></i>
                </div>
                <h2 style="margin: 0 0 10px 0; font-weight: 700; font-size: 28px;">¡Hola, ${user.fullName}!</h2>
                <p style="margin: 0 0 20px 0; font-size: 18px; opacity: 0.9;">${message}</p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <div style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                    <div style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 1.5s infinite 0.2s;"></div>
                    <div style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 1.5s infinite 0.4s;"></div>
                </div>
                <style>
                    @keyframes pulse {
                        0%, 100% { opacity: 0.3; transform: scale(0.8); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }
                </style>
            </div>
        `;

        document.body.appendChild(overlay);

        // Mostrar overlay con transición suave
        setTimeout(() => {
            overlay.style.visibility = 'visible';
            overlay.style.opacity = '1';
        }, 100);
    }

    // Logout
    logout() {
        localStorage.removeItem('current_user_id');
        this.currentUser = null;
        this.showNotification('Sesión cerrada correctamente', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }

    // Actualizar usuario
    updateUser(updatedUser) {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
            this.users[index] = updatedUser;
            this.saveUsers();
        }
    }

    // Guardar usuarios en localStorage
    saveUsers() {
        localStorage.setItem('careconnect_users', JSON.stringify(this.users));
    }

    // Mostrar notificación
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification') || this.createNotificationElement();
        
        // Configurar colores según el tipo
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';
            notification.style.boxShadow = '0 8px 25px rgba(79,172,254,0.25)';
            notification.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;gap:12px;">
                    <i class="bi bi-check-circle-fill" style="font-size:20px;"></i>
                    <span style="font-size:15px; font-weight: 500;">${message}</span>
                </div>
            `;
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ff9a9e, #fecfef)';
            notification.style.boxShadow = '0 8px 25px rgba(255,154,158,0.25)';
            notification.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;gap:12px;">
                    <i class="bi bi-exclamation-triangle-fill" style="font-size:20px;"></i>
                    <span style="font-size:15px; font-weight: 500;">${message}</span>
                </div>
            `;
        }
        
        // Mostrar notificación con transición más suave
        notification.style.opacity = '1';
        notification.style.transform = 'translate(-50%, -50%) translateY(0)';
        
        // Ocultar después de 2.5 segundos (más rápido)
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -50%) translateY(-30px)';
        }, 2500);
    }

    // Crear elemento de notificación si no existe
    createNotificationElement() {
        const notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) translateY(-100px);
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(79,172,254,0.25);
            z-index: 10000;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 320px;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            text-align: center;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.1);
        `;
        document.body.appendChild(notification);
        return notification;
    }

    // Verificar si el usuario está autenticado
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Obtener todos los usuarios (para admin)
    getAllUsers() {
        return this.users;
    }

    // Filtrar usuarios por tipo
    getUsersByType(userType) {
        return this.users.filter(user => user.userType === userType);
    }

    // Obtener estadísticas de usuarios
    getUserStats() {
        const stats = {
            total: this.users.length,
            patients: this.users.filter(u => u.userType === 'patient').length,
            caregivers: this.users.filter(u => u.userType === 'caregiver').length,
            admins: this.users.filter(u => u.userType === 'admin').length,
            activeToday: this.users.filter(u => {
                if (!u.lastLogin) return false;
                const lastLogin = new Date(u.lastLogin);
                const today = new Date();
                return lastLogin.toDateString() === today.toDateString();
            }).length
        };
        return stats;
    }

    // Verificar permisos del usuario actual
    hasPermission(permission) {
        if (!this.currentUser) return false;
        return this.currentUser.permissions && this.currentUser.permissions.includes(permission);
    }

    // Verificar si puede gestionar administradores
    canManageAdmins() {
        return this.hasPermission('super_admin') || this.hasPermission('manage_admins');
    }

    // Verificar si es super admin
    isSuperAdmin() {
        return this.hasPermission('super_admin');
    }

    // Verificar si puede editar a otro super admin
    canEditSuperAdmin(targetUserId) {
        if (!this.currentUser) return false;
        
        // Si el usuario actual es super admin, no puede editar a otro super admin
        if (this.isSuperAdmin()) {
            const targetUser = this.users.find(u => u.id === targetUserId);
            if (targetUser && targetUser.permissions && targetUser.permissions.includes('super_admin')) {
                return false;
            }
        }
        
        return true;
    }
}

// Inicializar sistema de autenticación
const authSystem = new AuthSystem();

// Exportar para uso global
window.authSystem = authSystem; 
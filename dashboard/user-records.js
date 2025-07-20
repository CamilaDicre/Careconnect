class UserRecords extends HTMLElement {
    constructor() {
        super();
        this.users = [];
        this.filteredUsers = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
    }

    connectedCallback() {
        this.render();
        this.loadUsers();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="user-records-container" style="padding: 20px;">
                <div class="records-header" style="margin-bottom: 30px;">
                    <h2 style="color: #1976d2; font-weight: 700; margin-bottom: 10px;">
                        <i class="bi bi-people me-3"></i>Registro de Usuarios
                    </h2>
                    <p class="text-muted">Gestión y visualización de usuarios del sistema</p>
                </div>

                <!-- Filtros y Búsqueda -->
                <div class="filters-section" style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <div class="row align-items-center">
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control" id="search-users" placeholder="Buscar usuarios...">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select" id="filter-type">
                                <option value="">Todos los tipos</option>
                                <option value="patient">Pacientes</option>
                                <option value="caregiver">Cuidadores</option>
                                <option value="admin">Administradores</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select" id="sort-by">
                                <option value="name">Ordenar por nombre</option>
                                <option value="date">Ordenar por fecha</option>
                                <option value="lastLogin">Ordenar por último login</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-primary" onclick="this.exportUsers()">
                                <i class="bi bi-download me-2"></i>Exportar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Estadísticas Rápidas -->
                <div class="stats-row" style="margin-bottom: 20px;">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="stat-card" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px; border-radius: 10px; text-align: center;">
                                <div class="stat-number" id="total-users-stat">0</div>
                                <div class="stat-label">Total Usuarios</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-card" style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 15px; border-radius: 10px; text-align: center;">
                                <div class="stat-number" id="active-users-stat">0</div>
                                <div class="stat-label">Usuarios Activos</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-card" style="background: linear-gradient(135deg, #a8edea, #fed6e3); color: #333; padding: 15px; border-radius: 10px; text-align: center;">
                                <div class="stat-number" id="new-users-stat">0</div>
                                <div class="stat-label">Nuevos Hoy</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-card" style="background: linear-gradient(135deg, #ffecd2, #fcb69f); color: #333; padding: 15px; border-radius: 10px; text-align: center;">
                                <div class="stat-number" id="online-users-stat">0</div>
                                <div class="stat-label">En Línea</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabla de Usuarios -->
                <div class="table-container" style="background: white; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Tipo</th>
                                    <th>Fecha de Registro</th>
                                    <th>Último Login</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="users-table-body">
                                <!-- Los datos se cargarán dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Paginación -->
                    <div class="pagination-container" style="padding: 20px; border-top: 1px solid #dee2e6;">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="pagination-info">
                                Mostrando <span id="showing-start">1</span> a <span id="showing-end">10</span> de <span id="total-items">0</span> usuarios
                            </div>
                            <nav>
                                <ul class="pagination mb-0" id="pagination">
                                    <!-- Paginación se generará dinámicamente -->
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadUsers() {
        if (window.authSystem) {
            this.users = window.authSystem.getAllUsers();
            this.filteredUsers = [...this.users];
            this.updateStats();
            this.renderTable();
        }
    }

    updateStats() {
        const stats = window.authSystem.getUserStats();
        const today = new Date().toDateString();
        const newToday = this.users.filter(user => {
            const createdDate = new Date(user.createdAt).toDateString();
            return createdDate === today;
        }).length;

        document.getElementById('total-users-stat').textContent = stats.total;
        document.getElementById('active-users-stat').textContent = stats.activeToday;
        document.getElementById('new-users-stat').textContent = newToday;
        document.getElementById('online-users-stat').textContent = Math.floor(Math.random() * 10) + 5; // Simulado
    }

    renderTable() {
        const tbody = document.getElementById('users-table-body');
        tbody.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageUsers = this.filteredUsers.slice(startIndex, endIndex);

        pageUsers.forEach(user => {
            const row = document.createElement('tr');
            row.className = 'user-row';
            
            const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Nunca';
            const createdAt = new Date(user.createdAt).toLocaleDateString();
            const isOnline = user.lastLogin && (new Date() - new Date(user.lastLogin)) < 300000; // 5 minutos
            
            const statusClass = user.userType === 'patient' ? 'status-patient' : 
                              user.userType === 'caregiver' ? 'status-caregiver' : 'status-admin';
            
            const onlineStatus = isOnline ? 
                '<span class="badge bg-success">En línea</span>' : 
                '<span class="badge bg-secondary">Desconectado</span>';
            
            row.innerHTML = `
                <td>${user.id}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar me-2" style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                            ${user.fullName.charAt(0)}
                        </div>
                        ${user.fullName}
                    </div>
                </td>
                <td>${user.email}</td>
                <td><span class="badge ${statusClass}">${user.userType}</span></td>
                <td>${createdAt}</td>
                <td>${lastLogin}</td>
                <td>${onlineStatus}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="this.viewUser(${user.id})">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="this.editUser(${user.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="this.deleteUser(${user.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        this.updatePagination();
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
        const pagination = document.getElementById('pagination');
        const showingStart = (this.currentPage - 1) * this.itemsPerPage + 1;
        const showingEnd = Math.min(this.currentPage * this.itemsPerPage, this.filteredUsers.length);

        document.getElementById('showing-start').textContent = showingStart;
        document.getElementById('showing-end').textContent = showingEnd;
        document.getElementById('total-items').textContent = this.filteredUsers.length;

        pagination.innerHTML = '';

        // Botón anterior
        const prevBtn = document.createElement('li');
        prevBtn.className = `page-item ${this.currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<a class="page-link" href="#" onclick="this.previousPage()">Anterior</a>';
        pagination.appendChild(prevBtn);

        // Números de página
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === this.currentPage ? 'active' : ''}`;
            pageItem.innerHTML = `<a class="page-link" href="#" onclick="this.goToPage(${i})">${i}</a>`;
            pagination.appendChild(pageItem);
        }

        // Botón siguiente
        const nextBtn = document.createElement('li');
        nextBtn.className = `page-item ${this.currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<a class="page-link" href="#" onclick="this.nextPage()">Siguiente</a>';
        pagination.appendChild(nextBtn);
    }

    setupEventListeners() {
        // Búsqueda
        const searchInput = document.getElementById('search-users');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterUsers(e.target.value);
            });
        }

        // Filtro por tipo
        const filterSelect = document.getElementById('filter-type');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.filterByType(e.target.value);
            });
        }

        // Ordenamiento
        const sortSelect = document.getElementById('sort-by');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortUsers(e.target.value);
            });
        }
    }

    filterUsers(searchTerm) {
        this.filteredUsers = this.users.filter(user => 
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.currentPage = 1;
        this.renderTable();
    }

    filterByType(type) {
        if (type) {
            this.filteredUsers = this.users.filter(user => user.userType === type);
        } else {
            this.filteredUsers = [...this.users];
        }
        this.currentPage = 1;
        this.renderTable();
    }

    sortUsers(sortBy) {
        this.filteredUsers.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.fullName.localeCompare(b.fullName);
                case 'date':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'lastLogin':
                    return new Date(b.lastLogin || 0) - new Date(a.lastLogin || 0);
                default:
                    return 0;
            }
        });
        this.currentPage = 1;
        this.renderTable();
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderTable();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderTable();
        }
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderTable();
    }

    viewUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            alert(`Viendo usuario: ${user.fullName}\nEmail: ${user.email}\nTipo: ${user.userType}`);
        }
    }

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            // Aquí podrías abrir un modal para editar
            alert(`Editando usuario: ${user.fullName}`);
        }
    }

    deleteUser(userId) {
        if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
            const userIndex = this.users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                this.users.splice(userIndex, 1);
                window.authSystem.users = this.users;
                window.authSystem.saveUsers();
                
                this.loadUsers();
                this.showNotification('Usuario eliminado correctamente', 'success');
            }
        }
    }

    exportUsers() {
        const csvContent = "data:text/csv;charset=utf-8," + 
            "ID,Nombre,Email,Tipo,Fecha de Registro,Último Login\n" +
            this.filteredUsers.map(user => 
                `${user.id},"${user.fullName}","${user.email}","${user.userType}","${new Date(user.createdAt).toLocaleDateString()}","${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Nunca'}"`
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "usuarios_careconnect.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    showNotification(message, type = 'success') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

customElements.define('user-records', UserRecords); 
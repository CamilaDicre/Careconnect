/**
 * Capa de datos CareConnect — Supabase
 * Reemplaza el almacenamiento de datos en localStorage
 */
if (typeof CareConnectDB === 'undefined') {
  class CareConnectDB {
    static _usersCache = null;
    static _cacheTime = 0;
    static CACHE_TTL = 30000;
    static LOCAL_USERS_KEY = 'careconnect_local_users';
    static AMETH_ADMIN_ID = 'a0000000-0000-4000-8000-000000000001';
    static SUPABASE_TIMEOUT_MS = 6000;
    static _memoryLocalUsers = [];

    static _withTimeout(promise, ms = this.SUPABASE_TIMEOUT_MS) {
      return Promise.race([
        promise,
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Supabase request timeout')), ms);
        })
      ]);
    }

    static getClient() {
      return window.CareConnectSupabase?.getClient() ?? null;
    }

    static isReady() {
      return window.CareConnectSupabase?.isConfigured() ?? false;
    }

    static normalizeRole(role) {
      if (!role) return role;
      const normalized = String(role).toLowerCase().trim();
      if (normalized === 'patient') return 'paciente';
      if (normalized === 'caregiver') return 'cuidador';
      return normalized;
    }

    static isPatientRole(role) {
      return this.normalizeRole(role) === 'paciente';
    }

    static isCaregiverRole(role) {
      return this.normalizeRole(role) === 'cuidador';
    }

    static isAdminRole(role) {
      return this.normalizeRole(role) === 'admin';
    }

    static _rowToUser(row) {
      if (!row) return null;
      const profileData = row.profile_data || {};
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        password: row.password,
        role: this.normalizeRole(row.role),
        gender: row.gender,
        registrationDate: row.registration_date,
        name: row.name || profileData.name,
        phone: row.phone || profileData.phone,
        address: row.address || profileData.address,
        birthdate: row.birthdate || profileData.birthdate,
        age: row.age || profileData.age,
        photo: row.photo || profileData.photo,
        avatarColor: row.avatar_color || profileData.avatarColor,
        isPermanent: row.is_permanent,
        permissions: row.permissions,
        allergies: profileData.allergies || [],
        medications: profileData.medications || [],
        conditions: profileData.conditions || [],
        emergencyContact: profileData.emergencyContact || {},
        bloodType: profileData.bloodType,
        height: profileData.height,
        weight: profileData.weight,
        insurance: profileData.insurance,
        doctor: profileData.doctor,
        preferences: profileData.preferences,
        notes: profileData.notes,
        experience: row.experience,
        education: row.education,
        certifications: row.certifications,
        skills: row.skills,
        languages: row.languages,
        bio: row.bio,
        availability: row.availability,
        specialties: row.specialties,
        rating: row.rating,
        reviews: row.reviews,
        hourlyRate: row.hourly_rate,
        workPreferences: row.work_preferences
      };
    }

    static _userToRow(user) {
      const profileData = {
        allergies: user.allergies,
        medications: user.medications,
        conditions: user.conditions,
        emergencyContact: user.emergencyContact,
        bloodType: user.bloodType,
        height: user.height,
        weight: user.weight,
        insurance: user.insurance,
        doctor: user.doctor,
        preferences: user.preferences,
        notes: user.notes
      };

      Object.keys(profileData).forEach((k) => {
        if (profileData[k] === undefined) delete profileData[k];
      });

      return {
        id: user.id || undefined,
        username: user.username,
        email: user.email?.toLowerCase?.() || user.email,
        password: user.password,
        role: this.normalizeRole(user.role),
        gender: user.gender,
        registration_date: user.registrationDate || new Date().toISOString(),
        name: user.name || user.username,
        phone: user.phone,
        address: user.address,
        birthdate: user.birthdate,
        age: user.age,
        photo: user.photo,
        avatar_color: user.avatarColor,
        is_permanent: user.isPermanent || false,
        permissions: user.permissions || [],
        profile_data: profileData,
        experience: user.experience,
        education: user.education,
        certifications: user.certifications,
        skills: user.skills,
        languages: user.languages,
        bio: user.bio,
        availability: user.availability,
        specialties: user.specialties,
        rating: user.rating,
        reviews: user.reviews,
        hourly_rate: user.hourlyRate,
        work_preferences: user.workPreferences
      };
    }

    static invalidateCache() {
      this._usersCache = null;
      this._cacheTime = 0;
    }

    static _getLocalUsers() {
      if (this._memoryLocalUsers.length) {
        return [...this._memoryLocalUsers];
      }

      for (const storage of [localStorage, sessionStorage]) {
        try {
          const raw = storage.getItem(this.LOCAL_USERS_KEY);
          const parsed = raw ? JSON.parse(raw) : [];
          if (Array.isArray(parsed) && parsed.length) {
            this._memoryLocalUsers = parsed;
            return [...parsed];
          }
        } catch {
          /* try next storage */
        }
      }
      return [];
    }

    static _saveLocalUsers(users) {
      const payload = JSON.stringify(users);
      let saved = false;

      for (const storage of [localStorage, sessionStorage]) {
        try {
          storage.setItem(this.LOCAL_USERS_KEY, payload);
          saved = true;
        } catch (error) {
          console.warn('Could not persist users to storage:', error);
        }
      }

      this._memoryLocalUsers = [...users];
      return saved || this._memoryLocalUsers.length > 0;
    }

    static _mergeUsersByEmail(...sources) {
      const byEmail = new Map();
      for (const list of sources) {
        if (!Array.isArray(list)) continue;
        for (const user of list) {
          const email = user?.email?.toLowerCase?.()?.trim();
          if (email) byEmail.set(email, user);
        }
      }
      return this._ensureAmethAdmin([...byEmail.values()]);
    }

    static async getUsers(forceRefresh = false) {
      const now = Date.now();
      if (
        !forceRefresh &&
        this._usersCache &&
        now - this._cacheTime < this.CACHE_TTL
      ) {
        return this._usersCache;
      }

      const localUsers = this._getLocalUsers();
      const client = this.getClient();

      if (!client) {
        console.warn('Supabase no configurado, usando usuarios locales y por defecto');
        this._usersCache = this._mergeUsersByEmail(
          this._getDefaultUsers(),
          localUsers
        );
        this._cacheTime = now;
        return this._usersCache;
      }

      try {
        const { data, error } = await this._withTimeout(
          client
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: true })
        );

        if (error) {
          console.error('Error fetching users:', error);
          this._usersCache = this._mergeUsersByEmail(
            this._getDefaultUsers(),
            localUsers
          );
          this._cacheTime = now;
          return this._usersCache;
        }

        const remoteUsers = (data || []).map((row) => this._rowToUser(row));
        this._usersCache = this._mergeUsersByEmail(remoteUsers, localUsers);
        this._cacheTime = now;
        return this._usersCache;
      } catch (fetchError) {
        console.error('Could not reach Supabase, using local users:', fetchError);
        this._usersCache = this._mergeUsersByEmail(
          this._getDefaultUsers(),
          localUsers
        );
        this._cacheTime = now;
        return this._usersCache;
      }
    }

    static async getUserByUsername(username) {
      if (!username) return null;
      const users = await this.getUsers();
      const needle = String(username).toLowerCase().trim();
      return users.find(
        (u) =>
          u.username?.toLowerCase?.().trim() === needle ||
          u.email?.toLowerCase?.().trim() === needle ||
          u.id === username
      );
    }

    static async getUserById(id) {
      if (!id) return null;
      const users = await this.getUsers();
      return users.find((u) => u.id === id);
    }

    static async resolveCurrentUser() {
      const loggedInUser = CareConnectSession.getLoggedInUser();
      if (loggedInUser) {
        const byUsername = await this.getUserByUsername(loggedInUser);
        if (byUsername) {
          const sessionId = CareConnectSession.getCurrentUserId();
          if (byUsername.id && sessionId !== byUsername.id) {
            CareConnectSession.set('currentUserId', byUsername.id);
          }
          return byUsername;
        }
      }

      const userId = CareConnectSession.getCurrentUserId();
      if (userId) {
        return this.getUserById(userId);
      }

      return null;
    }

    static _saveUserLocally(user) {
      const normalized = {
        ...user,
        email: user.email?.toLowerCase?.()?.trim() || user.email,
        role: this.normalizeRole(user.role)
      };
      const localUsers = this._getLocalUsers();
      const email = normalized.email?.toLowerCase?.();
      const index = localUsers.findIndex(
        (u) => u.email?.toLowerCase?.() === email
      );

      if (index >= 0) {
        localUsers[index] = { ...localUsers[index], ...normalized };
      } else {
        if (!normalized.id) {
          normalized.id = crypto.randomUUID
            ? crypto.randomUUID()
            : `local-${Date.now()}`;
        }
        localUsers.push(normalized);
      }

      if (!this._saveLocalUsers(localUsers)) return null;
      this.invalidateCache();
      return normalized;
    }

    static async saveUser(user) {
      const localSaved = this._saveUserLocally(user);
      const client = this.getClient();

      if (!client) {
        console.warn('Supabase no configurado, usuario guardado localmente');
        return localSaved;
      }

      try {
        const row = this._userToRow(user);
        if (row.id && !/^[0-9a-f-]{36}$/i.test(String(row.id))) {
          delete row.id;
        }

        const { data, error } = await this._withTimeout(
          client
            .from('profiles')
            .upsert(row, { onConflict: 'email' })
            .select()
            .single()
        );

        if (error) {
          console.error('Error saving user to Supabase, kept local copy:', error);
          return localSaved;
        }

        this.invalidateCache();
        return this._rowToUser(data) || localSaved;
      } catch (saveError) {
        console.error('Supabase unreachable, kept local copy:', saveError);
        return localSaved;
      }
    }

    static async saveUsers(users) {
      const client = this.getClient();
      if (!client) return false;

      const rows = users.map((u) => this._userToRow(u));
      const { error } = await client.from('profiles').upsert(rows, {
        onConflict: 'email'
      });

      if (error) {
        console.error('Error saving users:', error);
        return false;
      }

      this.invalidateCache();
      return true;
    }

    static async deleteUser(id) {
      const client = this.getClient();
      if (!client) return false;

      const user = await this.getUserById(id);
      if (user?.isPermanent) {
        console.warn('No se puede eliminar usuario permanente');
        return false;
      }

      const { error } = await client.from('profiles').delete().eq('id', id);
      if (error) {
        console.error('Error deleting user:', error);
        return false;
      }

      this.invalidateCache();
      return true;
    }

    static async login(usernameOrEmail, password) {
      const users = await this.getUsers(true);
      const needle = String(usernameOrEmail || '').toLowerCase().trim();
      const pass = String(password || '').trim();

      return users.find(
        (u) =>
          (u.username?.toLowerCase?.().trim() === needle ||
            u.email?.toLowerCase?.().trim() === needle) &&
          u.password === pass
      );
    }

    static async getUserProfile(username) {
      const user = await this.getUserByUsername(username);
      if (!user) return {};

      return {
        name: user.name || user.username,
        email: user.email,
        username: user.username,
        role: user.role,
        age: user.age || '',
        gender: user.gender || '',
        phone: user.phone || '',
        address: user.address || '',
        allergies: user.allergies || [],
        medications: user.medications || [],
        conditions: user.conditions || [],
        emergencyContact: user.emergencyContact || {
          name: '',
          phone: '',
          relationship: ''
        },
        bloodType: user.bloodType || '',
        height: user.height || '',
        weight: user.weight || '',
        insurance: user.insurance || '',
        doctor: user.doctor || '',
        preferences: user.preferences || {
          language: 'Español',
          notifications: true,
          accessibility: false
        },
        notes: user.notes || '',
        photo: user.photo || null,
        avatarColor: user.avatarColor || 'linear-gradient(135deg, #4169e1, #764ba2)',
        experience: user.experience || '',
        education: user.education || '',
        certifications: user.certifications || '',
        skills: user.skills || '',
        languages: user.languages || '',
        bio: user.bio || '',
        availability: user.availability || '',
        specialties: user.specialties || [],
        rating: user.rating || 0,
        reviews: user.reviews || 0,
        hourlyRate: user.hourlyRate || '',
        workPreferences: user.workPreferences || {}
      };
    }

    static async saveUserProfile(username, profileData) {
      const user = await this.getUserByUsername(username);
      if (!user) return false;

      const updated = {
        ...user,
        name: profileData.name ?? user.name,
        phone: profileData.phone ?? user.phone,
        address: profileData.address ?? user.address,
        age: profileData.age ?? user.age,
        gender: profileData.gender ?? user.gender,
        allergies: profileData.allergies ?? user.allergies,
        medications: profileData.medications ?? user.medications,
        conditions: profileData.conditions ?? user.conditions,
        emergencyContact: profileData.emergencyContact ?? user.emergencyContact,
        bloodType: profileData.bloodType ?? user.bloodType,
        height: profileData.height ?? user.height,
        weight: profileData.weight ?? user.weight,
        insurance: profileData.insurance ?? user.insurance,
        doctor: profileData.doctor ?? user.doctor,
        preferences: profileData.preferences ?? user.preferences,
        notes: profileData.notes ?? user.notes,
        photo: profileData.photo ?? user.photo,
        avatarColor: profileData.avatarColor ?? user.avatarColor,
        experience: profileData.experience ?? user.experience,
        education: profileData.education ?? user.education,
        certifications: profileData.certifications ?? user.certifications,
        skills: profileData.skills ?? user.skills,
        languages: profileData.languages ?? user.languages,
        bio: profileData.bio ?? user.bio,
        availability: profileData.availability ?? user.availability,
        specialties: profileData.specialties ?? user.specialties,
        rating: profileData.rating ?? user.rating,
        reviews: profileData.reviews ?? user.reviews,
        hourlyRate: profileData.hourlyRate ?? user.hourlyRate,
        workPreferences: profileData.workPreferences ?? user.workPreferences
      };

      const result = await this.saveUser(updated);
      return !!result;
    }

    static async getMedicines(userId) {
      const client = this.getClient();
      if (!client || !userId) return [];

      const { data, error } = await client
        .from('medicines')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching medicines:', error);
        return [];
      }

      return (data || []).map((m) => ({
        id: m.id,
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        time: m.time,
        notes: m.notes
      }));
    }

    static async saveMedicines(userId, medicines) {
      const client = this.getClient();
      if (!client || !userId) return false;

      await client.from('medicines').delete().eq('user_id', userId);

      if (!medicines?.length) return true;

      const rows = medicines.map((m) => ({
        user_id: userId,
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        time: m.time,
        notes: m.notes
      }));

      const { error } = await client.from('medicines').insert(rows);
      if (error) {
        console.error('Error saving medicines:', error);
        return false;
      }
      return true;
    }

    static async getVirtualCareSessions(userId) {
      const client = this.getClient();
      if (!client) return null;

      let query = client.from('virtual_care_sessions').select('*');
      if (userId) query = query.eq('user_id', userId);

      const { data, error } = await query.order('created_at', {
        ascending: true
      });

      if (error) {
        console.error('Error fetching virtual care sessions:', error);
        return null;
      }

      return (data || []).map((s) => ({
        id: s.id,
        caregiver: s.caregiver,
        type: s.type,
        status: s.status,
        time: s.session_time,
        date: s.session_date,
        duration: s.duration,
        notes: s.notes,
        connection: s.connection,
        roomId: s.room_id
      }));
    }

    static async saveVirtualCareSessions(userId, sessions) {
      const client = this.getClient();
      if (!client) return false;

      if (userId) {
        await client.from('virtual_care_sessions').delete().eq('user_id', userId);
      }

      if (!sessions?.length) return true;

      const rows = sessions.map((s) => ({
        user_id: userId || null,
        caregiver: s.caregiver,
        type: s.type,
        status: s.status,
        session_time: s.time,
        session_date: s.date,
        duration: s.duration,
        notes: s.notes,
        connection: s.connection,
        room_id: s.roomId
      }));

      const { error } = await client.from('virtual_care_sessions').insert(rows);
      if (error) {
        console.error('Error saving virtual care sessions:', error);
        return false;
      }
      return true;
    }

    static _getDefaultUsers() {
      return this._ensureAmethAdmin([
        {
          username: 'admin',
          password: 'admin123',
          role: 'admin',
          email: 'admin@careconnect.com',
          id: 'admin1'
        },
        {
          username: 'usuario',
          password: 'pass123',
          role: 'paciente',
          email: 'usuario@careconnect.com',
          id: 'user1'
        },
        {
          username: 'Josue',
          password: 'testpass456',
          role: 'cuidador',
          email: 'josue@careconnect.com',
          id: 'josue1'
        }
      ]);
    }

    static _ensureAmethAdmin(users) {
      const amethExists = users.find(
        (u) =>
          u.username?.toLowerCase?.() === 'ameth' ||
          u.email?.toLowerCase?.() === 'ameth@careconnect.com'
      );
      if (!amethExists) {
        users.push(this.createPermanentAdminAmeth());
      }
      return users;
    }

    static createPermanentAdminAmeth() {
      return {
        username: 'Ameth',
        password: 'Ameth2024!',
        role: 'admin',
        email: 'ameth@careconnect.com',
        id: this.AMETH_ADMIN_ID,
        isPermanent: true,
        createdAt: new Date().toISOString(),
        permissions: ['all'],
        canDelete: false,
        canModify: false
      };
    }

    static async verifyAndRestoreAmethAdmin() {
      try {
        const users = await this.getUsers(true);
        const amethExists = users.find(
          (u) => u.username?.toLowerCase?.() === 'ameth'
        );
        if (!amethExists) {
          await this.saveUser(this.createPermanentAdminAmeth());
          return true;
        }
        return true;
      } catch (error) {
        console.error('Error verifying Ameth admin:', error);
        return false;
      }
    }
  }

  window.getUsers = async function (forceRefresh = false) {
    return CareConnectDB.getUsers(forceRefresh);
  };

  window.saveUsers = async function (users) {
    return CareConnectDB.saveUsers(users);
  };

  window.CareConnectDB = CareConnectDB;
}

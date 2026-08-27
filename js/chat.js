class ChatApp {
  constructor() {
    this.conversations = [];
    this.currentConversationId = null;
    this.currentUser = null;
    this.messages = {};
  }

  async initialize() {
    this.currentUser = CareConnectSession.getLoggedInUser() || 'Guest';
    await this.loadConversations();
    this.renderConversations();
    this.setupEventListeners();
  }

  async loadConversations() {
    const userId = CareConnectSession.getCurrentUserId() || this.currentUser;
    const savedConversations = await this.getStoredConversations(userId);
    
    if (savedConversations && savedConversations.length > 0) {
      this.conversations = savedConversations.map(conv => ({
        ...conv,
        timestamp: this.normalizeDate(conv.timestamp)
      }));
    } else {
      // Conversaciones por defecto
      this.conversations = [
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          avatar: 'SJ',
          lastMessage: 'How are you feeling today?',
          timestamp: new Date(Date.now() - 30 * 60000),
          unread: 2,
          type: 'caregiver'
        },
        {
          id: 2,
          name: 'Support Team',
          avatar: 'ST',
          lastMessage: 'We are here to help. What can we do for you?',
          timestamp: new Date(Date.now() - 2 * 60 * 60000),
          unread: 0,
          type: 'support'
        },
        {
          id: 3,
          name: 'Robert Chen (Appointment)',
          avatar: 'RC',
          lastMessage: 'Your appointment is confirmed for tomorrow',
          timestamp: new Date(Date.now() - 24 * 60 * 60000),
          unread: 0,
          type: 'appointment'
        }
      ];
      await this.saveConversations(userId);
    }

    // Cargar mensajes para cada conversación
    for (const conv of this.conversations) {
      await this.loadMessages(conv.id);
    }
  }

  async loadMessages(conversationId) {
    const messages = await this.getStoredMessages(conversationId);
    const loadedMessages = messages || this.getDefaultMessages(conversationId);

    this.messages[conversationId] = (loadedMessages || []).map(msg => ({
      ...msg,
      timestamp: this.normalizeDate(msg.timestamp)
    }));
  }

  getDefaultMessages(conversationId) {
    const messageMap = {
      1: [
        { id: 1, sender: 'SJ', text: 'Hello! How can I assist you today?', timestamp: new Date(Date.now() - 120 * 60000), type: 'received' },
        { id: 2, sender: this.currentUser, text: 'Hi Dr. Johnson, I have been having some headaches', timestamp: new Date(Date.now() - 110 * 60000), type: 'sent' },
        { id: 3, sender: 'SJ', text: 'I see. How long has this been happening?', timestamp: new Date(Date.now() - 100 * 60000), type: 'received' },
        { id: 4, sender: this.currentUser, text: 'For about 3 days now', timestamp: new Date(Date.now() - 90 * 60000), type: 'sent' },
        { id: 5, sender: 'SJ', text: 'How are you feeling today?', timestamp: new Date(Date.now() - 30 * 60000), type: 'received' }
      ],
      2: [
        { id: 1, sender: 'ST', text: 'Welcome to Careconnect Support!', timestamp: new Date(Date.now() - 3 * 60 * 60000), type: 'received' },
        { id: 2, sender: 'ST', text: 'We are here to help. What can we do for you?', timestamp: new Date(Date.now() - 2 * 60 * 60000), type: 'received' }
      ],
      3: [
        { id: 1, sender: 'RC', text: 'Your appointment has been scheduled', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000), type: 'received' },
        { id: 2, sender: 'RC', text: 'Your appointment is confirmed for tomorrow at 10:00 AM', timestamp: new Date(Date.now() - 24 * 60 * 60000), type: 'received' }
      ]
    };

    return messageMap[conversationId] || [];
  }

  async getStoredConversations(userId) {
    try {
      const stored = localStorage.getItem(`careconnect_conversations_${userId}`);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Error loading conversations:', e);
      return null;
    }
  }

  async saveConversations(userId) {
    try {
      localStorage.setItem(`careconnect_conversations_${userId}`, JSON.stringify(this.conversations));
    } catch (e) {
      console.error('Error saving conversations:', e);
    }
  }

  async getStoredMessages(conversationId) {
    try {
      const stored = localStorage.getItem(`careconnect_messages_${conversationId}`);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Error loading messages:', e);
      return null;
    }
  }

  async saveMessages(conversationId) {
    try {
      localStorage.setItem(`careconnect_messages_${conversationId}`, JSON.stringify(this.messages[conversationId]));
    } catch (e) {
      console.error('Error saving messages:', e);
    }
  }

  renderConversations() {
    const listContainer = document.getElementById('conversationsList');
    listContainer.innerHTML = '';

    this.conversations.forEach((conv, index) => {
      const element = document.createElement('div');
      element.className = `conversation-item ${this.currentConversationId === conv.id ? 'active' : ''}`;
      element.onclick = () => this.selectConversation(conv.id);

      const timeFormatted = this.formatTime(conv.timestamp);

      element.innerHTML = `
        <div class="conversation-avatar">${conv.avatar}</div>
        <div class="conversation-info">
          <p class="conversation-name">${conv.name}</p>
          <p class="conversation-preview">${conv.lastMessage}</p>
        </div>
        <div>
          <div class="conversation-time">${timeFormatted}</div>
          ${conv.unread > 0 ? `<div class="unread-badge">${conv.unread}</div>` : ''}
        </div>
      `;

      listContainer.appendChild(element);
    });
  }

  selectConversation(conversationId) {
    this.currentConversationId = conversationId;
    const userId = CareConnectSession.getCurrentUserId() || this.currentUser;
    
    // Marcar como leído
    const conv = this.conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.unread = 0;
      this.saveConversations(userId);
    }

    this.renderConversations();
    this.renderChatArea();
  }

  renderChatArea() {
    const chatContent = document.getElementById('chatContent');
    const conv = this.conversations.find(c => c.id === this.currentConversationId);

    if (!conv) return;

    const messages = this.messages[this.currentConversationId] || [];

    chatContent.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-header-avatar">${conv.avatar}</div>
          <div class="chat-header-text">
            <h3>${conv.name}</h3>
            <p>Online · Last seen 2 min ago</p>
          </div>
        </div>
        <div class="chat-header-actions">
          <button class="header-btn" title="Video Call"><i class="bi bi-camera-video-fill"></i></button>
          <button class="header-btn" title="Voice Call"><i class="bi bi-telephone-fill"></i></button>
          <button class="header-btn" title="Information"><i class="bi bi-info-circle"></i></button>
        </div>
      </div>

      <div class="messages-area" id="messagesArea">
        ${messages.map(msg => `
          <div class="message ${msg.type}">
            ${msg.type === 'received' ? `<div class="message-avatar">${msg.sender.substring(0, 2).toUpperCase()}</div>` : ''}
            <div class="message-bubble">
              <p class="message-text">${this.escapeHtml(msg.text)}</p>
              <div class="message-time">${this.formatTime(msg.timestamp)}</div>
            </div>
            ${msg.type === 'sent' ? `<div class="message-avatar">${this.currentUser.substring(0, 2).toUpperCase()}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <div class="chat-input-area">
        <div class="input-wrapper">
          <div class="input-actions">
            <button class="input-action-btn" title="Attach file"><i class="bi bi-paperclip"></i></button>
            <button class="input-action-btn" title="Emoji"><i class="bi bi-emoji-smile"></i></button>
          </div>
          <input type="text" class="message-input" id="messageInput" placeholder="Type your message..." />
          <button class="send-btn" onclick="window.chatApp.sendMessage()"><i class="bi bi-send-fill"></i></button>
        </div>
      </div>
    `;

    // Scroll al final
    setTimeout(() => {
      const messagesArea = document.getElementById('messagesArea');
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }, 100);

    // Event listeners para el input
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize del textarea
    messageInput.addEventListener('input', () => {
      messageInput.style.height = 'auto';
      messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
    });
  }

  sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();

    if (!text || !this.currentConversationId) return;

    const newMessage = {
      id: (this.messages[this.currentConversationId]?.length || 0) + 1,
      sender: this.currentUser,
      text: text,
      timestamp: new Date(),
      type: 'sent'
    };

    if (!this.messages[this.currentConversationId]) {
      this.messages[this.currentConversationId] = [];
    }

    this.messages[this.currentConversationId].push(newMessage);
    this.saveMessages(this.currentConversationId);

    // Actualizar última conversación
    const conv = this.conversations.find(c => c.id === this.currentConversationId);
    if (conv) {
      conv.lastMessage = text;
      conv.timestamp = new Date();
      const userId = CareConnectSession.getCurrentUserId() || this.currentUser;
      this.saveConversations(userId);
    }

    messageInput.value = '';
    messageInput.style.height = 'auto';
    this.renderChatArea();

    // Simular respuesta automática después de 1-2 segundos
    setTimeout(() => this.simulateResponse(), 1000 + Math.random() * 1000);
  }

  simulateResponse() {
    const conv = this.conversations.find(c => c.id === this.currentConversationId);
    if (!conv) return;

    const responses = {
      'SJ': [
        'That sounds good. I\'ll make a note in your file.',
        'How are you managing with your current medication?',
        'I recommend we schedule a follow-up appointment.',
        'Have you been able to rest?',
        'Let me know if you need anything else.'
      ],
      'ST': [
        'Thank you for reaching out. We\'re here to help!',
        'Is there anything else I can assist you with?',
        'Your feedback is important to us.',
        'Feel free to contact us anytime.',
        'We appreciate your business!'
      ],
      'RC': [
        'Please arrive 15 minutes early.',
        'If you need to reschedule, let us know!',
        'Don\'t forget to bring your insurance card.',
        'We look forward to seeing you!'
      ]
    };

    const convResponses = responses[conv.avatar] || responses['ST'];
    const randomResponse = convResponses[Math.floor(Math.random() * convResponses.length)];

    const newMessage = {
      id: (this.messages[this.currentConversationId]?.length || 0) + 1,
      sender: conv.avatar,
      text: randomResponse,
      timestamp: new Date(),
      type: 'received'
    };

    this.messages[this.currentConversationId].push(newMessage);
    this.saveMessages(this.currentConversationId);

    // Actualizar última conversación
    conv.lastMessage = randomResponse;
    conv.timestamp = new Date();
    conv.unread = (conv.unread || 0) + 1;
    const userId = CareConnectSession.getCurrentUserId() || this.currentUser;
    this.saveConversations(userId);

    this.renderChatArea();
    this.renderConversations();
  }

  startNewChat() {
    const name = prompt('Enter caregiver or contact name:');
    if (!name) return;

    const newConversation = {
      id: Math.max(...this.conversations.map(c => c.id), 0) + 1,
      name: name,
      avatar: name.substring(0, 2).toUpperCase(),
      lastMessage: 'Start your conversation...',
      timestamp: new Date(),
      unread: 0,
      type: 'new'
    };

    this.conversations.unshift(newConversation);
    this.messages[newConversation.id] = [];

    const userId = CareConnectSession.getCurrentUserId() || this.currentUser;
    this.saveConversations(userId);
    this.renderConversations();

    this.selectConversation(newConversation.id);
  }

  setupEventListeners() {
    // Ya configurado en el HTML
  }

  normalizeDate(value) {
    if (!value) return new Date();
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  formatTime(dateValue) {
    const date = this.normalizeDate(dateValue);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

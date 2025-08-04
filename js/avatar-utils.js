// Avatar Utilities for Careconnect
class AvatarUtils {
  // Calculate initials from username
  static getInitials(name) {
    if (!name) return 'U';
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
  }
  
  // Generate unique color based on username
  static getAvatarColor(name) {
    if (!name) return 'linear-gradient(135deg, #667eea, #764ba2)';
    
    const colors = [
      'linear-gradient(135deg, #667eea, #764ba2)', // Purple
      'linear-gradient(135deg, #f093fb, #f5576c)', // Pink
      'linear-gradient(135deg, #4facfe, #00f2fe)', // Blue
      'linear-gradient(135deg, #43e97b, #38f9d7)', // Green
      'linear-gradient(135deg, #fa709a, #fee140)', // Orange
      'linear-gradient(135deg, #a8edea, #fed6e3)', // Mint
      'linear-gradient(135deg, #ff9a9e, #fecfef)', // Rose
      'linear-gradient(135deg, #ffecd2, #fcb69f)', // Peach
      'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Coral
      'linear-gradient(135deg, #a18cd1, #fbc2eb)'  // Lavender
    ];
    
    // Simple hash function to get consistent color for same name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }
  
  // Get user data with avatar information
  static getUserDataWithAvatar() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === loggedInUser || u.email === loggedInUser);
    
    if (user) {
      return {
        name: user.name || user.username || 'User',
        initials: this.getInitials(user.name || user.username),
        avatarColor: this.getAvatarColor(user.name || user.username),
        photo: user.photo || null,
        email: user.email || '-',
        role: user.role || '-'
      };
    } else {
      return {
        name: 'User',
        initials: 'U',
        avatarColor: this.getAvatarColor('User'),
        photo: null,
        email: '-',
        role: '-'
      };
    }
  }
  
  // Create avatar HTML element
  static createAvatarHTML(userData, size = 'medium') {
    const sizes = {
      small: { width: '40px', height: '40px', fontSize: '16px' },
      medium: { width: '65px', height: '65px', fontSize: '22px' },
      large: { width: '120px', height: '120px', fontSize: '2.5rem' }
    };
    
    const sizeConfig = sizes[size] || sizes.medium;
    
    if (userData.photo) {
      return `<img src="${userData.photo}" alt="Profile photo" style="width: ${sizeConfig.width}; height: ${sizeConfig.height}; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255, 255, 255, 0.3); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">`;
    } else {
      return `<div style="width: ${sizeConfig.width}; height: ${sizeConfig.height}; border-radius: 50%; background: ${userData.avatarColor}; display: flex; align-items: center; justify-content: center; font-size: ${sizeConfig.fontSize}; font-weight: 700; color: white; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); border: 3px solid rgba(255, 255, 255, 0.3); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">${userData.initials}</div>`;
    }
  }
}

// Make it available globally
window.AvatarUtils = AvatarUtils; 
import { ThemeConfig, ColorPalette } from '../models/theme.model';

// رنگ‌های پیشفرض
const DEFAULT_PALETTE: ColorPalette = {
  primary: '#3b82f6', secondary: '#6366f1', accent: '#f59e0b', background: '#ffffff',
  surface: '#f9fafb', text: '#1f2937', textSecondary: '#6b7280', border: '#e5e7eb',
  success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6'
};

const DEFAULT_DARK_PALETTE: ColorPalette = {
  primary: '#60a5fa', secondary: '#818cf8', accent: '#fbbf24', background: '#1f2937',
  surface: '#111827', text: '#f3f4f6', textSecondary: '#d1d5db', border: '#374151',
  success: '#34d399', warning: '#fcd34d', error: '#f87171', info: '#60a5fa'
};

export const ALL_THEMES: ThemeConfig[] = [
  // Light Theme
  { name: 'light', displayName: 'روشن', isDark: false, colors: DEFAULT_PALETTE },
  
  // Dark Theme
  { name: 'dark', displayName: 'تاریک', isDark: true, colors: DEFAULT_DARK_PALETTE },
  
  // Sci-Fi Theme
  {
    name: 'scifi', displayName: 'علمی-تخیلی', isDark: true,
    colors: {
      primary: '#00ff00', secondary: '#00ffff', accent: '#ff00ff', background: '#000000',
      surface: '#0a0a0a', text: '#00ff00', textSecondary: '#00cc00', border: '#00ff00',
      success: '#00ff00', warning: '#ffff00', error: '#ff0000', info: '#00ffff'
    }
  },
  
  // Glassmorphism Theme
  {
    name: 'glassmorphism', displayName: 'شیشه‌ای', isDark: false,
    colors: {
      primary: '#3b82f6', secondary: '#8b5cf6', accent: '#ec4899', background: '#f0f4f8',
      surface: 'rgba(255, 255, 255, 0.8)', text: '#1f2937', textSecondary: '#4b5563', border: 'rgba(255, 255, 255, 0.5)',
      success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6'
    }
  },
  
  // HUD Theme
  {
    name: 'hud', displayName: 'نمایشگر', isDark: true,
    colors: {
      primary: '#00ff00', secondary: '#00cc00', accent: '#ffff00', background: '#000000',
      surface: '#0a0a0a', text: '#00ff00', textSecondary: '#00cc00', border: '#00ff00',
      success: '#00ff00', warning: '#ffff00', error: '#ff0000', info: '#00ffff'
    }
  },
  
  // Windows 95 Theme
  {
    name: 'win95', displayName: 'ویندوز ۹۵', isDark: false,
    colors: {
      primary: '#000080', secondary: '#0000ff', accent: '#ffff00', background: '#c0c0c0',
      surface: '#dfdfdf', text: '#000000', textSecondary: '#808080', border: '#dfdfdf',
      success: '#008000', warning: '#ff8000', error: '#ff0000', info: '#0000ff'
    }
  },
  
  // Minimal Theme
  {
    name: 'minimal', displayName: 'مینیمال', isDark: false,
    colors: {
      primary: '#000000', secondary: '#666666', accent: '#000000', background: '#ffffff',
      surface: '#f5f5f5', text: '#000000', textSecondary: '#666666', border: '#e0e0e0',
      success: '#4caf50', warning: '#ff9800', error: '#f44336', info: '#2196f3'
    }
  },
  
  // Aurora Theme
  {
    name: 'aurora', displayName: 'شفق', isDark: true,
    colors: {
      primary: '#00d084', secondary: '#00b8a9', accent: '#8338ec', background: '#0a1428',
      surface: '#1a2332', text: '#e0f7fa', textSecondary: '#b3e5fc', border: '#00d084',
      success: '#00d084', warning: '#ffd60a', error: '#ff006e', info: '#00b8a9'
    }
  },
  
  // Desert Theme
  {
    name: 'desert', displayName: 'صحرا', isDark: false,
    colors: {
      primary: '#d4a574', secondary: '#c9a961', accent: '#e8b44f', background: '#f5e6d3',
      surface: '#ede0d9', text: '#5d4e37', textSecondary: '#8b7355', border: '#d4a574',
      success: '#6b8e23', warning: '#cd853f', error: '#a0522d', info: '#d4a574'
    }
  },
  
  // Forest Theme
  {
    name: 'forest', displayName: 'جنگل', isDark: true,
    colors: {
      primary: '#2d5016', secondary: '#3d5a1f', accent: '#7cb342', background: '#1b2d1f',
      surface: '#243329', text: '#c8e6c9', textSecondary: '#a5d6a7', border: '#558b2f',
      success: '#7cb342', warning: '#fbc02d', error: '#e53935', info: '#558b2f'
    }
  },
  
  // Ocean Theme
  {
    name: 'ocean', displayName: 'اقیانوس', isDark: true,
    colors: {
      primary: '#0277bd', secondary: '#01579b', accent: '#00bcd4', background: '#01579b',
      surface: '#0d47a1', text: '#b3e5fc', textSecondary: '#81d4fa', border: '#00bcd4',
      success: '#26a69a', warning: '#fbc02d', error: '#ef5350', info: '#00bcd4'
    }
  },
  
  // Sunset Theme
  {
    name: 'sunset', displayName: 'غروب', isDark: false,
    colors: {
      primary: '#ff6b6b', secondary: '#ff8c42', accent: '#ffd93d', background: '#fff5e1',
      surface: '#ffe8cc', text: '#6d3c1b', textSecondary: '#a0522d', border: '#ff8c42',
      success: '#6bcf7f', warning: '#ff8c42', error: '#ff6b6b', info: '#ff8c42'
    }
  },
  
  // Midnight Theme
  {
    name: 'midnight', displayName: 'نیمه‌شب', isDark: true,
    colors: {
      primary: '#1a237e', secondary: '#283593', accent: '#3f51b5', background: '#0d0d2b',
      surface: '#1a1a3e', text: '#e0e0ff', textSecondary: '#b0b0ff', border: '#3f51b5',
      success: '#66bb6a', warning: '#ffa726', error: '#ef5350', info: '#42a5f5'
    }
  },
  
  // Luxury Theme
  {
    name: 'luxury', displayName: 'لوکس', isDark: true,
    colors: {
      primary: '#d4af37', secondary: '#aa8c2c', accent: '#ffd700', background: '#1a1a1a',
      surface: '#2d2d2d', text: '#f5f5f5', textSecondary: '#d4af37', border: '#d4af37',
      success: '#66bb6a', warning: '#ffa726', error: '#ef5350', info: '#42a5f5'
    }
  },
  
  // Gradient Theme
  {
    name: 'gradient', displayName: 'گرادیانت', isDark: false,
    colors: {
      primary: '#667eea', secondary: '#764ba2', accent: '#f093fb', background: '#f5f7fa',
      surface: '#ffffff', text: '#2d3748', textSecondary: '#718096', border: '#e2e8f0',
      success: '#48bb78', warning: '#ed8936', error: '#f56565', info: '#4299e1'
    }
  },
  
  // Neon Theme
  {
    name: 'neon', displayName: 'نئون', isDark: true,
    colors: {
      primary: '#ff006e', secondary: '#00f5ff', accent: '#ffbe0b', background: '#0a0e27',
      surface: '#16213e', text: '#00f5ff', textSecondary: '#ffbe0b', border: '#ff006e',
      success: '#00ff00', warning: '#ffbe0b', error: '#ff006e', info: '#00f5ff'
    }
  },
  
  // Terminal Theme
  {
    name: 'terminal', displayName: 'ترمینال', isDark: true,
    colors: {
      primary: '#00ff00', secondary: '#00cc00', accent: '#ffff00', background: '#000000',
      surface: '#0a0a0a', text: '#00ff00', textSecondary: '#00cc00', border: '#00ff00',
      success: '#00ff00', warning: '#ffff00', error: '#ff0000', info: '#00ffff'
    }
  },
  
  // Monochrome Theme
  {
    name: 'monochrome', displayName: 'تک‌رنگ', isDark: false,
    colors: {
      primary: '#333333', secondary: '#666666', accent: '#999999', background: '#ffffff',
      surface: '#f0f0f0', text: '#000000', textSecondary: '#666666', border: '#cccccc',
      success: '#333333', warning: '#666666', error: '#000000', info: '#333333'
    }
  },
  
  // Paper Theme
  {
    name: 'paper', displayName: 'کاغذی', isDark: false,
    colors: {
      primary: '#8b7355', secondary: '#a0826d', accent: '#c9a961', background: '#fef9f3',
      surface: '#faf6f1', text: '#3e2723', textSecondary: '#5d4037', border: '#d7ccc8',
      success: '#558b2f', warning: '#f57f17', error: '#c62828', info: '#01579b'
    }
  },
  
  // Pastel Theme
  {
    name: 'pastel', displayName: 'پاستلی', isDark: false,
    colors: {
      primary: '#b19cd9', secondary: '#ffb3ba', accent: '#ffffba', background: '#fffacd',
      surface: '#fff9e6', text: '#5a5a5a', textSecondary: '#8a8a8a', border: '#e6d9f0',
      success: '#baffc9', warning: '#ffffba', error: '#ffb3ba', info: '#bae1ff'
    }
  },
  
  // Rose Theme
  {
    name: 'rose', displayName: 'گل رز', isDark: false,
    colors: {
      primary: '#e91e63', secondary: '#c2185b', accent: '#f06292', background: '#fce4ec',
      surface: '#f8bbd0', text: '#880e4f', textSecondary: '#ad1457', border: '#f48fb1',
      success: '#66bb6a', warning: '#ffa726', error: '#e91e63', info: '#42a5f5'
    }
  }
];

export const DEFAULT_THEME = ALL_THEMES[0]; // Light theme
export const DEFAULT_DARK_THEME_CONFIG = ALL_THEMES[1]; // Dark theme

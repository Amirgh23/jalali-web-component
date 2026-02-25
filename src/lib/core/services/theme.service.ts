import { ThemeConfig, ColorPalette } from '../models/theme.model';
import { ALL_THEMES, DEFAULT_THEME, DEFAULT_DARK_THEME_CONFIG } from './themes-data';

/**
 * Vanilla TypeScript ThemeService
 * Manages themes, colors, and CSS variables generation
 * No Angular dependencies
 */
export class ThemeService {
  private currentTheme: ThemeConfig;
  private currentPalette: ColorPalette;
  private isDarkMode: boolean;
  private storageKey = 'jalali-theme-config';
  private darkModeStorageKey = 'jalali-dark-mode';

  constructor() {
    this.isDarkMode = this.detectDarkMode();
    this.currentTheme = this.loadThemeFromStorage() || this.getDefaultTheme();
    this.currentPalette = this.currentTheme.colors;
  }

  /**
   * Detect if dark mode is enabled in system preferences
   */
  private detectDarkMode(): boolean {
    // Check localStorage first
    const stored = localStorage.getItem(this.darkModeStorageKey);
    if (stored !== null) {
      return stored === 'true';
    }

    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return false;
  }

  /**
   * Load theme from localStorage
   */
  private loadThemeFromStorage(): ThemeConfig | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const themeName = JSON.parse(stored);
        return this.getTheme(themeName);
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    }
    return null;
  }

  /**
   * Get default theme based on dark mode
   */
  private getDefaultTheme(): ThemeConfig {
    return this.isDarkMode ? DEFAULT_DARK_THEME_CONFIG : DEFAULT_THEME;
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): ThemeConfig {
    return this.currentTheme;
  }

  /**
   * Set theme by name
   */
  setTheme(name: string): void {
    const theme = this.getTheme(name);
    if (theme) {
      this.currentTheme = theme;
      this.currentPalette = theme.colors;
      this.saveThemeToStorage(name);
    }
  }

  /**
   * Get theme by name
   */
  getTheme(name: string): ThemeConfig | null {
    return ALL_THEMES.find(t => t.name === name) || null;
  }

  /**
   * Get current color palette
   */
  getCurrentPalette(): ColorPalette {
    return this.currentPalette;
  }

  /**
   * Set custom palette
   */
  setPalette(palette: ColorPalette): void {
    this.currentPalette = palette;
    this.currentTheme.colors = palette;
  }

  /**
   * Get all available themes
   */
  getThemes(): ThemeConfig[] {
    return ALL_THEMES;
  }

  /**
   * Get all available theme names
   */
  getThemeNames(): string[] {
    return ALL_THEMES.map(t => t.name);
  }

  /**
   * Get preset palettes (light or dark)
   */
  getPresetPalettes(isDark = false): ColorPalette[] {
    return ALL_THEMES
      .filter(theme => theme.isDark === isDark)
      .map(theme => theme.colors);
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(this.darkModeStorageKey, String(this.isDarkMode));

    // Switch to appropriate theme
    const newTheme = this.isDarkMode ? DEFAULT_DARK_THEME_CONFIG : DEFAULT_THEME;
    this.setTheme(newTheme.name);
  }

  /**
   * Set dark mode
   */
  setDarkMode(isDark: boolean): void {
    if (this.isDarkMode !== isDark) {
      this.toggleDarkMode();
    }
  }

  /**
   * Get dark mode status
   */
  isDark(): boolean {
    return this.isDarkMode;
  }

  /**
   * Reset theme to default
   */
  resetTheme(): void {
    const defaultTheme = this.getDefaultTheme();
    this.setTheme(defaultTheme.name);
  }

  /**
   * Clear stored theme
   */
  clearStoredTheme(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.darkModeStorageKey);
    this.resetTheme();
  }

  /**
   * Save theme to storage
   */
  private saveThemeToStorage(themeName: string): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(themeName));
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  }

  /**
   * Generate CSS variables from current palette
   * Returns a string of CSS variable declarations
   */
  generateCSSVariables(): string {
    const palette = this.currentPalette;
    const variables: string[] = [];

    Object.entries(palette).forEach(([key, value]) => {
      const cssVarName = `--${this.camelToKebab(key)}`;
      variables.push(`${cssVarName}: ${value};`);
    });

    return variables.join('\n');
  }

  /**
   * Generate CSS variables as object
   * Returns an object with CSS variable names and values
   */
  generateCSSVariablesObject(): Record<string, string> {
    const palette = this.currentPalette;
    const variables: Record<string, string> = {};

    Object.entries(palette).forEach(([key, value]) => {
      const cssVarName = `--${this.camelToKebab(key)}`;
      variables[cssVarName] = value;
    });

    return variables;
  }

  /**
   * Apply theme to element
   */
  applyThemeToElement(element: HTMLElement): void {
    const variables = this.generateCSSVariablesObject();

    Object.entries(variables).forEach(([key, value]) => {
      element.style.setProperty(key, value);
    });

    // Set data attribute for theme name
    element.setAttribute('data-theme', this.currentTheme.name);
    element.setAttribute('data-dark-mode', String(this.isDarkMode));
  }

  /**
   * Apply theme to root element
   */
  applyThemeToRoot(): void {
    const root = document.documentElement;
    this.applyThemeToElement(root);
  }

  /**
   * Get CSS variables as string for style tag
   */
  getCSSVariablesString(): string {
    const variables = this.generateCSSVariables();
    return `:root {\n  ${variables.split('\n').join('\n  ')}\n}`;
  }

  /**
   * Create style element with CSS variables
   */
  createStyleElement(): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = this.getCSSVariablesString();
    return style;
  }

  /**
   * Inject CSS variables into document
   */
  injectCSSVariables(): void {
    const existingStyle = document.getElementById('jalali-theme-variables');
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = this.createStyleElement();
    style.id = 'jalali-theme-variables';
    document.head.appendChild(style);
  }

  /**
   * Convert camelCase to kebab-case
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Get color by key
   */
  getColor(key: keyof ColorPalette): string {
    return this.currentPalette[key];
  }

  /**
   * Set color by key
   */
  setColor(key: keyof ColorPalette, value: string): void {
    this.currentPalette[key] = value;
  }

  /**
   * Check if theme is dark
   */
  isThemeDark(): boolean {
    return this.currentTheme.isDark;
  }

  /**
   * Get theme by isDark flag
   */
  getThemesByDarkMode(isDark: boolean): ThemeConfig[] {
    return ALL_THEMES.filter(theme => theme.isDark === isDark);
  }

  /**
   * Validate color value
   */
  isValidColor(color: string): boolean {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  }

  /**
   * Get contrast color (black or white) for a given color
   */
  getContrastColor(hexColor: string): string {
    // Remove # if present
    const hex = hexColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black or white based on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }
}

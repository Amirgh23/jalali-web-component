#!/usr/bin/env node

/**
 * Simple test runner for ThemeService
 * This verifies the service works correctly
 */

const ThemeService = require('./dist/lib/core/services/theme.service').ThemeService;

console.log('Testing ThemeService...\n');

try {
  // Test 1: Create service
  const service = new ThemeService();
  console.log('✓ Service created successfully');

  // Test 2: Get all themes
  const themes = service.getThemes();
  console.log(`✓ Got ${themes.length} themes`);

  if (themes.length !== 21) {
    throw new Error(`Expected 21 themes, got ${themes.length}`);
  }

  // Test 3: Set theme
  service.setTheme('dark');
  const currentTheme = service.getCurrentTheme();
  console.log(`✓ Set theme to: ${currentTheme.name}`);

  if (currentTheme.name !== 'dark') {
    throw new Error(`Expected theme 'dark', got '${currentTheme.name}'`);
  }

  // Test 4: Get palette
  const palette = service.getCurrentPalette();
  console.log(`✓ Got palette with ${Object.keys(palette).length} colors`);

  // Test 5: Generate CSS variables
  const cssVars = service.generateCSSVariablesObject();
  console.log(`✓ Generated ${Object.keys(cssVars).length} CSS variables`);

  // Test 6: Dark mode
  service.setDarkMode(true);
  console.log(`✓ Dark mode: ${service.isDark()}`);

  // Test 7: All theme names
  const themeNames = service.getThemeNames();
  console.log(`✓ Theme names: ${themeNames.join(', ')}`);

  console.log('\n✓ All tests passed!');
  process.exit(0);
} catch (error) {
  console.error('\n✗ Test failed:', error.message);
  process.exit(1);
}

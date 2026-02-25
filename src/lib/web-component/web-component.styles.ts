/**
 * Jalali Date Picker Web Component Styles
 * 
 * CSS styles exported as a string for Shadow DOM injection
 * شامل CSS Variables برای تم‌ها، responsive design، RTL/LTR، و dark/light mode
 */

/**
 * Get CSS styles for the Web Component
 * دریافت CSS styles برای Web Component
 * 
 * @returns CSS styles as a string
 */
export function getWebComponentStyles(): string {
  return `
    :host {
      /* ============ Color Variables ============ */
      /* Primary Colors */
      --primary-color: #007bff;
      --primary-50: #f0f7ff;
      --primary-100: #e0effe;
      --primary-200: #c7e0fd;
      --primary-300: #a4c9fc;
      --primary-400: #7aaffa;
      --primary-500: #4a90f9;
      --primary-600: #0066ff;
      --primary-700: #0052cc;
      --primary-800: #003d99;
      --primary-900: #002966;
      
      /* Secondary Colors */
      --secondary-color: #6c757d;
      --secondary-50: #f8f9fa;
      --secondary-100: #e9ecef;
      --secondary-200: #dee2e6;
      --secondary-300: #ced4da;
      --secondary-400: #adb5bd;
      --secondary-500: #6c757d;
      --secondary-600: #495057;
      --secondary-700: #343a40;
      --secondary-800: #212529;
      --secondary-900: #0d0d0d;
      
      /* Accent Colors */
      --accent-color: #28a745;
      --accent-50: #f0fdf4;
      --accent-100: #dcfce7;
      --accent-200: #bbf7d0;
      --accent-300: #86efac;
      --accent-400: #4ade80;
      --accent-500: #22c55e;
      --accent-600: #16a34a;
      --accent-700: #15803d;
      --accent-800: #166534;
      --accent-900: #145231;
      
      /* Semantic Colors */
      --success-color: #28a745;
      --warning-color: #ffc107;
      --error-color: #dc3545;
      --info-color: #17a2b8;
      
      /* Background Colors */
      --background: #ffffff;
      --background-secondary: #f8f9fa;
      --background-tertiary: #e9ecef;
      
      /* Text Colors */
      --text-color: #000000;
      --text-secondary: #6c757d;
      --text-muted: #999999;
      --text-disabled: #cccccc;
      
      /* Border Colors */
      --border-color: #dee2e6;
      --border-color-light: #e9ecef;
      --border-color-dark: #adb5bd;
      
      /* Interactive Colors */
      --hover-bg: #f8f9fa;
      --hover-border: #007bff;
      --selected-bg: #007bff;
      --selected-text: #ffffff;
      --disabled-bg: #e9ecef;
      --disabled-text: #6c757d;
      --focus-ring: #007bff;
      
      /* ============ Size Variables ============ */
      /* Border Radius */
      --border-radius: 8px;
      --border-radius-sm: 4px;
      --border-radius-md: 6px;
      --border-radius-lg: 12px;
      --border-radius-xl: 16px;
      --border-radius-full: 9999px;
      
      /* Padding */
      --padding-xs: 4px;
      --padding-sm: 8px;
      --padding-md: 12px;
      --padding-base: 16px;
      --padding-lg: 20px;
      --padding-xl: 24px;
      --padding-2xl: 32px;
      
      /* Margin */
      --margin-xs: 4px;
      --margin-sm: 8px;
      --margin-md: 12px;
      --margin-base: 16px;
      --margin-lg: 20px;
      --margin-xl: 24px;
      --margin-2xl: 32px;
      
      /* Gap */
      --gap-xs: 4px;
      --gap-sm: 8px;
      --gap-md: 12px;
      --gap-base: 16px;
      --gap-lg: 20px;
      --gap-xl: 24px;
      
      /* Component Sizes */
      --component-height-sm: 28px;
      --component-height-md: 36px;
      --component-height-lg: 44px;
      --component-height-xl: 52px;
      
      /* Calendar Specific */
      --calendar-cell-size: 40px;
      --calendar-cell-gap: 8px;
      --calendar-padding: 16px;
      --calendar-header-height: 48px;
      
      /* Border Width */
      --border-width: 1px;
      --border-width-2: 2px;
      --border-width-4: 4px;
      
      /* ============ Font Variables ============ */
      /* Font Family */
      --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      --font-family-mono: 'Courier New', Courier, monospace;
      --font-family-serif: Georgia, 'Times New Roman', serif;
      
      /* Font Size */
      --font-size-xs: 11px;
      --font-size-sm: 12px;
      --font-size-base: 14px;
      --font-size-md: 15px;
      --font-size-lg: 18px;
      --font-size-xl: 20px;
      --font-size-2xl: 24px;
      --font-size-3xl: 30px;
      
      /* Font Weight */
      --font-weight-light: 300;
      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;
      --font-weight-extrabold: 800;
      
      /* Line Height */
      --line-height-tight: 1.2;
      --line-height-normal: 1.5;
      --line-height-relaxed: 1.75;
      --line-height-loose: 2;
      
      /* Letter Spacing */
      --letter-spacing-tight: -0.5px;
      --letter-spacing-normal: 0px;
      --letter-spacing-wide: 0.5px;
      --letter-spacing-wider: 1px;
      
      /* ============ Animation Variables ============ */
      /* Transition Duration */
      --transition-duration-fast: 0.1s;
      --transition-duration-base: 0.2s;
      --transition-duration-slow: 0.3s;
      --transition-duration-slower: 0.5s;
      
      /* Transition Timing */
      --transition-timing: ease;
      --transition-timing-linear: linear;
      --transition-timing-ease-in: ease-in;
      --transition-timing-ease-out: ease-out;
      --transition-timing-ease-in-out: ease-in-out;
      
      /* ============ Shadow Variables ============ */
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
      --shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.2);
      --shadow-2xl: 0 16px 32px rgba(0, 0, 0, 0.25);
      
      /* ============ Z-Index Variables ============ */
      --z-index-dropdown: 1000;
      --z-index-sticky: 1020;
      --z-index-fixed: 1030;
      --z-index-modal-backdrop: 1040;
      --z-index-modal: 1050;
      --z-index-popover: 1060;
      --z-index-tooltip: 1070;
      
      /* Display */
      display: inline-block;
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-normal);
      color: var(--text-color);
      background: var(--background);
      box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    /* ============ Main Container ============ */
    .jalali-date-picker-container {
      padding: var(--padding-base);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      background: var(--background);
      display: flex;
      flex-direction: column;
      gap: var(--gap-base);
      /* Performance optimization: CSS containment */
      contain: content;
    }

    /* ============ Calendar Header ============ */
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: var(--padding-md);
      border-bottom: var(--border-width) solid var(--border-color);
      gap: var(--gap-base);
      height: var(--calendar-header-height);
    }

    .calendar-header h2 {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-tight);
      color: var(--text-color);
      flex: 1;
      text-align: center;
    }

    .calendar-header-nav {
      display: flex;
      gap: var(--gap-sm);
    }

    .calendar-header-btn {
      width: var(--component-height-md);
      height: var(--component-height-md);
      padding: 0;
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-sm);
      background: var(--background);
      color: var(--text-color);
      cursor: pointer;
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-duration-base) var(--transition-timing);
    }

    .calendar-header-btn:hover:not(:disabled) {
      background: var(--hover-bg);
      border-color: var(--primary-color);
      color: var(--primary-color);
      box-shadow: var(--shadow-sm);
    }

    .calendar-header-btn:active:not(:disabled) {
      transform: scale(0.95);
    }

    .calendar-header-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .calendar-header-btn:focus {
      outline: var(--border-width-2) solid var(--focus-ring);
      outline-offset: 2px;
    }

    /* ============ Calendar Body ============ */
    .calendar-body {
      display: flex;
      flex-direction: column;
      gap: var(--gap-base);
    }

    /* ============ Weekdays ============ */
    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: var(--calendar-cell-gap);
      margin-bottom: var(--gap-sm);
    }

    .weekday {
      text-align: center;
      font-weight: var(--font-weight-semibold);
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      padding: var(--padding-sm) 0;
      text-transform: uppercase;
      letter-spacing: var(--letter-spacing-wide);
      line-height: var(--line-height-tight);
    }

    /* ============ Dates Grid ============ */
    .dates {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: var(--calendar-cell-gap);
    }

    .date-cell {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: var(--border-width) solid transparent;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-normal);
      transition: all var(--transition-duration-base) var(--transition-timing);
      background: var(--background);
      color: var(--text-color);
      user-select: none;
      min-height: var(--calendar-cell-size);
    }

    .date-cell:hover:not(.disabled):not(.other-month) {
      background: var(--hover-bg);
      border-color: var(--primary-color);
      transform: scale(1.05);
      box-shadow: var(--shadow-sm);
    }

    .date-cell:active:not(.disabled):not(.other-month) {
      transform: scale(0.98);
    }

    .date-cell:focus {
      outline: var(--border-width-2) solid var(--focus-ring);
      outline-offset: -2px;
    }

    .date-cell.selected {
      background: var(--selected-bg);
      color: var(--selected-text);
      border-color: var(--selected-bg);
      font-weight: var(--font-weight-semibold);
      box-shadow: var(--shadow-md);
    }

    .date-cell.today {
      border-color: var(--primary-color);
      border-width: var(--border-width-2);
      font-weight: var(--font-weight-semibold);
    }

    .date-cell.in-range {
      background: rgba(0, 123, 255, 0.1);
      border-color: var(--primary-color);
    }

    .date-cell.range-start,
    .date-cell.range-end {
      background: var(--selected-bg);
      color: var(--selected-text);
      border-color: var(--selected-bg);
      font-weight: var(--font-weight-semibold);
    }

    .date-cell.other-month {
      opacity: 0.3;
      cursor: default;
      color: var(--text-muted);
    }

    .date-cell.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--disabled-bg);
      color: var(--disabled-text);
    }

    .date-cell.holiday {
      color: var(--error-color);
      font-weight: var(--font-weight-semibold);
    }

    /* ============ Calendar Footer ============ */
    .calendar-footer {
      display: flex;
      gap: var(--gap-base);
      padding-top: var(--padding-md);
      border-top: var(--border-width) solid var(--border-color);
      flex-wrap: wrap;
    }

    .footer-section {
      display: flex;
      gap: var(--gap-sm);
      align-items: center;
    }

    .footer-section.flex-1 {
      flex: 1;
    }

    /* ============ Theme Selector ============ */
    .theme-selector {
      display: flex;
      gap: var(--gap-sm);
      align-items: center;
    }

    .theme-selector-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      font-weight: var(--font-weight-semibold);
    }

    .theme-selector-button {
      width: 24px;
      height: 24px;
      border-radius: var(--border-radius-full);
      border: var(--border-width-2) solid transparent;
      cursor: pointer;
      transition: all var(--transition-duration-base) var(--transition-timing);
    }

    .theme-selector-button:hover {
      transform: scale(1.1);
      border-color: var(--text-color);
      box-shadow: var(--shadow-sm);
    }

    .theme-selector-button:focus {
      outline: var(--border-width-2) solid var(--focus-ring);
      outline-offset: 2px;
    }

    .theme-selector-button.active {
      border-color: var(--text-color);
      box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--text-color);
    }

    /* ============ Color Picker ============ */
    .color-picker {
      display: flex;
      gap: var(--gap-sm);
      align-items: center;
    }

    .color-picker-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      font-weight: var(--font-weight-semibold);
    }

    .color-picker-input {
      width: var(--component-height-md);
      height: var(--component-height-md);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      padding: 2px;
      transition: all var(--transition-duration-base) var(--transition-timing);
    }

    .color-picker-input:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-sm);
    }

    .color-picker-input:focus {
      outline: var(--border-width-2) solid var(--focus-ring);
      outline-offset: 2px;
    }

    /* ============ Calendar Switch ============ */
    .calendar-switch {
      display: flex;
      gap: var(--gap-sm);
      align-items: center;
    }

    .calendar-switch-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      font-weight: var(--font-weight-semibold);
    }

    .calendar-switch-button {
      padding: var(--padding-xs) var(--padding-sm);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-sm);
      background: var(--background);
      color: var(--text-color);
      cursor: pointer;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      transition: all var(--transition-duration-base) var(--transition-timing);
    }

    .calendar-switch-button:hover {
      background: var(--hover-bg);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .calendar-switch-button:focus {
      outline: var(--border-width-2) solid var(--focus-ring);
      outline-offset: 2px;
    }

    .calendar-switch-button.active {
      background: var(--primary-color);
      color: var(--selected-text);
      border-color: var(--primary-color);
      font-weight: var(--font-weight-semibold);
    }

    /* ============ Responsive Design ============ */
    /* Mobile: < 600px */
    @media (max-width: 599px) {
      :host {
        /* Reduced padding and margins for mobile */
        --padding-xs: 2px;
        --padding-sm: 4px;
        --padding-md: 8px;
        --padding-base: 10px;
        --padding-lg: 12px;
        --padding-xl: 16px;
        --padding-2xl: 20px;
        
        --margin-xs: 2px;
        --margin-sm: 4px;
        --margin-md: 8px;
        --margin-base: 10px;
        --margin-lg: 12px;
        --margin-xl: 16px;
        --margin-2xl: 20px;
        
        --gap-xs: 2px;
        --gap-sm: 4px;
        --gap-md: 8px;
        --gap-base: 10px;
        --gap-lg: 12px;
        --gap-xl: 16px;
        
        /* Reduced font sizes for mobile */
        --font-size-xs: 10px;
        --font-size-sm: 11px;
        --font-size-base: 12px;
        --font-size-md: 13px;
        --font-size-lg: 14px;
        --font-size-xl: 16px;
        --font-size-2xl: 18px;
        --font-size-3xl: 22px;
        
        /* Optimized for touch interaction */
        --component-height-sm: 24px;
        --component-height-md: 28px;
        --component-height-lg: 36px;
        --component-height-xl: 44px;
        
        /* Smaller calendar cells for mobile */
        --calendar-cell-size: 32px;
        --calendar-cell-gap: 4px;
        --calendar-padding: 8px;
        --calendar-header-height: 40px;
        
        /* Reduced border radius for mobile */
        --border-radius: 6px;
        --border-radius-sm: 3px;
        --border-radius-md: 4px;
        --border-radius-lg: 8px;
        --border-radius-xl: 12px;
      }

      .jalali-date-picker-container {
        padding: var(--padding-base);
        gap: var(--gap-base);
        border-radius: var(--border-radius);
      }

      .calendar-header {
        height: auto;
        padding-bottom: var(--padding-md);
        gap: var(--gap-sm);
      }

      .calendar-header h2 {
        font-size: var(--font-size-lg);
        margin: 0;
      }

      .calendar-header-nav {
        gap: var(--gap-xs);
      }

      .calendar-header-btn {
        width: var(--component-height-md);
        height: var(--component-height-md);
        font-size: var(--font-size-sm);
      }

      .weekdays {
        gap: var(--calendar-cell-gap);
        margin-bottom: var(--gap-xs);
      }

      .weekday {
        font-size: var(--font-size-xs);
        padding: var(--padding-xs) 0;
      }

      .dates {
        gap: var(--calendar-cell-gap);
      }

      .date-cell {
        font-size: var(--font-size-sm);
        min-height: var(--calendar-cell-size);
        border-radius: var(--border-radius-sm);
      }

      .date-cell:hover:not(.disabled):not(.other-month) {
        transform: scale(1.02);
      }

      .calendar-footer {
        flex-direction: column;
        gap: var(--gap-base);
        padding-top: var(--padding-md);
      }

      .footer-section {
        width: 100%;
        gap: var(--gap-xs);
      }

      .footer-section.flex-1 {
        flex: 1;
      }

      .theme-selector-label,
      .color-picker-label,
      .calendar-switch-label {
        font-size: var(--font-size-xs);
      }

      .theme-selector-button {
        width: 20px;
        height: 20px;
      }

      .color-picker-input {
        width: var(--component-height-md);
        height: var(--component-height-md);
      }

      .calendar-switch-button {
        padding: var(--padding-xs) var(--padding-sm);
        font-size: var(--font-size-xs);
      }
    }

    /* Tablet: 600px - 1024px */
    @media (min-width: 600px) and (max-width: 1024px) {
      :host {
        /* Medium padding and margins for tablet */
        --padding-xs: 3px;
        --padding-sm: 6px;
        --padding-md: 10px;
        --padding-base: 12px;
        --padding-lg: 16px;
        --padding-xl: 20px;
        --padding-2xl: 24px;
        
        --margin-xs: 3px;
        --margin-sm: 6px;
        --margin-md: 10px;
        --margin-base: 12px;
        --margin-lg: 16px;
        --margin-xl: 20px;
        --margin-2xl: 24px;
        
        --gap-xs: 3px;
        --gap-sm: 6px;
        --gap-md: 10px;
        --gap-base: 12px;
        --gap-lg: 16px;
        --gap-xl: 20px;
        
        /* Medium font sizes for tablet */
        --font-size-xs: 10px;
        --font-size-sm: 12px;
        --font-size-base: 13px;
        --font-size-md: 14px;
        --font-size-lg: 16px;
        --font-size-xl: 18px;
        --font-size-2xl: 22px;
        --font-size-3xl: 26px;
        
        /* Medium component heights for tablet */
        --component-height-sm: 26px;
        --component-height-md: 32px;
        --component-height-lg: 40px;
        --component-height-xl: 48px;
        
        /* Medium calendar cells for tablet */
        --calendar-cell-size: 36px;
        --calendar-cell-gap: 6px;
        --calendar-padding: 12px;
        --calendar-header-height: 44px;
        
        /* Medium border radius for tablet */
        --border-radius: 7px;
        --border-radius-sm: 4px;
        --border-radius-md: 5px;
        --border-radius-lg: 10px;
        --border-radius-xl: 14px;
      }

      .jalali-date-picker-container {
        padding: var(--padding-base);
        gap: var(--gap-base);
        border-radius: var(--border-radius);
      }

      .calendar-header {
        height: auto;
        padding-bottom: var(--padding-md);
        gap: var(--gap-base);
      }

      .calendar-header h2 {
        font-size: var(--font-size-lg);
      }

      .calendar-header-nav {
        gap: var(--gap-sm);
      }

      .calendar-header-btn {
        width: var(--component-height-md);
        height: var(--component-height-md);
        font-size: var(--font-size-base);
      }

      .weekdays {
        gap: var(--calendar-cell-gap);
        margin-bottom: var(--gap-sm);
      }

      .weekday {
        font-size: var(--font-size-sm);
        padding: var(--padding-sm) 0;
      }

      .dates {
        gap: var(--calendar-cell-gap);
      }

      .date-cell {
        font-size: var(--font-size-base);
        min-height: var(--calendar-cell-size);
        border-radius: var(--border-radius-sm);
      }

      .date-cell:hover:not(.disabled):not(.other-month) {
        transform: scale(1.03);
      }

      .calendar-footer {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--gap-base);
        padding-top: var(--padding-md);
      }

      .footer-section {
        gap: var(--gap-sm);
      }

      .theme-selector-label,
      .color-picker-label,
      .calendar-switch-label {
        font-size: var(--font-size-sm);
      }

      .theme-selector-button {
        width: 22px;
        height: 22px;
      }

      .color-picker-input {
        width: var(--component-height-md);
        height: var(--component-height-md);
      }

      .calendar-switch-button {
        padding: var(--padding-sm) var(--padding-md);
        font-size: var(--font-size-sm);
      }
    }

    /* Desktop: > 1024px */
    @media (min-width: 1025px) {
      :host {
        /* Full padding and margins for desktop */
        --padding-xs: 4px;
        --padding-sm: 8px;
        --padding-md: 12px;
        --padding-base: 16px;
        --padding-lg: 20px;
        --padding-xl: 24px;
        --padding-2xl: 32px;
        
        --margin-xs: 4px;
        --margin-sm: 8px;
        --margin-md: 12px;
        --margin-base: 16px;
        --margin-lg: 20px;
        --margin-xl: 24px;
        --margin-2xl: 32px;
        
        --gap-xs: 4px;
        --gap-sm: 8px;
        --gap-md: 12px;
        --gap-base: 16px;
        --gap-lg: 20px;
        --gap-xl: 24px;
        
        /* Standard font sizes for desktop */
        --font-size-xs: 11px;
        --font-size-sm: 12px;
        --font-size-base: 14px;
        --font-size-md: 15px;
        --font-size-lg: 18px;
        --font-size-xl: 20px;
        --font-size-2xl: 24px;
        --font-size-3xl: 30px;
        
        /* Standard component heights for desktop */
        --component-height-sm: 28px;
        --component-height-md: 36px;
        --component-height-lg: 44px;
        --component-height-xl: 52px;
        
        /* Larger calendar cells for desktop */
        --calendar-cell-size: 40px;
        --calendar-cell-gap: 8px;
        --calendar-padding: 16px;
        --calendar-header-height: 48px;
        
        /* Standard border radius for desktop */
        --border-radius: 8px;
        --border-radius-sm: 4px;
        --border-radius-md: 6px;
        --border-radius-lg: 12px;
        --border-radius-xl: 16px;
      }

      .jalali-date-picker-container {
        padding: var(--padding-base);
        gap: var(--gap-base);
        border-radius: var(--border-radius);
      }

      .calendar-header {
        height: var(--calendar-header-height);
        padding-bottom: var(--padding-md);
        gap: var(--gap-base);
      }

      .calendar-header h2 {
        font-size: var(--font-size-lg);
      }

      .calendar-header-nav {
        gap: var(--gap-base);
      }

      .calendar-header-btn {
        width: var(--component-height-md);
        height: var(--component-height-md);
        font-size: var(--font-size-base);
      }

      .weekdays {
        gap: var(--calendar-cell-gap);
        margin-bottom: var(--gap-base);
      }

      .weekday {
        font-size: var(--font-size-sm);
        padding: var(--padding-md) 0;
      }

      .dates {
        gap: var(--calendar-cell-gap);
      }

      .date-cell {
        font-size: var(--font-size-base);
        min-height: var(--calendar-cell-size);
        border-radius: var(--border-radius-sm);
      }

      .date-cell:hover:not(.disabled):not(.other-month) {
        transform: scale(1.05);
      }

      .calendar-footer {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--gap-base);
        padding-top: var(--padding-md);
      }

      .footer-section {
        gap: var(--gap-base);
      }

      .theme-selector-label,
      .color-picker-label,
      .calendar-switch-label {
        font-size: var(--font-size-sm);
      }

      .theme-selector-button {
        width: 24px;
        height: 24px;
      }

      .color-picker-input {
        width: var(--component-height-md);
        height: var(--component-height-md);
      }

      .calendar-switch-button {
        padding: var(--padding-sm) var(--padding-md);
        font-size: var(--font-size-sm);
      }
    }

    /* ============ RTL/LTR Support ============ */
    :host([dir="rtl"]) {
      direction: rtl;
    }

    :host([dir="rtl"]) .jalali-date-picker-container {
      direction: rtl;
    }

    :host([dir="rtl"]) .calendar-header {
      direction: rtl;
      flex-direction: row-reverse;
    }

    :host([dir="rtl"]) .calendar-header h2 {
      text-align: center;
      direction: rtl;
    }

    :host([dir="rtl"]) .calendar-header-nav {
      flex-direction: row-reverse;
    }

    :host([dir="rtl"]) .calendar-header-btn {
      direction: rtl;
    }

    :host([dir="rtl"]) .calendar-body {
      direction: rtl;
    }

    :host([dir="rtl"]) .weekdays {
      direction: rtl;
    }

    :host([dir="rtl"]) .weekday {
      text-align: center;
      direction: rtl;
    }

    :host([dir="rtl"]) .dates {
      direction: rtl;
    }

    :host([dir="rtl"]) .date-cell {
      direction: rtl;
      text-align: center;
    }

    :host([dir="rtl"]) .calendar-footer {
      direction: rtl;
      flex-direction: row-reverse;
    }

    :host([dir="rtl"]) .footer-section {
      flex-direction: row-reverse;
    }

    :host([dir="rtl"]) .theme-selector {
      flex-direction: row-reverse;
    }

    :host([dir="rtl"]) .color-picker {
      flex-direction: row-reverse;
    }

    :host([dir="rtl"]) .calendar-switch {
      flex-direction: row-reverse;
    }

    /* LTR Styles */
    :host([dir="ltr"]) {
      direction: ltr;
    }

    :host([dir="ltr"]) .jalali-date-picker-container {
      direction: ltr;
    }

    :host([dir="ltr"]) .calendar-header {
      direction: ltr;
      flex-direction: row;
    }

    :host([dir="ltr"]) .calendar-header h2 {
      text-align: center;
      direction: ltr;
    }

    :host([dir="ltr"]) .calendar-header-nav {
      flex-direction: row;
    }

    :host([dir="ltr"]) .calendar-header-btn {
      direction: ltr;
    }

    :host([dir="ltr"]) .calendar-body {
      direction: ltr;
    }

    :host([dir="ltr"]) .weekdays {
      direction: ltr;
    }

    :host([dir="ltr"]) .weekday {
      text-align: center;
      direction: ltr;
    }

    :host([dir="ltr"]) .dates {
      direction: ltr;
    }

    :host([dir="ltr"]) .date-cell {
      direction: ltr;
      text-align: center;
    }

    :host([dir="ltr"]) .calendar-footer {
      direction: ltr;
      flex-direction: row;
    }

    :host([dir="ltr"]) .footer-section {
      flex-direction: row;
    }

    :host([dir="ltr"]) .theme-selector {
      flex-direction: row;
    }

    :host([dir="ltr"]) .color-picker {
      flex-direction: row;
    }

    :host([dir="ltr"]) .calendar-switch {
      flex-direction: row;
    }

    /* ============ Dark Mode Support ============ */
    @media (prefers-color-scheme: dark) {
      :host {
        --background: #1e1e1e;
        --background-secondary: #2d2d2d;
        --background-tertiary: #3d3d3d;
        --text-color: #ffffff;
        --text-secondary: #b0b0b0;
        --text-muted: #808080;
        --text-disabled: #606060;
        --border-color: #333333;
        --border-color-light: #2d2d2d;
        --border-color-dark: #4d4d4d;
        --hover-bg: #2d2d2d;
        --disabled-bg: #2d2d2d;
        --disabled-text: #999999;
        --focus-ring: #4a90f9;
      }
    }

    /* ============ Light Mode Support ============ */
    @media (prefers-color-scheme: light) {
      :host {
        --background: #ffffff;
        --background-secondary: #f8f9fa;
        --background-tertiary: #e9ecef;
        --text-color: #000000;
        --text-secondary: #6c757d;
        --text-muted: #999999;
        --text-disabled: #cccccc;
        --border-color: #dee2e6;
        --border-color-light: #e9ecef;
        --border-color-dark: #adb5bd;
        --hover-bg: #f8f9fa;
        --disabled-bg: #e9ecef;
        --disabled-text: #6c757d;
        --focus-ring: #007bff;
      }
    }

    /* ============ Animations & Transitions ============ */
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    .jalali-date-picker-container {
      animation: slideIn var(--transition-duration-base) var(--transition-timing);
    }

    .date-cell {
      animation: fadeIn var(--transition-duration-base) var(--transition-timing);
    }

    /* ============ Focus & Accessibility ============ */
    .calendar-header-btn:focus,
    .calendar-switch-button:focus,
    .date-cell:focus {
      outline: var(--border-width-2) solid var(--focus-ring);
      outline-offset: 2px;
    }

    .date-cell:focus {
      outline-offset: -2px;
    }

    /* ============ Print Styles ============ */
    @media print {
      .calendar-header-nav,
      .calendar-footer {
        display: none;
      }

      .jalali-date-picker-container {
        box-shadow: none;
        border: var(--border-width) solid #000;
      }
    }

    /* ============ High Contrast Mode ============ */
    @media (prefers-contrast: more) {
      :host {
        --border-width: 2px;
        --focus-ring: #000000;
      }

      .date-cell.selected {
        box-shadow: var(--shadow-lg);
      }
    }

    /* ============ Reduced Motion ============ */
    @media (prefers-reduced-motion: reduce) {
      :host {
        --transition-duration-fast: 0s;
        --transition-duration-base: 0s;
        --transition-duration-slow: 0s;
        --transition-duration-slower: 0s;
      }

      .jalali-date-picker-container,
      .date-cell {
        animation: none;
      }

      .date-cell:hover:not(.disabled):not(.other-month) {
        transform: none;
      }
    }
  `;
}

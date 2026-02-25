import { JalaliDateService } from '../core/services/jalali-date.service';
import { ThemeService } from '../core/services/theme.service';
import { LocaleService } from '../core/services/locale.service';
import { HolidaysService } from '../core/services/holidays.service';
import { getWebComponentStyles } from './web-component.styles';
import { getWebComponentTemplate } from './web-component.template';

/**
 * Jalali Date Picker Web Component
 * 
 * یک Web Component استاندارد برای انتخاب تاریخ جلالی
 * پشتیبانی از سه سیستم تقویم: جلالی، میلادی، قمری
 */
export class JalaliDatePickerElement extends HTMLElement {
  // Private fields
  private dateService!: JalaliDateService;
  private themeService!: ThemeService;
  private localeService!: LocaleService;
  private holidaysService!: HolidaysService;

  // State
  private _selectedDate: Date | null = null;
  private _selectedRange: { start: Date | null; end: Date | null } = {
    start: null,
    end: null,
  };
  private _selectedDates: Date[] = [];
  private _calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali';
  private _locale: 'fa' | 'en' = 'fa';
  private _theme: string = 'light';
  private _selectionMode: 'single' | 'range' | 'multiple' = 'single';
  private _disabled: boolean = false;
  private _showThemeSelector: boolean = false;
  private _showColorPicker: boolean = false;
  private _showCalendarSwitch: boolean = false;

  // Performance optimization fields
  private renderScheduled: boolean = false;
  private renderTimeout: number | null = null;
  private eventListeners: Array<{ target: EventTarget; event: string; handler: EventListener }> = [];
  private memoizedTheme: Map<string, any> = new Map();
  private memoizedLocaleData: Map<string, any> = new Map();
  private performanceMetrics: {
    lcpMark?: PerformanceMark;
    fidMark?: PerformanceMark;
    clsMark?: PerformanceMark;
  } = {};
  private observer: PerformanceObserver | null = null;

  constructor() {
    super();
    this.dateService = new JalaliDateService(this._locale);
    this.themeService = new ThemeService();
    this.localeService = new LocaleService();
    this.holidaysService = new HolidaysService(this.dateService);
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes(): string[] {
    return [
      'selected-date',
      'calendar-type',
      'locale',
      'theme',
      'selection-mode',
      'disabled',
      'show-theme-selector',
      'show-color-picker',
      'show-calendar-switch',
    ];
  }

  connectedCallback(): void {
    // 8.4 Performance Monitoring: Initialize monitoring
    this.initializePerformanceMonitoring();
    
    this.readAttributes();
    this.initializeShadowDOM();
    this.setupEventListeners();
    this.render();
  }

  disconnectedCallback(): void {
    // 8.3 Memory Management: Cleanup all resources
    this.removeEventListeners();
    
    // Cancel any pending renders
    if (this.renderTimeout !== null) {
      clearTimeout(this.renderTimeout);
      this.renderTimeout = null;
    }
    
    // Stop performance monitoring
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    // Clear memoization caches
    this.memoizedTheme.clear();
    this.memoizedLocaleData.clear();
    
    // Clear performance metrics
    this.performanceMetrics = {};
    
    // Nullify service references
    this.dateService = null as any;
    this.themeService = null as any;
    this.localeService = null as any;
    this.holidaysService = null as any;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if (oldValue === newValue) return;

    switch (name) {
      case 'selected-date':
        if (newValue) {
          this._selectedDate = new Date(newValue);
        } else {
          this._selectedDate = null;
        }
        break;

      case 'calendar-type':
        if (newValue === 'jalali' || newValue === 'gregorian' || newValue === 'hijri') {
          this._calendarType = newValue;
        }
        break;

      case 'locale':
        if (newValue === 'fa' || newValue === 'en') {
          this._locale = newValue;
          this.dateService.setLocale(newValue);
          this.localeService.setLocale(newValue);
          this.emitLocaleChangeEvent(newValue);
        }
        break;

      case 'theme':
        if (newValue) {
          this._theme = newValue;
          this.emitThemeChangeEvent(newValue);
        }
        break;

      case 'selection-mode':
        if (newValue === 'single' || newValue === 'range' || newValue === 'multiple') {
          this._selectionMode = newValue;
        }
        break;

      case 'disabled':
        this._disabled = newValue !== null;
        break;

      case 'show-theme-selector':
        this._showThemeSelector = newValue !== null;
        break;

      case 'show-color-picker':
        this._showColorPicker = newValue !== null;
        break;

      case 'show-calendar-switch':
        this._showCalendarSwitch = newValue !== null;
        break;
    }

    if (this.shadowRoot) {
      this.render();
    }
  }

  private readAttributes(): void {
    const attrs = this.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i];
      this.attributeChangedCallback(attr.name, null, attr.value);
    }
  }

  private initializeShadowDOM(): void {
    if (!this.shadowRoot) return;

    // Set direction based on locale
    const direction = this.localeService.getDirection(this._locale);
    this.setAttribute('dir', direction);

    const styleElement = document.createElement('style');
    styleElement.textContent = getWebComponentStyles();
    this.shadowRoot.appendChild(styleElement);

    const template = document.createElement('template');
    template.innerHTML = getWebComponentTemplate();
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const host = this.shadowRoot.host as HTMLElement;
    host.style.contain = 'layout style paint';
  }

  private setupEventListeners(): void {
    if (!this.shadowRoot) return;

    // 8.2 Runtime Performance: Event delegation for click handlers
    const clickHandler = (e: Event) => this.handleClick(e);
    const keydownHandler = (e: Event) => this.handleKeydown(e as KeyboardEvent);
    const touchStartHandler = (e: Event) => this.handleTouchStart(e as TouchEvent);
    const touchEndHandler = (e: Event) => this.handleTouchEnd(e as TouchEvent);

    this.shadowRoot.addEventListener('click', clickHandler);
    this.shadowRoot.addEventListener('keydown', keydownHandler);
    this.shadowRoot.addEventListener('touchstart', touchStartHandler);
    this.shadowRoot.addEventListener('touchend', touchEndHandler);

    // Track listeners for cleanup
    this.eventListeners.push(
      { target: this.shadowRoot, event: 'click', handler: clickHandler },
      { target: this.shadowRoot, event: 'keydown', handler: keydownHandler },
      { target: this.shadowRoot, event: 'touchstart', handler: touchStartHandler },
      { target: this.shadowRoot, event: 'touchend', handler: touchEndHandler }
    );

    const container = this.shadowRoot.querySelector('.jalali-date-picker-container');
    if (container) {
      const focusHandler = (e: Event) => this.handleFocus(e as FocusEvent);
      const blurHandler = (e: Event) => this.handleBlur(e as FocusEvent);

      container.addEventListener('focus', focusHandler, true);
      container.addEventListener('blur', blurHandler, true);

      this.eventListeners.push(
        { target: container, event: 'focus', handler: focusHandler },
        { target: container, event: 'blur', handler: blurHandler }
      );
    }
  }

  private removeEventListeners(): void {
    // 8.3 Memory Management: Remove all event listeners
    for (const { target, event, handler } of this.eventListeners) {
      target.removeEventListener(event, handler);
    }
    this.eventListeners = [];
  }

  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('date-cell')) {
      const dateStr = target.getAttribute('data-date');
      if (dateStr) {
        const date = new Date(dateStr);
        this.selectDate(date);
      }
    }

    if (target.classList.contains('prev-month')) {
      this.handlePrevMonth();
    }

    if (target.classList.contains('next-month')) {
      this.handleNextMonth();
    }

    if (target.classList.contains('theme-selector-button')) {
      const themeName = target.getAttribute('data-theme');
      if (themeName) {
        this.theme = themeName;
      }
    }

    if (target.classList.contains('calendar-switch-button')) {
      const calendarType = target.getAttribute('data-type') as 'jalali' | 'gregorian' | 'hijri';
      if (calendarType) {
        this.calendarType = calendarType;
      }
    }
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (this._disabled) return;

    const target = event.target as HTMLElement;
    const isDateCell = target.classList.contains('date-cell');

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        if (isDateCell) {
          event.preventDefault();
          this.navigateDateWithArrowKeys(event.key);
        }
        break;

      case 'Enter':
      case ' ':
        if (isDateCell) {
          event.preventDefault();
          const dateStr = target.getAttribute('data-date');
          if (dateStr) {
            const date = new Date(dateStr);
            this.selectDate(date);
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.close();
        break;

      case 'Tab':
        this.handleTabNavigation(event);
        break;
    }
  }

  private navigateDateWithArrowKeys(key: string): void {
    if (!this.shadowRoot) return;

    const focusedElement = this.shadowRoot.activeElement as HTMLElement;
    if (!focusedElement || !focusedElement.classList.contains('date-cell')) return;

    const dateStr = focusedElement.getAttribute('data-date');
    if (!dateStr) return;

    const currentDate = new Date(dateStr);
    let newDate = new Date(currentDate);

    switch (key) {
      case 'ArrowUp':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'ArrowDown':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'ArrowLeft':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'ArrowRight':
        newDate.setDate(newDate.getDate() + 1);
        break;
    }

    const newDateStr = newDate.toISOString().split('T')[0];
    const newCell = this.shadowRoot.querySelector(`[data-date="${newDateStr}"]`) as HTMLElement;

    if (newCell) {
      newCell.focus();
    }
  }

  private handleTabNavigation(event: KeyboardEvent): void {
    if (!this.shadowRoot) return;

    const focusableElements = Array.from(
      this.shadowRoot.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    if (focusableElements.length === 0) return;

    const currentIndex = focusableElements.indexOf(this.shadowRoot.activeElement as HTMLElement);

    if (event.shiftKey) {
      const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
      focusableElements[prevIndex].focus();
    } else {
      const nextIndex = currentIndex >= focusableElements.length - 1 ? 0 : currentIndex + 1;
      focusableElements[nextIndex].focus();
    }

    event.preventDefault();
  }

  private handleTouchStart(event: TouchEvent): void {
    if (this._disabled) return;

    if (!this.shadowRoot) return;

    const container = this.shadowRoot.querySelector('.jalali-date-picker-container') as any;
    if (container && event.touches.length > 0) {
      container.touchStartX = event.touches[0].clientX;
      container.touchStartY = event.touches[0].clientY;
    }
  }

  private handleTouchEnd(event: TouchEvent): void {
    if (this._disabled || !this.shadowRoot) return;

    const container = this.shadowRoot.querySelector('.jalali-date-picker-container') as any;
    if (!container || event.changedTouches.length === 0) return;

    const touchStartX = container.touchStartX || 0;
    const touchStartY = container.touchStartY || 0;
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    const minSwipeDistance = 50;

    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffY) < minSwipeDistance) {
      if (diffX > 0) {
        this.handleNextMonth();
      } else {
        this.handlePrevMonth();
      }
    }

    if (Math.abs(diffY) > minSwipeDistance && Math.abs(diffX) < minSwipeDistance) {
      if (diffY > 0) {
        this.handlePrevYear();
      } else {
        this.handleNextYear();
      }
    }

    delete container.touchStartX;
    delete container.touchStartY;
  }

  private handleFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('date-cell')) {
      target.classList.add('focused');
    }

    this.emitEvent('focus', {
      target: target.className,
      timestamp: Date.now(),
    });
  }

  private handleBlur(event: FocusEvent): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('date-cell')) {
      target.classList.remove('focused');
    }

    this.emitEvent('blur', {
      target: target.className,
      timestamp: Date.now(),
    });
  }

  private handlePrevMonth(): void {
    // To be implemented in future tasks
  }

  private handleNextMonth(): void {
    // To be implemented in future tasks
  }

  private handlePrevYear(): void {
    // To be implemented in future tasks
  }

  private handleNextYear(): void {
    // To be implemented in future tasks
  }

  private selectDate(date: Date): void {
    if (this._disabled) return;

    if (!this.isValidDate(date)) {
      this.emitError('INVALID_DATE', 'Invalid date provided');
      return;
    }

    switch (this._selectionMode) {
      case 'single':
        this._selectedDate = date;
        this.setAttribute('selected-date', date.toISOString());
        this.emitDateSelectEvent(date);
        break;

      case 'range':
        if (!this._selectedRange.start) {
          this._selectedRange.start = date;
        } else if (!this._selectedRange.end) {
          if (date < this._selectedRange.start) {
            this._selectedRange.end = this._selectedRange.start;
            this._selectedRange.start = date;
          } else {
            this._selectedRange.end = date;
          }

          this.emitRangeSelectEvent(this._selectedRange.start, this._selectedRange.end);
        } else {
          this._selectedRange.start = date;
          this._selectedRange.end = null;
        }
        break;

      case 'multiple':
        if (!this._selectedDates.some((d) => this.isSameDay(d, date))) {
          this._selectedDates.push(date);

          this.emitMultipleSelectEvent(this._selectedDates);
        }
        break;
    }

    this.render();
  }

  private isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private emitDateSelectEvent(date: Date): void {
    const jalaliDate = this.dateService.gregorianToJalali(date);
    const hijriDate = this.dateService.gregorianToHijri(date);

    const detail = {
      date,
      jalaliDate: `${jalaliDate.year}/${jalaliDate.month}/${jalaliDate.day}`,
      gregorianDate: date.toISOString().split('T')[0],
      hijriDate: `${hijriDate.year}/${hijriDate.month}/${hijriDate.day}`,
    };

    this.emitEvent('dateSelect', detail);
  }

  private emitMultipleSelectEvent(dates: Date[]): void {
    const jalaliDates = dates.map((date) => {
      const jalaliDate = this.dateService.gregorianToJalali(date);
      return `${jalaliDate.year}/${jalaliDate.month}/${jalaliDate.day}`;
    });

    const detail = {
      dates,
      count: dates.length,
      jalaliDates,
    };

    this.emitEvent('multipleSelect', detail);
  }

  private emitRangeSelectEvent(start: Date, end: Date): void {
    const startJalali = this.dateService.gregorianToJalali(start);
    const endJalali = this.dateService.gregorianToJalali(end);

    const detail = {
      start,
      end,
      startJalali: `${startJalali.year}/${startJalali.month}/${startJalali.day}`,
      endJalali: `${endJalali.year}/${endJalali.month}/${endJalali.day}`,
    };

    this.emitEvent('rangeSelect', detail);
  }

  private emitLocaleChangeEvent(locale: 'fa' | 'en'): void {
    const direction = this.localeService.getDirection(locale);

    const detail = {
      locale,
      direction,
    };

    this.emitEvent('localeChange', detail);
  }

  private emitThemeChangeEvent(theme: string): void {
    const themeConfig = this.themeService.getTheme(theme);
    const colors = themeConfig ? this.themeService.generateCSSVariablesObject() : {};

    const detail = {
      theme,
      colors,
    };

    this.emitEvent('themeChange', detail);
  }

  private emitEvent(eventName: string, detail: any): void {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });

    this.dispatchEvent(event);
  }

  private emitError(code: string, message: string): void {
    const detail = {
      code,
      message,
      timestamp: Date.now(),
    };

    this.emitEvent('error', detail);
  }

  /**
   * Main render method - orchestrates all rendering
   * متد رندر اصلی - هماهنگ کننده تمام رندرینگ
   * 
   * 8.2 Runtime Performance: Lazy rendering with requestAnimationFrame
   */
  private render(): void {
    if (!this.shadowRoot || !this.dateService) return;

    // Debounce renders to avoid excessive DOM updates
    if (this.renderScheduled) return;
    
    this.renderScheduled = true;

    // Use requestAnimationFrame for optimal rendering timing
    requestAnimationFrame(() => {
      // Check if component is still connected and services are available
      if (!this.shadowRoot || !this.dateService) {
        this.renderScheduled = false;
        return;
      }

      const container = this.shadowRoot.querySelector(
        '.jalali-date-picker-container'
      ) as HTMLElement;

      if (!container) {
        this.renderScheduled = false;
        return;
      }

      // Render complete calendar
      container.innerHTML = this.renderCalendar();

      // Re-setup event listeners after render
      this.setupEventListeners();

      // Apply theme
      this.applyTheme();

      this.renderScheduled = false;
    });
  }

  /**
   * Render complete calendar structure
   * رندر ساختار کامل تقویم
   * 
   * @returns HTML string for complete calendar
   */
  private renderCalendar(): string {
    const today = new Date();
    const jalaliDate = this.dateService.gregorianToJalali(today);

    return `
      <div class="jalali-date-picker-container">
        ${this.renderHeader(jalaliDate.year, jalaliDate.month)}
        ${this.renderMonth(jalaliDate.year, jalaliDate.month)}
        ${this.renderFooter()}
      </div>
    `;
  }

  /**
   * Render calendar header with navigation
   * رندر هدر تقویم با ناوبری
   * 
   * @param year - Jalali year
   * @param month - Jalali month (1-12)
   * @returns HTML string for header
   */
  private renderHeader(year: number, month: number): string {
    const monthName = this.localeService.getJalaliMonthName(month, this._locale);
    const prevArrow = this._locale === 'fa' ? '→' : '←';
    const nextArrow = this._locale === 'fa' ? '←' : '→';

    return `
      <div class="calendar-header">
        <button class="calendar-header-btn prev-month" aria-label="Previous month" title="Previous month">
          ${prevArrow}
        </button>
        <h2 class="calendar-month-year">${monthName} ${year}</h2>
        <button class="calendar-header-btn next-month" aria-label="Next month" title="Next month">
          ${nextArrow}
        </button>
      </div>
    `;
  }

  /**
   * Render calendar month with all days
   * رندر ماه تقویم با تمام روزها
   * 
   * @param year - Jalali year
   * @param month - Jalali month (1-12)
   * @returns HTML string for month
   */
  private renderMonth(year: number, month: number): string {
    const daysInMonth = this.dateService.getDaysInJalaliMonth(year, month);
    const firstDay = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDay.getDay();

    return `
      <div class="calendar-body">
        ${this.renderWeekdayHeaders()}
        <div class="dates" role="grid" aria-label="Calendar dates">
          ${this.renderDays(year, month, daysInMonth, firstDayOfWeek)}
        </div>
      </div>
    `;
  }

  /**
   * Render weekday headers
   * رندر هدرهای روزهای هفته
   * 
   * @returns HTML string for weekday headers
   */
  private renderWeekdayHeaders(): string {
    const weekdaysFA = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    const weekdaysEN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdays = this._locale === 'fa' ? weekdaysFA : weekdaysEN;
    const labels = this._locale === 'fa'
      ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return `
      <div class="weekdays">
        ${weekdays.map((day, index) => `
          <div class="weekday" aria-label="${labels[index]}">${day}</div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Render all days in a month
   * رندر تمام روزهای یک ماه
   * 
   * @param year - Jalali year
   * @param month - Jalali month (1-12)
   * @param daysInMonth - Number of days in month
   * @param firstDayOfWeek - Day of week for first day (0-6)
   * @returns HTML string for all days
   */
  private renderDays(
    year: number,
    month: number,
    daysInMonth: number,
    firstDayOfWeek: number
  ): string {
    let html = '';

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      html += `<div class="date-cell other-month" aria-disabled="true"></div>`;
    }

    // Add date cells
    for (let day = 1; day <= daysInMonth; day++) {
      html += this.renderDay(year, month, day);
    }

    // Add empty cells for days after the last day of the month
    const totalCells = firstDayOfWeek + daysInMonth;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let i = 0; i < remainingCells; i++) {
      html += `<div class="date-cell other-month" aria-disabled="true"></div>`;
    }

    return html;
  }

  /**
   * Render a single day cell
   * رندر یک سلول روز
   * 
   * @param year - Jalali year
   * @param month - Jalali month (1-12)
   * @param day - Day of month (1-31)
   * @returns HTML string for day cell
   */
  private renderDay(year: number, month: number, day: number): string {
    const dateObj = new Date(year, month - 1, day);
    const isSelected = this._selectedDate && this.isSameDay(this._selectedDate, dateObj);
    const isDisabled = this._disabled;
    const isToday = this.isSameDay(new Date(), dateObj);

    const classes = [
      'date-cell',
      isSelected ? 'selected' : '',
      isDisabled ? 'disabled' : '',
      isToday ? 'today' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const monthName = this.localeService.getJalaliMonthName(month, this._locale);
    const ariaLabel = `${day} ${monthName}`;
    const ariaDisabled = isDisabled ? 'true' : 'false';

    return `
      <div 
        class="${classes}"
        data-date="${dateObj.toISOString()}"
        data-day="${day}"
        role="gridcell"
        aria-label="${ariaLabel}"
        aria-disabled="${ariaDisabled}"
        tabindex="${isDisabled ? '-1' : '0'}"
      >
        ${day}
      </div>
    `;
  }

  /**
   * Render calendar footer with optional controls
   * رندر فوتر تقویم با کنترل‌های اختیاری
   * 
   * @returns HTML string for footer
   */
  private renderFooter(): string {
    let footerHTML = '<div class="calendar-footer">';

    // Theme Selector
    if (this._showThemeSelector) {
      const themeLabel = this._locale === 'fa' ? 'تم:' : 'Theme:';
      footerHTML += `
        <div class="theme-selector">
          <span class="theme-selector-label">${themeLabel}</span>
          <div class="theme-selector-buttons">
            ${this.renderThemeButtons()}
          </div>
        </div>
      `;
    }

    // Color Picker
    if (this._showColorPicker) {
      const colorLabel = this._locale === 'fa' ? 'رنگ:' : 'Color:';
      const colorAriaLabel = this._locale === 'fa' ? 'انتخاب رنگ' : 'Pick a color';
      footerHTML += `
        <div class="color-picker">
          <span class="color-picker-label">${colorLabel}</span>
          <input 
            type="color" 
            class="color-picker-input" 
            value="#007bff"
            aria-label="${colorAriaLabel}"
          />
        </div>
      `;
    }

    // Calendar Switch
    if (this._showCalendarSwitch) {
      const calendarLabel = this._locale === 'fa' ? 'تقویم:' : 'Calendar:';
      footerHTML += `
        <div class="calendar-switch">
          <span class="calendar-switch-label">${calendarLabel}</span>
          <div class="calendar-switch-buttons">
            ${this.renderCalendarSwitchButtons()}
          </div>
        </div>
      `;
    }

    footerHTML += '</div>';
    return footerHTML;
  }

  /**
   * Render theme selector buttons
   * رندر دکمه‌های انتخاب تم
   * 
   * @returns HTML string for theme buttons
   */
  private renderThemeButtons(): string {
    const themes = ['light', 'dark', 'glassmorphism'];
    return themes
      .map(
        (theme) => `
      <button 
        class="theme-selector-button ${theme === this._theme ? 'active' : ''}"
        data-theme="${theme}"
        aria-label="Select ${theme} theme"
        title="${theme}"
      >
        ${theme}
      </button>
    `
      )
      .join('');
  }

  /**
   * Render calendar switch buttons
   * رندر دکمه‌های تبدیل تقویم
   * 
   * @returns HTML string for calendar switch buttons
   */
  private renderCalendarSwitchButtons(): string {
    const types = [
      { type: 'jalali', label: 'جلالی' },
      { type: 'gregorian', label: 'میلادی' },
      { type: 'hijri', label: 'قمری' },
    ];

    return types
      .map(
        ({ type, label }) => `
      <button 
        class="calendar-switch-button ${type === this._calendarType ? 'active' : ''}"
        data-type="${type}"
        aria-label="Switch to ${label} calendar"
        title="${label}"
      >
        ${label}
      </button>
    `
      )
      .join('');
  }

  /**
   * Apply theme styles
   * 8.2 Runtime Performance: Memoization for expensive calculations
   */
  private applyTheme(): void {
    if (!this.shadowRoot) return;

    // Check memoization cache
    const cacheKey = `theme_${this._theme}_${this._locale}`;
    let variables = this.memoizedTheme.get(cacheKey);

    if (!variables) {
      const theme = this.themeService.getTheme(this._theme);
      if (!theme) return;

      variables = this.themeService.generateCSSVariablesObject();
      this.memoizedTheme.set(cacheKey, variables);
    }

    const host = this.shadowRoot.host as HTMLElement;
    Object.entries(variables).forEach(([key, value]) => {
      host.style.setProperty(key, value);
    });

    const direction = this.localeService.getDirection(this._locale);
    host.style.direction = direction;
  }

  // ============ Performance Monitoring (8.4) ============

  /**
   * Initialize performance monitoring
   * 8.4 Performance Monitoring: LCP, FID, CLS measurement
   */
  private initializePerformanceMonitoring(): void {
    // Measure LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          performance.mark(`lcp-${lastEntry.startTime}`);
          this.performanceMetrics.lcpMark = performance.getEntriesByName(`lcp-${lastEntry.startTime}`)[0] as PerformanceMark;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observer = lcpObserver;
      } catch (e) {
        // LCP not supported
      }
    }

    // Mark component initialization
    performance.mark('jalali-date-picker-init');
  }

  /**
   * Get performance metrics
   * 8.4 Performance Monitoring: Get current metrics
   */
  getPerformanceMetrics(): {
    lcp?: number;
    fid?: number;
    cls?: number;
    bundleSize?: number;
  } {
    const metrics: any = {};

    // Get LCP
    try {
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length > 0) {
        metrics.lcp = lcpEntries[lcpEntries.length - 1].startTime;
      }
    } catch (e) {
      // LCP not available
    }

    // Get FID (First Input Delay) - via PerformanceObserver
    try {
      const fidEntries = performance.getEntriesByType('first-input');
      if (fidEntries.length > 0) {
        metrics.fid = (fidEntries[0] as any).processingDuration;
      }
    } catch (e) {
      // FID not available
    }

    // Get CLS (Cumulative Layout Shift)
    try {
      const clsEntries = performance.getEntriesByType('layout-shift');
      let cls = 0;
      for (const entry of clsEntries) {
        if (!(entry as any).hadRecentInput) {
          cls += (entry as any).value;
        }
      }
      metrics.cls = cls;
    } catch (e) {
      // CLS not available
    }

    return metrics;
  }

  /**
   * Report performance metrics
   * 8.4 Performance Monitoring: Report metrics to console
   */
  reportPerformanceMetrics(): void {
    const metrics = this.getPerformanceMetrics();
    console.log('Jalali Date Picker Performance Metrics:', {
      lcp: metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
      fid: metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
      cls: metrics.cls ? metrics.cls.toFixed(4) : 'N/A',
      bundleSize: metrics.bundleSize ? `${(metrics.bundleSize / 1024).toFixed(2)}KB` : 'N/A',
    });
  }

  // ============ Public API ============

  get selectedDate(): Date | null {
    return this._selectedDate;
  }

  set selectedDate(value: Date | null) {
    this._selectedDate = value;

    if (value) {
      this.setAttribute('selected-date', value.toISOString());
    } else {
      this.removeAttribute('selected-date');
    }

    this.render();
  }

  get selectedRange(): { start: Date | null; end: Date | null } {
    return this._selectedRange;
  }

  set selectedRange(value: { start: Date | null; end: Date | null }) {
    this._selectedRange = value;
    this.render();
  }

  get selectedDates(): Date[] {
    return this._selectedDates;
  }

  set selectedDates(value: Date[]) {
    this._selectedDates = value;
    this.render();
  }

  get calendarType(): 'jalali' | 'gregorian' | 'hijri' {
    return this._calendarType;
  }

  set calendarType(value: 'jalali' | 'gregorian' | 'hijri') {
    this._calendarType = value;
    this.setAttribute('calendar-type', value);
    this.render();
  }

  get locale(): 'fa' | 'en' {
    return this._locale;
  }

  set locale(value: 'fa' | 'en') {
    this._locale = value;
    this.setAttribute('locale', value);
    this.dateService.setLocale(value);
    this.localeService.setLocale(value);
    
    // Update direction based on locale
    const direction = this.localeService.getDirection(value);
    this.setAttribute('dir', direction);
    
    this.emitLocaleChangeEvent(value);
    this.render();
  }

  get theme(): string {
    return this._theme;
  }

  set theme(value: string) {
    this._theme = value;
    this.setAttribute('theme', value);
    this.emitThemeChangeEvent(value);
    this.render();
  }

  get selectionMode(): 'single' | 'range' | 'multiple' {
    return this._selectionMode;
  }

  set selectionMode(value: 'single' | 'range' | 'multiple') {
    this._selectionMode = value;
    this.setAttribute('selection-mode', value);
    this.render();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;

    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }

    this.render();
  }

  get value(): string {
    return this._selectedDate ? this._selectedDate.toISOString() : '';
  }

  open(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.querySelector('.jalali-date-picker-container')?.classList.add('open');
  }

  close(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.querySelector('.jalali-date-picker-container')?.classList.remove('open');
  }

  reset(): void {
    this._selectedDate = null;
    this._selectedRange = { start: null, end: null };
    this._selectedDates = [];
    this.removeAttribute('selected-date');
    this.render();
  }

  setDate(date: Date): void {
    this.selectedDate = date;
  }

  setRange(start: Date, end: Date): void {
    if (start > end) {
      [start, end] = [end, start];
    }

    this._selectedRange = { start, end };
    this.emitRangeSelectEvent(start, end);
    this.render();
  }

  addDate(date: Date): void {
    if (!this._selectedDates.some((d) => this.isSameDay(d, date))) {
      this._selectedDates.push(date);
      this.render();
    }
  }

  removeDate(date: Date): void {
    this._selectedDates = this._selectedDates.filter((d) => !this.isSameDay(d, date));
    this.render();
  }
}

// Register the custom element
if (!customElements.get('jalali-date-picker')) {
  customElements.define('jalali-date-picker', JalaliDatePickerElement);
}

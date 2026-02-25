/**
 * Jalali Date Picker Web Component Template
 * 
 * HTML template exported as a string for Shadow DOM injection
 * شامل calendar header، weekday headers، date grid، و optional controls
 */

/**
 * Get HTML template for the Web Component
 * دریافت HTML template برای Web Component
 * 
 * @returns HTML template as a string
 */
export function getWebComponentTemplate(): string {
  return `
    <div class="jalali-date-picker-container">
      <!-- Calendar Header with Navigation -->
      <div class="calendar-header">
        <button class="calendar-header-btn prev-month" aria-label="Previous month" title="Previous month">
          ←
        </button>
        <h2 class="calendar-month-year"></h2>
        <button class="calendar-header-btn next-month" aria-label="Next month" title="Next month">
          →
        </button>
      </div>

      <!-- Calendar Body -->
      <div class="calendar-body">
        <!-- Weekday Headers -->
        <div class="weekdays">
          <div class="weekday" aria-label="Sunday">ش</div>
          <div class="weekday" aria-label="Monday">ی</div>
          <div class="weekday" aria-label="Tuesday">د</div>
          <div class="weekday" aria-label="Wednesday">س</div>
          <div class="weekday" aria-label="Thursday">چ</div>
          <div class="weekday" aria-label="Friday">پ</div>
          <div class="weekday" aria-label="Saturday">ج</div>
        </div>

        <!-- Date Grid -->
        <div class="dates" role="grid" aria-label="Calendar dates">
          <!-- Date cells will be generated dynamically -->
        </div>
      </div>

      <!-- Calendar Footer with Optional Controls -->
      <div class="calendar-footer">
        <!-- Theme Selector (optional) -->
        <div class="theme-selector" style="display: none;">
          <span class="theme-selector-label">Theme:</span>
          <div class="theme-selector-buttons"></div>
        </div>

        <!-- Color Picker (optional) -->
        <div class="color-picker" style="display: none;">
          <span class="color-picker-label">Color:</span>
          <input 
            type="color" 
            class="color-picker-input" 
            value="#007bff"
            aria-label="Pick a color"
          />
        </div>

        <!-- Calendar Switch (optional) -->
        <div class="calendar-switch" style="display: none;">
          <span class="calendar-switch-label">Calendar:</span>
          <div class="calendar-switch-buttons">
            <button class="calendar-switch-button" data-type="jalali" aria-label="Jalali calendar">
              جلالی
            </button>
            <button class="calendar-switch-button" data-type="gregorian" aria-label="Gregorian calendar">
              میلادی
            </button>
            <button class="calendar-switch-button" data-type="hijri" aria-label="Hijri calendar">
              قمری
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate date cells HTML for a specific month
 * تولید HTML سلول‌های تاریخ برای یک ماه خاص
 * 
 * @param year - Jalali year
 * @param month - Jalali month (1-12)
 * @param daysInMonth - Number of days in the month
 * @param firstDayOfWeek - Day of week for the first day (0-6)
 * @param selectedDate - Currently selected date
 * @param disabledDates - Array of disabled dates
 * @param holidays - Array of holiday dates
 * @returns HTML string for date cells
 */
export function generateDateCells(
  year: number,
  month: number,
  daysInMonth: number,
  firstDayOfWeek: number,
  selectedDate: Date | null = null,
  disabledDates: Date[] = [],
  holidays: Date[] = []
): string {
  let html = '';

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    html += `<div class="date-cell other-month" aria-disabled="true"></div>`;
  }

  // Add date cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month - 1, day);
    const isSelected = selectedDate && isSameDay(selectedDate, dateObj);
    const isDisabled = disabledDates.some((d) => isSameDay(d, dateObj));
    const isHoliday = holidays.some((d) => isSameDay(d, dateObj));
    const isToday = isSameDay(new Date(), dateObj);

    const classes = [
      'date-cell',
      isSelected ? 'selected' : '',
      isDisabled ? 'disabled' : '',
      isHoliday ? 'holiday' : '',
      isToday ? 'today' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const ariaLabel = `${day} ${getMonthName(month)}`;
    const ariaDisabled = isDisabled ? 'true' : 'false';

    html += `
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

  // Add empty cells for days after the last day of the month
  const totalCells = firstDayOfWeek + daysInMonth;
  const remainingCells = 42 - totalCells; // 6 rows × 7 days
  for (let i = 0; i < remainingCells; i++) {
    html += `<div class="date-cell other-month" aria-disabled="true"></div>`;
  }

  return html;
}

/**
 * Generate theme selector buttons
 * تولید دکمه‌های انتخاب تم
 * 
 * @param themes - Array of theme names
 * @param activeTheme - Currently active theme
 * @returns HTML string for theme buttons
 */
export function generateThemeSelectorButtons(
  themes: string[],
  activeTheme: string
): string {
  return themes
    .map(
      (theme) => `
    <button 
      class="theme-selector-button ${theme === activeTheme ? 'active' : ''}"
      data-theme="${theme}"
      aria-label="Select ${theme} theme"
      title="${theme}"
      style="background-color: var(--theme-${theme}-color, #ccc);"
    ></button>
  `
    )
    .join('');
}

/**
 * Generate calendar switch buttons
 * تولید دکمه‌های تبدیل تقویم
 * 
 * @param activeType - Currently active calendar type
 * @returns HTML string for calendar switch buttons
 */
export function generateCalendarSwitchButtons(
  activeType: 'jalali' | 'gregorian' | 'hijri'
): string {
  const types = [
    { type: 'jalali', label: 'جلالی' },
    { type: 'gregorian', label: 'میلادی' },
    { type: 'hijri', label: 'قمری' },
  ];

  return types
    .map(
      ({ type, label }) => `
    <button 
      class="calendar-switch-button ${type === activeType ? 'active' : ''}"
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
 * Helper function to check if two dates are the same day
 * تابع کمکی برای بررسی اینکه دو تاریخ یک روز هستند
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Helper function to get month name
 * تابع کمکی برای دریافت نام ماه
 */
function getMonthName(month: number): string {
  const monthNames = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];
  return monthNames[month - 1] || '';
}

/**
 * Build complete calendar HTML with all elements
 * ساخت HTML کامل تقویم با تمام عناصر
 * 
 * @param options - Configuration options
 * @returns Complete HTML string
 */
export interface CalendarBuildOptions {
  year: number;
  month: number;
  daysInMonth: number;
  firstDayOfWeek: number;
  selectedDate: Date | null;
  disabledDates?: Date[];
  holidays?: Date[];
  showThemeSelector?: boolean;
  showColorPicker?: boolean;
  showCalendarSwitch?: boolean;
  themes?: string[];
  activeTheme?: string;
  activeCalendarType?: 'jalali' | 'gregorian' | 'hijri';
  monthName?: string;
  locale?: 'fa' | 'en';
}

export function buildCompleteCalendarHTML(options: CalendarBuildOptions): string {
  const {
    year,
    month,
    daysInMonth,
    firstDayOfWeek,
    selectedDate,
    disabledDates = [],
    holidays = [],
    showThemeSelector = false,
    showColorPicker = false,
    showCalendarSwitch = false,
    themes = [],
    activeTheme = 'light',
    activeCalendarType = 'jalali',
    monthName = '',
    locale = 'fa',
  } = options;

  const dateCells = generateDateCells(
    year,
    month,
    daysInMonth,
    firstDayOfWeek,
    selectedDate,
    disabledDates,
    holidays
  );

  const themeButtons = showThemeSelector
    ? generateThemeSelectorButtons(themes, activeTheme)
    : '';

  const calendarSwitchButtons = showCalendarSwitch
    ? generateCalendarSwitchButtons(activeCalendarType)
    : '';

  return `
    <div class="jalali-date-picker-container">
      <!-- Calendar Header with Navigation -->
      <div class="calendar-header">
        <button class="calendar-header-btn prev-month" aria-label="Previous month" title="Previous month">
          ${locale === 'fa' ? '→' : '←'}
        </button>
        <h2 class="calendar-month-year">${monthName} ${year}</h2>
        <button class="calendar-header-btn next-month" aria-label="Next month" title="Next month">
          ${locale === 'fa' ? '←' : '→'}
        </button>
      </div>

      <!-- Calendar Body -->
      <div class="calendar-body">
        <!-- Weekday Headers -->
        <div class="weekdays">
          ${
            locale === 'fa'
              ? `
            <div class="weekday" aria-label="Sunday">ش</div>
            <div class="weekday" aria-label="Monday">ی</div>
            <div class="weekday" aria-label="Tuesday">د</div>
            <div class="weekday" aria-label="Wednesday">س</div>
            <div class="weekday" aria-label="Thursday">چ</div>
            <div class="weekday" aria-label="Friday">پ</div>
            <div class="weekday" aria-label="Saturday">ج</div>
          `
              : `
            <div class="weekday" aria-label="Sunday">Sun</div>
            <div class="weekday" aria-label="Monday">Mon</div>
            <div class="weekday" aria-label="Tuesday">Tue</div>
            <div class="weekday" aria-label="Wednesday">Wed</div>
            <div class="weekday" aria-label="Thursday">Thu</div>
            <div class="weekday" aria-label="Friday">Fri</div>
            <div class="weekday" aria-label="Saturday">Sat</div>
          `
          }
        </div>

        <!-- Date Grid -->
        <div class="dates" role="grid" aria-label="Calendar dates">
          ${dateCells}
        </div>
      </div>

      <!-- Calendar Footer with Optional Controls -->
      <div class="calendar-footer">
        <!-- Theme Selector (optional) -->
        ${
          showThemeSelector
            ? `
          <div class="theme-selector">
            <span class="theme-selector-label">${locale === 'fa' ? 'تم:' : 'Theme:'}</span>
            <div class="theme-selector-buttons">
              ${themeButtons}
            </div>
          </div>
        `
            : ''
        }

        <!-- Color Picker (optional) -->
        ${
          showColorPicker
            ? `
          <div class="color-picker">
            <span class="color-picker-label">${locale === 'fa' ? 'رنگ:' : 'Color:'}</span>
            <input 
              type="color" 
              class="color-picker-input" 
              value="#007bff"
              aria-label="${locale === 'fa' ? 'انتخاب رنگ' : 'Pick a color'}"
            />
          </div>
        `
            : ''
        }

        <!-- Calendar Switch (optional) -->
        ${
          showCalendarSwitch
            ? `
          <div class="calendar-switch">
            <span class="calendar-switch-label">${locale === 'fa' ? 'تقویم:' : 'Calendar:'}</span>
            <div class="calendar-switch-buttons">
              ${calendarSwitchButtons}
            </div>
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;
}

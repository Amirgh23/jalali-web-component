/**
 * Locale Service - Vanilla TypeScript Implementation
 * Provides internationalization (i18n) support for the Jalali Date Picker Web Component
 * Supports: Persian (fa) and English (en)
 */

export type SupportedLocale = 'fa' | 'en';

export interface LocaleStrings {
  [key: string]: string;
}

export interface LocaleConfig {
  code: SupportedLocale;
  direction: 'rtl' | 'ltr';
  monthNames: string[];
  dayNames: string[];
  dayShortNames: string[];
}

/**
 * LocaleService - Manages internationalization for the date picker
 * Provides translation, locale management, and RTL/LTR support
 */
export class LocaleService {
  private currentLocale: SupportedLocale = 'fa';
  private listeners: Set<(locale: SupportedLocale) => void> = new Set();

  private translations: { [key in SupportedLocale]: LocaleStrings } = {
    fa: {
      // Gregorian Months
      'january': 'ژانویه',
      'february': 'فوریه',
      'march': 'مارس',
      'april': 'آوریل',
      'may': 'مه',
      'june': 'ژوئن',
      'july': 'ژوئیه',
      'august': 'اوت',
      'september': 'سپتامبر',
      'october': 'اکتبر',
      'november': 'نوامبر',
      'december': 'دسامبر',
      // Jalali Months
      'farvardin': 'فروردین',
      'ordibehesht': 'اردیبهشت',
      'khordad': 'خرداد',
      'tir': 'تیر',
      'mordad': 'مرداد',
      'shahrivar': 'شهریور',
      'mehr': 'مهر',
      'aban': 'آبان',
      'azar': 'آذر',
      'dey': 'دی',
      'bahman': 'بهمن',
      'esfand': 'اسفند',
      // Hijri Months
      'muharram': 'محرم',
      'safar': 'صفر',
      'rabi_al_awwal': 'ربیع الاول',
      'rabi_al_thani': 'ربیع الثانی',
      'jumada_al_awwal': 'جمادی الاول',
      'jumada_al_thani': 'جمادی الثانی',
      'rajab': 'رجب',
      'shaban': 'شعبان',
      'ramadan': 'رمضان',
      'shawwal': 'شوال',
      'dhu_al_qidah': 'ذی‌القعده',
      'dhu_al_hijjah': 'ذی‌الحجه',
      // Days
      'sunday': 'یکشنبه',
      'monday': 'دوشنبه',
      'tuesday': 'سه‌شنبه',
      'wednesday': 'چهارشنبه',
      'thursday': 'پنج‌شنبه',
      'friday': 'جمعه',
      'saturday': 'شنبه',
      // Day abbreviations
      'sun_short': 'ی',
      'mon_short': 'د',
      'tue_short': 'س',
      'wed_short': 'چ',
      'thu_short': 'پ',
      'fri_short': 'ج',
      'sat_short': 'ش',
      // Common
      'select_date': 'تاریخ را انتخاب کنید',
      'today': 'امروز',
      'clear': 'پاک کردن',
      'ok': 'تأیید',
      'cancel': 'لغو',
      'previous_month': 'ماه قبلی',
      'next_month': 'ماه بعدی',
      'previous_year': 'سال قبلی',
      'next_year': 'سال بعدی',
      'theme': 'تم',
      'language': 'زبان',
      'settings': 'تنظیمات',
      'about': 'درباره',
      'help': 'کمک',
      'close': 'بستن',
      'loading': 'در حال بارگذاری...',
      'error': 'خطا',
      'success': 'موفق',
      'warning': 'هشدار',
      'info': 'اطلاعات',
      // Theme selector
      'select_theme': 'انتخاب تم',
      'light_theme': 'تم روشن',
      'dark_theme': 'تم تاریک',
      'reset_default': 'بازنشانی پیشفرض',
      'theme_type': 'نوع تم',
      // Color picker
      'color_palette': 'پالت رنگی',
      'primary_color': 'رنگ اصلی',
      'secondary_color': 'رنگ ثانویه',
      'accent_color': 'رنگ تاکیدی',
      'preset_palettes': 'پالت‌های پیشفرض',
      'preset_palette': 'پالت پیشفرض',
      // Calendar
      'open_calendar': 'باز کردن تقویم',
      'calendar': 'تقویم',
      'date_calendar': 'تقویم تاریخ',
      'select_calendar_type': 'انتخاب نوع تقویم',
      'select_theme_color': 'انتخاب تم و رنگ',
      'day_info': 'اطلاعات روز',
      'dates_selected': 'تاریخ انتخاب شده',
      'from': 'از',
      // Accessibility
      'press_enter_to_select': 'برای انتخاب تاریخ، روی دکمه کلیک کنید یا Enter را فشار دهید',
      'selected': 'انتخاب شده',
      'not_selected': 'انتخاب نشده'
    },
    en: {
      // Gregorian Months
      'january': 'January',
      'february': 'February',
      'march': 'March',
      'april': 'April',
      'may': 'May',
      'june': 'June',
      'july': 'July',
      'august': 'August',
      'september': 'September',
      'october': 'October',
      'november': 'November',
      'december': 'December',
      // Jalali Months
      'farvardin': 'Farvardin',
      'ordibehesht': 'Ordibehesht',
      'khordad': 'Khordad',
      'tir': 'Tir',
      'mordad': 'Mordad',
      'shahrivar': 'Shahrivar',
      'mehr': 'Mehr',
      'aban': 'Aban',
      'azar': 'Azar',
      'dey': 'Dey',
      'bahman': 'Bahman',
      'esfand': 'Esfand',
      // Hijri Months
      'muharram': 'Muharram',
      'safar': 'Safar',
      'rabi_al_awwal': 'Rabi al-Awwal',
      'rabi_al_thani': 'Rabi al-Thani',
      'jumada_al_awwal': 'Jumada al-Awwal',
      'jumada_al_thani': 'Jumada al-Thani',
      'rajab': 'Rajab',
      'shaban': 'Shaban',
      'ramadan': 'Ramadan',
      'shawwal': 'Shawwal',
      'dhu_al_qidah': 'Dhu al-Qidah',
      'dhu_al_hijjah': 'Dhu al-Hijjah',
      // Days
      'sunday': 'Sunday',
      'monday': 'Monday',
      'tuesday': 'Tuesday',
      'wednesday': 'Wednesday',
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
      // Day abbreviations
      'sun_short': 'S',
      'mon_short': 'M',
      'tue_short': 'T',
      'wed_short': 'W',
      'thu_short': 'T',
      'fri_short': 'F',
      'sat_short': 'S',
      // Common
      'select_date': 'Select a date',
      'today': 'Today',
      'clear': 'Clear',
      'ok': 'OK',
      'cancel': 'Cancel',
      'previous_month': 'Previous month',
      'next_month': 'Next month',
      'previous_year': 'Previous year',
      'next_year': 'Next year',
      'theme': 'Theme',
      'language': 'Language',
      'settings': 'Settings',
      'about': 'About',
      'help': 'Help',
      'close': 'Close',
      'loading': 'Loading...',
      'error': 'Error',
      'success': 'Success',
      'warning': 'Warning',
      'info': 'Information',
      // Theme selector
      'select_theme': 'Select Theme',
      'light_theme': 'Light Theme',
      'dark_theme': 'Dark Theme',
      'reset_default': 'Reset to Default',
      'theme_type': 'Theme Type',
      // Color picker
      'color_palette': 'Color Palette',
      'primary_color': 'Primary',
      'secondary_color': 'Secondary',
      'accent_color': 'Accent',
      'preset_palettes': 'Preset Palettes',
      'preset_palette': 'Preset Palette',
      // Calendar
      'open_calendar': 'Open calendar',
      'calendar': 'Calendar',
      'date_calendar': 'Date Calendar',
      'select_calendar_type': 'Select calendar type',
      'select_theme_color': 'Select theme and color',
      'day_info': 'Day Information',
      'dates_selected': 'dates selected',
      'from': 'from',
      // Accessibility
      'press_enter_to_select': 'Click the button or press Enter to select a date',
      'selected': 'selected',
      'not_selected': 'not selected'
    }
  };

  constructor() {
    this.loadLocaleFromStorage();
  }

  /**
   * Load locale from localStorage if available
   */
  private loadLocaleFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    const saved = localStorage.getItem('jalali-locale');
    if (saved && this.isSupportedLocale(saved)) {
      this.currentLocale = saved as SupportedLocale;
    }
  }

  /**
   * Check if a locale is supported
   */
  private isSupportedLocale(locale: string): locale is SupportedLocale {
    return ['fa', 'en'].includes(locale);
  }

  /**
   * Get current locale
   */
  getLocale(): SupportedLocale {
    return this.currentLocale;
  }

  /**
   * Set current locale
   */
  setLocale(locale: SupportedLocale): void {
    if (!this.isSupportedLocale(locale)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }

    this.currentLocale = locale;

    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jalali-locale', locale);
    }

    // Apply direction to document
    this.applyLocaleDirection(locale);

    // Notify listeners
    this.notifyListeners();
  }

  /**
   * Apply locale direction (RTL/LTR) to document
   */
  private applyLocaleDirection(locale: SupportedLocale): void {
    if (typeof document === 'undefined') return;
    const direction = this.getDirection(locale);
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.lang = locale;
  }

  /**
   * Get text direction for a locale
   */
  getDirection(locale?: SupportedLocale): 'rtl' | 'ltr' {
    const targetLocale = locale || this.currentLocale;
    return targetLocale === 'fa' ? 'rtl' : 'ltr';
  }

  /**
   * Get locale configuration
   */
  getConfig(locale?: SupportedLocale): LocaleConfig {
    const targetLocale = locale || this.currentLocale;
    return {
      code: targetLocale,
      direction: this.getDirection(targetLocale),
      monthNames: this.getJalaliMonthNames(targetLocale),
      dayNames: this.getWeekDaysFull(targetLocale),
      dayShortNames: this.getWeekDaysShort(targetLocale)
    };
  }

  /**
   * Translate a key to the current locale
   */
  translate(key: string): string {
    return this.getText(this.currentLocale, key);
  }

  /**
   * Get text for a specific locale
   */
  getText(locale: SupportedLocale, key: string): string {
    if (!this.isSupportedLocale(locale)) {
      return key;
    }
    return this.translations[locale]?.[key] || key;
  }

  /**
   * Translate with parameters
   */
  translateWithParams(key: string, params: { [key: string]: string }): string {
    let translated = this.translate(key);
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translated = translated.replace(`{{${paramKey}}}`, paramValue);
    });
    return translated;
  }

  /**
   * Get all translations for current locale
   */
  getTranslations(): LocaleStrings {
    return { ...this.translations[this.currentLocale] };
  }

  /**
   * Get all translations for a specific locale
   */
  getTranslationsForLocale(locale: SupportedLocale): LocaleStrings {
    if (!this.isSupportedLocale(locale)) {
      return {};
    }
    return { ...this.translations[locale] };
  }

  /**
   * Get supported locales
   */
  getSupportedLocales(): SupportedLocale[] {
    return ['fa', 'en'];
  }

  /**
   * Add custom translation
   */
  addTranslation(locale: SupportedLocale, key: string, value: string): void {
    if (!this.isSupportedLocale(locale)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }
    this.translations[locale][key] = value;
  }

  /**
   * Add multiple custom translations
   */
  addTranslations(locale: SupportedLocale, translations: LocaleStrings): void {
    if (!this.isSupportedLocale(locale)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }
    this.translations[locale] = { ...this.translations[locale], ...translations };
  }

  /**
   * Get short week day names for current locale
   */
  getWeekDaysShort(locale?: SupportedLocale): string[] {
    const targetLocale = locale || this.currentLocale;
    return [
      this.getText(targetLocale, 'sat_short'),
      this.getText(targetLocale, 'sun_short'),
      this.getText(targetLocale, 'mon_short'),
      this.getText(targetLocale, 'tue_short'),
      this.getText(targetLocale, 'wed_short'),
      this.getText(targetLocale, 'thu_short'),
      this.getText(targetLocale, 'fri_short')
    ];
  }

  /**
   * Get full week day names for current locale
   */
  getWeekDaysFull(locale?: SupportedLocale): string[] {
    const targetLocale = locale || this.currentLocale;
    return [
      this.getText(targetLocale, 'saturday'),
      this.getText(targetLocale, 'sunday'),
      this.getText(targetLocale, 'monday'),
      this.getText(targetLocale, 'tuesday'),
      this.getText(targetLocale, 'wednesday'),
      this.getText(targetLocale, 'thursday'),
      this.getText(targetLocale, 'friday')
    ];
  }

  /**
   * Get Jalali month names for current locale
   */
  getJalaliMonthNames(locale?: SupportedLocale): string[] {
    const targetLocale = locale || this.currentLocale;
    const monthKeys = [
      'farvardin', 'ordibehesht', 'khordad', 'tir', 'mordad', 'shahrivar',
      'mehr', 'aban', 'azar', 'dey', 'bahman', 'esfand'
    ];
    return monthKeys.map(key => this.getText(targetLocale, key));
  }

  /**
   * Get Jalali month name by month number
   */
  getJalaliMonthName(month: number, locale?: SupportedLocale): string {
    if (month < 1 || month > 12) {
      throw new Error(`Invalid month: ${month}`);
    }
    const monthKeys = [
      'farvardin', 'ordibehesht', 'khordad', 'tir', 'mordad', 'shahrivar',
      'mehr', 'aban', 'azar', 'dey', 'bahman', 'esfand'
    ];
    const targetLocale = locale || this.currentLocale;
    return this.getText(targetLocale, monthKeys[month - 1]);
  }

  /**
   * Get Gregorian month names for current locale
   */
  getGregorianMonthNames(locale?: SupportedLocale): string[] {
    const targetLocale = locale || this.currentLocale;
    const monthKeys = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    return monthKeys.map(key => this.getText(targetLocale, key));
  }

  /**
   * Get Gregorian month name by month number
   */
  getGregorianMonthName(month: number, locale?: SupportedLocale): string {
    if (month < 1 || month > 12) {
      throw new Error(`Invalid month: ${month}`);
    }
    const monthKeys = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const targetLocale = locale || this.currentLocale;
    return this.getText(targetLocale, monthKeys[month - 1]);
  }

  /**
   * Get Hijri month names for current locale
   */
  getHijriMonthNames(locale?: SupportedLocale): string[] {
    const targetLocale = locale || this.currentLocale;
    const monthKeys = [
      'muharram', 'safar', 'rabi_al_awwal', 'rabi_al_thani',
      'jumada_al_awwal', 'jumada_al_thani', 'rajab', 'shaban',
      'ramadan', 'shawwal', 'dhu_al_qidah', 'dhu_al_hijjah'
    ];
    return monthKeys.map(key => this.getText(targetLocale, key));
  }

  /**
   * Get Hijri month name by month number
   */
  getHijriMonthName(month: number, locale?: SupportedLocale): string {
    if (month < 1 || month > 12) {
      throw new Error(`Invalid month: ${month}`);
    }
    const monthKeys = [
      'muharram', 'safar', 'rabi_al_awwal', 'rabi_al_thani',
      'jumada_al_awwal', 'jumada_al_thani', 'rajab', 'shaban',
      'ramadan', 'shawwal', 'dhu_al_qidah', 'dhu_al_hijjah'
    ];
    const targetLocale = locale || this.currentLocale;
    return this.getText(targetLocale, monthKeys[month - 1]);
  }

  /**
   * Subscribe to locale changes
   */
  onChange(callback: (locale: SupportedLocale) => void): () => void {
    this.listeners.add(callback);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners of locale change
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentLocale));
  }
}

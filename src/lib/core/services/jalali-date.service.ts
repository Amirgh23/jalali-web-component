/**
 * JalaliDateService - Vanilla TypeScript implementation
 * Provides date conversion and manipulation for Jalali, Gregorian, and Hijri calendars
 * No Angular dependencies - pure TypeScript
 */

import { JalaliDate, GregorianDate, HijriDate, DayInfo } from '../models/jalali-date.model';
import { JalaliCalendarUtils } from '../utils/jalali-calendar.utils';

/**
 * Simple in-memory cache implementation
 */
class SimpleCache {
  private cache = new Map<string, any>();
  private maxSize = 1000;

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T | undefined;
  }

  set<T>(key: string, value: T): void {
    // Simple LRU-like behavior: clear cache if it gets too large
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
}

/**
 * JalaliDateService - Vanilla TypeScript implementation
 * Handles date conversions and calculations for multiple calendar systems
 */
export class JalaliDateService {
  private cache = new SimpleCache();
  private locale: 'fa' | 'en' = 'fa';

  /**
   * Initialize the service with optional locale
   */
  constructor(locale: 'fa' | 'en' = 'fa') {
    this.locale = locale;
  }

  /**
   * Set the locale for date formatting
   */
  setLocale(locale: 'fa' | 'en'): void {
    this.locale = locale;
    this.clearCache();
  }

  /**
   * Get the current locale
   */
  getLocale(): 'fa' | 'en' {
    return this.locale;
  }

  /**
   * Convert Gregorian date to Jalali
   * @param gregorianDate - JavaScript Date object
   * @returns JalaliDate object with year, month, day, and formatted string
   */
  gregorianToJalali(gregorianDate: Date): JalaliDate {
    const cacheKey = `g2j_${gregorianDate.getTime()}_${this.locale}`;
    const cached = this.cache.get<JalaliDate>(cacheKey);

    if (cached) {
      return cached;
    }

    const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
    const monthName = this.getJalaliMonthName(jalaliDate.month);
    const formatted = this.formatJalaliDate(jalaliDate);

    const result: JalaliDate = {
      year: jalaliDate.year,
      month: jalaliDate.month,
      day: jalaliDate.day,
      monthName: monthName,
      dayName: JalaliCalendarUtils.getJalaliDayName(gregorianDate.getDay()),
      formatted: formatted
    };

    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Convert Jalali date to Gregorian Date object
   * @param jalaliYear - Jalali year
   * @param jalaliMonth - Jalali month (1-12)
   * @param jalaliDay - Jalali day (1-31)
   * @returns JavaScript Date object
   */
  jalaliToGregorianDate(jalaliYear: number, jalaliMonth: number, jalaliDay: number): Date {
    return JalaliCalendarUtils.jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay);
  }

  /**
   * Convert Jalali date to Gregorian
   * @param jalaliYear - Jalali year
   * @param jalaliMonth - Jalali month (1-12)
   * @param jalaliDay - Jalali day (1-31)
   * @returns GregorianDate object
   */
  jalaliToGregorian(jalaliYear: number, jalaliMonth: number, jalaliDay: number): GregorianDate {
    const cacheKey = `j2g_${jalaliYear}_${jalaliMonth}_${jalaliDay}`;
    const cached = this.cache.get<GregorianDate>(cacheKey);

    if (cached) {
      return cached;
    }

    const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay);
    const result: GregorianDate = {
      year: gregorianDate.getFullYear(),
      month: gregorianDate.getMonth() + 1,
      day: gregorianDate.getDate(),
      monthName: JalaliCalendarUtils.gregorianMonths[gregorianDate.getMonth()],
      dayName: JalaliCalendarUtils.getJalaliDayName(gregorianDate.getDay()),
      formatted: JalaliCalendarUtils.formatGregorianDate(gregorianDate)
    };

    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Convert Gregorian date to Hijri
   * @param gregorianDate - JavaScript Date object
   * @returns HijriDate object
   */
  gregorianToHijri(gregorianDate: Date): HijriDate {
    const cacheKey = `g2h_${gregorianDate.getTime()}_${this.locale}`;
    const cached = this.cache.get<HijriDate>(cacheKey);

    if (cached) {
      return cached;
    }

    const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);
    const monthName = this.getHijriMonthName(hijriDate.month);
    const formatted = this.formatHijriDate(hijriDate);

    const result: HijriDate = {
      year: hijriDate.year,
      month: hijriDate.month,
      day: hijriDate.day,
      monthName: monthName,
      dayName: JalaliCalendarUtils.getJalaliDayName(gregorianDate.getDay()),
      formatted: formatted
    };

    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get number of days in Hijri month
   */
  getDaysInHijriMonth(year: number, month: number): number {
    return JalaliCalendarUtils.getDaysInHijriMonth(year, month);
  }

  /**
   * Get first day of Hijri month (0 = Saturday)
   */
  getFirstDayOfHijriMonth(year: number, month: number): number {
    return JalaliCalendarUtils.getFirstDayOfHijriMonth(year, month);
  }

  /**
   * Convert Hijri date to Gregorian
   */
  hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
    return JalaliCalendarUtils.hijriToGregorian(hijriYear, hijriMonth, hijriDay);
  }

  /**
   * Get complete information about a day
   */
  getDayInfo(gregorianDate: Date): DayInfo {
    const cacheKey = `dayinfo_${gregorianDate.getTime()}`;
    const cached = this.cache.get<DayInfo>(cacheKey);

    if (cached) {
      return cached;
    }

    const jalaliDate = this.gregorianToJalali(gregorianDate);
    const hijriDate = this.gregorianToHijri(gregorianDate);
    const holidayInfo = JalaliCalendarUtils.isHoliday(jalaliDate);
    const events = JalaliCalendarUtils.getEvents(jalaliDate);
    const season = JalaliCalendarUtils.getSeason(jalaliDate.month);
    const weekNumber = JalaliCalendarUtils.getWeekNumber(jalaliDate.year, jalaliDate.month, jalaliDate.day);

    const result: DayInfo = {
      jalali: jalaliDate,
      gregorian: this.jalaliToGregorian(jalaliDate.year, jalaliDate.month, jalaliDate.day),
      hijri: hijriDate,
      isHoliday: holidayInfo.isHoliday,
      holidayType: holidayInfo.type,
      events: events,
      season: season,
      weekNumber: weekNumber
    };

    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Get number of days in Jalali month
   */
  getDaysInJalaliMonth(year: number, month: number): number {
    return JalaliCalendarUtils.getDaysInJalaliMonth(year, month);
  }

  /**
   * Get first day of Jalali month (0 = Saturday)
   */
  getFirstDayOfJalaliMonth(year: number, month: number): number {
    return JalaliCalendarUtils.getFirstDayOfJalaliMonth(year, month);
  }

  /**
   * Check if a date is a holiday
   */
  isHoliday(jalaliDate: { year: number; month: number; day: number }): boolean {
    return JalaliCalendarUtils.isHoliday(jalaliDate).isHoliday;
  }

  /**
   * Get events for a specific date
   */
  getEvents(jalaliDate: { year: number; month: number; day: number }): string[] {
    return JalaliCalendarUtils.getEvents(jalaliDate);
  }

  /**
   * Format a date to string
   */
  formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
    const jalaliDate = this.gregorianToJalali(date);
    switch (format) {
      case 'short':
        return `${jalaliDate.year}/${jalaliDate.month}/${jalaliDate.day}`;
      case 'long':
        return `${jalaliDate.day} ${jalaliDate.monthName} ${jalaliDate.year} هجری شمسی`;
      default:
        return jalaliDate.formatted;
    }
  }

  /**
   * Get today's date at noon (to avoid timezone issues)
   */
  today(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
  }

  /**
   * Compare two dates
   * @returns negative if date1 < date2, 0 if equal, positive if date1 > date2
   */
  compareDates(date1: Date, date2: Date): number {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    return time1 - time2;
  }

  /**
   * Add days to a date
   */
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Add months to a date
   */
  addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * Add years to a date
   */
  addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  /**
   * Check if date1 is before date2
   */
  isBefore(date1: Date, date2: Date): boolean {
    return this.compareDates(date1, date2) < 0;
  }

  /**
   * Check if date1 is after date2
   */
  isAfter(date1: Date, date2: Date): boolean {
    return this.compareDates(date1, date2) > 0;
  }

  /**
   * Check if two dates are the same day
   */
  isSameDay(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  /**
   * Get Jalali month name
   */
  getJalaliMonthName(month: number): string {
    const monthNames = {
      fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
           'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      en: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
           'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand']
    };
    return monthNames[this.locale][month - 1];
  }

  /**
   * Get Jalali day name
   */
  getJalaliDayName(dayOfWeek: number): string {
    const dayNames = {
      fa: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
      en: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    };
    return dayNames[this.locale][dayOfWeek];
  }

  /**
   * Get number of days in Gregorian month
   */
  getDaysInGregorianMonth(year: number, month: number): number {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && this.isLeapYear(year, 'gregorian')) {
      return 29;
    }
    return daysInMonth[month - 1];
  }

  /**
   * Get first day of Gregorian month (0 = Saturday)
   */
  getFirstDayOfGregorianMonth(year: number, month: number): number {
    const date = new Date(year, month - 1, 1);
    return (date.getDay() + 1) % 7; // Saturday = 0
  }

  /**
   * Check if a year is a leap year
   */
  isLeapYear(year: number, calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'): boolean {
    if (calendarType === 'jalali') {
      return JalaliCalendarUtils.isJalaliLeapYear(year);
    } else if (calendarType === 'gregorian') {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    } else {
      return JalaliCalendarUtils.isHijriLeapYear(year);
    }
  }

  /**
   * Get day of week (0 = Saturday)
   */
  getDayOfWeek(date: Date): number {
    return (date.getDay() + 1) % 7; // Saturday = 0
  }

  /**
   * Get number of days in a month for any calendar type
   */
  getMonthDays(year: number, month: number, calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'): number {
    if (calendarType === 'jalali') {
      return this.getDaysInJalaliMonth(year, month);
    } else if (calendarType === 'gregorian') {
      return this.getDaysInGregorianMonth(year, month);
    } else {
      return this.getDaysInHijriMonth(year, month);
    }
  }

  /**
   * Get first day of month for any calendar type
   */
  getFirstDayOfMonth(year: number, month: number, calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'): number {
    if (calendarType === 'jalali') {
      return this.getFirstDayOfJalaliMonth(year, month);
    } else if (calendarType === 'gregorian') {
      return this.getFirstDayOfGregorianMonth(year, month);
    } else {
      return this.getFirstDayOfHijriMonth(year, month);
    }
  }

  /**
   * Get season name
   */
  getSeason(jalaliMonth: number): string {
    return JalaliCalendarUtils.getSeason(jalaliMonth);
  }

  /**
   * Get week number
   */
  getWeekNumber(jalaliYear: number, jalaliMonth: number, jalaliDay: number): number {
    return JalaliCalendarUtils.getWeekNumber(jalaliYear, jalaliMonth, jalaliDay);
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Format Jalali date with custom pattern and locale support
   * Patterns: YYYY-MM-DD, DD MMMM YYYY, DD MMM YYYY, YYYY/MM/DD, DD/MM/YYYY
   */
  formatJalaliDate(date: { year: number; month: number; day: number }, pattern?: string): string {
    if (!pattern) {
      // Default format
      const monthName = this.getJalaliMonthName(date.month);
      if (this.locale === 'en') {
        return `${monthName} ${date.day}, ${date.year}`;
      }
      return `${date.day} ${monthName} ${date.year}`;
    }

    return this.applyDatePattern(date, pattern, 'jalali');
  }

  /**
   * Format Gregorian date with custom pattern and locale support
   */
  formatGregorianDate(date: Date, pattern?: string): string {
    const gregorianDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };

    if (!pattern) {
      // Default format
      const monthNames = {
        fa: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
             'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
        en: ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December']
      };

      const monthName = monthNames[this.locale][gregorianDate.month - 1];

      if (this.locale === 'en') {
        return `${monthName} ${gregorianDate.day}, ${gregorianDate.year}`;
      }
      return `${gregorianDate.day} ${monthName} ${gregorianDate.year}`;
    }

    return this.applyDatePattern(gregorianDate, pattern, 'gregorian');
  }

  /**
   * Format Hijri date with custom pattern and locale support
   */
  formatHijriDate(date: { year: number; month: number; day: number }, pattern?: string): string {
    if (!pattern) {
      // Default format
      const monthNames = {
        fa: ['محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی',
             'رجب', 'شعبان', 'رمضان', 'شوال', 'ذیقعده', 'ذیحجه'],
        en: ['Muharram', 'Safar', 'Rabi al-awwal', 'Rabi al-thani', 'Jumada al-awwal', 'Jumada al-thani',
             'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah']
      };

      const monthName = monthNames[this.locale][date.month - 1];

      if (this.locale === 'en') {
        return `${monthName} ${date.day}, ${date.year} AH`;
      }
      return `${date.day} ${monthName} ${date.year} هجری قمری`;
    }

    return this.applyDatePattern(date, pattern, 'hijri');
  }

  /**
   * Apply date pattern formatting
   * Supported patterns:
   * - YYYY: 4-digit year
   * - YY: 2-digit year
   * - MM: 2-digit month
   * - M: 1 or 2-digit month
   * - DD: 2-digit day
   * - D: 1 or 2-digit day
   * - MMMM: Full month name
   * - MMM: Abbreviated month name
   * - dddd: Full day name
   * - ddd: Abbreviated day name
   */
  private applyDatePattern(date: { year: number; month: number; day: number }, pattern: string | undefined, calendarType: 'jalali' | 'gregorian' | 'hijri'): string {
    if (!pattern) {
      return '';
    }

    // Build the result by processing the pattern character by character
    let result = '';
    let i = 0;
    
    while (i < pattern.length) {
      // Check for MMMM (full month name)
      if (pattern.substr(i, 4) === 'MMMM') {
        result += this.getMonthName(date.month, calendarType, 'full');
        i += 4;
      }
      // Check for MMM (short month name)
      else if (pattern.substr(i, 3) === 'MMM') {
        result += this.getMonthName(date.month, calendarType, 'short');
        i += 3;
      }
      // Check for YYYY (4-digit year)
      else if (pattern.substr(i, 4) === 'YYYY') {
        result += String(date.year).padStart(4, '0');
        i += 4;
      }
      // Check for YY (2-digit year)
      else if (pattern.substr(i, 2) === 'YY') {
        result += String(date.year).slice(-2).padStart(2, '0');
        i += 2;
      }
      // Check for dddd (full day name)
      else if (pattern.substr(i, 4) === 'dddd') {
        const gregorianDate = this.getGregorianDateFromCalendar(date, calendarType);
        const dayOfWeek = gregorianDate.getDay();
        result += this.getDayNameFull(dayOfWeek, calendarType);
        i += 4;
      }
      // Check for ddd (short day name)
      else if (pattern.substr(i, 3) === 'ddd') {
        const gregorianDate = this.getGregorianDateFromCalendar(date, calendarType);
        const dayOfWeek = gregorianDate.getDay();
        result += this.getDayNameShort(dayOfWeek, calendarType);
        i += 3;
      }
      // Check for DD (2-digit day)
      else if (pattern.substr(i, 2) === 'DD') {
        result += String(date.day).padStart(2, '0');
        i += 2;
      }
      // Check for MM (2-digit month)
      else if (pattern.substr(i, 2) === 'MM') {
        result += String(date.month).padStart(2, '0');
        i += 2;
      }
      // Check for D (1 or 2-digit day)
      else if (pattern[i] === 'D' && pattern[i + 1] !== 'D') {
        result += String(date.day);
        i += 1;
      }
      // Check for M (1 or 2-digit month)
      else if (pattern[i] === 'M' && pattern[i + 1] !== 'M') {
        result += String(date.month);
        i += 1;
      }
      // Check for Y (single Y - not a valid pattern, just add it)
      else if (pattern[i] === 'Y' && pattern[i + 1] !== 'Y') {
        result += pattern[i];
        i += 1;
      }
      // Regular character
      else {
        result += pattern[i];
        i += 1;
      }
    }

    return result;
  }

  /**
   * Get month name with support for full and short formats
   */
  private getMonthName(month: number, calendarType: 'jalali' | 'gregorian' | 'hijri', format: 'full' | 'short'): string {
    if (calendarType === 'jalali') {
      const fullNames = {
        fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
             'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        en: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
             'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand']
      };
      const shortNames = {
        fa: ['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف'],
        en: ['Far', 'Ord', 'Kho', 'Tir', 'Mor', 'Sha', 'Meh', 'Aba', 'Aza', 'Dey', 'Bah', 'Esf']
      };
      return format === 'full' ? fullNames[this.locale][month - 1] : shortNames[this.locale][month - 1];
    } else if (calendarType === 'gregorian') {
      const fullNames = {
        fa: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
             'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
        en: ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December']
      };
      const shortNames = {
        fa: ['ژان', 'فور', 'مار', 'آور', 'مه', 'ژوئ', 'ژوئ', 'اوت', 'سپت', 'اکت', 'نوا', 'دسا'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      };
      return format === 'full' ? fullNames[this.locale][month - 1] : shortNames[this.locale][month - 1];
    } else {
      // Hijri
      const fullNames = {
        fa: ['محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی',
             'رجب', 'شعبان', 'رمضان', 'شوال', 'ذیقعده', 'ذیحجه'],
        en: ['Muharram', 'Safar', 'Rabi al-awwal', 'Rabi al-thani', 'Jumada al-awwal', 'Jumada al-thani',
             'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah']
      };
      const shortNames = {
        fa: ['محر', 'صفر', 'ربیع', 'ربیع', 'جمادی', 'جمادی', 'رجب', 'شعب', 'رمض', 'شوا', 'ذیق', 'ذیح'],
        en: ['Muh', 'Saf', 'Rab', 'Rab', 'Jum', 'Jum', 'Raj', 'Sha', 'Ram', 'Sha', 'Dhu', 'Dhu']
      };
      return format === 'full' ? fullNames[this.locale][month - 1] : shortNames[this.locale][month - 1];
    }
  }

  /**
   * Get full day name
   */
  private getDayNameFull(dayOfWeek: number, calendarType: 'jalali' | 'gregorian' | 'hijri'): string {
    const dayNames = {
      fa: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
      en: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    };
    return dayNames[this.locale][dayOfWeek];
  }

  /**
   * Get short day name
   */
  private getDayNameShort(dayOfWeek: number, calendarType: 'jalali' | 'gregorian' | 'hijri'): string {
    const dayNames = {
      fa: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
      en: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    };
    return dayNames[this.locale][dayOfWeek];
  }

  /**
   * Convert date from any calendar type to Gregorian for day of week calculation
   */
  private getGregorianDateFromCalendar(date: { year: number; month: number; day: number }, calendarType: 'jalali' | 'gregorian' | 'hijri'): Date {
    if (calendarType === 'gregorian') {
      return new Date(date.year, date.month - 1, date.day);
    } else if (calendarType === 'jalali') {
      return this.jalaliToGregorianDate(date.year, date.month, date.day);
    } else {
      return this.hijriToGregorian(date.year, date.month, date.day);
    }
  }

  /**
   * Get Gregorian month name
   */
  getGregorianMonthName(month: number): string {
    const monthNames = {
      fa: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
           'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
      en: ['January', 'February', 'March', 'April', 'May', 'June',
           'July', 'August', 'September', 'October', 'November', 'December']
    };
    return monthNames[this.locale][month - 1];
  }

  /**
   * Get Hijri month name
   */
  getHijriMonthName(month: number): string {
    const monthNames = {
      fa: ['محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی',
           'رجب', 'شعبان', 'رمضان', 'شوال', 'ذیقعده', 'ذیحجه'],
      en: ['Muharram', 'Safar', 'Rabi al-awwal', 'Rabi al-thani', 'Jumada al-awwal', 'Jumada al-thani',
           'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah']
    };
    return monthNames[this.locale][month - 1];
  }
}

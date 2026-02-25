/**
 * Jalali Calendar Utilities
 * Vanilla TypeScript implementation with no external dependencies
 * 
 * ابزارهای تقویم جلالی
 * پیاده‌سازی TypeScript خالص بدون وابستگی‌های خارجی
 */

export class JalaliCalendarUtils {
  /**
   * Persian names of Jalali months
   * نام‌های فارسی ماه‌های جلالی
   */
  static readonly jalaliMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  /**
   * Persian names of Jalali weekdays
   * نام‌های فارسی روزهای هفته جلالی
   */
  static readonly jalaliWeekDays = [
    'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'
  ];

  /**
   * Persian names of Gregorian months
   * نام‌های فارسی ماه‌های میلادی
   */
  static readonly gregorianMonths = [
    'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
    'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
  ];

  /**
   * Persian names of Gregorian weekdays
   * نام‌های فارسی روزهای هفته میلادی
   */
  static readonly gregorianWeekDays = [
    'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'
  ];

  /**
   * Persian names of Hijri months
   * نام‌های فارسی ماه‌های قمری
   */
  static readonly hijriMonths = [
    'محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذیقعده', 'ذیحجه'
  ];

  /**
   * Persian names of seasons
   * نام‌های فارسی فصول
   */
  static readonly seasons = [
    'بهار', 'تابستان', 'پاییز', 'زمستان'
  ];

  /**
   * Convert Gregorian date to Jalali date
   * Accurate algorithm for all years
   * 
   * تبدیل تاریخ میلادی به جلالی
   * الگوریتم دقیق برای تمام سال‌ها
   * 
   * @param gregorianDate - Gregorian date object
   * @returns Object with year, month, day in Jalali calendar
   */
  static gregorianToJalali(gregorianDate: Date): { year: number; month: number; day: number } {
    let gy: number = gregorianDate.getFullYear();
    const gm: number = gregorianDate.getMonth() + 1;
    const gd: number = gregorianDate.getDate();

    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    
    let jy: number;
    if (gy > 1600) {
      jy = 979;
      gy -= 1600;
    } else {
      jy = 0;
      gy -= 621;
    }

    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) + 
               (Math.floor((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;

    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }

    let jm: number;
    let jd: number;
    
    if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }

    return { year: jy, month: jm, day: jd };
  }

  /**
   * Convert Jalali date to Gregorian date
   * Standard Kazimierz M. Borkowski algorithm
   * 
   * تبدیل تاریخ جلالی به میلادی
   * الگوریتم استاندارد Kazimierz M. Borkowski
   * 
   * @param jalaliYear - Jalali year
   * @param jalaliMonth - Jalali month (1-12)
   * @param jalaliDay - Jalali day (1-31)
   * @returns Gregorian date object
   */
  static jalaliToGregorian(jalaliYear: number, jalaliMonth: number, jalaliDay: number): Date {
    const jy = jalaliYear;
    const jm = jalaliMonth;
    const jd = jalaliDay;
    
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    
    let gy: number;
    let gm: number;
    let gd: number;
    
    let jy2 = (jy > 979) ? jy - 979 : jy;
    let days = (365 * jy2) + (Math.floor(jy2 / 33) * 8) + Math.floor(((jy2 % 33) + 3) / 4) + 78 + jd;
    
    if (jm < 7) {
      days += (jm - 1) * 31;
    } else {
      days += ((jm - 7) * 30) + 186;
    }
    
    gy = (jy > 979) ? 1600 : 621;
    
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    
    let leap = true;
    if (days >= 36525) {
      days--;
      gy += 100 * Math.floor(days / 36524);
      days %= 36524;
      if (days >= 365) {
        days++;
      }
      leap = false;
    }
    
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    
    if (days >= 366) {
      leap = false;
      days--;
      gy += Math.floor(days / 365);
      days %= 365;
    }
    
    for (gm = 0; g_d_m[gm] + ((gm === 1 && leap) ? 1 : 0) <= days && gm < 12; gm++) {
      // empty
    }
    
    gd = days - g_d_m[gm - 1] - ((gm === 2 && leap) ? 1 : 0) + 1;
    
    // Return date at noon to avoid timezone issues
    return new Date(gy, gm - 1, gd, 12, 0, 0, 0);
  }

  /**
   * Convert Gregorian date to Hijri date
   * Simple and accurate algorithm
   * 
   * تبدیل میلادی به قمری
   * الگوریتم ساده و دقیق
   * 
   * @param gregorianDate - Gregorian date object
   * @returns Object with year, month, day in Hijri calendar
   */
  static gregorianToHijri(gregorianDate: Date): { year: number; month: number; day: number } {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth() + 1;
    const gDay = gregorianDate.getDate();
    
    const gy = gYear;
    const gm = gMonth;
    const gd = gDay;
    
    let jd: number;
    if ((gy > 1582) || ((gy === 1582) && (gm > 10)) || ((gy === 1582) && (gm === 10) && (gd > 14))) {
      jd = Math.floor((1461 * (gy + 4800 + Math.floor((gm - 14) / 12))) / 4) +
           Math.floor((367 * (gm - 2 - 12 * (Math.floor((gm - 14) / 12)))) / 12) -
           Math.floor((3 * (Math.floor((gy + 4900 + Math.floor((gm - 14) / 12)) / 100))) / 4) +
           gd - 32075;
    } else {
      jd = 367 * gy - Math.floor((7 * (gy + 5001 + Math.floor((gm - 9) / 7))) / 4) +
           Math.floor((275 * gm) / 9) + gd + 1729777;
    }
    
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) +
              (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
    const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
               (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    const m = Math.floor((24 * l3) / 709);
    const d = l3 - Math.floor((709 * m) / 24);
    const y = 30 * n + j - 30;
    
    return { year: y, month: m, day: d };
  }

  /**
   * Convert Hijri date to Gregorian date
   * Simple and accurate algorithm
   * 
   * تبدیل قمری به میلادی
   * الگوریتم ساده و دقیق
   * 
   * @param hijriYear - Hijri year
   * @param hijriMonth - Hijri month (1-12)
   * @param hijriDay - Hijri day (1-30)
   * @returns Gregorian date object
   */
  static hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
    const hYear = hijriYear;
    const hMonth = hijriMonth;
    const hDay = hijriDay;
    
    const jd = Math.floor((11 * hYear + 3) / 30) +
               354 * hYear +
               30 * hMonth -
               Math.floor((hMonth - 1) / 2) +
               hDay +
               1948440 - 385;
    
    let b: number;
    let c: number;
    let d: number;
    let e: number;
    
    if (jd > 2299160) {
      const a = jd + 32044;
      b = Math.floor((4 * a + 3) / 146097);
      c = a - Math.floor((b * 146097) / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    
    d = Math.floor((4 * c + 3) / 1461);
    e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    
    const gDay = e - Math.floor((153 * m + 2) / 5) + 1;
    const gMonth = m + 3 - 12 * Math.floor(m / 10);
    const gYear = b * 100 + d - 4800 + Math.floor(m / 10);
    
    return new Date(gYear, gMonth - 1, gDay, 12, 0, 0, 0);
  }

  /**
   * Get number of days in Hijri month
   * 
   * دریافت روزهای ماه قمری
   * 
   * @param year - Hijri year
   * @param month - Hijri month (1-12)
   * @returns Number of days in the month
   */
  static getDaysInHijriMonth(year: number, month: number): number {
    const daysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    
    if (this.isHijriLeapYear(year)) {
      daysInMonth[11] = 30; // Last month in leap year
    }
    
    return daysInMonth[month - 1];
  }

  /**
   * Check if Hijri year is a leap year
   * 
   * بررسی سال کبیسه قمری
   * 
   * @param year - Hijri year
   * @returns True if leap year, false otherwise
   */
  static isHijriLeapYear(year: number): boolean {
    const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
    return leapYears.includes(year % 30);
  }

  /**
   * Get first day of Hijri month (Saturday = 0)
   * 
   * دریافت اولین روز ماه قمری (شنبه = 0)
   * 
   * @param year - Hijri year
   * @param month - Hijri month (1-12)
   * @returns Day of week (0-6, Saturday = 0)
   */
  static getFirstDayOfHijriMonth(year: number, month: number): number {
    const gregorianDate = this.hijriToGregorian(year, month, 1);
    return (gregorianDate.getDay() + 1) % 7;
  }

  /**
   * Get Jalali month name
   * 
   * دریافت نام ماه جلالی
   * 
   * @param month - Month number (1-12)
   * @returns Month name in Persian
   */
  static getJalaliMonthName(month: number): string {
    return this.jalaliMonths[month - 1];
  }

  /**
   * Get Jalali weekday name
   * 
   * دریافت نام روز هفته جلالی
   * 
   * @param dayOfWeek - Day of week (0-6)
   * @returns Day name in Persian
   */
  static getJalaliDayName(dayOfWeek: number): string {
    return this.jalaliWeekDays[dayOfWeek];
  }

  /**
   * Get season name for Jalali month
   * 
   * دریافت نام فصل
   * 
   * @param jalaliMonth - Jalali month (1-12)
   * @returns Season name in Persian
   */
  static getSeason(jalaliMonth: number): string {
    if (jalaliMonth >= 1 && jalaliMonth <= 3) return this.seasons[0]; // Spring
    if (jalaliMonth >= 4 && jalaliMonth <= 6) return this.seasons[1]; // Summer
    if (jalaliMonth >= 7 && jalaliMonth <= 9) return this.seasons[2]; // Fall
    return this.seasons[3]; // Winter
  }

  /**
   * Check if date is an official holiday
   * 
   * بررسی تعطیل رسمی
   * 
   * @param jalaliDate - Jalali date object
   * @returns Object with isHoliday flag and type
   */
  static isHoliday(jalaliDate: { year: number; month: number; day: number }): { isHoliday: boolean; type: 'official' | 'non-official' | null } {
    const holidays: Array<{ month: number; day: number; type: 'official' | 'non-official' }> = [
      { month: 1, day: 1, type: 'official' },
      { month: 1, day: 2, type: 'official' },
      { month: 1, day: 3, type: 'official' },
      { month: 1, day: 4, type: 'official' },
      { month: 1, day: 5, type: 'official' },
      { month: 1, day: 6, type: 'official' },
      { month: 1, day: 7, type: 'official' },
      { month: 1, day: 12, type: 'official' },
      { month: 2, day: 13, type: 'official' },
      { month: 3, day: 14, type: 'official' },
      { month: 11, day: 22, type: 'official' },
      { month: 12, day: 9, type: 'official' }
    ];

    const holiday = holidays.find(h => h.month === jalaliDate.month && h.day === jalaliDate.day);
    if (holiday) {
      return { isHoliday: true, type: holiday.type };
    }

    const nonOfficialHolidays: Array<{ month: number; day: number; type: 'official' | 'non-official' }> = [
      { month: 1, day: 13, type: 'non-official' },
      { month: 2, day: 14, type: 'non-official' }
    ];

    const nonOfficial = nonOfficialHolidays.find(h => h.month === jalaliDate.month && h.day === jalaliDate.day);
    if (nonOfficial) {
      return { isHoliday: true, type: nonOfficial.type };
    }

    return { isHoliday: false, type: null };
  }

  /**
   * Get events for a specific date
   * 
   * دریافت رویدادهای روز
   * 
   * @param jalaliDate - Jalali date object
   * @returns Array of event names
   */
  static getEvents(jalaliDate: { year: number; month: number; day: number }): string[] {
    const events = [
      { month: 1, day: 1, events: ['نوروز'] },
      { month: 1, day: 12, events: ['روز جمهوری اسلامی'] },
      { month: 2, day: 13, events: ['روز طبیعت'] },
      { month: 3, day: 14, events: ['روز شهادت امام علی'] },
      { month: 11, day: 22, events: ['روز مبارزه یکم'] },
      { month: 12, day: 9, events: ['روز معارف'] }
    ];

    const dayEvents = events.find(e => e.month === jalaliDate.month && e.day === jalaliDate.day);
    return dayEvents ? dayEvents.events : [];
  }

  /**
   * Get week number for a Jalali date
   * 
   * دریافت شماره هفته
   * 
   * @param jalaliYear - Jalali year
   * @param jalaliMonth - Jalali month (1-12)
   * @param jalaliDay - Jalali day (1-31)
   * @returns Week number
   */
  static getWeekNumber(jalaliYear: number, jalaliMonth: number, jalaliDay: number): number {
    const gregorianDate = this.jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay);
    const startOfYear = this.jalaliToGregorian(jalaliYear, 1, 1);
    const days = Math.floor((gregorianDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return Math.floor(days / 7) + 1;
  }

  /**
   * Format Jalali date as string
   * 
   * فرمت تاریخ جلالی
   * 
   * @param date - Jalali date object
   * @returns Formatted date string
   */
  static formatJalaliDate(date: { year: number; month: number; day: number }): string {
    const monthName = this.getJalaliMonthName(date.month);
    return `${date.day} ${monthName} ${date.year}`;
  }

  /**
   * Format Gregorian date as string
   * 
   * فرمت تاریخ میلادی
   * 
   * @param date - Gregorian date object
   * @returns Formatted date string
   */
  static formatGregorianDate(date: Date): string {
    const monthNames = this.gregorianMonths;
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  /**
   * Format Hijri date as string
   * 
   * فرمت تاریخ قمری
   * 
   * @param date - Hijri date object
   * @returns Formatted date string
   */
  static formatHijriDate(date: { year: number; month: number; day: number }): string {
    const monthName = this.hijriMonths[date.month - 1];
    return `${date.day} ${monthName} ${date.year} هجری قمری`;
  }

  /**
   * Get number of days in Jalali month
   * 
   * دریافت روزهای ماه جلالی
   * 
   * @param year - Jalali year
   * @param month - Jalali month (1-12)
   * @returns Number of days in the month
   */
  static getDaysInJalaliMonth(year: number, month: number): number {
    const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    const isLeap = this.isJalaliLeapYear(year);
    return month === 12 && isLeap ? 30 : daysInMonth[month - 1];
  }

  /**
   * Check if Jalali year is a leap year
   * 
   * بررسی سال کبیسه جلالی
   * 
   * @param year - Jalali year
   * @returns True if leap year, false otherwise
   */
  static isJalaliLeapYear(year: number): boolean {
    return (((year - 979) % 33) % 4 === 0);
  }

  /**
   * Get first day of Jalali month (Saturday = 0)
   * 
   * دریافت اولین روز ماه جلالی (شنبه = 0)
   * 
   * @param year - Jalali year
   * @param month - Jalali month (1-12)
   * @returns Day of week (0-6, Saturday = 0)
   */
  static getFirstDayOfJalaliMonth(year: number, month: number): number {
    const gregorianDate = this.jalaliToGregorian(year, month, 1);
    return (gregorianDate.getDay() + 1) % 7;
  }
}

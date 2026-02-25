/**
 * Holiday interface
 * Represents a holiday with its details
 *
 * @interface Holiday
 * @property {string} id - Unique identifier for the holiday
 * @property {string} name - Holiday name
 * @property {number} jalaliMonth - Jalali month (1-12)
 * @property {number} jalaliDay - Jalali day (1-31)
 * @property {'official' | 'non-official' | 'religious' | 'custom'} type - Holiday type
 * @property {string} [description] - Optional holiday description
 * @property {string} [source] - Optional source information
 */
export interface Holiday {
  id: string;
  name: string;
  jalaliMonth: number;
  jalaliDay: number;
  type: 'official' | 'non-official' | 'religious' | 'custom';
  description?: string;
  source?: string;
}

/**
 * Vanilla TypeScript HolidaysService
 * Manages holidays and provides holiday-related utilities
 * No Angular dependencies
 *
 * خدمة إدارة الأعياد
 * تدير الأعياد وتوفر أدوات مرتبطة بالأعياد
 */
export class HolidaysService {
  private holidays: Holiday[] = [];
  private defaultHolidaysInitialized = false;
  private jalaliDateService: any; // Optional JalaliDateService

  /**
   * Constructor
   * @param {any} [jalaliDateService] - Optional JalaliDateService instance
   */
  constructor(jalaliDateService?: any) {
    this.jalaliDateService = jalaliDateService;
    this.initializeDefaultHolidays();
  }

  /**
   * Initialize default holidays
   * Includes 16 default Iranian holidays
   *
   * تهيئة الأعياد الافتراضية
   * تتضمن 16 عطلة إيرانية افتراضية
   */
  private initializeDefaultHolidays(): void {
    if (this.defaultHolidaysInitialized) {
      return;
    }

    const defaultHolidays: Holiday[] = [
      // Nowruz (Persian New Year) - 7 days
      {
        id: 'nowruz-1',
        name: 'Nowruz Day 1',
        jalaliMonth: 1,
        jalaliDay: 1,
        type: 'official',
        description: 'First day of Persian New Year',
        source: 'Iranian Calendar'
      },
      {
        id: 'nowruz-2',
        name: 'Nowruz Day 2',
        jalaliMonth: 1,
        jalaliDay: 2,
        type: 'official',
        description: 'Second day of Persian New Year',
        source: 'Iranian Calendar'
      },
      {
        id: 'nowruz-3',
        name: 'Nowruz Day 3',
        jalaliMonth: 1,
        jalaliDay: 3,
        type: 'official',
        description: 'Third day of Persian New Year',
        source: 'Iranian Calendar'
      },
      {
        id: 'nowruz-4',
        name: 'Nowruz Day 4',
        jalaliMonth: 1,
        jalaliDay: 4,
        type: 'official',
        description: 'Fourth day of Persian New Year',
        source: 'Iranian Calendar'
      },
      {
        id: 'nowruz-5',
        name: 'Nowruz Day 5',
        jalaliMonth: 1,
        jalaliDay: 5,
        type: 'official',
        description: 'Fifth day of Persian New Year',
        source: 'Iranian Calendar'
      },
      {
        id: 'nowruz-6',
        name: 'Nowruz Day 6',
        jalaliMonth: 1,
        jalaliDay: 6,
        type: 'official',
        description: 'Sixth day of Persian New Year',
        source: 'Iranian Calendar'
      },
      {
        id: 'nowruz-7',
        name: 'Nowruz Day 7',
        jalaliMonth: 1,
        jalaliDay: 7,
        type: 'official',
        description: 'Seventh day of Persian New Year',
        source: 'Iranian Calendar'
      },
      // Republic Day
      {
        id: 'republic-day',
        name: 'Republic Day',
        jalaliMonth: 1,
        jalaliDay: 11,
        type: 'official',
        description: 'Islamic Republic Day',
        source: 'Iranian Calendar'
      },
      // Nature Day
      {
        id: 'nature-day',
        name: 'Nature Day',
        jalaliMonth: 1,
        jalaliDay: 13,
        type: 'non-official',
        description: 'Sizdah Bedar (13th day of Nowruz)',
        source: 'Iranian Calendar'
      },
      // Oil Day
      {
        id: 'oil-day',
        name: 'Oil Day',
        jalaliMonth: 11,
        jalaliDay: 29,
        type: 'official',
        description: 'National Oil Day',
        source: 'Iranian Calendar'
      },
      // Resistance Day
      {
        id: 'resistance-day',
        name: 'Resistance Day',
        jalaliMonth: 11,
        jalaliDay: 27,
        type: 'official',
        description: 'Day of Resistance',
        source: 'Iranian Calendar'
      },
      // Education Day
      {
        id: 'education-day',
        name: 'Education Day',
        jalaliMonth: 12,
        jalaliDay: 25,
        type: 'official',
        description: 'Teachers Day',
        source: 'Iranian Calendar'
      },
      // Sizdah Bedar (already included as Nature Day, but adding as separate entry)
      {
        id: 'sizdah-bedar',
        name: 'Sizdah Bedar',
        jalaliMonth: 1,
        jalaliDay: 13,
        type: 'non-official',
        description: 'Thirteenth day of Nowruz',
        source: 'Iranian Calendar'
      },
      // Ashura
      {
        id: 'ashura',
        name: 'Ashura',
        jalaliMonth: 9,
        jalaliDay: 9,
        type: 'religious',
        description: 'Day of Ashura',
        source: 'Islamic Calendar'
      },
      // Eid Fitr
      {
        id: 'eid-fitr',
        name: 'Eid Fitr',
        jalaliMonth: 10,
        jalaliDay: 1,
        type: 'religious',
        description: 'Eid al-Fitr',
        source: 'Islamic Calendar'
      },
      // Eid Adha
      {
        id: 'eid-adha',
        name: 'Eid Adha',
        jalaliMonth: 12,
        jalaliDay: 10,
        type: 'religious',
        description: 'Eid al-Adha',
        source: 'Islamic Calendar'
      }
    ];

    this.holidays = [...defaultHolidays];
    this.defaultHolidaysInitialized = true;
  }

  /**
   * Get all holidays
   * @returns {Holiday[]} Array of all holidays
   */
  getAllHolidays(): Holiday[] {
    return [...this.holidays];
  }

  /**
   * Get holidays for a specific month
   * @param {number} month - Jalali month (1-12)
   * @returns {Holiday[]} Array of holidays in the month
   */
  getHolidaysForMonth(month: number): Holiday[] {
    return this.holidays.filter(h => h.jalaliMonth === month);
  }

  /**
   * Get holidays for a specific year
   * Note: Jalali calendar doesn't have year-specific holidays in this implementation
   * @param {number} year - Jalali year
   * @returns {Holiday[]} Array of all holidays (same for all years)
   */
  getHolidaysForYear(year: number): Holiday[] {
    return [...this.holidays];
  }

  /**
   * Check if a date is a holiday
   * @param {Object} jalaliDate - Jalali date object
   * @param {number} jalaliDate.month - Jalali month
   * @param {number} jalaliDate.day - Jalali day
   * @returns {boolean} True if the date is a holiday
   */
  isHolidayByJalali(jalaliDate: { month: number; day: number }): boolean {
    return this.holidays.some(
      h => h.jalaliMonth === jalaliDate.month && h.jalaliDay === jalaliDate.day
    );
  }

  /**
   * Get holiday information by Jalali date
   * @param {Object} jalaliDate - Jalali date object
   * @param {number} jalaliDate.month - Jalali month
   * @param {number} jalaliDate.day - Jalali day
   * @returns {Holiday | null} Holiday object or null if not found
   */
  getHolidayInfoByJalali(jalaliDate: { month: number; day: number }): Holiday | null {
    return (
      this.holidays.find(
        h => h.jalaliMonth === jalaliDate.month && h.jalaliDay === jalaliDate.day
      ) || null
    );
  }

  /**
   * Add a new holiday
   * @param {Holiday} holiday - Holiday object to add
   */
  addHoliday(holiday: Holiday): void {
    if (!this.hasHoliday(holiday.id)) {
      this.holidays.push(holiday);
    }
  }

  /**
   * Remove a holiday by ID
   * @param {string} holidayId - Holiday ID to remove
   * @returns {boolean} True if holiday was removed
   */
  removeHoliday(holidayId: string): boolean {
    const index = this.holidays.findIndex(h => h.id === holidayId);
    if (index > -1) {
      this.holidays.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Update an existing holiday
   * @param {Holiday} holiday - Updated holiday object
   */
  updateHoliday(holiday: Holiday): void {
    const index = this.holidays.findIndex(h => h.id === holiday.id);
    if (index > -1) {
      this.holidays[index] = holiday;
    }
  }

  /**
   * Get holidays by type
   * @param {string} type - Holiday type ('official' | 'non-official' | 'religious' | 'custom')
   * @returns {Holiday[]} Array of holidays of the specified type
   */
  getHolidaysByType(type: 'official' | 'non-official' | 'religious' | 'custom'): Holiday[] {
    return this.holidays.filter(h => h.type === type);
  }

  /**
   * Clear all custom holidays
   * Keeps only default holidays
   */
  clearCustomHolidays(): void {
    this.holidays = this.holidays.filter(h => h.type !== 'custom');
  }

  /**
   * Get all official holidays
   * @returns {Holiday[]} Array of official holidays
   */
  getOfficialHolidays(): Holiday[] {
    return this.getHolidaysByType('official');
  }

  /**
   * Get all religious holidays
   * @returns {Holiday[]} Array of religious holidays
   */
  getReligiousHolidays(): Holiday[] {
    return this.getHolidaysByType('religious');
  }

  /**
   * Check if a Gregorian date is an official holiday
   * @param {Date} date - Gregorian date
   * @returns {boolean} True if the date is an official holiday
   */
  isOfficialHoliday(date: Date): boolean {
    if (!this.jalaliDateService) {
      return false;
    }

    const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
    const holiday = this.getHolidayInfoByJalali({
      month: jalaliDate.month,
      day: jalaliDate.day
    });

    return holiday ? holiday.type === 'official' : false;
  }

  /**
   * Check if a Gregorian date is a non-official holiday
   * @param {Date} date - Gregorian date
   * @returns {boolean} True if the date is a non-official holiday
   */
  isNonOfficialHoliday(date: Date): boolean {
    if (!this.jalaliDateService) {
      return false;
    }

    const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
    const holiday = this.getHolidayInfoByJalali({
      month: jalaliDate.month,
      day: jalaliDate.day
    });

    return holiday ? holiday.type === 'non-official' : false;
  }

  /**
   * Check if a date is a weekend
   * Friday = 5, Saturday = 6
   * @param {Date} date - Gregorian date
   * @returns {boolean} True if the date is a weekend
   */
  isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 5 || dayOfWeek === 6; // Friday or Saturday
  }

  /**
   * Get holiday information for a Gregorian date
   * @param {Date} date - Gregorian date
   * @returns {Object} Object with isHoliday flag and optional type
   */
  getHolidayInfo(date: Date): { isHoliday: boolean; type?: string } {
    if (!this.jalaliDateService) {
      return { isHoliday: false };
    }

    const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
    const holiday = this.getHolidayInfoByJalali({
      month: jalaliDate.month,
      day: jalaliDate.day
    });

    if (holiday) {
      return { isHoliday: true, type: holiday.type };
    }

    return { isHoliday: false };
  }

  /**
   * Check if a Gregorian date is a religious holiday
   * @param {Date} date - Gregorian date
   * @returns {boolean} True if the date is a religious holiday
   */
  isReligiousHoliday(date: Date): boolean {
    if (!this.jalaliDateService) {
      return false;
    }

    const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
    const holiday = this.getHolidayInfoByJalali({
      month: jalaliDate.month,
      day: jalaliDate.day
    });

    return holiday ? holiday.type === 'religious' : false;
  }

  /**
   * Get holidays for a Gregorian date
   * @param {Date} date - Gregorian date
   * @returns {Holiday[]} Array of holidays on that date
   */
  getHolidaysForDate(date: Date): Holiday[] {
    if (!this.jalaliDateService) {
      return [];
    }

    const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
    return this.holidays.filter(
      h => h.jalaliMonth === jalaliDate.month && h.jalaliDay === jalaliDate.day
    );
  }

  /**
   * Check if a date is a holiday or weekend
   * @param {Date} date - Gregorian date
   * @returns {boolean} True if the date is a holiday or weekend
   */
  isHolidayOrWeekend(date: Date): boolean {
    return this.isWeekend(date) || this.getHolidaysForDate(date).length > 0;
  }

  /**
   * Get the next holiday from a given date
   * @param {Date} fromDate - Starting date
   * @returns {Holiday | null} Next holiday or null if not found
   */
  getNextHoliday(fromDate: Date): Holiday | null {
    if (!this.jalaliDateService) {
      return null;
    }

    const startJalali = this.jalaliDateService.gregorianToJalali(fromDate);
    let currentDate = new Date(fromDate);
    currentDate.setDate(currentDate.getDate() + 1);

    // Search for the next 365 days
    for (let i = 0; i < 365; i++) {
      const jalaliDate = this.jalaliDateService.gregorianToJalali(currentDate);
      const holiday = this.getHolidayInfoByJalali({
        month: jalaliDate.month,
        day: jalaliDate.day
      });

      if (holiday) {
        return holiday;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return null;
  }

  /**
   * Get the previous holiday from a given date
   * @param {Date} fromDate - Starting date
   * @returns {Holiday | null} Previous holiday or null if not found
   */
  getPreviousHoliday(fromDate: Date): Holiday | null {
    if (!this.jalaliDateService) {
      return null;
    }

    let currentDate = new Date(fromDate);
    currentDate.setDate(currentDate.getDate() - 1);

    // Search for the previous 365 days
    for (let i = 0; i < 365; i++) {
      const jalaliDate = this.jalaliDateService.gregorianToJalali(currentDate);
      const holiday = this.getHolidayInfoByJalali({
        month: jalaliDate.month,
        day: jalaliDate.day
      });

      if (holiday) {
        return holiday;
      }

      currentDate.setDate(currentDate.getDate() - 1);
    }

    return null;
  }

  /**
   * Get holidays between two dates
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Holiday[]} Array of holidays between the dates
   */
  getHolidaysBetween(startDate: Date, endDate: Date): Holiday[] {
    if (!this.jalaliDateService) {
      return [];
    }

    const holidays: Holiday[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const jalaliDate = this.jalaliDateService.gregorianToJalali(currentDate);
      const holiday = this.getHolidayInfoByJalali({
        month: jalaliDate.month,
        day: jalaliDate.day
      });

      if (holiday && !holidays.find(h => h.id === holiday.id)) {
        holidays.push(holiday);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return holidays;
  }

  /**
   * Reset holidays to default
   * Removes all custom holidays and restores defaults
   */
  resetToDefaults(): void {
    this.holidays = [];
    this.defaultHolidaysInitialized = false;
    this.initializeDefaultHolidays();
  }

  /**
   * Get total count of holidays
   * @returns {number} Total number of holidays
   */
  getHolidayCount(): number {
    return this.holidays.length;
  }

  /**
   * Check if a holiday exists by ID
   * @param {string} holidayId - Holiday ID
   * @returns {boolean} True if holiday exists
   */
  hasHoliday(holidayId: string): boolean {
    return this.holidays.some(h => h.id === holidayId);
  }

  /**
   * Get a holiday by ID
   * @param {string} holidayId - Holiday ID
   * @returns {Holiday | null} Holiday object or null if not found
   */
  getHolidayById(holidayId: string): Holiday | null {
    return this.holidays.find(h => h.id === holidayId) || null;
  }
}

/**
 * Data models for Jalali Date Picker
 */

export interface JalaliDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}

export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}

export interface DayInfo {
  jalali: JalaliDate;
  gregorian: GregorianDate;
  hijri: HijriDate;
  isHoliday: boolean;
  holidayType: 'official' | 'non-official' | null;
  events: string[];
  season: string;
  weekNumber: number;
  notes?: string;
}

export type CalendarType = 'jalali' | 'gregorian' | 'hijri';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type SelectionMode = 'single' | 'range' | 'multiple';

export type DatePickerValue = Date | DateRange | Date[] | null;

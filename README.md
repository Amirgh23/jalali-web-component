# @lomineuro/jalali-web-component

A **framework-agnostic** Jalali Date Picker Web Component built with Vanilla TypeScript. Works seamlessly with React, Vue, Angular, Svelte, and Vanilla JavaScript.

## 🌟 Features

- **Framework-Agnostic**: Pure Web Component standard - works with any framework
- **Multiple Calendar Systems**: Jalali (Persian), Gregorian, and Hijri calendars
- **Three Selection Modes**: Single date, date range, and multiple dates
- **Shadow DOM Encapsulation**: Scoped styling with no conflicts
- **Custom Events**: Easy event-driven API
- **Bilingual Support**: Persian (فارسی) and English
- **RTL/LTR Support**: Full bidirectional text support
- **Type-Safe**: Complete TypeScript support
- **Performance Optimized**: Minimal bundle size, internal caching
- **Accessible**: ARIA labels and keyboard navigation

## 📦 Installation

```bash
npm install @lomineuro/jalali-web-component
```

## 🚀 Quick Start

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script src="node_modules/@lomineuro/jalali-web-component/dist/index.esm.js"></script>
</head>
<body>
  <jalali-date-picker
    locale="fa"
    selection-mode="single">
  </jalali-date-picker>

  <script>
    const picker = document.querySelector('jalali-date-picker');
    picker.addEventListener('dateSelect', (e) => {
      console.log('Selected:', e.detail.jalaliDate);
    });
  </script>
</body>
</html>
```

### React

```tsx
import { useRef, useEffect } from 'react';
import '@lomineuro/jalali-web-component';

export function DatePicker() {
  const pickerRef = useRef(null);

  useEffect(() => {
    pickerRef.current?.addEventListener('dateSelect', (e) => {
      console.log('Selected:', e.detail.jalaliDate);
    });
  }, []);

  return (
    <jalali-date-picker
      ref={pickerRef}
      locale="fa"
      selection-mode="single"
    />
  );
}
```

### Vue

```vue
<template>
  <jalali-date-picker
    ref="picker"
    locale="fa"
    @dateSelect="onDateSelect">
  </jalali-date-picker>
</template>

<script>
import '@lomineuro/jalali-web-component';

export default {
  methods: {
    onDateSelect(e) {
      console.log('Selected:', e.detail.jalaliDate);
    }
  }
}
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import '@lomineuro/jalali-web-component';

@Component({
  selector: 'app-date-picker',
  template: `
    <jalali-date-picker
      [attr.locale]="'fa'"
      [attr.selection-mode]="'single'"
      (dateSelect)="onDateSelect($event)">
    </jalali-date-picker>
  `
})
export class DatePickerComponent {
  onDateSelect(event: any) {
    console.log('Selected:', event.detail.jalaliDate);
  }
}
```

## 📋 API Reference

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | `'fa' \| 'en'` | `'fa'` | Display language |
| `selection-mode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Selection mode |
| `disabled-dates` | `string` | - | JSON array of disabled dates |
| `min-date` | `string` | - | Minimum selectable date (YYYY-MM-DD) |
| `max-date` | `string` | - | Maximum selectable date (YYYY-MM-DD) |
| `theme` | `string` | `'default'` | Theme name |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `dateSelect` | `{ jalaliDate, gregorianDate, hijriDate }` | Single date selected |
| `rangeSelect` | `{ start, end }` | Date range selected |
| `multipleSelect` | `{ dates: [] }` | Multiple dates selected |
| `localeChange` | `{ locale }` | Locale changed |

### Methods

```typescript
// Get selected date(s)
picker.getSelectedDate(): Date | null
picker.getSelectedRange(): { start: Date; end: Date } | null
picker.getSelectedDates(): Date[]

// Set selected date(s)
picker.setSelectedDate(date: Date): void
picker.setSelectedRange(start: Date, end: Date): void
picker.setSelectedDates(dates: Date[]): void

// Clear selection
picker.clearSelection(): void

// Set locale
picker.setLocale(locale: 'fa' | 'en'): void
```

## 🎨 Styling

The component uses Shadow DOM for style encapsulation. You can customize it with CSS variables:

```css
jalali-date-picker {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
  --border-radius: 8px;
}
```

## 📚 Examples

### Single Date Selection

```html
<jalali-date-picker
  locale="fa"
  selection-mode="single">
</jalali-date-picker>
```

### Date Range Selection

```html
<jalali-date-picker
  locale="fa"
  selection-mode="range">
</jalali-date-picker>
```

### Multiple Dates Selection

```html
<jalali-date-picker
  locale="fa"
  selection-mode="multiple">
</jalali-date-picker>
```

### With Disabled Dates

```html
<jalali-date-picker
  locale="fa"
  disabled-dates='["1402-01-01", "1402-01-02"]'>
</jalali-date-picker>
```

### With Date Range Limits

```html
<jalali-date-picker
  locale="fa"
  min-date="1402-01-01"
  max-date="1402-12-29">
</jalali-date-picker>
```

## 🔄 Calendar Systems

The component supports three calendar systems:

- **Jalali (Persian)**: Used in Iran, Afghanistan
- **Gregorian**: International standard
- **Hijri (Islamic)**: Used in Islamic countries

All conversions are bidirectional and accurate.

## 🌍 Localization

Supports multiple languages:

- **Persian (فارسی)**: `locale="fa"`
- **English**: `locale="en"`

## ♿ Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Focus management

## 📊 Performance

- **Bundle Size**: ~50KB (minified + gzipped)
- **No Dependencies**: Pure TypeScript
- **Internal Caching**: Optimized date conversions
- **Lazy Loading**: Components load on demand

## 🧪 Testing

```bash
npm test
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please visit:
- [GitHub Issues](https://github.com/lomineuro/jalali-web-component/issues)
- [Documentation](https://github.com/lomineuro/jalali-web-component#readme)

---

**Made with ❤️ for the Persian community**

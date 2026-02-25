# Contributing to Jalali Web Component

Thank you for your interest in contributing to the Jalali Web Component project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style & Conventions](#code-style--conventions)
- [Testing Requirements](#testing-requirements)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [License](#license)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Basic knowledge of TypeScript and Web Components

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/jalali-web-component.git
   cd jalali-web-component
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original-repo/jalali-web-component.git
   ```

## Development Setup

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm run test
   ```

### Project Structure

```
projects/jalali-web-component/
├── src/
│   ├── lib/
│   │   ├── web-component/          # Main web component
│   │   ├── core/
│   │   │   ├── services/           # Core services
│   │   │   └── utils/              # Utility functions
│   │   └── ...
│   └── public-api.ts
├── examples/                        # Framework integration examples
│   ├── angular/
│   ├── react/
│   ├── vue/
│   └── vanilla/
├── tests/                           # Test files
├── README.md
├── CHANGELOG.md
└── package.json
```

## Code Style & Conventions

### TypeScript

- Use TypeScript for all source files
- Enable strict mode in tsconfig.json
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

Example:
```typescript
/**
 * Converts Gregorian date to Jalali date
 * @param gregorianDate - The Gregorian date to convert
 * @returns The Jalali date object
 */
export function toJalali(gregorianDate: Date): JalaliDate {
  // Implementation
}
```

### Naming Conventions

- **Classes**: PascalCase (e.g., `JalaliDatePicker`)
- **Functions**: camelCase (e.g., `convertToJalali`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_DATE_RANGE`)
- **Private members**: Prefix with underscore (e.g., `_internalState`)
- **Interfaces**: Prefix with I (e.g., `IDateRange`)

### File Organization

- One class/interface per file
- Group related utilities in modules
- Use barrel exports (index.ts) for public APIs
- Keep files under 300 lines when possible

### CSS/SCSS

- Use CSS variables for theming
- Follow BEM naming convention for classes
- Keep styles scoped to components
- Use Shadow DOM for style encapsulation

Example:
```scss
:host {
  --primary-color: #007bff;
  --border-radius: 4px;
}

.calendar {
  border-radius: var(--border-radius);
  background-color: var(--primary-color);
}
```

## Testing Requirements

### Test Coverage

- Minimum 80% code coverage required
- All public APIs must have tests
- Critical functionality requires property-based tests

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- path/to/test.spec.ts
```

### Test Structure

```typescript
describe('JalaliDatePicker', () => {
  let component: JalaliDatePicker;

  beforeEach(() => {
    component = new JalaliDatePicker();
  });

  it('should convert Gregorian to Jalali date', () => {
    const gregorian = new Date(2024, 0, 1);
    const result = component.toJalali(gregorian);
    expect(result.year).toBe(1402);
  });

  it('should handle edge cases', () => {
    // Test edge cases
  });
});
```

### Property-Based Testing

Use fast-check for property-based tests:

```typescript
import fc from 'fast-check';

it('should maintain date bidirectionality', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const jalali = toJalali(date);
      const gregorian = toGregorian(jalali);
      expect(gregorian.getTime()).toBe(date.getTime());
    })
  );
});
```

## Commit Guidelines

### Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc.

### Examples

```
feat(calendar): add support for custom holidays

fix(date-picker): resolve RTL layout issues

docs(api): update API reference for new methods

test(utils): add property-based tests for date conversion
```

## Pull Request Process

### Before Submitting

1. Update your fork with latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. Make your changes and commit with proper messages

4. Push to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
- [ ] Coverage maintained/improved
```

### Review Process

1. At least one maintainer review required
2. All CI checks must pass
3. Code coverage must not decrease
4. All conversations must be resolved
5. Branch must be up to date with main

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (browser, OS, Node version)
- Code example or screenshot

### Feature Requests

Include:
- Clear description of the feature
- Use case and motivation
- Proposed API/interface
- Examples of usage

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

# مشارکت در Jalali Web Component

از علاقه‌مندی شما برای مشارکت در پروژه Jalali Web Component سپاسگزاریم! این سند راهنمایی و دستورالعمل‌های مشارکت را فراهم می‌کند.

## فهرست مطالب

- [قوانین رفتاری](#قوانین-رفتاری)
- [شروع کار](#شروع-کار)
- [راه‌اندازی توسعه](#راه‌اندازی-توسعه)
- [سبک کد و قراردادها](#سبک-کد-و-قراردادها)
- [الزامات آزمایش](#الزامات-آزمایش)
- [راهنمای Commit](#راهنمای-commit)
- [فرآیند Pull Request](#فرآیند-pull-request)
- [گزارش مشکلات](#گزارش-مشکلات)
- [مجوز](#مجوز)

## قوانین رفتاری

ما متعهد به فراهم کردن محیطی خوش‌آمد و فراگیر برای تمام مشارکین هستیم. لطفاً در تمام تعاملات احترام‌گذار و سازنده باشید.

## شروع کار

### پیش‌نیازها

- Node.js (نسخه 16 یا بالاتر)
- npm یا yarn
- Git
- دانش پایه‌ای از TypeScript و Web Components

### Fork و Clone

1. مخزن را در GitHub fork کنید
2. مخزن خود را به صورت محلی clone کنید:
   ```bash
   git clone https://github.com/your-username/jalali-web-component.git
   cd jalali-web-component
   ```
3. اضافه کردن upstream remote:
   ```bash
   git remote add upstream https://github.com/original-repo/jalali-web-component.git
   ```

## راه‌اندازی توسعه

### نصب

1. نصب وابستگی‌ها:
   ```bash
   npm install
   ```

2. ساخت پروژه:
   ```bash
   npm run build
   ```

3. اجرای سرور توسعه:
   ```bash
   npm run dev
   ```

4. اجرای آزمایش‌ها:
   ```bash
   npm run test
   ```

### ساختار پروژه

```
projects/jalali-web-component/
├── src/
│   ├── lib/
│   │   ├── web-component/          # web component اصلی
│   │   ├── core/
│   │   │   ├── services/           # سرویس‌های اصلی
│   │   │   └── utils/              # توابع کمکی
│   │   └── ...
│   └── public-api.ts
├── examples/                        # نمونه‌های یکپارچگی فریم‌ورک
│   ├── angular/
│   ├── react/
│   ├── vue/
│   └── vanilla/
├── tests/                           # فایل‌های آزمایش
├── README.md
├── CHANGELOG.md
└── package.json
```

## سبک کد و قراردادها

### TypeScript

- استفاده از TypeScript برای تمام فایل‌های منبع
- فعال کردن strict mode در tsconfig.json
- استفاده از نام‌های معنی‌دار برای متغیرها و توابع
- اضافه کردن JSDoc comments برای API های عمومی

مثال:
```typescript
/**
 * تبدیل تاریخ میلادی به جلالی
 * @param gregorianDate - تاریخ میلادی برای تبدیل
 * @returns شیء تاریخ جلالی
 */
export function toJalali(gregorianDate: Date): JalaliDate {
  // پیاده‌سازی
}
```

### قراردادهای نام‌گذاری

- **کلاس‌ها**: PascalCase (مثال: `JalaliDatePicker`)
- **توابع**: camelCase (مثال: `convertToJalali`)
- **ثابت‌ها**: UPPER_SNAKE_CASE (مثال: `MAX_DATE_RANGE`)
- **اعضای خصوصی**: پیشوند underscore (مثال: `_internalState`)
- **Interfaces**: پیشوند I (مثال: `IDateRange`)

### سازماندهی فایل‌ها

- یک کلاس/interface در هر فایل
- گروه‌بندی ابزارهای مرتبط در ماژول‌ها
- استفاده از barrel exports (index.ts) برای API های عمومی
- نگه‌داشتن فایل‌ها زیر 300 خط در صورت امکان

### CSS/SCSS

- استفاده از متغیرهای CSS برای تم‌سازی
- پیروی از قرارداد نام‌گذاری BEM برای کلاس‌ها
- نگه‌داشتن سبک‌ها محدود به اجزاء
- استفاده از Shadow DOM برای کپسول‌سازی سبک

مثال:
```scss
:host {
  --primary-color: #007bff;
  --border-radius: 4px;
}

.calendar {
  border-radius: var(--border-radius);
  background-color: var(--primary-color);
}
```

## الزامات آزمایش

### پوشش آزمایش

- حداقل 80% پوشش کد مورد نیاز
- تمام API های عمومی باید آزمایش شوند
- عملکرد حیاتی نیاز به آزمایش‌های مبتنی بر ویژگی دارد

### اجرای آزمایش‌ها

```bash
# اجرای تمام آزمایش‌ها
npm run test

# اجرای آزمایش‌ها در حالت watch
npm run test:watch

# اجرای آزمایش‌ها با پوشش
npm run test:coverage

# اجرای فایل آزمایش خاص
npm run test -- path/to/test.spec.ts
```

### ساختار آزمایش

```typescript
describe('JalaliDatePicker', () => {
  let component: JalaliDatePicker;

  beforeEach(() => {
    component = new JalaliDatePicker();
  });

  it('should convert Gregorian to Jalali date', () => {
    const gregorian = new Date(2024, 0, 1);
    const result = component.toJalali(gregorian);
    expect(result.year).toBe(1402);
  });

  it('should handle edge cases', () => {
    // آزمایش موارد لبه‌ای
  });
});
```

### آزمایش مبتنی بر ویژگی

استفاده از fast-check برای آزمایش‌های مبتنی بر ویژگی:

```typescript
import fc from 'fast-check';

it('should maintain date bidirectionality', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const jalali = toJalali(date);
      const gregorian = toGregorian(jalali);
      expect(gregorian.getTime()).toBe(date.getTime());
    })
  );
});
```

## راهنمای Commit

### فرمت پیام Commit

پیروی از مشخصات Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### انواع

- **feat**: یک ویژگی جدید
- **fix**: رفع یک اشکال
- **docs**: تغییرات فقط مستندات
- **style**: تغییراتی که معنی کد را تغییر نمی‌دهند (قالب‌بندی، وغیره)
- **refactor**: تغییر کد که نه اشکال را رفع می‌کند و نه ویژگی اضافه می‌کند
- **perf**: تغییر کد که عملکرد را بهبود می‌بخشد
- **test**: اضافه کردن یا به‌روزرسانی آزمایش‌ها
- **chore**: تغییرات در فرآیند ساخت، وابستگی‌ها، وغیره

### نمونه‌ها

```
feat(calendar): add support for custom holidays

fix(date-picker): resolve RTL layout issues

docs(api): update API reference for new methods

test(utils): add property-based tests for date conversion
```

## فرآیند Pull Request

### قبل از ارسال

1. به‌روزرسانی fork خود با آخرین تغییرات upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. ایجاد شاخه ویژگی:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. انجام تغییرات و commit با پیام‌های مناسب

4. Push به fork خود:
   ```bash
   git push origin feat/your-feature-name
   ```

### الگوی توضیح PR

```markdown
## توضیح
توضیح مختصر تغییرات

## نوع تغییر
- [ ] رفع اشکال
- [ ] ویژگی جدید
- [ ] تغییر شکست‌دهنده
- [ ] به‌روزرسانی مستندات

## مسائل مرتبط
Closes #(شماره مسئله)

## آزمایش
- [ ] آزمایش‌های واحد اضافه/به‌روزرسانی شده
- [ ] آزمایش‌های یکپارچگی اضافه/به‌روزرسانی شده
- [ ] آزمایش دستی انجام شده

## چک‌لیست
- [ ] کد از راهنمای سبک پیروی می‌کند
- [ ] بررسی خود انجام شده
- [ ] نظرات برای منطق پیچیده اضافه شده
- [ ] مستندات به‌روزرسانی شده
- [ ] هیچ هشدار جدیدی ایجاد نشده
- [ ] آزمایش‌ها به صورت محلی موفق هستند
- [ ] پوشش حفظ/بهبود یافته
```

### فرآیند بررسی

1. حداقل یک بررسی نگهدارنده مورد نیاز
2. تمام بررسی‌های CI باید موفق باشند
3. پوشش کد نباید کاهش یابد
4. تمام مکالمات باید حل شوند
5. شاخه باید با main به‌روز باشد

## گزارش مشکلات

### گزارش اشکالات

شامل:
- توضیح واضح اشکال
- مراحل تکرار
- رفتار مورد انتظار
- رفتار واقعی
- جزئیات محیط (مرورگر، سیستم‌عامل، نسخه Node)
- نمونه کد یا اسکرین‌شات

### درخواست‌های ویژگی

شامل:
- توضیح واضح ویژگی
- مورد استفاده و انگیزه
- API/interface پیشنهادی
- نمونه‌های استفاده

## مجوز

با مشارکت در این پروژه، موافقت می‌کنید که مشارکت‌های شما تحت همان مجوز پروژه مجاز خواهند بود.

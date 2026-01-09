# 🚀 Quick Start Guide - Dayflow HRMS v1.0

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env.local`
```env
MONGODB_URI=mongodb://localhost:27017/dayflow_hrms
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open Browser
Navigate to `http://localhost:3000`

---

## 📚 Essential Files Reference

| File | Purpose | When to Use |
|------|---------|------------|
| `lib/constants.ts` | App constants | Define roles, statuses, routes |
| `lib/api-response.ts` | API responses | All API endpoints |
| `lib/validation.ts` | Input validation | Before processing data |
| `lib/middleware.ts` | Auth/context | Protect API routes |
| `lib/cache.ts` | Caching | Cache expensive operations |
| `hooks/use-advanced.ts` | Custom hooks | React components |
| `services/analytics.service.ts` | Analytics | Dashboard calculations |
| `components/ErrorBoundary.tsx` | Error handling | Wrap page layouts |

---

## 🎯 Common Tasks

### Create a Protected API Route
```typescript
// app/api/employees/route.ts
import { ApiResponse } from "@/lib/api-response";
import { createRequestContext, isAdmin } from "@/lib/middleware";
import { Validator } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const context = await createRequestContext(request);
  const requestId = context.requestId;

  if (!isAdmin(context)) {
    return ApiResponse.forbidden("Admin access required", requestId);
  }

  try {
    // Your code here
    return ApiResponse.success(data, "Success");
  } catch (error) {
    return ApiResponse.internalError("Error", error, requestId);
  }
}
```

### Validate User Input
```typescript
const emailResult = Validator.validateEmail(email);
const passwordResult = Validator.validatePassword(password);
const combined = Validator.combine(emailResult, passwordResult);

if (!combined.valid) {
  return ApiResponse.validationError(
    Object.fromEntries(combined.errors.map(e => [e.field, [e.message]]))
  );
}
```

### Use Custom Hooks in Components
```typescript
"use client";
import { useAsync, useForm, useModal } from "@/hooks/use-advanced";

export function EmployeeForm() {
  const { execute, data, status } = useAsync(fetchEmployees);
  const { values, handleChange, handleBlur } = useForm({ name: "", email: "" });
  const { isOpen, open, close } = useModal();

  return (
    // JSX
  );
}
```

### Cache API Results
```typescript
import { cache, cacheKeys } from "@/lib/cache";
import { CACHE_DURATION } from "@/lib/constants";

// In your service or API route
const cacheKey = cacheKeys.attendance(userId, date);
let data = cache.get(cacheKey);

if (!data) {
  data = await fetchAttendance(userId, date);
  cache.set(cacheKey, data, CACHE_DURATION.MEDIUM);
}

return data;
```

### Create a Data Table
```typescript
import { DataTable } from "@/components/ui/data-table";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "department", label: "Department" },
];

<DataTable
  columns={columns}
  data={employees}
  searchable
  selectable
  onSelectionChange={(selected) => console.log(selected)}
/>
```

### Format Dates Consistently
```typescript
import { formatDate, formatDateTime, getBusinessDaysBetween } from "@/lib/date-utils";

const dateStr = formatDate(new Date()); // "09 Jan 2026"
const dateTime = formatDateTime(new Date()); // "09 Jan 2026, 14:30"
const workDays = getBusinessDaysBetween(startDate, endDate); // 15
```

### Use Analytics Service
```typescript
import { analyticsService } from "@/services/analytics.service";

const rate = analyticsService.calculateAttendanceRate(20, 24); // 83%
const salary = analyticsService.formatSalary(50000); // "₹50,000"
const trend = analyticsService.generateTrendAnalysis(current, previous);
const perf = analyticsService.categorizePerformance(85); // "good"
```

---

## 🔒 Security Checklist

- [ ] Set strong environment variable values
- [ ] Never commit `.env` files with secrets
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Check authentication on protected routes
- [ ] Verify authorization (role checks)
- [ ] Use HTTPS for API calls
- [ ] Implement rate limiting
- [ ] Log security-relevant events
- [ ] Regular security audits

---

## 📊 Project Structure Overview

```
odoo-gcet/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes (protected)
│   ├── (protected)/          # Auth-required routes
│   │   ├── admin/            # Admin dashboard
│   │   └── employee/         # Employee dashboard
│   └── globals.css           # Styles
├── lib/                      # Core utilities
│   ├── api-response.ts       # API responses
│   ├── validation.ts         # Input validation
│   ├── middleware.ts         # Auth middleware
│   ├── cache.ts              # Caching layer
│   ├── constants.ts          # Constants
│   ├── config.ts             # Configuration
│   ├── date-utils.ts         # Date utilities
│   └── utils.ts              # Helper functions
├── components/               # React components
│   ├── ui/                   # Basic UI components
│   ├── ErrorBoundary.tsx     # Error handling
│   └── dashboard/            # Dashboard components
├── services/                 # Business logic
│   ├── analytics.service.ts  # Analytics
│   └── dashboard.service.ts  # Dashboard
├── models/                   # Database schemas
├── hooks/                    # Custom hooks
│   ├── use-debounce.ts
│   └── use-advanced.ts
└── public/                   # Static files

Documentation:
├── README.md                 # Full documentation
├── ENV.md                    # Environment setup
├── ENHANCEMENTS.md           # What's new
└── QUICKSTART.md             # This file
```

---

## 🐛 Debugging Tips

### Check Request Context
```typescript
const context = await createRequestContext(request);
console.log("Request ID:", context.requestId);
console.log("User ID:", context.userId);
console.log("Role:", context.userRole);
```

### Validate Data
```typescript
const validation = Validator.validateEmail(email);
console.log("Valid:", validation.valid);
console.log("Errors:", validation.errors);
```

### Check Cache
```typescript
const data = cache.get(key);
console.log("Cache hit:", data !== null);
console.log("Cache size:", cache.size());
```

### Monitor Performance
```typescript
console.time("fetch-data");
const data = await fetchData();
console.timeEnd("fetch-data");
```

---

## 🆘 Common Issues

### "Missing required environment variables"
- Check all required vars are set in `.env.local`
- Restart dev server after changing env
- Verify variable names are exact

### "Authentication failed"
- Verify Clerk keys are correct
- Check Clerk dashboard for test/live mode
- Ensure callback URLs match Clerk settings

### "Database connection error"
- Check MongoDB URI is correct
- Verify MongoDB service is running
- Check network connectivity

### "Validation errors"
- Use `Validator` class methods
- Check error messages for details
- Return `validationError` response

---

## 📈 Performance Tips

1. **Use caching** for expensive operations
2. **Paginate large datasets**
3. **Lazy load components**
4. **Debounce search inputs**
5. **Use `useAsync` hook** for data fetching
6. **Optimize images** with Next.js Image
7. **Enable compression** in production
8. **Monitor bundle size**

---

## 🚀 Deployment Checklist

- [ ] Set all environment variables
- [ ] Run `npm run build` locally
- [ ] Test production build locally with `npm run start`
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Configure CDN for static assets
- [ ] Set up email notifications
- [ ] Test error handling
- [ ] Document deployment process
- [ ] Set up automated tests

---

## 📞 Support Resources

- **Docs:** See README.md and ENHANCEMENTS.md
- **Environment:** See ENV.md
- **Examples:** Check `app/api/users/enhanced-example.route.ts`
- **Types:** All utilities are fully typed with TypeScript

---

## 🎉 You're Ready!

Your Dayflow HRMS is now set up with enterprise-level features. Start building! 

**Happy Coding! 💻**

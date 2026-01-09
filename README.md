# 🚀 Dayflow HRMS - Smart Human Resource Management System

**Dayflow HRMS** is a modern, enterprise-grade Human Resource Management System built with cutting-edge technologies. It provides comprehensive solutions for managing employees, attendance tracking, leave management, payroll processing, and insightful analytics.

## ✨ Key Features

### 👥 Employee Management
- Complete employee directory with detailed profiles
- Department and job title management
- Soft delete support for inactive employees
- Employee search and filtering capabilities

### 📊 Attendance Management
- Real-time check-in/check-out functionality
- Attendance status tracking (Present, Absent, Late, On Leave, WFH)
- Monthly attendance reports and analytics
- Attendance trends and rate calculations

### 🏖️ Leave Management
- Multiple leave types (Casual, Sick, Earned, Maternity, Unpaid)
- Leave balance tracking and management
- Approval workflow for leave requests
- Leave history and analytics

### 💰 Payroll Management
- Automated payroll processing
- Salary management and calculations
- Payroll status tracking (Draft, Processed, Approved, Paid)
- Payroll reports and audit trails

### 📈 Advanced Analytics & Reports
- Role-based dashboards (Admin & Employee)
- Real-time performance metrics
- Attendance trend analysis
- Custom report generation
- Data export to CSV

### 🔐 Security & Access Control
- Clerk authentication integration
- Role-based access control (Admin/Employee)
- Request ID tracking and logging
- Input validation and error handling

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Database**: [MongoDB](https://www.mongodb.com) with [Mongoose](https://mongoosejs.com)
- **ORM**: [Prisma](https://www.prisma.io) - Next-generation ORM
- **Authentication**: [Clerk](https://clerk.com) - Modern authentication platform
- **UI Components**: [Radix UI](https://www.radix-ui.com) - Unstyled, accessible components
- **Charts**: [Recharts](https://recharts.org) - React charting library
- **Animations**: [Framer Motion](https://www.framer.com/motion) - Production animation library
- **Icons**: [Lucide React](https://lucide.dev) - Beautiful icon library
- **Notifications**: [Sonner](https://sonner.emilkowal.ski) - Toast notifications

## 📋 Project Structure

```
odoo-gcet/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   ├── (protected)/          # Protected routes
│   │   ├── admin/            # Admin pages
│   │   └── employee/         # Employee pages
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   ├── dashboard/            # Dashboard components
│   └── layout/               # Layout components
├── lib/                      # Utility functions
│   ├── constants.ts          # App constants
│   ├── api-response.ts       # Standardized API responses
│   ├── validation.ts         # Validation utilities
│   ├── middleware.ts         # Request middleware
│   ├── cache.ts              # Caching layer
│   └── date-utils.ts         # Date/time utilities
├── models/                   # MongoDB schemas
├── services/                 # Business logic services
│   ├── analytics.service.ts  # Analytics calculations
│   └── dashboard.service.ts  # Dashboard data
├── actions/                  # Server actions
├── hooks/                    # Custom React hooks
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB connection string
- Clerk API keys

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/DarshanAjudiya7/odoo-gcet.git
cd odoo-gcet
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Admin Dashboard
Access the admin dashboard at `/admin/dashboard` to:
- View company-wide analytics
- Manage all employees
- Monitor attendance records
- Process payroll
- Generate reports

### Employee Dashboard
Access the employee dashboard at `/employee/dashboard` to:
- View personal attendance
- Request leaves
- Check payroll information
- View department information

## 🔧 API Endpoints

### Attendance API
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/check-in` - Check-in
- `POST /api/attendance/check-out` - Check-out

### Leave API
- `GET /api/leaves` - Get leave records
- `POST /api/leaves` - Request leave
- `PATCH /api/leaves/[id]/approve` - Approve leave

### Payroll API
- `GET /api/payroll` - Get payroll records
- `GET /api/payrolls/[id]` - Get payroll details
- `POST /api/payroll` - Process payroll

### Users API
- `GET /api/users` - Get users list
- `POST /api/users` - Create user

## 🎨 Customization

### Add New Roles
Update `ROLES` in `lib/constants.ts`:
```typescript
export const ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  MANAGER: "manager", // Add new role
} as const;
```

### Customize Leave Types
Update `LEAVE_TYPES` in `lib/constants.ts`:
```typescript
export const LEAVE_TYPES = {
  CASUAL: "casual",
  SICK: "sick",
  // Add more types
} as const;
```

### Theme Customization
Edit `tailwind.config.ts` to customize colors and themes.

## 📊 Validation Rules

The system enforces strict validation:
- Email format validation
- Phone number format validation (10+ digits)
- Password strength (8+ chars, uppercase, lowercase, number, special char)
- Employee ID format (EMPXXXXX)
- Date range validation

## 🔒 Security Features

- **Authentication**: Secure Clerk authentication
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive validation layer
- **Error Handling**: Standardized error responses
- **Request Tracking**: Unique request IDs for audit trails
- **Rate Limiting**: Built-in rate limiting support

## 📈 Performance Optimizations

- Caching layer with TTL support
- Lazy loading of components
- Image optimization with Next.js
- Database query optimization
- API response standardization

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[Vercel Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

### Docker Deployment

```bash
# Build Docker image
docker build -t dayflow-hrms .

# Run container
docker run -p 3000:3000 dayflow-hrms
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@dayflow.com or open an issue on GitHub.

## 🙏 Acknowledgments

- [Next.js Team](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [MongoDB](https://www.mongodb.com)
- All contributors and users

---

**Built with ❤️ by the Dayflow Team**

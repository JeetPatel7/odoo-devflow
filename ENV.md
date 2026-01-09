# Environment Variables Guide

This document describes all environment variables used in Dayflow HRMS.

## Required Variables

### Database
- `MONGODB_URI` - MongoDB connection string
  - Example: `mongodb+srv://user:password@cluster.mongodb.net/`
  - Required: Yes

### Authentication (Clerk)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
  - Get from: https://dashboard.clerk.com
  - Required: Yes

- `CLERK_SECRET_KEY` - Clerk secret key
  - Get from: https://dashboard.clerk.com
  - Required: Yes
  - Keep confidential - never commit to version control

## Optional Variables

### Application
- `NEXT_PUBLIC_APP_URL` - Application base URL
  - Default: `http://localhost:3000`
  - Example: `https://dayflow.example.com`

- `NEXT_PUBLIC_APP_NAME` - Application name
  - Default: `Dayflow HRMS`

- `NODE_ENV` - Environment mode
  - Values: `development`, `production`, `staging`
  - Default: `development`

### API Configuration
- `NEXT_PUBLIC_API_BASE_URL` - API base URL
  - Default: `/api`

### Features
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable analytics features
  - Default: `true`

- `NEXT_PUBLIC_ENABLE_REPORTS` - Enable reporting features
  - Default: `true`

- `NEXT_PUBLIC_ENABLE_PAYROLL` - Enable payroll features
  - Default: `true`

### Rate Limiting
- `RATE_LIMIT_ENABLED` - Enable API rate limiting
  - Default: `true`

### Email (Optional)
- `EMAIL_ENABLED` - Enable email functionality
  - Default: `false`

- `EMAIL_FROM` - Sender email address
  - Example: `noreply@dayflow.com`

- `SMTP_HOST` - SMTP server host
  - Example: `smtp.gmail.com`

- `SMTP_PORT` - SMTP server port
  - Default: `587`

- `SMTP_USER` - SMTP username
  - Example: `your-email@gmail.com`

- `SMTP_PASSWORD` - SMTP password
  - Keep confidential

### Logging
- `LOG_LEVEL` - Logging level
  - Values: `error`, `warn`, `info`, `debug`
  - Default: `info`

## Setup Instructions

### Local Development

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in the required variables:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/dayflow_hrms

# Clerk (get from https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

3. Start development server:
```bash
npm run dev
```

### Production Deployment

1. Set all required variables in your hosting platform:
   - Vercel: Settings > Environment Variables
   - AWS: Systems Manager > Parameter Store
   - Docker: Environment variables in container

2. Ensure sensitive variables are kept secret:
   - Never commit `.env` files with secrets
   - Use `.env.local` for local development only
   - Use `.gitignore` to exclude `.env.*` files

3. Validate configuration on startup:
```typescript
import { validateConfig } from '@/lib/config';

validateConfig(); // Throws error if required variables missing
```

## Security Best Practices

1. **Never commit secrets** - Use `.env.local` for local development
2. **Use strong credentials** - Generate secure passwords for production
3. **Rotate secrets regularly** - Update keys periodically
4. **Restrict access** - Limit who can modify environment variables
5. **Audit changes** - Log all configuration modifications
6. **Use secret management** - Consider AWS Secrets Manager, Vault, etc.

## Troubleshooting

### "Missing required environment variables" error
- Check that all required variables are set
- Verify variable names are correct (case-sensitive)
- For Vercel deployments, check Settings > Environment Variables

### Database connection fails
- Verify MongoDB URI is correct
- Check network connectivity to MongoDB server
- For MongoDB Atlas, ensure IP whitelist includes your server

### Clerk authentication not working
- Verify Clerk keys are correct
- Check Clerk dashboard for test/live mode
- Ensure redirect URLs match in Clerk settings

## Reference

For more information, see:
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Clerk Configuration](https://clerk.com/docs/deployments/clerk-environ-config)
- [MongoDB Connection Strings](https://docs.mongodb.com/manual/reference/connection-string/)

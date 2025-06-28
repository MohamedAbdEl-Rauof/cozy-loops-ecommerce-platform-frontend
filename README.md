# Cozy Loops E-commerce Frontend

This is a modern e-commerce platform built with [Next.js](https://nextjs.org), featuring a comprehensive shopping experience with secure authentication, product browsing, and checkout functionality.

## Getting Started

First, run the development server:

```bash
npm run dev
```

```bash
yarn dev
```

```bash
pnpm dev
```

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Features

### Authentication System

Our platform implements a secure authentication flow with the following features:

- **Login Page** (`/auth/login`)
  - Authenticated users are automatically redirected to the homepage
  - Secure credential validation with error handling
  - "Remember me" functionality

- **Registration Page** (`/auth/register`)
  - Authenticated users are automatically redirected to the homepage
  - Real-time form validation
  - Password strength requirements

- **Password Reset** (`/auth/reset-password`)
  - Requires email parameter in URL
  - Authenticated users without reset credentials are redirected to homepage
  - Secure OTP verification process
  - Password strength validation

- **Email Verification** (`/auth/verify-email`)
  - Requires email parameter in URL
  - Authenticated users are redirected to homepage
  - OTP verification with resend capability
  - Countdown timer for OTP resending

### Shopping Experience

- Product browsing with filtering and search
- Detailed product pages with specifications and reviews
- Shopping cart with quantity management
- Secure checkout process
- Order history and tracking

## Project Structure

```
frontend/
├── public/                  # Static files
├── src/
│   ├── app/                 # App router structure
│   │   ├── auth/            # Auth pages
│   │   │   ├── login/       # Login page with redirect for authenticated users
│   │   │   ├── register/    # Registration page with redirect for authenticated users
│   │   │   ├── reset-password/ # Password reset (requires email param)
│   │   │   └── verify-email/   # Email verification (requires email param)
│   │   ├── products/        # Product pages
│   │   ├── cart/            # Cart page
│   │   ├── checkout/        # Checkout page
│   │   ├── profile/         # User profile page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   ├── auth/            # Auth components
│   │   ├── common/          # Shared components
│   │   ├── layout/          # Layout components
│   │   └── product/         # Product-related components
│   ├── context/             # React context
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utility libraries
│   ├── services/            # Service layer
│   └── utils/               # Utility functions
├── middleware.ts            # Next.js middleware for auth protection
├── .env.local               # Environment variables
└── package.json             # Dependencies
```

## Development Tools

We've included several utility scripts to maintain code quality:

1. **TypeScript Check**: Identify unused variables and parameters
   ```bash
   npm run ts:check
   ```

2. **ESLint Strict Mode**: Run ESLint with zero tolerance for warnings
   ```bash
   npm run lint:strict
   ```

3. **Strict Build**: Fail the build if there are any ESLint errors
   ```bash
   npm run build:strict
   ```

4. **Find Unused Dependencies**: Detect unused packages in your project
   ```bash
   npm run find:unused
   ```

## Authentication Flow

Our authentication system implements several security measures:

1. **Route Protection**: Authenticated users cannot access login, register, reset password, or email verification pages
2. **Parameter Validation**: Reset password and email verification pages require valid email parameters
3. **Automatic Redirects**: Users are redirected to appropriate pages based on their authentication status
4. **Secure Token Handling**: JWT tokens are securely stored and managed
5. **Session Expiration**: Automatic handling of expired sessions

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Material UI Documentation](https://mui.com/getting-started/usage/)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
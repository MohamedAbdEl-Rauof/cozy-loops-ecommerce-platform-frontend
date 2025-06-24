This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


frontend/
├── public/                  # Static files
├── src/
│   ├── app/                 # App router structure
│   │   ├── api/             # API routes (if needed)
│   │   │   └── auth/        # Auth API routes
│   │   │       └── [...nextauth]/
│   │   │           └── route.js
│   │   ├── auth/            # Auth pages
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── register/
│   │   │   │   └── page.js
│   │   │   └── forgot-password/
│   │   │       └── page.js
│   │   ├── products/        # Product pages
│   │   │   ├── [id]/
│   │   │   │   └── page.js  # Product detail page
│   │   │   └── page.js      # Products listing page
│   │   ├── cart/
│   │   │   └── page.js      # Cart page
│   │   ├── checkout/
│   │   │   └── page.js      # Checkout page
│   │   ├── profile/
│   │   │   └── page.js      # User profile page
│   │   ├── layout.js        # Root layout
│   │   └── page.js          # Home page
│   ├── components/          # Reusable components
│   │   ├── auth/            # Auth components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ForgotPasswordForm.jsx
│   │   ├── common/          # Shared components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Alert.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   └── product/         # Product-related components
│   │       ├── ProductCard.jsx
│   │       ├── ProductList.jsx
│   │       └── ProductDetails.jsx
│   ├── context/             # React context
│   │   └── AuthContext.jsx  # Authentication context
│   ├── hooks/               # Custom hooks
│   │   └── useAuth.js       # Authentication hook
│   ├── lib/                 # Utility libraries
│   │   ├── api.js           # API client setup
│   │   └── auth.js          # Auth utilities
│   ├── services/            # Service layer
│   │   ├── authService.js   # Auth API calls
│   │   └── productService.js # Product API calls
│   └── utils/               # Utility functions
│       ├── tokenUtils.js    # Token handling functions
│       └── validation.js    # Form validation
├── middleware.js            # Next.js middleware for auth protection
├── .env.local               # Environment variables
└── package.json             # Dependencies

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Registration   │────▶│  Email Sent     │────▶│  Verification   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Protected      │◀────│  User           │◀────│  Login          │
│  Routes         │     │  Authenticated  │     │                 │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                                               ▲
        │                                               │
        │         ┌─────────────────┐                   │
        │         │                 │                   │
        └─────────│  Token Refresh  │◀──────────────────┘
                  │                 │
                  └─────────────────┘
# Cozy Loops E-commerce Frontend

A modern, full-featured e-commerce platform built with Next.js 15, TypeScript, and Material-UI, designed for artisans and craft makers to showcase and sell their unique handmade products.

## 🚀 Technology Stack

### Core Framework
- **Next.js 15.3.3** - React framework for production
- **React 19** - Latest React with Server Components
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### UI & Styling
- **Material-UI (MUI) 7.1.2** - React component library
- **@emotion/react & styled** - CSS-in-JS styling
- **Tailwind CSS** - Additional styling utilities

### State Management & Data Fetching
- **TanStack Query 5.82.0** - Server state management
- **React Hook Form 7.58.1** - Form handling with validation
- **Zod 3.25.67** - Schema validation

### Authentication & Security
- **NextAuth.js** - Authentication solution
- **Google OAuth** - Social authentication
- **js-cookie 3.0.5** - Cookie management
- **JWT tokens** - Secure session management

### Payment & Commerce
- **Stripe 18.3.0** - Payment processing
- **@stripe/react-stripe-js 3.8.0** - Stripe React components
- **Socket.io-client 4.8.1** - Real-time cart updates

### File Upload & Media
- **Cloudinary 2.7.0** - Image storage and optimization
- **Google Cloud Local Auth** - Google services integration

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **Depcheck** - Unused dependency detection

## 📁 Project Structure

```
cozy-loops-ecommerce/
├── 📁 public/                    # Static assets
│   ├── images/                   # Image assets
│   │   ├── about/               # About page images
│   │   ├── auth/                # Authentication images
│   │   ├── home/                # Homepage assets
│   │   └── shared/             # Shared images
│   └── favicon.ico
│
├── 📁 src/                       # Source code
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   └── uploadUserImage/
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── reset-password/
│   │   │   └── verify-email/
│   │   ├── orders/               # Order management
│   │   ├── payment/              # Payment pages
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   │
│   ├── 📁 components/            # React components
│   │   ├── about/               # About page components
│   │   ├── account/             # User account components
│   │   ├── auth/                # Authentication components
│   │   ├── cart/                # Shopping cart components
│   │   ├── dialogs/             # Modal dialogs
│   │   ├── home/                # Homepage components
│   │   ├── order/               # Order components
│   │   ├── payment/             # Payment components
│   │   ├── product-details/     # Product detail components
│   │   ├── shared/              # Shared components
│   │   └── wishlist/            # Wishlist components
│   │
│   ├── 📁 context/               # React contexts
│   │   └── AuthContext.tsx      # Authentication context
│   │
│   ├── 📁 data/                 # Static data
│   │   └── pages/               # Page-specific data
│   │       ├── aboutPageData.ts
│   │       ├── homePageData.ts
│   │       └── productDetailsPageData.ts
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── useCart.tsx          # Cart management
│   │   ├── useCategories.tsx    # Categories data
│   │   ├── useProducts.tsx      # Products data
│   │   ├── useUser.tsx         # User data
│   │   └── useWishlist.tsx     # Wishlist management
│   │
│   ├── 📁 lib/                  # Utility libraries
│   │   ├── apiClient.ts        # API client configuration
│   │   └── cartSocket.ts       # Cart socket connection
│   │
│   ├── 📁 provider/             # Context providers
│   │   ├── ClientLayout.tsx     # Client-side layout
│   │   ├── ProtectedRoute.tsx   # Route protection
│   │   └── QueryProvider.tsx    # React Query provider
│   │
│   ├── 📁 services/             # API services
│   │   ├── authService.ts       # Authentication
│   │   ├── cartServices.tsx    # Cart management
│   │   ├── orderService.tsx     # Orders
│   │   ├── paymentService.tsx   # Payments
│   │   ├── productService.tsx   # Products
│   │   └── userServices.tsx    # User management
│   │
│   ├── 📁 types/                # TypeScript types
│   │   ├── auth.ts             # Authentication types
│   │   ├── cart.ts             # Cart types
│   │   ├── order.ts            # Order types
│   │   ├── product.ts          # Product types
│   │   └── user.ts             # User types
│   │
│   └── 📁 utils/                # Utility functions
│       ├── dataTransformers.ts # Data transformation
│       └── productHelpers.ts   # Product utilities
│
├── 📄 middleware.ts              # Next.js middleware
├── 📄 next.config.ts            # Next.js configuration
├── 📄 package.json              # Dependencies
├── 📄 tsconfig.json            # TypeScript configuration
└── 📄 tailwind.config.js       # Tailwind configuration
```

## 🎯 Key Features

### 🔐 Authentication System
- **Multi-provider authentication** (Email, Google OAuth, Linkedin)
- **Secure password reset** with email verification
- **JWT-based session management**
- **Protected routes** with automatic redirects
- **Email verification** with OTP

### 🛍️ Shopping Experience
- **Product catalog** with categories and filtering
- **Product reviews** and ratings
- **Related products** recommendations
- **Wishlist** functionality

### 🛒 Cart & Checkout
- **Real-time cart updates** with Socket.io
- **Persistent cart** across sessions
- **Multi-step checkout** process
- **Guest checkout** support
- **Order tracking** and history

### 💳 Payment Processing
- **Stripe integration** for secure payments
- **Multiple payment methods** support
- **Payment confirmation** and receipts
- **Failed payment** handling
- **Refund processing**

### 👤 User Management
- **User profiles** 
- **Address management**
- **Order history**
- **Account settings**
- **Email preferences**

### 🎨 Design & UX
- **Responsive design** for all devices
- **Error boundaries** and fallbacks
- **Accessibility** features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm package manager
- Stripe account (for payments)
- Cloudinary account (for images)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohamedAbdEl-Rauof/cozy-loops-ecommerce-platform-frontend.git
   cd cozy-loops-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Development Commands

```bash
# Development
npm dev          # Start development server
npm build        # Build for production
npm start        # Start production server

# Code Quality
npm lint         # Run ESLint
npm lint:strict  # Strict linting (zero warnings)
npm ts:check     # TypeScript checking
npm build:strict # Strict build with checks
npm find:unused  # Find unused dependencies
```

## 🌐 Environment Variables

Required environment variables for full functionality:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Cloud Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔒 Security Features

- **HTTPS enforcement** in production
- **Input validation** with Zod schemas
- **XSS protection** with React
- **CSRF protection** on API calls
- **Rate limiting** on authentication endpoints
- **Secure cookie** configuration

## 📊 Performance Optimizations

- **Image optimization** with Next.js Image component
- **Code splitting** with dynamic imports
- **Bundle optimization** with tree shaking
- **Lazy loading** for images and components
- **Caching strategies** with React Query
- **CDN integration** for static assets

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker
```bash
# Build image
docker build -t cozy-loops .

# Run container
docker run -p 3000:3000 cozy-loops
```

## 📞 Support

For support, email mohamedabdelrauof112@gmail.com or join our Slack channel.

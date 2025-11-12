# Made by Hamza Hafeez - Founder and CEO of Upvista Digital

# Vigours Organic E-Commerce Platform

A full-stack e-commerce platform specializing in organic food products, built with modern web technologies and designed for the Pakistani market.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

Vigours Organic is a modern e-commerce solution that provides a complete online shopping experience for organic food products. The platform includes customer-facing features such as product browsing, cart management, checkout, and order tracking, as well as a comprehensive admin dashboard for order management.

## Features

### Customer Portal

- **Product Catalog**: Browse products organized by categories (Hunza foods, Desi foods, Tibbi foods, General grocery)
- **Shopping Cart**: Persistent cart management with localStorage integration
- **Checkout System**: Multi-step checkout process with form validation
- **Payment Integration**: Support for multiple payment methods including Cash on Delivery, JazzCash, EasyPaisa, NayaPay, and card payments
- **Discount System**: Coupon code functionality with percentage-based discounts
- **Order Tracking**: Customer-facing order status tracking system
- **Email Notifications**: Automated order confirmation emails
- **Responsive Design**: Mobile-first design approach with full responsive support

### Administrative Interface

- **Authentication**: Secure admin login system
- **Order Management**: View, filter, and manage customer orders
- **Status Updates**: Real-time order status management
- **Analytics Dashboard**: Order statistics and key performance indicators
- **Email Notifications**: Automated admin notifications for new orders

### Technical Capabilities

- Server-side rendering with Next.js App Router
- Type-safe development with TypeScript
- PostgreSQL database with Row Level Security
- RESTful API architecture
- Transactional email service integration
- Image optimization and lazy loading
- Client-side state management

## Technology Stack

### Frontend
- **Framework**: Next.js 15.3.5 (React 19.0.0)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Headless UI, Heroicons
- **Image Handling**: Next.js Image Optimization

### Backend
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Email Service**: Resend
- **Authentication**: Custom implementation with session storage

### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm
- **Build Tool**: Next.js with Turbopack

## Prerequisites

Before you begin, ensure you have the following installed and configured:

- Node.js (version 18.x or higher)
- npm (version 9.x or higher)
- A Supabase account with a project created
- A Resend account for email services
- Git for version control

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Vigours-Organic/frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js and React
- Supabase JavaScript client
- Resend email client
- UI component libraries
- TypeScript and development dependencies

## Configuration

### Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
cp .env.example .env.local
```

Configure the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>

# Email Service Configuration
RESEND_API_KEY=<your-resend-api-key>

# Admin Authentication
ADMIN_USERNAME=<your-admin-username>
ADMIN_PASSWORD=<your-secure-password>

# Application Configuration
STORE_EMAIL=vigoursorganic@gmail.com
STORE_PHONE=03334286566
STORE_NAME=Vigours Organic
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Important**: Never commit the `.env.local` file to version control. It contains sensitive credentials.

## Database Setup

### 1. Create Supabase Project

1. Navigate to [supabase.com](https://supabase.com)
2. Create a new project
3. Configure the database region closest to your target market
4. Save the database password securely

### 2. Execute Database Schema

1. Open the Supabase SQL Editor from your project dashboard
2. Copy the contents of `supabase-schema.sql`
3. Paste and execute the SQL script
4. Verify that tables are created: `orders` and `order_items`

### 3. Configure API Keys

Retrieve the following from Supabase Settings > API:
- Project URL (for `NEXT_PUBLIC_SUPABASE_URL`)
- Anonymous public key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Service role key (for `SUPABASE_SERVICE_ROLE_KEY`)

### Email Service Setup

1. Create an account at [resend.com](https://resend.com)
2. Generate an API key from the dashboard
3. Add the key to your `.env.local` as `RESEND_API_KEY`
4. For production, configure a custom domain in Resend settings

## Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Run Production Build Locally

```bash
npm run build
npm start
```

### Code Linting

```bash
npm run lint
```

## API Documentation

### Endpoints

#### Orders API

**Create Order**
```
POST /api/orders
Content-Type: application/json

Request Body:
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "postalCode": "string",
  "paymentMethod": "string",
  "items": Array<CartItem>,
  "subtotal": number,
  "shipping": number,
  "discount": number,
  "total": number
}

Response: 200 OK
{
  "success": true,
  "orderNumber": "string",
  "orderId": "uuid",
  "message": "string"
}
```

**List Orders (Admin)**
```
GET /api/orders?status=<status>&limit=<limit>&offset=<offset>
Authorization: Bearer <base64-encoded-credentials>

Response: 200 OK
{
  "success": true,
  "orders": Array<Order>,
  "count": number
}
```

**Get Order by ID**
```
GET /api/orders/[id]

Response: 200 OK
{
  "success": true,
  "order": Order
}
```

**Update Order Status (Admin)**
```
PATCH /api/orders/[id]
Authorization: Bearer <base64-encoded-credentials>
Content-Type: application/json

Request Body:
{
  "order_status": "string",
  "payment_status": "string",
  "notes": "string"
}

Response: 200 OK
{
  "success": true,
  "order": Order,
  "message": "string"
}
```

**Delete Order (Admin)**
```
DELETE /api/orders/[id]
Authorization: Bearer <base64-encoded-credentials>

Response: 200 OK
{
  "success": true,
  "message": "string"
}
```

### Authentication

Admin endpoints use Basic Authentication:
- Encode credentials as Base64: `btoa(username:password)`
- Include in Authorization header: `Bearer <encoded-credentials>`
- Credentials are stored in environment variables

## Deployment

### Vercel Deployment

1. Push code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import project into Vercel
3. Configure environment variables in Vercel dashboard
4. Update `NEXT_PUBLIC_BASE_URL` to production domain
5. Deploy

### Environment Variables for Production

Ensure all variables from `.env.local` are added to your deployment platform:
- All Supabase credentials
- Resend API key
- Admin credentials (use strong passwords)
- Production URLs

### Post-Deployment Checklist

- [ ] Verify database connectivity
- [ ] Test order creation flow
- [ ] Confirm email delivery
- [ ] Test admin authentication
- [ ] Verify payment method selection
- [ ] Test order status updates
- [ ] Check responsive design on mobile devices
- [ ] Configure custom email domain (optional)
- [ ] Set up monitoring and error tracking
- [ ] Configure CORS if needed

## Project Structure

```
frontend/
├── public/
│   └── assets/              # Static assets (images, logos)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── orders/      # Order management API routes
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── admin/
│   │   │   ├── login/       # Admin authentication
│   │   │   │   └── page.tsx
│   │   │   └── orders/      # Order management dashboard
│   │   │       └── page.tsx
│   │   ├── checkout/        # Checkout flow
│   │   │   └── page.tsx
│   │   ├── orders/          # Order tracking
│   │   │   └── page.tsx
│   │   ├── shop/            # Product catalog
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── components/      # Shared React components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   ├── products.ts      # Product data model
│   │   └── globals.css      # Global styles
│   └── lib/
│       ├── supabase.ts      # Database client configuration
│       └── email.ts         # Email service utilities
├── supabase-schema.sql      # Database schema definition
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── SETUP.md                 # Detailed setup instructions
├── QUICKSTART.md            # Quick start guide
└── README.md                # This file
```

## Security Considerations

### Current Implementation

- Row Level Security (RLS) enabled on database tables
- Service role key isolated to server-side operations
- Environment variables for sensitive credentials
- Basic authentication for admin routes
- Input validation on API endpoints

### Recommended Enhancements for Production

1. **Authentication**: Implement OAuth 2.0 or JWT-based authentication
2. **Rate Limiting**: Add request throttling to prevent abuse
3. **HTTPS Only**: Enforce HTTPS in production
4. **CSRF Protection**: Implement CSRF tokens for state-changing operations
5. **Input Sanitization**: Add comprehensive input validation and sanitization
6. **Password Hashing**: Use bcrypt or similar for password storage
7. **API Key Rotation**: Regularly rotate API keys and credentials
8. **Session Management**: Implement secure session handling with httpOnly cookies
9. **SQL Injection Prevention**: Utilize parameterized queries (already implemented via Supabase)
10. **XSS Protection**: Sanitize user-generated content

### Data Privacy

- Customer data stored securely in PostgreSQL
- Email addresses used only for transactional communications
- No third-party analytics or tracking (can be added as needed)
- Order data accessible only to authenticated admin users

## Troubleshooting

### Common Issues

**Orders Not Persisting**
- Verify Supabase connection credentials in `.env.local`
- Ensure database schema has been executed successfully
- Check service role key has correct permissions
- Review server logs for database connection errors

**Email Delivery Failures**
- Confirm Resend API key is valid and active
- Check free tier limits (3,000 emails/month)
- Verify sender domain configuration
- Review Resend dashboard for delivery status

**Admin Authentication Issues**
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`
- Clear browser cache and sessionStorage
- Test in incognito mode to rule out browser issues
- Check for whitespace or special characters in credentials

**Build or Runtime Errors**
- Delete `.next` directory and `node_modules`
- Run `npm install` to reinstall dependencies
- Verify Node.js version meets requirements (18+)
- Check for TypeScript compilation errors

**Image Loading Issues**
- Ensure images exist in `/public/assets/` directory
- Verify Next.js Image component configuration
- Check image paths in product data match actual files
- Review Next.js image optimization settings

### Debug Mode

Enable detailed logging by setting:
```env
NODE_ENV=development
```

Check logs in:
- Browser console for client-side issues
- Terminal/command prompt for server-side issues
- Supabase dashboard for database queries
- Resend dashboard for email delivery

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes with descriptive messages
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request with detailed description

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful variable and function names
- Add comments for complex logic
- Maintain consistent formatting

### Testing

Before submitting a PR:
- Test all modified features thoroughly
- Verify no TypeScript compilation errors
- Run linter and fix any issues
- Test on multiple screen sizes
- Verify database operations work correctly

## License

This project is proprietary and confidential. Unauthorized copying, modification, or distribution is prohibited.

## Support

For technical support or inquiries:
- Email: vigoursorganic@gmail.com
- Phone: +92 333 4286566

## Acknowledgments

Built with the following open-source technologies:
- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Resend](https://resend.com/) - Email API
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Headless UI](https://headlessui.com/) - Unstyled UI components
- [Heroicons](https://heroicons.com/) - Icon library

---

**Developed by**: Upvista Digital  
**Version**: 1.0.0  
**Last Updated**: November 2024

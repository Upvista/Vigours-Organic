# Made by Hamza Hafeez - Founder and CEO of Upvista Digital

# Vigours Organic Backend Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier is fine)
- A Resend account for emails (free tier: 100 emails/day)

---

## Step 1: Install Dependencies

```bash
cd frontend
npm install resend
```

---

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for setup to complete

### 2.2 Run Database Schema
1. Go to your Supabase Dashboard
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the contents of `supabase-schema.sql`
5. Paste and click "Run"

### 2.3 Get Your API Keys
1. Go to "Settings" → "API"
2. Copy:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - `service_role` key (SUPABASE_SERVICE_ROLE_KEY) ⚠️ Keep this secret!

---

## Step 3: Set Up Resend (Email Service)

### 3.1 Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for free (100 emails/day)
3. Verify your email

### 3.2 Get API Key
1. Go to Dashboard → "API Keys"
2. Click "Create API Key"
3. Copy the key (RESEND_API_KEY)

### 3.3 Add Your Domain (Optional for Production)
For now, emails will come from `onboarding@resend.dev`
To use your own domain:
1. Go to "Domains" → "Add Domain"
2. Follow DNS setup instructions

---

## Step 4: Configure Environment Variables

### 4.1 Create `.env.local` file
```bash
cp .env.local.example .env.local
```

### 4.2 Fill in your values
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Configuration (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Admin Configuration (CHANGE THESE!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!

# Store Configuration
STORE_EMAIL=your-email@gmail.com
STORE_PHONE=03334286566
STORE_NAME=Vigours Organic

# URL Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

⚠️ **IMPORTANT**: Change the `ADMIN_PASSWORD` to something secure!

---

## Step 5: Run the Application

```bash
npm run dev
```

Your app should now be running at `http://localhost:3000`

---

## Step 6: Test the System

### 6.1 Test Order Placement
1. Go to `http://localhost:3000`
2. Add products to cart
3. Go to checkout
4. Fill in details
5. Place order
6. Check email for confirmation

### 6.2 Test Admin Dashboard
1. Go to `http://localhost:3000/admin/login`
2. Login with your credentials from `.env.local`
3. View orders
4. Update order status

---

## What You Get

✅ **Complete Order Management**
- Orders stored in database
- Email confirmations sent automatically
- Admin dashboard to manage orders

✅ **Payment Methods Supported**
- Cash on Delivery (COD) - Fully functional
- JazzCash / EasyPaisa / NayaPay - Ready (you'll need to integrate their APIs later)
- Credit/Debit Card - Ready (integrate Stripe later)

✅ **Order Status Tracking**
- Pending → Processing → Shipped → Delivered
- Customers get email updates
- You can manage from admin panel

---

## Production Deployment

### For Vercel:
1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Update `NEXT_PUBLIC_BASE_URL` to your domain
5. Deploy!

### Don't Forget:
- Change admin password
- Set up custom email domain in Resend
- Add your logo to emails
- Test all flows thoroughly

---

## Security Notes

🔐 **Keep These Secret:**
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `ADMIN_PASSWORD`

Never commit `.env.local` to git!

---

## Need Help?

Common issues:
- **Orders not saving**: Check Supabase connection and schema
- **Emails not sending**: Verify Resend API key
- **Can't login to admin**: Check username/password in `.env.local`

---

## Next Steps (Optional)

To make this production-ready, you should add:
1. User authentication (NextAuth.js)
2. Payment gateway integration (Stripe/JazzCash API)
3. SMS notifications (Twilio)
4. Order tracking page for customers
5. Product management system
6. Better admin security (2FA, role-based access)

But for now, **you have a fully functional e-commerce backend!** 🎉


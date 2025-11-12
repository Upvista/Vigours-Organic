# ⚡ Quick Start Guide - Vigours Organic Backend

Follow these 5 simple steps to launch your e-commerce business!

---

## Step 1: Install Resend 

The `resend` package has been installed.

---

## Step 2: Set Up Supabase Database

### 2.1 Create Supabase Account
1. Go to [supabase.com](https://supabase.com) and sign up (it's free)
2. Click **"New Project"**
3. Fill in:
   - **Name**: Vigours Organic
   - **Database Password**: (create a strong password, save it!)
   - **Region**: Choose closest to Pakistan (e.g., Singapore)
4. Click **"Create new project"**
5. ⏰ Wait 2-3 minutes for setup

### 2.2 Run Database Schema
1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Open the file `supabase-schema.sql` in this project
4. Copy ALL the contents and paste into the SQL Editor
5. Click **"Run"** (or press Ctrl+Enter)
6. ✅ You should see "Success. No rows returned"

### 2.3 Get Your API Keys
1. Click **"Settings"** (left sidebar) → **"API"**
2. Copy these THREE values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → This is your `SUPABASE_SERVICE_ROLE_KEY` ⚠️ KEEP SECRET!

---

## Step 3: Set Up Email Service (Resend)

### 3.1 Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up (free: 100 emails per day, 3,000 per month)
3. Verify your email address

### 3.2 Get API Key
1. In Resend dashboard, click **"API Keys"**
2. Click **"Create API Key"**
3. Name it: "Vigours Organic Production"
4. Click **"Create"**
5. Copy the key that starts with `re_...`
   - This is your `RESEND_API_KEY`

---

## Step 4: Configure Environment Variables

### 4.1 Create `.env.local` File

In the `frontend` folder, create a file named `.env.local` (exact name, with the dot!)

```bash
# Copy this template and fill in YOUR values:

# Supabase Configuration (from Step 2.3)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Configuration (from Step 3.2)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Admin Login Credentials (CHANGE THESE!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SuperSecurePassword123!

# Store Information
STORE_EMAIL=vigoursorganic@gmail.com
STORE_PHONE=03334286566
STORE_NAME=Vigours Organic

# URL Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### ⚠️ IMPORTANT:
- Replace ALL the `xxx` values with your actual keys
- **Change the `ADMIN_PASSWORD`** to something secure!
- Keep this file secret - it's already in `.gitignore`

---

## Step 5: Run Your Store! 🚀

### 5.1 Start the Development Server

```bash
npm run dev
```

### 5.2 Test Everything

**Test Customer Flow:**
1. Open browser: http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Fill in details (use a real email to test)
5. Place order
6. ✅ Check your email for confirmation!

**Test Admin Dashboard:**
1. Open browser: http://localhost:3000/admin/login
2. Login with credentials from `.env.local`
3. ✅ You should see your order!
4. Try updating the order status

**Test Order Tracking:**
1. Go to: http://localhost:3000/orders
2. Enter your order number (from email)
3. ✅ See your order status!

---

##  Congratulations!

You now have a **fully functional e-commerce backend**!

### What You Can Do Now:
✅ Accept real orders
✅ Process payments (COD)
✅ Send email confirmations
✅ Manage orders from admin panel
✅ Track order status

---

## 🚀 Ready for Production?

### Deploy to Vercel (Free!)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"Import Project"**
4. Select your GitHub repo
5. Add ALL environment variables from `.env.local`
6. Click **"Deploy"**
7. Update `NEXT_PUBLIC_BASE_URL` to your new domain
8. ✅ You're live!

---

## 📞 Need Help?

**Common Issues:**

**"Orders not saving?"**
- Check Supabase URL and keys in `.env.local`
- Make sure you ran the SQL schema (Step 2.2)

**"Emails not sending?"**
- Verify Resend API key
- Check you're not over free tier limit (100/day)

**"Can't login to admin?"**
- Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`
- Make sure there are no spaces or quotes around values

**"Module not found errors?"**
- Run: `npm install` again
- Delete `node_modules` and `.next` folders, then run `npm install`

---

## 🎯 Next Steps (Optional)

To grow your business, consider adding:
- [ ] Payment gateway (Stripe/JazzCash API)
- [ ] SMS notifications
- [ ] Customer accounts
- [ ] Product management system
- [ ] Inventory tracking
- [ ] Sales analytics

But for now - **you're ready to start selling!** 💪🌱

---

Made with ❤️ for Vigours Organic by Hamza Hafeez... founder and CEO of Upvista Digital


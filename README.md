# HR 205 LLC - Booking System

A complete, production-ready booking system for HR 205 LLC Communications.

## Features

✅ Beautiful multi-step booking form
✅ Admin dashboard with login
✅ All 50 US states dropdown
✅ Referral tracking system
✅ Service interest selection
✅ Booking status management (Pending, Confirmed, Completed)
✅ CSV export functionality
✅ Mobile responsive design
✅ Framer Motion animations

## Quick Start

### Prerequisites
- Node.js 16+ installed
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/HR205-CO/HR205.git
cd HR205
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

The app will run on `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## Deployment to Vercel

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Connect your GitHub account
5. Select the HR205 repository
6. Click "Import"

### Step 2: Configure Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables** and add:

```
VITE_ADMIN_EMAIL=hr205@hotmail.com
VITE_BACKEND_EMAIL=hr205.co@hotmail.com
```

### Step 3: Deploy

Click the "Deploy" button. Vercel will automatically build and deploy your app.

Your live URL will be something like: `https://hr205-co.vercel.app`

## Admin Access

### Login Credentials (Demo)
- **Email:** `hr205@hotmail.com`
- **Password:** `hr205demo123`

### Admin Features
- View all bookings
- Filter by status (Pending, Confirmed, Completed)
- Filter by state
- Update booking status
- Export bookings to CSV

## File Structure

```
HR205/
├── src/
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind styles
├── public/               # Static files
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── index.html
└── README.md
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vercel** - Hosting

## Customization

### Change Admin Password

Edit `src/App.jsx` line ~470:
```javascript
if (loginEmail === 'hr205@hotmail.com' && loginPassword === 'YOUR_NEW_PASSWORD') {
```

### Add/Remove Service Interests

Edit the `SERVICE_INTERESTS` array in `src/App.jsx`:
```javascript
const SERVICE_INTERESTS = [
  'Your Service 1',
  'Your Service 2',
  // ...
];
```

### Change Logo

Replace the image URL in `src/App.jsx` (line ~45):
```javascript
src="https://your-logo-url-here"
```

## Email Setup (Optional)

To add email confirmations, integrate with:
- **Supabase** - Email service
- **SendGrid** - Transactional emails
- **Mailgun** - Email API

See `DEPLOYMENT_GUIDE.md` for detailed setup.

## Support

For issues or questions, contact HR 205 LLC Communications:
- **Phone:** 205-810-1636
- **Email:** hr205@hotmail.com
- **Address:** 1711 Bessemer Rd, Birmingham, Alabama 35208

## License

All rights reserved © 2024 HR 205 LLC Communications

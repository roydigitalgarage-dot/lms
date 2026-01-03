# 🎓 Vijay School LMS - Static Website

A complete Learning Management System built as a **100% static website** with React + TypeScript. No backend required!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Demo Login Credentials

### Administrator

- **Email**: demo@funlearning.com
- **Password**: demo123
- **Access**: Full system management

### Teacher

- **Email**: teacher1@funlearning.com
- **Password**: demo123
- **Access**: Student management, grading

### Student

- **Email**: student1_1@funlearning.com
- **Password**: demo123
- **Access**: Courses, assignments, AI tutor

### Parent

- **Email**: parent1_1@funlearning.com
- **Password**: demo123
- **Access**: Child progress monitoring

## 📱 Features

### ✅ Core Features

- Role-based dashboards (Admin, Teacher, Student, Parent)
- Course management with 7 subjects
- Assignment tracking and submission
- Grade viewing and analytics
- AI Tutor chatbot interface
- Calendar with events
- Responsive mobile-first design
- Dark/light theme toggle
- Notification center

### 📚 Subjects Available

- 🅰️ Telugu
- 🇮🇳 Hindi
- 🇬🇧 English
- 🔢 Mathematics
- 🔬 Science
- 🌍 Social Studies
- 🌱 EVS (Environmental Studies)

## 🌐 Deployment

### Option 1: Netlify

1. Run `npm run build`
2. Upload `dist` folder to Netlify
3. Done! ✨

### Option 2: Vercel

1. Connect GitHub repository
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Option 3: GitHub Pages

1. Push to GitHub
2. Enable GitHub Pages
3. Deploy from `dist` folder

### Option 4: Any Web Server

Simply upload the contents of `dist` folder to any web server (Apache, Nginx, etc.)

## 📊 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State**: React Context API
- **Storage**: LocalStorage (for auth)

## 📁 Project Structure

```
├── public/          # Static assets
├── src/
│   ├── components/  # All React components
│   ├── contexts/    # Auth & Theme contexts
│   ├── services/    # Mock data & API
│   └── App.tsx      # Main app
├── dist/           # Built files (deploy this)
└── package.json    # Dependencies
```

## 🎯 Key Highlights

- ⚡ **Lightning Fast**: No server requests, instant loading
- 🔒 **Secure**: No backend vulnerabilities
- 💰 **Free Hosting**: Deploy anywhere for free
- 📱 **Mobile Optimized**: Works perfectly on all devices
- 🌍 **Offline Ready**: Can work offline with PWA setup
- 🎨 **Beautiful UI**: Modern, colorful, kid-friendly design

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### 🤖 AI Tutor with OpenAI (Optional)

The AI Tutor supports ChatGPT responses in **English, Telugu, and Hindi**.

**Setup (Recommended - Secure Proxy)**

Terminal 1 - Start proxy server (keeps API key secret):

```powershell
$env:OPENAI_API_KEY = 'sk_your_openai_key_here'
npm run start:server
```

Terminal 2 - Start frontend:

1. Create `.env`:

```ini
VITE_API_PROXY=http://localhost:3001
```

2. Run:

```powershell
npm run dev
```

3. Open AI Tutor, select Subject & Language, ask a question, and press Send.

**How it works**: Proxy server holds the API key and forwards requests to OpenAI. Language detection ensures responses are in the requested language.

## 📝 Notes

- All data is mock data stored in `src/services/mockData.ts`
- Authentication uses localStorage
- No real backend required
- Perfect for demos and presentations

## 🎊 Success!

Your LMS is now a fully functional static website ready to deploy anywhere! 🚀

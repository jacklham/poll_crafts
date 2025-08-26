# 🗳️ PollCraft

<div align="center">

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**🚀 Create Amazing Polls That People Love**

*A modern, full-stack polling application built with React, TypeScript, and Express*

[🌟 Live Demo](https://github.com/jacklham/poll_crafts) • [📖 Documentation](#-getting-started) • [🤝 Contribute](#-contributing)

</div>

---

## ✨ What is PollCraft?

PollCraft is a beautiful, production-ready polling application that makes it easy to create, share, and discover polls. Built with modern web technologies, it features a sleek user interface, robust authentication system, and real-time poll management.

### 🎯 Perfect for:
- **Community Engagement** - Build stronger connections with your audience
- **Market Research** - Gather valuable insights from your customers  
- **Team Decisions** - Make collaborative choices with your colleagues
- **Social Media** - Create engaging content that drives interaction
- **Educational Use** - Interactive learning and classroom participation

---

## 🌟 Key Features

### 🔐 **Secure Authentication System**
- User registration and login
- Session persistence across browser sessions
- Protected routes for authenticated users only
- Secure credential handling

### 📊 **Powerful Poll Management**
- **Create Polls** with multiple options and settings
- **Browse & Discover** trending polls by category
- **Real-time Voting** with instant result updates
- **Poll Settings** - duration, multiple choice, anonymity
- **Search & Filter** to find relevant polls quickly

### 🎨 **Beautiful Modern UI**
- **Responsive Design** - works perfectly on all devices
- **Dark/Light Mode** support with system preference detection
- **Smooth Animations** powered by Framer Motion
- **Accessible Components** built with Radix UI
- **Professional Styling** with Tailwind CSS

### 🌐 **Community Features**
- **Community Dashboard** to see what's trending
- **User Profiles** with activity tracking
- **Top Contributors** leaderboard
- **Real-time Activity** feed

### ⚡ **Developer Experience**
- **TypeScript** for type safety and better development experience
- **Hot Module Replacement** for lightning-fast development
- **Comprehensive Testing** with Vitest
- **Production Ready** build system
- **Easy Deployment** to Netlify, Vercel, or any hosting platform

---

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) - [Install guide](https://pnpm.io/installation)
- **Git** - [Download here](https://git-scm.com/)

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jacklham/poll_crafts.git
   cd poll_crafts
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # The app will be available at http://localhost:8080
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:8080` and start exploring PollCraft! 🎉

### 🏗️ Project Structure

```
poll_crafts/
├── 📁 client/                 # React frontend application
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 ui/            # Shadcn/ui component library
│   │   ├── 📁 layout/        # Layout components (header, footer)
│   │   └── 📁 auth/          # Authentication components
│   ├── 📁 contexts/          # React context providers
│   ├── 📁 pages/             # Application pages/routes
│   │   ├── 📁 auth/          # Sign in/up pages
│   │   ├── 📁 polls/         # Poll-related pages
│   │   └── 📁 community/     # Community features
│   ├── 📁 hooks/             # Custom React hooks
│   └── 📁 lib/               # Utility functions
├── 📁 server/                # Express backend
│   ├── 📁 routes/            # API route handlers
│   └── index.ts              # Server entry point
├── 📁 shared/                # Shared types between client/server
└── 📁 public/                # Static assets
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm test` | Run test suite |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm format.fix` | Format code with Prettier |

---

## 🎨 Customization Guide

### 🎯 **Make PollCraft Your Own**

#### 1. **Branding & Styling**
```bash
# Update colors and themes
📝 client/global.css          # CSS variables and design tokens
📝 tailwind.config.ts         # Tailwind configuration
📝 client/components/layout/Layout.tsx  # Header and navigation
```

#### 2. **Application Name & Metadata**
```bash
📝 index.html                 # Page title and meta tags
📝 package.json              # Project name and description
📝 client/components/layout/Layout.tsx  # App name in navigation
```

#### 3. **Features & Functionality**
```bash
📝 client/pages/              # Add new pages and routes
📝 server/routes/             # Create new API endpoints
📝 shared/api.ts              # Define shared types
```

#### 4. **Database Integration**
Currently using localStorage for demo purposes. To add a real database:

```typescript
// Example: Add PostgreSQL with Prisma
pnpm add prisma @prisma/client
pnpm add -D prisma

// Or MongoDB with Mongoose
pnpm add mongoose
pnpm add -D @types/mongoose
```

### 🎨 **Styling & Theming**

PollCraft uses a modern design system:
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible, unstyled components
- **CSS Variables** for consistent theming
- **Responsive Design** with mobile-first approach

---

## 🌐 Deployment

### 🚀 **Deploy to Netlify**
1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `dist/spa`
4. Deploy! 🎉

### 🚀 **Deploy to Vercel**
1. Install Vercel CLI: `pnpm add -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your app is live! 🎉

### 🐳 **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
```

---

## 🏗️ Tech Stack

### **Frontend**
- ⚛️ **React 18** - Modern React with concurrent features
- 🔷 **TypeScript** - Type safety and better developer experience  
- ⚡ **Vite** - Lightning fast build tool and dev server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **Radix UI** - Accessible, unstyled component library
- 📱 **React Router 6** - Client-side routing with SPA mode
- 🔄 **TanStack Query** - Powerful data fetching and caching
- 🎭 **Framer Motion** - Smooth animations and gestures

### **Backend**
- 🟢 **Node.js** - JavaScript runtime
- 🚂 **Express 5** - Fast, unopinionated web framework
- 🔷 **TypeScript** - Full-stack type safety
- 🛡️ **Zod** - Schema validation and type inference

### **Development & Tooling**
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🧪 **Vitest** - Next generation testing framework
- 💄 **Prettier** - Code formatting
- 🔍 **ESLint** - Code linting and quality
- 🏗️ **Vite** - Modern build tool with HMR

---

## 🤝 Contributing

We love contributions! Here's how you can help make PollCraft even better:

### 🐛 **Report Bugs**
- Use the [GitHub Issues](https://github.com/jacklham/poll_crafts/issues) page
- Include detailed steps to reproduce
- Add screenshots if applicable

### ✨ **Suggest Features**
- Open a [feature request](https://github.com/jacklham/poll_crafts/issues/new)
- Describe the feature and its benefits
- Include mockups or examples if possible

### 🔧 **Submit Pull Requests**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

### 📝 **Development Guidelines**
- Follow TypeScript best practices
- Write tests for new features
- Keep components small and focused
- Use semantic commit messages
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Fusion Starter** - Built on the excellent Fusion starter template
- **Radix UI** - For accessible, unstyled components
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide Icons** - For beautiful, consistent icons
- **Vercel** & **Netlify** - For easy deployment platforms

---

## 📞 Support & Community

- 🐛 **Issues**: [GitHub Issues](https://github.com/jacklham/poll_crafts/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/jacklham/poll_crafts/discussions)
- 📧 **Email**: [Your Email Here]
- 🐦 **Twitter**: [@YourTwitter]

---

<div align="center">

**Made with ❤️ by [Jack Lham](https://github.com/jacklham)**

*⭐ Star this repository if you find it helpful!*

</div>

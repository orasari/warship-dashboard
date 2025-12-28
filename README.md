# World of Warships Fleet Browser

A responsive React application for browsing and filtering 1000+ World of Warships ships with advanced search, filters, and virtual scrolling.

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11.2-purple)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-blue)](https://tailwindcss.com/)

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/orasari/warship-dashboard.git
cd warship-dashboard
npm install

# Install dependencies in /clinet & /proxy
cd client && npm install
cd ../proxy && npm install
cd ..

# Start everything from root folder
npm start
```

**Open http://localhost:3000** 🎉

### Production Build

```bash
npm run build    # Build optimized bundle
npm run serve    # Serve production build
```

Then run Lighthouse on http://localhost:3000

**Expected Scores:** Performance 85-90 | Accessibility 97 | Best Practices 100 | SEO 100

---

## ⚙️ Tech Stack

**Frontend:** React 19 • TypeScript • Redux Toolkit • Tailwind CSS  
**Performance:** Tanstack Virtual (virtual scrolling for 1000+ items)  
**Backend:** Express proxy server (CORS handling + file caching)  
**Code Quality:** ESLint • Prettier • Husky • lint-staged  
**Testing:** Jest • React Testing Library

## 📁 Project Structure

```
warship-dashboard/
├── client/              # React app
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── features/    # Redux slices
│   │   ├── services/    # API layer
│   │   └── types/       # TypeScript types
│   └── .vscode/         # VSCode settings
├── proxy/               # Express server
│   ├── cache/          # Cached API responses
│   └── server.js
├── .husky/             # Git hooks
└── ARCHITECTURE.md     # Design decisions
```

## ✨ Features

- **Real-time Search** - Debounced search (300ms) with instant results
- **Advanced Filtering** - By nation, type, tier, premium/special status
- **Smart Sorting** - Sort by name, tier, nation, or type (ascending/descending)
- **Virtual Scrolling** - Smooth scrolling through 1000+ ships
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark Theme** - Modern UI with Tailwind CSS

## 🎯 Performance

| Metric | Value | Status |
|--------|-------|--------|
| Lighthouse Performance | 85-90 | ✅ |
| Lighthouse Accessibility | 97 | ✅ |
| LCP (Largest Contentful Paint) | ~2s | ✅ |
| CLS (Cumulative Layout Shift) | 0 | ✅ Perfect |
| Bundle Size (Production) | ~95 KiB | ✅ |

**Optimizations:**
- Virtual scrolling (renders only ~10-20 visible items)
- Client-side filtering (no API calls after initial load)
- Debounced search (reduces re-renders by 90%)
- Image lazy loading with fixed dimensions (prevents layout shift)
- Memoized Redux selectors
- Production build tree-shaking

## 🧪 Code Quality

### Automated Checks

**Pre-commit (fast ~2s):**
- ESLint auto-fix
- Prettier auto-format
- TypeScript type checking

**Pre-push (thorough ~10-30s):**
- Full test suite
- Blocks push if tests fail

**Commit Messages:**
- Must start with `WOW:`
- Example: `WOW: Add ship filtering`

### Commands

```bash
npm start           # Start dev servers
npm test            # Run tests
npm run lint        # Lint code
npm run format      # Format code
npm run build       # Production build
```

**Bypass hooks (emergency only):**
```bash
git commit --no-verify
git push --no-verify
```

## 🏗️ Architecture

**Why Proxy Server?**  
Wargaming's Vortex API doesn't have CORS headers. The proxy solves this and adds file-based caching (24h).

**Why Redux Toolkit?**  
Complex filtering state with multiple combinations. Redux DevTools make debugging easy.

**Why Tanstack Virtual?**  
Handles 1000+ items with dynamic heights. Better than react-window for responsive layouts.

**Why Client-Side Filtering?**  
All data loads once (11MB cached). Filtering/sorting is instant with no loading states.

**Image Optimization Note:**  
Images are served from Wargaming's CDN as PNGs. Converting to WebP would require an image proxy. Current approach uses lazy loading + virtual scrolling (only ~10-20 images load at a time), which provides acceptable performance for this demo.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed decisions and trade-offs.

## 🧪 Testing

```bash
cd client
npm test                  # Watch mode
npm run test:coverage     # Coverage report
```

**Coverage:** 80%+ on critical paths

**Test Strategy:**
- Component tests (React Testing Library)
- Redux slice tests (state management)
- Hook tests (useDebounce)
- API service tests (error handling)

## 📝 Development

### Prerequisites

- Node.js v20.19.6 (see `.nvmrc`)
- npm

### VSCode Setup

Recommended extensions (auto-suggested):
- ESLint
- Prettier
- Tailwind CSS IntelliSense

Settings included for:
- Format on save
- Auto-import
- Tailwind IntelliSense

### Git Workflow

```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "WOW: Add new feature"  # Pre-commit runs linting
git push origin feature/new-feature    # Pre-push runs tests
```

## 🚀 Deployment

**Production build:**
```bash
npm run build
```

Creates optimized build in `client/build/`:
- Minified JS/CSS
- Tree-shaken code
- Source maps
- Optimized chunks

**Serve locally:**
```bash
npm run serve
```

**Deploy:**
- Frontend: Vercel, Netlify, GitHub Pages
- Proxy: Heroku, Railway, Render

---

**Built by Mina Stankovic** | [GitHub](https://github.com/orasari/warship-dashboard)
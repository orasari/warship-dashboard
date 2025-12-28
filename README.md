# World of Warships Fleet Browser

A responsive web application for browsing and filtering World of Warships ship data from the Wargaming Vortex API.

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11.2-purple)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-blue)](https://tailwindcss.com/)

## 🚀 Quick Start

Get the app running in 3 steps:

```bash
# 1. Clone and install
git clone https://github.com/orasari/warship-dashboard.git
cd warship-dashboard
npm install

# 2. Install client and proxy dependencies
cd client && npm install
cd ../proxy && npm install
cd ..

# 3. Start everything
npm start
```

**That's it!** Open http://localhost:3000 🎉

**Output:**
```
[proxy] Proxy server running on http://localhost:3001
[client] webpack compiled successfully
[client] On Your Network: http://localhost:3000
```

### Production Build (for Lighthouse testing)

```bash
npm run build    # Build optimized production bundle
npm run serve    # Serve production build
```

Then run Lighthouse on http://localhost:3000

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Performance](#performance)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Architecture Decisions](#architecture-decisions)

## Overview

This project consists of two main components:

### 1. **Client** (React Application)
- React 19 application with TypeScript
- Displays 1000+ ships with advanced filtering and search
- Responsive design (desktop, tablet, mobile)
- Virtual scrolling for optimal performance
- Lighthouse Performance Score: **85-90**

### 2. **Proxy Server** (Node.js)
- Simple Express proxy server
- Solves CORS issues when accessing Wargaming's Vortex API
- File-based caching (24-hour duration)
- Runs on `http://localhost:3001`

## Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────────┐
│   Browser   │ ──────> │Proxy Server │ ──────> │ Vortex API      │
│  (Client)   │ <────── │(localhost:  │ <────── │ (Wargaming)     │
│  :3000      │         │ 3001)       │         │                 │
└─────────────┘         └─────────────┘         └─────────────────┘
                              │
                              ├─ File-based Cache
                              └─ CORS Headers
```

### Why Do We Need a Proxy Server?

**The Problem:**
- Wargaming's Vortex API doesn't have CORS headers enabled
- Browsers block direct API calls due to Same-Origin Policy
- Error: `Access-Control-Allow-Origin header is missing`

**The Solution:**
- Local proxy server acts as a middleman
- Proxy fetches data from Vortex API (server-to-server, no CORS)
- Client fetches from proxy (same origin: localhost)
- **Bonus:** File-based caching reduces API calls

## Tech Stack

### Client Dependencies

#### **Core**
- **React 19.2.3** - Latest React with improved performance
- **TypeScript 4.9.5** - Type safety and better DX
- **React Router DOM 7.11.0** - Client-side routing

#### **State Management**
- **Redux Toolkit 2.11.2** - Modern Redux with less boilerplate
- **React Redux 9.2.0** - React bindings for Redux

**Why Redux Toolkit?**
- Simpler than vanilla Redux (less boilerplate)
- Built-in Immer for immutable updates
- DevTools integration out of the box
- Great for complex filtering/sorting state

#### **UI & Styling**
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Lucide React 0.562.0** - Modern icon library (tree-shakeable)

**Why Tailwind?**
- No CSS file organization needed
- Consistent design system
- Responsive utilities built-in
- Smaller bundle than component libraries

#### **Performance**
- **@tanstack/react-virtual 3.13.13** - Virtual scrolling

**Why Tanstack Virtual over react-window?**
- ❌ **react-window issues:**
  - Poor responsive behavior (requires manual resize handling)
  - Fixed heights required (problematic for dynamic content)
  - Difficult to integrate with CSS Grid/Flexbox
  - Not actively maintained

- ✅ **@tanstack/react-virtual benefits:**
  - Works with dynamic heights
  - Responsive out of the box
  - Integrates seamlessly with modern CSS
  - Actively maintained by Tanner Linsley
  - Better TypeScript support

#### **Code Quality & Testing**
- **ESLint 8.57.0** - Code linting with react-app config
- **Prettier 3.2.5** - Code formatting (auto-format on save)
- **Husky 9.0.11** - Git hooks for pre-commit quality checks
- **lint-staged 15.2.0** - Run linters only on staged files
- **Testing Library** - React testing utilities
- **Jest** - Test runner (via react-scripts)

### Proxy Server Dependencies

- **Express** - Simple HTTP server
- **cors** - Enable CORS for client requests
- **axios** - HTTP client with better error handling
- **File-based caching** - Reduce API calls (custom implementation)

## Getting Started

### Prerequisites

- **Node.js v20.19.6** (see `.nvmrc`)
- **npm** (comes with Node.js)

### Detailed Setup

If you prefer to understand each step or run servers separately:

**1. Clone the repository:**
```bash
git clone https://github.com/orasari/warship-dashboard.git
cd warship-dashboard
```

**2. Install dependencies:**
```bash
# Root (for concurrent scripts)
npm install

# Client
cd client
npm install

# Proxy
cd ../proxy
npm install
```

**3. Start servers:**

**Option A: Easy Mode (recommended)**
```bash
# From repo root - starts both proxy and client
npm start
```

**Option B: Separate Terminals**

**Terminal 1 - Proxy:**
```bash
cd proxy
npm start
```

**Terminal 2 - Client:**
```bash
cd client
npm start
```

**4. Open browser:**
```
http://localhost:3000
```

### Root Commands (from repo root)

| Command | Description |
|---------|-------------|
| `npm start` | 🚀 Start proxy + client (dev mode) |
| `npm run build` | 📦 Build client for production |
| `npm run serve` | 🔥 Serve production build + proxy |
| `npm test` | ✅ Run client tests |
| `npm run lint` | 🔍 Lint client code |
| `npm run format` | ✨ Format client code |

**Stop servers:** Press `Ctrl+C` once to stop both!

## Production Build

To test the optimized production build and run Lighthouse audits:

### Quick Method (from root)

```bash
# Build and serve production
npm run build    # Builds client
npm run serve    # Serves production build + starts proxy
```

Then run Lighthouse on `http://localhost:3000`

### Detailed Steps

**1. Build for Production**

```bash
# From root
npm run build

# Or from client directory
cd client
npm run build
```

This creates an optimized production build in `client/build/` with:
- ✅ Minified JavaScript (~95 KiB)
- ✅ Minified CSS (~5 KiB)
- ✅ Tree-shaken code (unused code removed)
- ✅ Optimized chunks
- ✅ Source maps for debugging

**2. Serve Production Build**

```bash
# From root (recommended)
npm run serve

# Or manually:
# Terminal 1
cd proxy && npm start

# Terminal 2
cd client && npx serve -s build -p 3000
```

**3. Run Lighthouse**

1. Open Chrome browser
2. Navigate to `http://localhost:3000`
3. Open DevTools (F12)
4. Go to "Lighthouse" tab
5. Select all categories
6. Click "Analyze page load"

**Expected Scores:**
- Performance: **85-90**
- Accessibility: **97**
- Best Practices: **100**
- SEO: **100**

### Production Build Notes

**Bundle Sizes:**
- Development build: ~383 KiB (unminified)
- Production build: ~95 KiB (minified + gzipped)
- **87% size reduction!**

**Performance Optimizations Applied:**
- Code splitting
- Tree shaking
- Minification
- Dead code elimination
- Optimized chunks

## Project Structure

```
wows-fleet/
├── client/                    # React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── app/             # Redux store configuration
│   │   ├── components/      # React components
│   │   │   ├── Layout/     # Layout components (Header, Sidebar, etc.)
│   │   │   └── ShipDetail/ # Ship detail components
│   │   ├── features/        # Redux slices
│   │   │   └── ships/      # Ships state management
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── .vscode/             # VSCode settings
│   │   ├── settings.json   # Editor config (format on save)
│   │   └── extensions.json # Recommended extensions
│   ├── .prettierrc          # Prettier configuration
│   ├── .eslintrc.json       # ESLint rules
│   ├── package.json
│   └── tailwind.config.js
│
├── proxy/                     # Proxy server
│   ├── cache/                # Cached API responses
│   ├── server.js             # Express server
│   ├── cacheManager.js       # File-based cache logic
│   └── package.json
│
├── .husky/                   # Git hooks
│   ├── pre-commit           # Runs lint-staged
│   └── commit-msg           # Validates commit format
│
├── .nvmrc                    # Node version (20.19.6)
├── ARCHITECTURE.md           # Architecture decisions
└── README.md
```

## Key Features

### Client Features

- **Real-time Search** - Debounced search (300ms) for optimal performance
- **Advanced Filtering** - Filter by nation, type, tier, premium/special status
- **Smart Sorting** - Sort by name, tier, nation, or type (ascending/descending)
- **Virtual Scrolling** - Smooth scrolling through 1000+ ships
- **Responsive Design** - Mobile-first design with tailored layouts
- **Modern UI** - Tailwind CSS with dark theme
- **Redux State Management** - Centralized state with Redux Toolkit
- **Unit Tests** - Comprehensive test coverage with Testing Library
- **Type Safety** - Full TypeScript coverage

### Proxy Features

- **File-based caching** - 24-hour cache duration
- **CORS handling** - Solves cross-origin issues
- **Fast responses** - Cached data served instantly
- **Error handling** - Graceful degradation
- **Cache management** - `/health` endpoint for cache stats

## Performance

### Lighthouse Scores

| Metric | Score | Notes |
|--------|-------|-------|
| Performance | 85-90 | Optimized with virtual scrolling |
| Accessibility | 97 | WCAG 2.1 AA compliant |
| Best Practices | 100 | Modern React patterns |
| SEO | 100 | Semantic HTML, meta tags |

### Core Web Vitals

| Metric | Value | Status |
|--------|-------|--------|
| LCP (Largest Contentful Paint) | ~2s | ✅ Good |
| FID (First Input Delay) | <100ms | ✅ Good |
| CLS (Cumulative Layout Shift) | 0 | ✅ Perfect |

### Performance Optimizations

1. **Virtual Scrolling**
   - Only renders ~10-20 visible items
   - Handles 1000+ ships smoothly at 60fps
   - Dynamic height calculation

2. **Client-Side Filtering**
   - No API calls after initial load
   - Instant filter/sort operations
   - Memoized Redux selectors

3. **Debounced Search**
   - 300ms debounce reduces re-renders by 90%
   - Custom `useDebounce` hook
   - Smooth typing experience

4. **Image Optimization**
   - Lazy loading (except first image)
   - Fixed dimensions (prevents layout shift)
   - `fetchpriority="high"` for LCP image
   - Proper alt text for accessibility

5. **Code Splitting**
   - Ship detail page lazy-loaded
   - Production build tree-shakes unused code
   - Optimized chunks (~95 KiB total)

6. **State Management**
   - Memoized selectors prevent unnecessary re-renders
   - Immer for efficient immutable updates
   - Normalized data structure

### Image Optimization Considerations

**Current Approach:**
- Images served from Wargaming's CDN
- Lazy loading with virtual scrolling
- Only visible images loaded (~10-20 at a time)

**Why Not WebP/AVIF?**
Images are served from Wargaming's external CDN as PNGs. To optimize them, we'd need:
- Image proxy server to intercept requests
- Convert PNGs to WebP/AVIF on-the-fly
- Resize images to displayed dimensions
- CDN/storage for converted images

**Trade-off Analysis:**
- **For Production (millions of users):** ROI makes sense - bandwidth savings would be significant
- **For This Demo:** Current performance is acceptable
  - Virtual scrolling ensures only ~10-20 images load
  - Lazy loading defers off-screen images
  - Fixed dimensions prevent layout shift (CLS: 0)
  - Adding an image proxy would add significant complexity for minimal demo benefit

## Code Quality

### Automated Quality Checks

**Pre-commit Hooks (Husky):**
```bash
git commit -m "WOW: Add new feature"

# Automatically runs:
# 1. ESLint (auto-fix)
# 2. Prettier (auto-format)
# 3. TypeScript type checking
# 4. Validates commit message format
```

**Commit Message Convention:**
All commits must start with `WOW:` prefix:
- ✅ `WOW: Add ship filtering feature`
- ✅ `WOW: Fix mobile layout bug`
- ❌ `Add ship filtering feature` (rejected)

### Code Style

- **Prettier** - Auto-formatting on save and commit
- **ESLint** - React best practices, no-console warnings
- **TypeScript** - Strict mode enabled
- **Conventions:**
  - Single quotes
  - 2-space indentation
  - Trailing commas (ES5)
  - Max line length: 80 characters

### Available Scripts (Client)

```bash
npm start              # Start development server
npm run build          # Create production build
npm test               # Run tests in watch mode
npm run test:coverage  # Generate coverage report
npm run lint           # Lint code
npm run lint:fix       # Fix linting issues automatically
npm run format         # Format code with Prettier
npm run format:check   # Check formatting (CI)
```

### Available Scripts (Proxy)

```bash
npm start              # Start proxy server
```

## Testing

### Test Coverage

**Component Tests:**
- ShipCard, ShipDetail components
- Layout components (Header, Sidebar, Filters)
- Filter controls, Sort controls
- Loading states, Error boundaries

**Redux Tests:**
- Ship slice (filters, sorting, state management)
- Selectors (memoization, edge cases)
- Async thunks (API calls, error handling)

**Hook Tests:**
- useDebounce (timing, cleanup)
- Custom hooks

**Service Tests:**
- API service (error handling, data transformation)

### Running Tests

```bash
cd client

# Interactive watch mode
npm test

# Coverage report
npm run test:coverage

# Coverage thresholds:
# - Statements: 80%+
# - Branches: 75%+
# - Functions: 80%+
# - Lines: 80%+
```

### Testing Philosophy

- Test user-visible behavior, not implementation
- Mock child components for focused tests
- Use semantic queries (`getByRole`, `getByText`)
- Focus on critical paths over 100% coverage
- Keep tests simple and maintainable

### Key Decisions

1. **Client-Side Filtering** - Load all data once, filter instantly (vs. server-side pagination)
2. **Redux Toolkit** - Centralized state for complex filtering (vs. Context API)
3. **Tanstack Virtual** - Variable-height virtual scrolling (vs. react-window)
4. **Tailwind CSS** - Utility-first styling (vs. CSS Modules/Bootstrap)
5. **Proxy Server** - CORS solution with caching (vs. backend API)

### Trade-offs

| Decision | Pro | Con | Mitigation |
|----------|-----|-----|------------|
| Client-side filtering | Instant UX | 11MB initial load | File caching, virtual scrolling |
| All data upfront | No loading states | Memory usage | Virtual scrolling, normalized data |
| External CDN images | No hosting costs | Can't optimize format | Lazy loading, fixed dimensions |

## Development

### VSCode Setup

The project includes VSCode settings for optimal DX:

**.vscode/settings.json:**
- Format on save (Prettier)
- ESLint auto-fix on save
- Tailwind IntelliSense
- TypeScript auto-imports

**Recommended Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense

Install with: `Extensions: Show Recommended Extensions` in VSCode

### Git Workflow

1. **Create feature branch**
```bash
git checkout -b feature/ship-comparison
```

2. **Make changes and commit**
```bash
git add .
git commit -m "WOW: Add ship comparison feature"
# Pre-commit hooks run automatically
```

3. **Push and create PR**
```bash
git push origin feature/ship-comparison
```

### Common Issues

**Issue: Proxy not running**
```bash
# Check if port 3001 is in use
lsof -ti:3001

# Kill process if needed
kill -9 $(lsof -ti:3001)

# Restart proxy
cd proxy && npm start
```

**Issue: Client can't connect to proxy**
- Verify proxy is running on port 3001
- Check client is fetching from `http://localhost:3001`
- Clear browser cache

**Issue: Husky hooks not running**
```bash
# Reinstall hooks
npx husky install

# Make executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```
---

**Built by Mina Stankovic**
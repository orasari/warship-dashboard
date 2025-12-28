# World of Warships Fleet Browser

A responsive web application for browsing and filtering World of Warships ship data from the Wargaming Vortex API.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)


## Overview

This project consists of two main components:

### 1. **Client** (React Application)
- React 19 application with TypeScript
- Displays 1000+ ships with advanced filtering and search
- Responsive design (desktop, tablet, mobile)
- Virtual scrolling for optimal performance

### 2. **Proxy Server** (Node.js)
- Simple Express proxy server
- Solves CORS issues when accessing Wargaming's Vortex API
- Caches API responses for better performance
- Runs on `http://localhost:3001`

## Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────────┐
│   Browser   │ ──────> │Proxy Server │ ──────> │ Vortex API      │
│  (Client)   │ <────── │(localhost:  │ <────── │ (Wargaming)     │
│  :3000      │         │ 3001)       │         │                 │
└─────────────┘         └─────────────┘         └─────────────────┘
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
- Bonus: File-based caching reduces API calls

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

#### **Quality & Testing**
- **ESLint 8.57.0** - Code linting
- **Testing Library** - React testing utilities
- **Jest** - Test runner (via react-scripts)

### Proxy Server Dependencies

- **Express** - Simple HTTP server
- **cors** - Enable CORS for client requests
- **node-fetch** - Fetch API for Node.js
- **File-based caching** - Reduce API calls

## Getting Started

### Prerequisites

- **Node.js v20.19.6** (see `.nvmrc`)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd wows-fleet
```

2. **Install dependencies:**
```bash
# Client
cd client
npm install

# Proxy
cd ../proxy
npm install
```

3. **Start the development servers:**

**Terminal 1 - Proxy Server:**
```bash
cd proxy
npm start
# Proxy runs on http://localhost:3001
```

**Terminal 2 - Client:**
```bash
cd client
npm start
# Client runs on http://localhost:3000
```

4. **Open browser:**
```
http://localhost:3000
```

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
│   ├── package.json
│   └── tailwind.config.js
│
├── proxy/                     # Proxy server
│   ├── cache/                # Cached API responses
│   ├── server.js             # Express server
│   ├── cacheManager.js       # File-based cache logic
│   └── package.json
│
├── .nvmrc                    # Node version (20.19.6)
└── README.md
```

## Key Features

### Client Features

- **Real-time Search** - Debounced search (300ms) for optimal performance
- **Advanced Filtering** - Filter by nation, type, tier, premium/special status
- **Smart Sorting** - Sort by name, tier, nation, or type
- **Virtual Scrolling** - Smooth scrolling through 1000+ ships
- **Responsive Design** - Mobile-first design with breakpoints
- **Modern UI** - Tailwind CSS with dark theme
- **Redux State Management** - Centralized state with Redux Toolkit
- **Unit Tests** - Component tests with Testing Library

### Performance Optimizations

1. **Client-side filtering** - No API calls after initial load
2. **Debounced search** - Reduces re-renders while typing
3. **Virtual scrolling** - Only renders visible items
4. **Memoized selectors** - Redux selectors cached
5. **Code splitting** - Lazy loading for ship detail page

### Proxy Features

- **File-based caching** - Reduces API calls to Vortex
- **CORS handling** - Solves cross-origin issues
- **Fast responses** - Cached data served instantly
- **Error handling** - Graceful degradation

## Development

### Available Scripts (Client)

```bash
npm start              # Start development server
npm run build          # Create production build
npm test               # Run tests in watch mode
npm run test:coverage  # Generate coverage report
npm run lint           # Lint code
npm run lint:fix       # Fix linting issues automatically
```

### Available Scripts (Proxy)

```bash
npm start              # Start proxy server
```

### Running Tests

```bash
cd client
npm test               # Interactive watch mode
npm run test:coverage  # Coverage report
```

### Code Quality

The project uses:
- **ESLint** - Code linting (extends react-app config)
- **TypeScript** - Type checking
- **Prettier** (optional) - Code formatting

---

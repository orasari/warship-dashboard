# Architecture Decisions

## 🎯 Core Philosophy

Load all data once (~11MB), filter instantly client-side. Prioritize UX speed over initial load time.

---

## Trade-offs & Decisions

| Decision | Pro | Con | Mitigation |
|----------|-----|-----|------------|
| Client-side filtering | Instant UX | 11MB initial load | File caching, virtual scrolling |
| All data upfront | No loading states | Memory usage | Virtual scrolling limits DOM nodes |
| Redux Toolkit | Complex filters, DevTools | More boilerplate than Context | Worth it for debugging |
| Tanstack Virtual | Dynamic heights, responsive | Learning curve | Well-documented |
| External CDN images | No hosting costs | Can't optimize format | Lazy loading + virtual scrolling |
| No image proxy | Simple architecture | PNG instead of WebP | Only ~10-20 images load at once |
| Proxy server | Solves CORS, caching | Extra deployment | Required for browser access |

---

## Performance Optimizations

### Implemented

1. **Virtual Scrolling** - Renders only ~10-20 visible items (not all 1000+)
2. **Client-Side Filtering** - No network requests after initial load
3. **Debounced Search (300ms)** - Reduces re-renders by 90%
4. **Image Optimization:**
   - Lazy loading (except first image)
   - Fixed dimensions (prevents layout shift)
   - `fetchpriority="high"` for LCP image
5. **Memoized Redux Selectors** - Cached with Reselect
6. **Production Build Tree-Shaking** - 87% size reduction

### Results

| Metric | Value | Status |
|--------|-------|--------|
| Lighthouse Performance | 85-90 | ✅ |
| CLS (Layout Shift) | 0 | ✅ Perfect |
| LCP (Largest Paint) | ~2s | ✅ |
| Bundle Size | ~95 KiB | ✅ |
| Virtual Scrolling FPS | 60 fps | ✅ |

---

## Image Optimization Decision

### Current Approach
- Images served from Wargaming's CDN as PNGs
- Lazy loading with virtual scrolling
- Only ~10-20 images load at a time

### Why Not WebP/AVIF?

**Would Require:**
- Image proxy server
- On-the-fly PNG → WebP conversion
- CDN/storage for converted images
- Cache management system

### Trade-off Analysis

**For Production (millions of users):**
- ✅ Worth the investment
- ✅ Significant bandwidth savings
- ✅ Improved performance

**For This Demo:**
- ✅ Current approach is acceptable
- ✅ Virtual scrolling already provides 98% savings
- ✅ Fixed dimensions prevent layout shift (CLS: 0)
- ❌ Complexity vs. benefit doesn't justify it

### Bandwidth Impact

```
Without optimization: 30 KB × 1000 ships = 30 MB total
With virtual scrolling: 30 KB × 20 visible = 600 KB actual
Savings: 98% already achieved
```

**Conclusion:** Virtual scrolling provides most of the benefit without added complexity.

---

## Scaling Considerations

### Current Capacity
- **1,000 ships** - ✅ Handles smoothly
- **1,000 concurrent users** - ✅ Acceptable

### 10k Ships
- Add pagination or infinite scroll
- Consider server-side filtering
- Reduce initial payload

### 100k Users
- Add CDN (Cloudflare, Fastly)
- Implement Redis caching on proxy
- Load balancing for proxy server

### 1M Users
- Separate backend API
- Database caching (PostgreSQL + Redis)
- Microservices architecture
- Consider regional deployments

### When to Reconsider Architecture

| Threshold | Action Required |
|-----------|----------------|
| >10k ships | Server-side filtering + pagination |
| >100k users/month | CDN + Redis caching |
| >1M users/month | Full backend rewrite, database |
| Mobile-heavy traffic | Image proxy for WebP conversion |

---

**Last Updated:** December 2024  
**Version:** 1.0
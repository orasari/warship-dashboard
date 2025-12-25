const express = require('express');
const cors = require('cors');
const axios = require('axios');
const CacheManager = require('./cacheManager');

const app = express();
const PORT = 3001;

// Base API URL
const API_BASE_URL = 'https://vortex.worldofwarships.eu/api/encyclopedia/en';

// Initialize cache manager (24 hours cache duration)
const cache = new CacheManager('cache', 24 * 60 * 60 * 1000);

// Enable CORS for all origins (restrict in production)
app.use(cors());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Proxy endpoint with file-based caching
app.get('/api/*', async (req, res) => {
  try {
    // Extract the path after /api/
    const apiPath = req.path.replace('/api/', '');
    const targetUrl = `${API_BASE_URL}/${apiPath}`;
    
    // Check cache first
    const cachedData = cache.get(apiPath);
    if (cachedData) {
      console.log(`✓ Cache HIT: ${apiPath}`);
      return res.status(200).json(cachedData);
    }
    
    console.log(`✗ Cache MISS - Fetching: ${targetUrl}`);
    
    // Forward the request to the actual API
    const response = await axios.get(targetUrl, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    
    // Cache the successful response
    const cached = cache.set(apiPath, response.data);
    if (cached) {
      console.log(`✓ Cached: ${apiPath}`);
    }
    
    // Forward the response
    res.status(response.status).json(response.data);
    
  } catch (error) {
    console.error('Proxy error:', error.message);
    
    if (error.response) {
      // API returned an error
      res.status(error.response.status).json({
        error: 'API Error',
        message: error.response.data || error.message,
      });
    } else if (error.request) {
      // Request was made but no response
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to reach the API server',
      });
    } else {
      // Something else went wrong
      res.status(500).json({
        error: 'Proxy Error',
        message: error.message,
      });
    }
  }
});

// Health check endpoint with cache stats
app.get('/health', (req, res) => {
  const stats = cache.getStats();
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    cache: {
      count: stats.length,
      files: stats
    }
  });
});

// Clear cache endpoint
app.delete('/api/cache', (req, res) => {
  const count = cache.clearAll();
  console.log(`Cache cleared: ${count} files deleted`);
  res.json({ 
    message: 'Cache cleared', 
    filesDeleted: count,
    timestamp: new Date().toISOString() 
  });
});

// Start server
app.listen(PORT, () => {
  const cacheCount = cache.getCount();
  console.log(`
╔════════════════════════════════════════════════════╗
║   Proxy Server Running                             ║
║   Port: ${PORT}                                      ║
║   Target: ${API_BASE_URL}                          ║
║   Cache: File-based (24 hours)                     ║
║   Cached files: ${cacheCount}                                      ║
║                                                    ║
║   Example usage:                                   ║
║   http://localhost:${PORT}/api/vehicles/           ║
║   http://localhost:${PORT}/api/nations/            ║
║                                                    ║
║   Cache management:                                ║
║   GET    http://localhost:${PORT}/health           ║
║   DELETE http://localhost:${PORT}/api/cache        ║
╚════════════════════════════════════════════════════╝
  `);
});
console.log('Starting proxy server...');

const express = require('express');
console.log('Express loaded');

const cors = require('cors');
console.log('CORS loaded');

const axios = require('axios');
console.log('Axios loaded');


const app = express();
const PORT = 3001;

// Base API URL
const API_BASE_URL = 'https://vortex.worldofwarships.eu/api/encyclopedia/en';

// Enable CORS for all origins (restrict in production)
app.use(cors());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Proxy endpoint with caching headers
app.get('/api/*', async (req, res) => {
  try {
    // Extract the path after /api/
    const apiPath = req.path.replace('/api/', '');
    const targetUrl = `${API_BASE_URL}/${apiPath}`;
    
    console.log(`Proxying to: ${targetUrl}`);
    
    // Forward the request to the actual API
    const response = await axios.get(targetUrl, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║   Proxy Server Running                             ║
║   Port: ${PORT}                                      ║
║   Target: ${API_BASE_URL}                          ║
║                                                    ║
║   Example usage:                                   ║
║   http://localhost:${PORT}/api/vehicles/           ║
║   http://localhost:${PORT}/api/nations/            ║
╚════════════════════════════════════════════════════╝
  `);
});
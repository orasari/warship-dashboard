const fs = require('fs');
const path = require('path');

class CacheManager {
  constructor(cacheDir = 'cache', cacheDuration = 24 * 60 * 60 * 1000) {
    this.CACHE_DIR = path.join(__dirname, cacheDir);
    this.CACHE_DURATION = cacheDuration;
    this.initialize();
  }

  /**
   * Initialize cache directory
   */
  initialize() {
    if (!fs.existsSync(this.CACHE_DIR)) {
      fs.mkdirSync(this.CACHE_DIR, { recursive: true });
      console.log('✓ Cache directory created');
    }
  }

  /**
   * Get safe file path for cache key
   * @param {string} key - Cache key
   * @returns {string} Safe file path
   */
  getCacheFilePath(key) {
    const safeKey = key.replace(/[^a-z0-9]/gi, '_');
    return path.join(this.CACHE_DIR, `${safeKey}.json`);
  }

  /**
   * Read data from cache
   * @param {string} key - Cache key
   * @returns {any|null} Cached data or null if not found/expired
   */
  get(key) {
    try {
      const filePath = this.getCacheFilePath(key);
      
      if (!fs.existsSync(filePath)) {
        return null;
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const cached = JSON.parse(fileContent);
      
      // Check if cache is still valid
      if (Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.data;
      }
      
      // Cache expired, delete file
      fs.unlinkSync(filePath);
      return null;
    } catch (error) {
      console.error(`Cache read error for key "${key}":`, error.message);
      return null;
    }
  }

  /**
   * Write data to cache
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @returns {boolean} Success status
   */
  set(key, data) {
    try {
      const filePath = this.getCacheFilePath(key);
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      
      fs.writeFileSync(filePath, JSON.stringify(cacheData), 'utf8');
      return true;
    } catch (error) {
      console.error(`Cache write error for key "${key}":`, error.message);
      return false;
    }
  }

  /**
   * Clear all cached files
   * @returns {number} Number of files deleted
   */
  clearAll() {
    try {
      const files = fs.readdirSync(this.CACHE_DIR);
      files.forEach(file => {
        fs.unlinkSync(path.join(this.CACHE_DIR, file));
      });
      return files.length;
    } catch (error) {
      console.error('Cache clear error:', error.message);
      return 0;
    }
  }

  /**
   * Get cache statistics
   * @returns {Array} Array of cache file stats
   */
  getStats() {
    try {
      const files = fs.readdirSync(this.CACHE_DIR);
      const stats = files.map(file => {
        const filePath = path.join(this.CACHE_DIR, file);
        const stat = fs.statSync(filePath);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const age = Date.now() - content.timestamp;
        const ageHours = (age / (1000 * 60 * 60)).toFixed(1);
        
        return {
          file: file.replace('.json', ''),
          size: `${(stat.size / 1024).toFixed(2)} KB`,
          age: `${ageHours}h`,
          valid: age < this.CACHE_DURATION
        };
      });
      
      return stats;
    } catch (error) {
      console.error('Cache stats error:', error.message);
      return [];
    }
  }

  /**
   * Get number of cached files
   * @returns {number} Count of cache files
   */
  getCount() {
    try {
      return fs.readdirSync(this.CACHE_DIR).length;
    } catch (error) {
      return 0;
    }
  }
}

module.exports = CacheManager;
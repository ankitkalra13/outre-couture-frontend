/**
 * Utility functions for the application
 */

/**
 * Converts a relative image path to a full URL
 * @param {string} imagePath - The image path (can be relative or absolute)
 * @returns {string} - The full image URL
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative path, construct the full URL
  // Assuming images are stored in the public/assets/img directory
  if (imagePath.startsWith('/')) {
    return imagePath; // Already absolute path
  }
  
  // For relative paths like "men_jeans_1.jpg", construct the full path
  return `/assets/img/${imagePath}`;
}

/**
 * Formats a price with currency
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: 'USD')
 * @returns {string} - Formatted price string
 */
export function formatPrice(price, currency = 'USD') {
  if (price === null || price === undefined) return 'Price on request';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

/**
 * Truncates text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generate a URL-friendly slug from a string
 * @param {string} text - The text to convert to a slug
 * @returns {string} - URL-friendly slug
 */
export function generateSlug(text) {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')     // Remove special characters
    .replace(/-+/g, '-')            // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
}

/**
 * Get the best available slug for a product
 * @param {Object} product - Product object
 * @returns {string} - Best available slug
 */
export function getProductSlug(product) {
  // First priority: use existing SEO slug
  if (product.seo_slug) {
    return product.seo_slug;
  }
  
  // Second priority: generate from product name
  if (product.name) {
    return generateSlug(product.name);
  }
  
  // Fallback: use product ID (should not happen in normal cases)
  return product.id;
}

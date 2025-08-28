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

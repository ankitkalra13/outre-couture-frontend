'use client';

import { useEffect } from 'react';

export default function BaseSEO() {
  useEffect(() => {
    // Set default meta tags for the entire application
    const setDefaultMetaTags = () => {
      // Set default title if none exists
      if (!document.title) {
        document.title = 'Outre Couture | Luxury Fashion & Accessories';
      }
      
      // Set default meta tags
      const defaultMetaTags = {
        'description': 'Outre Couture - Premium luxury fashion brand offering exclusive designer clothing, accessories, and lifestyle products. Discover timeless elegance and sophisticated style.',
        'keywords': 'Outre Couture, luxury fashion, designer clothing, premium accessories, fashion brand, sophisticated style, elegant fashion, luxury lifestyle',
        'author': 'Outre Couture',
        'robots': 'index, follow',
        'viewport': 'width=device-width, initial-scale=1.0',
        'charset': 'UTF-8'
      };
      
      // Set default Open Graph tags
      const defaultOGTags = {
        'og:site_name': 'Outre Couture',
        'og:type': 'website',
        'og:locale': 'en_US'
      };
      
      // Set default Twitter tags
      const defaultTwitterTags = {
        'twitter:site': '@outrecouture',
        'twitter:creator': '@outrecouture'
      };
      
      // Function to update or create meta tags
      const updateMetaTag = (name, content) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      const updatePropertyTag = (property, content) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      // Set default meta tags
      Object.entries(defaultMetaTags).forEach(([name, content]) => {
        updateMetaTag(name, content);
      });
      
      // Set default Open Graph tags
      Object.entries(defaultOGTags).forEach(([property, content]) => {
        updatePropertyTag(property, content);
      });
      
      // Set default Twitter tags
      Object.entries(defaultTwitterTags).forEach(([name, content]) => {
        updateMetaTag(name, content);
      });
      
      // Set favicon if not exists
      let favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        favicon.setAttribute('type', 'image/x-icon');
        favicon.setAttribute('href', '/favicon.ico');
        document.head.appendChild(favicon);
      }
    };
    
    setDefaultMetaTags();
  }, []);
  
  // This component doesn't render anything visible
  return null;
}

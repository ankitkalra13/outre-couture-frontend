'use client';

import { useEffect } from 'react';

export default function ProductSEO({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  price, 
  brand = 'Outre Couture',
  category,
  availability = 'InStock',
  type = 'product'
}) {
  // Create keywords string
  const keywordsString = keywords.join(', ');
  
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }
    
    // Update meta tags
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
    
    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywordsString);
    
    // Update Open Graph tags
    updatePropertyTag('og:title', title);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:url', url);
    updatePropertyTag('og:type', 'product');
    updatePropertyTag('og:site_name', 'Outre Couture');
    
    // Update Twitter Card tags
    updatePropertyTag('twitter:card', 'summary_large_image');
    updatePropertyTag('twitter:title', title);
    updatePropertyTag('twitter:description', description);
    updatePropertyTag('twitter:image', image);
    
    // Update product specific meta tags
    updatePropertyTag('product:price:amount', price);
    updatePropertyTag('product:price:currency', 'USD');
    updatePropertyTag('product:availability', availability);
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
    // Add structured data
    const existingScript = document.querySelector('script[data-seo-structured]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type,
      "name": title,
      "description": description,
      "image": image,
      "url": url,
      "brand": {
        "@type": "Brand",
        "name": brand
      },
      "category": category,
      "offers": {
        "@type": "Offer",
        "availability": `https://schema.org/${availability}`,
        "price": price,
        "priceCurrency": "USD"
      }
    };
    
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo-structured', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
  }, [title, description, keywordsString, image, url, price, brand, category, availability, type]);
  
  // This component doesn't render anything visible
  return null;
}

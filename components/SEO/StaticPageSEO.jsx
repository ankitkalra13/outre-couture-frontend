'use client';

import { useEffect } from 'react';

export default function StaticPageSEO({ 
  title,
  description,
  keywords = [],
  image = '',
  url = '',
  type = 'website',
  publishedTime = '',
  modifiedTime = '',
  author = 'Outre Couture',
  section = '',
  tags = []
}) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Convert keywords array to string
    const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;

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

    // Update Open Graph tags
    const updatePropertyTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update Twitter Card tags
    const updateTwitterTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update basic meta tags
    if (description) {
      updateMetaTag('description', description);
    }
    if (keywordsString) {
      updateMetaTag('keywords', keywordsString);
    }
    if (author) {
      updateMetaTag('author', author);
    }

    // Update Open Graph tags
    if (title) {
      updatePropertyTag('og:title', title);
    }
    if (description) {
      updatePropertyTag('og:description', description);
    }
    if (image) {
      updatePropertyTag('og:image', image);
    }
    if (url) {
      updatePropertyTag('og:url', url);
    }
    updatePropertyTag('og:type', type);
    updatePropertyTag('og:site_name', 'Outre Couture');
    updatePropertyTag('og:locale', 'en_US');

    // Update Twitter Card tags
    updateTwitterTag('twitter:card', 'summary_large_image');
    if (title) {
      updateTwitterTag('twitter:title', title);
    }
    if (description) {
      updateTwitterTag('twitter:description', description);
    }
    if (image) {
      updateTwitterTag('twitter:image', image);
    }

    // Update canonical URL
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }

    // Add structured data for organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Outre Couture",
      "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
      "description": "Luxury Fashion & Accessories - Premium designer clothing, handbags, and accessories for men and women.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "UAE",
        "addressLocality": "Dubai"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971-4-123-4567",
        "contactType": "customer service",
        "email": "info@outrecouture.com"
      },
      "sameAs": [
        "https://www.instagram.com/outrecouture",
        "https://www.facebook.com/outrecouture",
        "https://www.linkedin.com/company/outrecouture"
      ]
    };

    // Add page-specific structured data
    if (type === 'article' && publishedTime) {
      structuredData["@type"] = "Article";
      structuredData["headline"] = title;
      structuredData["description"] = description;
      structuredData["author"] = {
        "@type": "Organization",
        "name": author
      };
      structuredData["publisher"] = {
        "@type": "Organization",
        "name": "Outre Couture",
        "logo": {
          "@type": "ImageObject",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`
        }
      };
      structuredData["datePublished"] = publishedTime;
      if (modifiedTime) {
        structuredData["dateModified"] = modifiedTime;
      }
      if (section) {
        structuredData["articleSection"] = section;
      }
      if (tags.length > 0) {
        structuredData["keywords"] = tags.join(', ');
      }
    }

    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, image, url, type, publishedTime, modifiedTime, author, section, tags]);

  // This component doesn't render anything visible
  return null;
}

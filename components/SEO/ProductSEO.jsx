'use client';

import Head from 'next/head';

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
  
  // Create structured data for products
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

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="Outre Couture" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Product Specific Meta Tags */}
      <meta property="product:price:amount" content={price} />
      <meta property="google-site-verification" content="your-verification-code" />
      <meta property="product:price:currency" content="USD" />
      <meta property="product:availability" content={availability} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </Head>
  );
}

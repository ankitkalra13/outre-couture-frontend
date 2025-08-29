
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/components/providers/ReduxProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import BaseSEO from '@/components/SEO/BaseSEO';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Outre Couture - Premium Fashion & Lifestyle',
    template: '%s | Outre Couture'
  },
  description: 'Discover our premium collection of men\'s and women\'s fashion, accessories, and bags. Quality craftsmanship meets modern style at Outre Couture.',
  keywords: ['fashion', 'clothing', 'accessories', 'bags', 'men\'s fashion', 'women\'s fashion', 'premium fashion', 'lifestyle'],
  authors: [{ name: 'Outre Couture' }],
  creator: 'Outre Couture',
  publisher: 'Outre Couture',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://outrecouture.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://outrecouture.com',
    title: 'Outre Couture - Premium Fashion & Lifestyle',
    description: 'Discover our premium collection of men\'s and women\'s fashion, accessories, and bags.',
    siteName: 'Outre Couture',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Outre Couture - Premium Fashion & Lifestyle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outre Couture - Premium Fashion & Lifestyle',
    description: 'Discover our premium collection of men\'s and women\'s fashion, accessories, and bags.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <BaseSEO />
          <Header />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
'use client';

import { motion } from 'framer-motion';
import IMAGES from '@/lib/images';
import Link from 'next/link';
import { ArrowRight,  ArrowLeft} from 'lucide-react';
import Image from 'next/image';
import HomePageBannerSlider from '@/components/HomePageBannerSlider';
import Roadmap from '@/components/Roadmap';
import PartnersMarquee from '@/components/Partners';
import AboutUsSection from '@/components/AboutSection';
import Achievements from '@/components/Achievements';
import OurServicesSlider from '@/components/OurServicesSlider';
import StaticPageSEO from '@/components/SEO/StaticPageSEO';

export default function Home() {
  return (
    <>
      <StaticPageSEO 
        title="Outre Couture | Luxury Fashion & Accessories | Premium Designer Clothing"
        description="Discover exclusive luxury fashion and accessories at Outre Couture. Premium designer clothing, handbags, and accessories for men and women. Shop the latest trends in luxury fashion."
        keywords={[
          'luxury fashion',
          'designer clothing',
          'premium accessories',
          'handbags',
          'men fashion',
          'women fashion',
          'luxury brands',
          'fashion accessories',
          'designer handbags',
          'premium clothing',
          'outre couture',
          'luxury lifestyle'
        ]}
        image={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/img/home-page/hero-banner.webp`}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`}
        type="website"
        section="Fashion & Lifestyle"
        tags={['luxury', 'fashion', 'designer', 'premium', 'accessories']}
      />
      
      <div>
        <section className="relative">
            <HomePageBannerSlider/>      
        </section>

      <section className='py-20'>
        <AboutUsSection/>
      </section> 

      <OurServicesSlider/>

      <section className="py-20">
          <PartnersMarquee/>
      </section>

      <Achievements/>

        <section className="py-20">
            <Roadmap/>
        </section>
      </div>
    </>
  );
}
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

export default function Home() {
  return (
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
  );
}
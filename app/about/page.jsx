'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Award, Users, Globe, Heart } from 'lucide-react';
import StaticPageSEO from '@/components/SEO/StaticPageSEO';

export default function About() {
  const stats = [
    { number: '15+', label: 'Years of Excellence', icon: Award },
    { number: '50K+', label: 'Happy Customers', icon: Users },
    { number: '25+', label: 'Countries Served', icon: Globe },
    { number: '100%', label: 'Quality Assured', icon: Heart }
  ];

  return (
    <>
      <StaticPageSEO 
        title="About Us | Outre Couture | Luxury Fashion Heritage & Excellence"
        description="Discover the story behind Outre Couture - 15+ years of luxury fashion excellence. Learn about our heritage, values, and commitment to bringing premium designer clothing and accessories to fashion enthusiasts worldwide."
        keywords={[
          'about outre couture',
          'luxury fashion heritage',
          'fashion company history',
          'designer clothing brand',
          'premium accessories company',
          'fashion excellence',
          'luxury brand story',
          'outre couture about',
          'fashion heritage',
          'luxury fashion company'
        ]}
        image={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/img/home-page/about-us.webp`}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`}
        type="website"
        section="Company Information"
        tags={['about', 'heritage', 'company', 'values', 'history']}
      />

      <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-cover py-20 overflow-hidden" style={{backgroundImage: "url('/assets/img/home-page/about-banner-2.webp')"}}>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#002B98] to-[#00060C] opacity-75"></div>
          
          <div className="container px-4 mx-auto relative z-20 text-center py-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl text-white font-bold mb-6"
            >
              About Outre Couture
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white max-w-3xl mx-auto mb-8"
            >
              Crafting luxury fashion experiences for over 15 years, we bring the world's finest designer clothing and accessories to fashion enthusiasts who appreciate excellence.
            </motion.p>
            
            {/* Breadcrumb */}
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-white"
            >
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <ChevronRight className="inline-block" size={16} />
              </li>
              <li>About Us</li>
            </motion.ul>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded in 2008, Outre Couture began as a small boutique with a big dream - to make luxury fashion accessible to those who appreciate quality and craftsmanship. What started as a passion project has grown into a global brand that serves fashion enthusiasts in over 25 countries.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our journey has been marked by continuous innovation, unwavering commitment to quality, and deep respect for the art of fashion. We believe that luxury isn't just about price - it's about the experience, the craftsmanship, and the story behind every piece.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src="/assets/img/home-page/about-company-4.webp"
                  alt="Outre Couture Story"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Join Our Fashion Journey</h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Experience the world of luxury fashion with Outre Couture. Discover our collections and become part of our story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="bg-white text-brand px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Explore Products
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-brand transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

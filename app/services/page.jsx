'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Users, Truck, Shield, Star, Heart } from 'lucide-react';
import StaticPageSEO from '@/components/SEO/StaticPageSEO';

export default function Services() {
  const services = [
    {
      icon: ShoppingBag,
      title: 'Premium Product Curation',
      description: 'Handpicked selection of the world\'s finest designer clothing and accessories, ensuring only the highest quality items make it to our collection.',
      features: ['Exclusive designer partnerships', 'Quality assurance', 'Trend forecasting', 'Personalized recommendations']
    },
    {
      icon: Users,
      title: 'Personal Fashion Consultation',
      description: 'One-on-one sessions with our fashion experts to help you discover your personal style and build a wardrobe that reflects your personality.',
      features: ['Style assessment', 'Wardrobe planning', 'Occasion-specific guidance', 'Body type analysis']
    },
    {
      icon: Truck,
      title: 'Global Shipping & Delivery',
      description: 'Worldwide delivery with premium packaging and tracking. We ensure your luxury items arrive safely and in perfect condition.',
      features: ['Express shipping', 'Real-time tracking', 'Secure packaging', 'Customs handling']
    },
    {
      icon: Shield,
      title: 'Authenticity Guarantee',
      description: 'Every product in our collection is guaranteed authentic. We work directly with designers and authorized distributors.',
      features: ['100% authentic products', 'Direct designer partnerships', 'Quality verification', 'Warranty coverage']
    },
    {
      icon: Star,
      title: 'VIP Customer Experience',
      description: 'Exclusive benefits for our premium customers including early access to new collections and special events.',
      features: ['Early access to collections', 'Exclusive events', 'Priority customer service', 'Special discounts']
    },
    {
      icon: Heart,
      title: 'After-Sales Support',
      description: 'Comprehensive support after your purchase, including styling advice, care instructions, and maintenance services.',
      features: ['Care instructions', 'Maintenance tips', 'Styling support', 'Customer care']
    }
  ];

  const whyChooseUs = [
    '15+ years of luxury fashion expertise',
    'Direct partnerships with top designers',
    'Global customer base in 25+ countries',
    '100% authenticity guarantee',
    'Premium customer service experience',
    'Sustainable and ethical practices'
  ];

  return (
    <>
      <StaticPageSEO 
        title="Our Services | Outre Couture | Premium Fashion Services & Consultation"
        description="Discover Outre Couture's comprehensive luxury fashion services. From premium product curation to personal fashion consultation, global shipping, and VIP experiences - we deliver excellence in every service."
        keywords={[
          'luxury fashion services',
          'fashion consultation',
          'premium product curation',
          'global shipping',
          'authenticity guarantee',
          'VIP customer experience',
          'personal styling',
          'fashion expertise',
          'outre couture services',
          'luxury fashion support'
        ]}
        image={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/img/home-page/our-main.webp`}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/services`}
        type="website"
        section="Services"
        tags={['services', 'consultation', 'shipping', 'support', 'VIP']}
      />

      <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-cover py-20 overflow-hidden" style={{backgroundImage: "url('/assets/img/home-page/our-main.webp')"}}>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#002B98] to-[#00060C] opacity-75"></div>
          
          <div className="container px-4 mx-auto relative z-20 text-center py-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl text-white font-bold mb-6"
            >
              Our Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white max-w-3xl mx-auto mb-8"
            >
              Comprehensive luxury fashion services designed to elevate your style and shopping experience. From curation to consultation, we're here to serve your fashion needs.
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
              <li>Services</li>
            </motion.ul>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Offer</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A comprehensive suite of services designed to provide you with the ultimate luxury fashion experience.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-brand rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Outre Couture?</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We don't just sell luxury fashion - we create experiences. Our commitment to excellence, authenticity, and customer satisfaction sets us apart in the industry.
                </p>
                
                <div className="grid grid-cols-1 gap-4">
                  {whyChooseUs.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <div className="w-3 h-3 bg-brand rounded-full mr-4"></div>
                      <span className="text-gray-700">{reason}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src="/assets/img/home-page/business-talks-banner.webp"
                  alt="Outre Couture Services"
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
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience Our Services?</h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Discover the difference that professional luxury fashion services can make in your style journey.
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
                  Get Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

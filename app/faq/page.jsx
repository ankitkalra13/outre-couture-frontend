'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import StaticPageSEO from '@/components/SEO/StaticPageSEO';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What makes Outre Couture different from other fashion retailers?",
      answer: "Outre Couture stands out through our exclusive designer partnerships, 100% authenticity guarantee, personalized fashion consultation services, and commitment to curating only the finest luxury fashion items. We don't just sell products - we create complete luxury fashion experiences."
    },
    {
      question: "How do you ensure the authenticity of your products?",
      answer: "We work directly with designers and authorized distributors, never through third-party resellers. Every product undergoes rigorous quality verification, and we provide authenticity certificates with all purchases. Our 15+ years in the industry have built trust with the world's top fashion houses."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer worldwide shipping to over 25 countries. Our premium packaging ensures your luxury items arrive safely, and we handle all customs documentation. Express shipping options are available for urgent deliveries, with real-time tracking throughout the journey."
    },
    {
      question: "What is your return and exchange policy?",
      answer: "We offer a 30-day return policy for all items in their original condition with tags attached. Exchanges are available for different sizes or colors if available. We also provide free return shipping for items that arrive damaged or defective."
    },
    {
      question: "How can I get personalized fashion advice?",
      answer: "We offer personal fashion consultation services where our expert stylists assess your style preferences, body type, and lifestyle to provide personalized recommendations. You can book a consultation through our contact page or by calling our customer service team."
    },
    {
      question: "Do you offer VIP services for regular customers?",
      answer: "Yes, our VIP customers enjoy exclusive benefits including early access to new collections, special events, priority customer service, and exclusive discounts. VIP status is automatically granted after your third purchase and maintained with continued engagement."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for larger purchases. We also offer flexible payment plans for high-value items. All transactions are secured with bank-level encryption."
    },
    {
      question: "How do you stay updated with fashion trends?",
      answer: "Our team attends major fashion weeks in Paris, Milan, New York, and London, maintains direct relationships with designers, and conducts extensive market research. We also collaborate with fashion forecasters to anticipate upcoming trends and curate our collections accordingly."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <StaticPageSEO 
        title="FAQ | Outre Couture | Frequently Asked Questions About Luxury Fashion"
        description="Find answers to common questions about Outre Couture's luxury fashion services, shipping, authenticity, returns, and more. Get all the information you need about shopping with us."
        keywords={[
          'outre couture faq',
          'luxury fashion questions',
          'fashion retailer faq',
          'shipping information',
          'return policy',
          'authenticity guarantee',
          'fashion consultation',
          'VIP services',
          'payment methods',
          'customer support'
        ]}
        image={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/img/home-page/hero-banner.webp`}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/faq`}
        type="website"
        section="Customer Support"
        tags={['FAQ', 'support', 'questions', 'customer service', 'help']}
      />

      <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-cover py-20 overflow-hidden" style={{backgroundImage: "url('/assets/img/home-page/hero-banner.webp')"}}>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#002B98] to-[#00060C] opacity-75"></div>
          
          <div className="container px-4 mx-auto relative z-20 text-center py-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl text-white font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white max-w-3xl mx-auto mb-8"
            >
              Find answers to common questions about our luxury fashion services, policies, and how we can help you.
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
              <li>FAQ</li>
            </motion.ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Common Questions</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Everything you need to know about shopping with Outre Couture.
                </p>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-brand" />
                      ) : (
                        <Plus className="w-5 h-5 text-brand" />
                      )}
                    </button>
                    
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-4 bg-white border-t border-gray-200"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Still Have Questions?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our customer service team is here to help you with any specific questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-brand text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/products"
                  className="border-2 border-brand text-brand px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand hover:text-white transition-colors"
                >
                  Explore Products
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

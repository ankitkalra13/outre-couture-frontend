'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand via-brand to-yellow-400 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              Ready to Transform
              <span className="block">Your Fashion Vision?</span>
            </h2>
            
            <p className="text-xl text-secondary/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Join hundreds of successful brands that trust Outre Couture for their manufacturing needs. 
              Let's create something extraordinary together.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-secondary">98%</div>
                <div className="text-sm text-secondary/70">Client Satisfaction</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-secondary/70">Support Available</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-secondary">48h</div>
                <div className="text-sm text-secondary/70">Response Time</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Project
              <ArrowRight size={20} className="ml-2" />
            </Link>
            
            <button className="inline-flex items-center px-8 py-4 border-2 border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white transition-all duration-300">
              <Phone size={20} className="mr-2" />
              Schedule a Call
            </button>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 text-secondary">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <span className="font-medium">+1 (555) 123-4567</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 text-secondary">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Mail size={20} />
              </div>
              <span className="font-medium">hello@outrecouture.com</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 text-secondary">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <span className="font-medium">Live Chat</span>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <p className="text-secondary/70 mb-6">Certified & Trusted By</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-secondary font-semibold">ISO 9001:2015</div>
              <div className="text-secondary font-semibold">•</div>
              <div className="text-secondary font-semibold">GOTS Certified</div>
              <div className="text-secondary font-semibold">•</div>
              <div className="text-secondary font-semibold">OEKO-TEX®</div>
              <div className="text-secondary font-semibold">•</div>
              <div className="text-secondary font-semibold">Fair Trade</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

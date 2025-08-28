'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, Globe, Clock, Target } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { icon: Clock, value: "15+", label: "Years Experience" },
  { icon: Users, value: "200+", label: "Team Members" },
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Target, value: "1000+", label: "Projects Completed" }
];

const features = [
  "ISO 9001:2015 Certified",
  "Sustainable Manufacturing",
  "Advanced Technology",
  "Quality Assurance",
  "Global Supply Chain",
  "24/7 Customer Support"
];

export default function AboutSectionNew() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-brand/20 text-secondary font-medium rounded-full"
            >
              <Award size={16} className="mr-2" />
              About Outre Couture
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Crafting Fashion
              <span className="text-brand block">Excellence</span>
              Since 2008
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Outre Couture is a leading fashion manufacturing company that has been at the forefront 
              of innovation and quality in the global fashion industry. We specialize in transforming 
              creative visions into exceptional fashion pieces that meet the highest standards of 
              craftsmanship and design.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Our state-of-the-art facilities, combined with our experienced team of designers, 
              pattern makers, and craftsmen, enable us to deliver premium quality garments that 
              exceed expectations and stand the test of time.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle size={20} className="text-brand flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <button className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors duration-300 transform hover:scale-105 shadow-lg">
                Learn More About Us
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats & Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-brand/10 to-brand/5 rounded-2xl p-6 text-center border border-brand/20 hover:border-brand/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon size={24} className="text-secondary" />
                  </div>
                  <div className="text-3xl font-bold text-secondary mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-brand/20 to-secondary/20 rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award size={48} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Industry Recognition
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Awarded for excellence in fashion manufacturing and sustainable practices by leading 
                  industry organizations worldwide.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

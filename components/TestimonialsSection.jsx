'use client';

import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Creative Director",
    company: "Fashion Forward Inc.",
    rating: 5,
    content: "Outre Couture has transformed our design process. Their attention to detail and quality craftsmanship is unmatched. They've become our trusted partner for all manufacturing needs.",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    position: "Brand Manager",
    company: "Urban Style Co.",
    rating: 5,
    content: "Working with Outre Couture has been a game-changer for our brand. Their expertise in sustainable manufacturing and commitment to quality has helped us deliver exceptional products to our customers.",
    avatar: "MC"
  },
  {
    name: "Emma Rodriguez",
    position: "Designer",
    company: "Eco Fashion Lab",
    rating: 5,
    content: "The team at Outre Couture understands our vision perfectly. They've helped us create sustainable fashion pieces that don't compromise on style or quality. Highly recommended!",
    avatar: "ER"
  },
  {
    name: "David Thompson",
    position: "CEO",
    company: "Luxury Apparel Group",
    rating: 5,
    content: "Outre Couture's manufacturing capabilities are world-class. Their attention to detail, quality control, and timely delivery have made them our go-to manufacturing partner.",
    avatar: "DT"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-brand/20 text-white font-medium rounded-full mb-6"
          >
            <Quote size={16} className="mr-2" />
            Client Testimonials
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            What Our
            <span className="text-brand block">Clients Say</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what industry leaders and fashion professionals 
            have to say about their experience working with Outre Couture.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-brand/30">
              <Quote size={48} />
            </div>

            {/* Testimonial Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center relative z-10"
            >
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={24} className="text-brand fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl text-white leading-relaxed mb-8 max-w-3xl mx-auto">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-300">
                    {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <ArrowLeft size={20} />
              </button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-brand w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-8">Trusted by leading fashion brands worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-50">
            <div className="text-white font-semibold text-lg">ISO 9001</div>
            <div className="text-white font-semibold text-lg">•</div>
            <div className="text-white font-semibold text-lg">GOTS Certified</div>
            <div className="text-white font-semibold text-lg">•</div>
            <div className="text-white font-semibold text-lg">OEKO-TEX®</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

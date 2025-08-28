'use client';

import { motion } from 'framer-motion';
import { 
  Scissors, 
  Palette, 
  Truck, 
  Shield, 
  Globe, 
  Users,
  Zap,
  Target
} from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: "Custom Design",
    description: "Transform your ideas into stunning fashion pieces with our expert design team.",
    features: ["Pattern Making", "Sample Development", "Design Consultation"]
  },
  {
    icon: Palette,
    title: "Material Sourcing",
    description: "Premium fabrics and materials sourced from the world's leading suppliers.",
    features: ["Fabric Selection", "Quality Testing", "Sustainable Options"]
  },
  {
    icon: Truck,
    title: "Production",
    description: "State-of-the-art manufacturing facilities ensuring precision and quality.",
    features: ["Cutting & Sewing", "Quality Control", "Timeline Management"]
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous testing and inspection at every stage of production.",
    features: ["ISO Standards", "Testing Labs", "Final Inspection"]
  },
  {
    icon: Globe,
    title: "Global Logistics",
    description: "Efficient shipping and delivery to any corner of the world.",
    features: ["Express Shipping", "Tracking Systems", "Customs Handling"]
  },
  {
    icon: Users,
    title: "Project Management",
    description: "Dedicated team managing your project from concept to delivery.",
    features: ["24/7 Support", "Progress Updates", "Risk Management"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
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
            className="inline-flex items-center px-4 py-2 bg-brand/20 text-secondary font-medium rounded-full mb-6"
          >
            <Zap size={16} className="mr-2" />
            Our Services
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Complete Fashion
            <span className="text-brand block">Manufacturing</span>
            Solutions
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial concept to final delivery, we provide end-to-end fashion manufacturing services 
            that meet the highest standards of quality and innovation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={32} className="text-secondary" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-secondary transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-brand rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand/30 transition-all duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <Target size={48} className="text-brand mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can bring your fashion vision to life with our comprehensive manufacturing services.
            </p>
            <button className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

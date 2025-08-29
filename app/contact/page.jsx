'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { submitRFQ } from '@/store/slices/rfqSlice';
import { useToast } from '@/components/ui/Toast';
import StaticPageSEO from '@/components/SEO/StaticPageSEO';

import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const { success, error } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    try {
      // Convert form data to RFQ format
      const rfqData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: 'Individual', // Default since we don't have company field
        requirements: data.message,
        additional_info: `Service of Interest: ${data.service}`,
        product_category: data.service,
        quantity: 'Not specified',
        budget: 'Not specified',
        timeline: 'Not specified'
      };

      // Submit RFQ to backend using Redux
      await dispatch(submitRFQ(rfqData)).unwrap();
      
      success('Your request has been submitted successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      error('Failed to submit your request. Please try again.');
    }
  };

  const services = [
    'Business Setup',
    'PRO Services',
    'Golden Visa',
    'Banking Solutions',
    'Legal Services',
    'Accounting Services',
    'Other'
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['Office 123, Business Bay', 'Dubai, UAE']
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+971 4 123 4567', '+971 50 123 4567']
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['info@dubiz.co', 'support@dubiz.co']
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM']
    }
  ];

  return (
    <>
      <StaticPageSEO 
        title="Contact Us | Outre Couture | Get in Touch with Luxury Fashion Experts"
        description="Contact Outre Couture for personalized luxury fashion consultation. Our experts are here to help you with premium designer clothing, accessories, and fashion advice. Get in touch today!"
        keywords={[
          'contact outre couture',
          'luxury fashion consultation',
          'fashion expert advice',
          'designer clothing help',
          'premium accessories support',
          'fashion consultation',
          'customer service',
          'outre couture contact',
          'luxury fashion support'
        ]}
        image={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/img/contact-banner.webp`}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`}
        type="website"
        section="Customer Service"
        tags={['contact', 'support', 'consultation', 'customer service']}
      />
      
      <div className="overflow-hidden">
        {/* Hero Section */}
       <section className="relative bg-cover py-10 overflow-hidden" style={{backgroundImage: "url('https://dubiz.co/public/assets/img/breadcrumbImages/contact-us.webp')", }}>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#002B98] to-[#00060C] opacity-75"></div>

        <div className="absolute top-5 left-0 z-10">
          <Image width={200} height={200} loading="lazy" src="https://dubiz.co/public/assets/img/element.png" alt="shape-img" />
        </div>

        <div className="absolute top-0 bottom-0 right-0 z-10">
          <Image
            width={200} height={200}
            loading="lazy"
            src="https://dubiz.co/public/assets/img/line-element.png"
            alt="shape-img"
            className='h-full w-full'
          />
        </div>

        <div className="container px-4 mx-auto relative z-20 text-center py-12">
          <h1 className="text-4xl text-white font-bold animate-fadeInUp">Contact Us</h1>
          <ul className="flex items-center justify-center gap-2 mt-5 animate-fadeInUp text-white">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <ChevronRight className="inline-block" size={16} />
            </li>
            <li>Contact Us</li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 sm:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 bg-brand p-8 rounded-xl shadow-lg"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                <p className="text-white text-lg leading-relaxed">
                  We're here to help you every step of the way. Whether you have questions about our services or need personalized guidance for your business setup, our experienced team is ready to assist you.
                </p>
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-brand rounded-lg flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 ml-3">{info.title}</h3>
                    </div>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gradient-to-br from-bg-brand to-bg-brand flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-bg-brand mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">Interactive Map</p>
                    <p className="text-gray-500 text-sm">Business Bay, Dubai, UAE</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center"
                >
                  <CheckCircle size={20} className="mr-2" />
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-bg-brand focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-bg-brand focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-bg-brand focus:border-transparent transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service of Interest *
                    </label>
                    <select
                      id="service"
                      {...register('service')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-bg-brand focus:border-transparent transition-colors ${
                        errors.service ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-bg-brand focus:border-transparent transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your requirements..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-bg-brand hover:to-bg-brand transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2" size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-10 bg-[#F3F7FB]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quick Questions?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Need immediate answers? Check out our frequently asked questions or give us a call for instant support.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our experts</p>
              <a href="tel:+97141234567" className="text-bg-brand font-semibold hover:text-bg-brand">
                +971 4 123 4567
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Get detailed responses via email</p>
              <a href="mailto:info@dubiz.co" className="text-bg-brand font-semibold hover:text-bg-brand">
                info@dubiz.co
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Schedule Meeting</h3>
              <p className="text-gray-600 mb-4">Book a consultation at your convenience</p>
              <button className="text-bg-brand font-semibold hover:text-bg-brand">
                Book Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
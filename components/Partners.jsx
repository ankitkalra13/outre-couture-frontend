'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import IMAGES from '@/lib/images';

const marqueeVariants = {
  animate: {
    x: ['0%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 40,
        ease: 'linear',
      },
    },
  },
};

const reverseMarqueeVariants = {
  animate: {
    x: ['-100%', '0%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 40,
        ease: 'linear',
      },
    },
  },
};

const PartnersMarquee = () => {
  const Marquee1Images1 = [
    IMAGES.Brands.r1,
    IMAGES.Brands.r2,
    IMAGES.Brands.r3,
    IMAGES.Brands.r4,
    IMAGES.Brands.r6,
    IMAGES.Brands.r7,
    IMAGES.Brands.r8,
    IMAGES.Brands.r9,
  ];
  
  const Marquee1Images2 = [
    IMAGES.Brands.r12,
    IMAGES.Brands.r13,
    IMAGES.Brands.r14,
    IMAGES.Brands.r16,
    IMAGES.Brands.r17,
    IMAGES.Brands.r19,
    IMAGES.Brands.r18,
    IMAGES.Brands.r21,
    IMAGES.Brands.r22,
    IMAGES.Brands.r23,
    IMAGES.Brands.r24,
  ];

  const MarqueeRow = ({ images, reverse = false }) => (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-10"
        variants={reverse ? reverseMarqueeVariants : marqueeVariants}
        animate="animate"
      >
        {[...images, ...images].map((image, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={image}
              alt="Partner Logo"
              width={200}
              height={200}
              className="w-auto h-24 sm:h-32 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-[60px]">
          <h2 className="text-3xl lg:text-4xl font-bold mb-[20px] text-secondary">
            Brands & Partners
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Trusted by leading fashion brands worldwide for quality manufacturing and reliable partnerships
          </p>
        </div>

        <div className="space-y-[50px]">
          <MarqueeRow images={Marquee1Images1} />
          <MarqueeRow images={Marquee1Images2} reverse />
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;

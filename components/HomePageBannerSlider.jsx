'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import IMAGES from '@/lib/images';

const slides = [
  {
    heading: '<span style="color: #fee145;">Tops</span> <br/> Manufacturer <br/>  For <strong style="color: #fee145;">YOUR</strong> Clothing Line',
    src: '/assets/img/home-page/1.webp',
    alt: 'Banner Image 1',
  },
  {
    heading: '<span style="color: #fee145;">Dress</span> <br/> Manufacturer <br/> For <strong style="color: #fee145;">YOUR</strong> Clothing Line',
    src: '/assets/img/home-page/2.webp',
    alt: 'Banner Image 2',
  },
  {
    heading: '<span style="color: #fee145;">Hoodies</span> <br/> Manufacturer <br/> For <strong style="color: #fee145;">YOUR</strong> Clothing Line',
    src: '/assets/img/home-page/about-banner-2.webp',
    alt: 'Banner Image 3',
  },

];

export default function HomePageBannerSlider() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Mousewheel]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 100000 }}
        speed={1000}
        pagination={{ clickable: true }}
        loop
        mousewheel={{ forceToAxis: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            
            <section className="py-20 bg-[#EDEDED]">
              <div className='container mx-auto px-4'>
                <div className="grid grid-cols-2 gap-8 items-center">
                  <div>
                    <h1 className="section-headline" dangerouslySetInnerHTML={{ __html: slide.heading }}></h1>

                    <p className="mt-10 text-lg text-[#3c3c3c] max-w-[50%]">
                      New fashion brand? Outre Couture is here to be your first and last stop for all clothing needs.
                    </p>

                    <button className="theme-btn mt-6">Get Started</button>
                  </div>

                  <div className='w-full h-full'>
                    <img
                      src={slide.src}
                      alt="header"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

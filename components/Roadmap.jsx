import React from 'react';
import IMAGES from '@/lib/images';

const Roadmap = () => {
  return (
    <section className="bg-white py-20 overflow-hidden w-full">
      <div className="">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-[60px] sm:mb-10 text-secondary">
          Our Journey
        </h2>
        <div className="relative h-[270px] w-full">
          {/* Road Background */}
          <div className="absolute top-20 left-0 h-[180px] w-full bg-repeat-x z-[2]" 
               style={{ backgroundImage: `url(${IMAGES.HomeNew.road.src})` }}>
          </div>
          
          {/* Moving Car */}
          <div className="absolute bottom-[100px] left-0 right-0 mx-auto w-[85%] animate-scroll h-[160px] bg-no-repeat z-[3] bg-contain" 
               style={{ backgroundImage: `url(${IMAGES.HomeNew.car.src})` }}>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

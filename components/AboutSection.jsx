import IMAGES from '@/lib/images';
import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-between gap-10">
        {/* Text Section */}
        <div className="w-full lg:w-[60%]">
          <h2 className="text-3xl font-medium mb-4 border-b-2 border-secondary inline-block pb-1 text-secondary">
            About us
          </h2>
          <p className="text-base text-gray mb-3 leading-relaxed">
            In the fluctuating world of fashion leaving an exclusionary mark, Outre Couture has
            established a democratic model by being a solution-oriented enterprise. As a supporting
            company for the fashion and lifestyle brands, it constantly aspires to offer
            high-quality products with fast-moving services. Outre couture is one stop shop for all
            your business needs like product design & development, manufacturing and production
            control, to hassle free shipping world wide.
          </p>
          <p className="text-base text-gray mb-6 leading-relaxed">
            Setting its foot in the industry in the year 2015, the 'fashion-inclined- enterprise'
            has been evolving in leaps and bounds. So far, a major portion of its clientele involves
            international fashion/ lifestyle brands and importers across the globe. Its marketing
            office has been established in England, the U.K whereas its headquarter is located in
            Noida, India. At present, the company has been indulged in the formulation of 3000+
            product range and over 100+ factories that belongs to garment segment, bags and home
            décor. Moreover, their vertically associated factories, across Asian supply chains are
            well equipped for end-to-end apparel & accessories production.
          </p>
          <button className="bg-brand text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-brand/90 transition-colors duration-300 transform hover:scale-105 shadow-lg">
            KNOW MORE
          </button>

          <div className="mt-5">
            <Image
              src={IMAGES.HomeNew.aboutCompany4.src}  
              alt="About Company"
              width={200}
              height={300}
              className="object-cover w-full max-w-[300px] rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Image Collage Section */}
        <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
          <div className="relative">
            <Image
              src={IMAGES.HomeNew.imageBoy.src}  
              alt="Fashion Model"
              width={200}
              height={300}
              className="object-cover w-full max-w-[500px] rounded-lg shadow-lg"
            />
          </div>  
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

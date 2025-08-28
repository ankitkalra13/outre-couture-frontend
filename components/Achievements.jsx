'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IMAGES from '@/lib/images';
import { ChevronRight } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      heading: "Award-Winning Designer & Speaker:",
      text: "Apurva received the Best Designer and Collections Award (2012) from Pearl Academy, and has been honored as a Fashion Forecast Speaker at major events like Intex South Asia (Sri Lanka) and Weavers South India's Textile Fair.",
      image: IMAGES.HomeNew.didi1,
      background: '#fff',
      href: '/'
    },
    {
      heading: "Recognized Young Entrepreneur:",
      text: "She was awarded the Best Young Women Entrepreneur Award (2018) by eGrowth and the Federation of Buying Agent.",
      image: IMAGES.HomeNew.didi2,
      background: '#fff',
      href: '/'
    },
     {
      heading: "Featured in Prestigious Publications:",
      text: "She was featured in CEO Insight Magazine (2020) as one of the Top 10 Fashion Best Companies, and in CEO Story Magazine (2021) as a Top Proud-woman Boosting Economy During COVID-19.",
      image: IMAGES.HomeNew.didi3,
      background: '#fff',
      href: '/'
    },
    {
      heading: "Global Media Recognition:",
      text: "Apurva has been covered by international news outlets, participated in global export/import fairs, and was nominated by MTVT as the Iron Lady of the Year 2022.",
      image: IMAGES.HomeNew.didi4,
      background: '#fff',
      href: '/'
    }
  ]

  return (
    <section className='pt-[100px] min-h-[1300px] sm:pt-12 bg-graybg'>
        <div className='container mx-auto px-4 relative'>
            <h2 className='text-3xl lg:text-4xl font-bold text-secondary text-center mb-[50px]'>Achievements</h2>
            <div className='flex flex-col items-center space-y-10 pb-6 sm:pb-0'>
                {achievements.map((item,i)=>(   
                    <div key={i} className='flex pb-[100px] sm:pb-12 w-full mx-auto flex-wrap items-center h-auto sticky top-[170px] sm:top-[100px]' >
                        <div className='w-1/2 h-[560px] sm:w-full sm:min-h-[310px] sm:max-h-[330px] bg-white shadow-lg p-6 sm:p-3 flex flex-col justify-center rounded-tl-2xl rounded-bl-2xl sm:rounded-t-2xl sm:rounded-bl-none'>
                            <h3 className='text-2xl text-brand font-semibold mb-3 sm:text-lg'>{item.heading}</h3>
                            <p className='text-lg sm:text-base font-normal text-gray leading-relaxed'>{item.text}</p>
                            <Link href={item.href} className='bg-brand text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-brand/90 transition-colors duration-300 transform hover:scale-105 shadow-lg mt-4 w-[220px] inline-flex items-center justify-center'>
                                Learn More <ChevronRight className='ml-2 inline-block align-middle' size={20}/> 
                            </Link>
                        </div>
                        <div className='w-1/2 h-[560px] sm:w-full sm:h-[300px] shadow-lg px-6 sm:px-3 py-4 rounded-tr-2xl rounded-br-2xl sm:rounded-b-2xl sm:rounded-tr-none' style={{ backgroundColor: item.background }}>
                            <Image src={item.image} width={563} height={520} alt={item.heading} className='sm:mb-3 sm:max-w-full w-full h-[510px] sm:h-[250px] object-cover rounded-lg'/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Achievements;

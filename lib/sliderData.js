
import IMAGES from '@/lib/images';

const sliderData = {
  titles: [
    { title: "Product Design" },
    { title: "Manufacturing" },
    { title: "Logistics" },
    { title: "One Touch Services" },
  ],
  content: [
    {
      image: IMAGES.HomeNew.productionPlanning,
      SubHeading: "Product Design",
      Para : "Unlock your products Potential",
    },
    {
      image: IMAGES.HomeNew.manufacturing,
      SubHeading: "Manufacturing",
      Para : "From concept to scale : A seamless manufacturing experience",
    },
    {
      image: IMAGES.HomeNew.logistics,
      SubHeading: "Logistics",
      Para : "Delivering peace of mind, one shipment at a time",
    },
    {
      image: IMAGES.HomeNew.oneTouchService,
      SubHeading: "One Touch Services",
      Para : "Quick soltuions, right at your fingertips",
    },
  ],
};

export default sliderData;

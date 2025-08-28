import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const productCategories = [
    { 
      name: 'Men', 
      href: '/products/men',
      subCategories: ['Bottom', 'Formal Wear', 'Jackets', 'Shirts', 'Sports Wear', 'T-shirts']
    },
    { 
      name: 'Women', 
      href: '/products/women',
      subCategories: ['Beach-Kaftans', 'Tops', 'Short Dress', 'Long Dress', 'Scarf', 'Skirts-Pants', 'Jackets-Coat']
    },
    { 
      name: 'Accessories', 
      href: '/products/accessories',
      subCategories: ['Clothing Accessories', 'Jewelry', 'Handbag & Wallet Accessories']
    },
    { 
      name: 'Bags', 
      href: '/products/bags',
      subCategories: ['Backpacks', 'Delivery Bags', 'Laptops Bags', 'Leather Style', 'Macrame & Beach', 'Messenger Bags', 'Paper Packing', 'Tote Bags']
    }
  ];

  return (
    <footer className="bg-[#252525] text-brand">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="text-2xl font-bold">Outre Couture</span>
            </div>
            <p className="text-brand text-sm leading-relaxed">
              Your premier destination for high-quality fashion and lifestyle products. 
              We offer a curated collection of men's and women's clothing, accessories, and bags.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-400 hover:text-bg-brand transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-brand-400 hover:text-bg-brand transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-brand-400 hover:text-bg-brand transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-brand-400 hover:text-bg-brand transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand hover:text-bg-brand text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">Product Categories</h3>
            <div className="grid grid-cols-2 gap-4">
              {productCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <Link
                    href={category.href}
                    className="text-brand hover:text-bg-brand font-medium text-sm transition-colors"
                  >
                    {category.name}
                  </Link>
                  <ul className="space-y-1">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory}>
                        <span className="text-brand-400 text-xs">
                          {subCategory}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-bg-brand mt-0.5 flex-shrink-0" />
                <p className="text-brand text-sm">
                  Fashion District,<br />
                  New York, NY
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-bg-brand flex-shrink-0" />
                <p className="text-brand text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-bg-brand flex-shrink-0" />
                <p className="text-brand text-sm">info@outrecouture.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brand-400 text-sm">
              © 2024 Outre Couture. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-brand hover:text-bg-brand transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-brand hover:text-bg-brand transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
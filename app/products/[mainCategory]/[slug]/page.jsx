'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductBySlug } from '@/store/slices/productSlice';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getImageUrl } from '@/lib/utils';
import ProductSEO from '@/components/SEO/ProductSEO';

export default function ProductDetailPage({ params }) {
  const { mainCategory, slug } = params;
  const dispatch = useAppDispatch();
  const { currentProduct, loading, error } = useAppSelector((state) => state.products);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rfqForm, setRfqForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    quantity: 1
  });
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (slug) {
      // First try to find product by slug, if not found, try by ID
      dispatch(fetchProductBySlug({ mainCategory, slug }));
    }
  }, [dispatch, slug, mainCategory]);

  // Show loader when component mounts
  useEffect(() => {
    setShowLoader(true);
  }, []);

  // Control loader timing - show for at least 1 second
  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    } else if (currentProduct) {
      // Has product, hide loader after 1 second
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (error) {
      // Has error, hide loader after 1 second
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, currentProduct, error]);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      setRfqForm(prev => ({ ...prev, quantity: newQuantity }));
    }
  };

  const handleRfqSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the RFQ to your backend
    
    
    // Show success message (you can implement a toast notification here)
    alert('RFQ submitted successfully! We will contact you soon.');
    
    // Reset form
    setRfqForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      quantity: 1
    });
    setQuantity(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRfqForm(prev => ({ ...prev, [name]: value }));
  };

  // Always show the main layout structure to prevent shifting
  return (
    <>
      {/* Dynamic SEO */}
      {currentProduct && (
        <ProductSEO
          title={currentProduct.seo_title || currentProduct.name}
          description={currentProduct.seo_description || currentProduct.description}
          keywords={currentProduct.seo_keywords ? currentProduct.seo_keywords.split(',').map(k => k.trim()) : []}
          image={currentProduct.images && currentProduct.images.length > 0 ? getImageUrl(currentProduct.images[0]) : ''}
          url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products/${mainCategory}/${slug}`}
          price={currentProduct.price || '0'}
          brand="Outre Couture"
          category={currentProduct.category_name || mainCategory}
          availability={currentProduct.is_active ? 'InStock' : 'OutOfStock'}
        />
      )}
      
      <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            </li>
            <li>
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li>
              <Link href="/products" className="hover:text-brand transition-colors">Products</Link>
            </li>
            <li>
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li>
              <Link href={`/products/${mainCategory}`} className="hover:text-brand transition-colors capitalize">
                {mainCategory}
              </Link>
            </li>
            <li>
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li className="text-gray-900 font-medium">
              {loading && !currentProduct ? 'Loading...' : currentProduct?.name || 'Product'}
            </li>
          </ol>
        </nav>



        {/* Main Content Area with Min Height */}
        <div className="min-h-[600px]">
          {/* Main Loading Spinner - Shows until everything loads */}
          {(loading || showLoader) ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-brand mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Loading product details...</p>
              </div>
            </div>
          ) : error || !currentProduct ? (
            <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you are looking for could not be found.</p>
            <Link 
              href={`/products/${mainCategory}`}
              className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Left Side - Product Images */}
              <div>
                {/* Main Image */}
                <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  {currentProduct.images && currentProduct.images.length > 0 ? (
                    <Image
                      src={getImageUrl(currentProduct.images[selectedImage])}
                      alt={currentProduct.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span>No Image Available</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {currentProduct.images && currentProduct.images.length > 1 && (
                  <div className="flex space-x-4">
                    {currentProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageSelect(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-brand' : 'border-gray-200'
                        }`}
                      >
                        <Image
                          src={getImageUrl(image)}
                          alt={`${currentProduct.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side - Product Details */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentProduct.name}</h1>
                <p className="text-gray-600 mb-6">{currentProduct.description}</p>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Category</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentProduct.category_name}
                  </span>
                </div>

                {/* RFQ Form */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Request for Quotation</h3>
                  <form onSubmit={handleRfqSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={rfqForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={rfqForm.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={rfqForm.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={rfqForm.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your company name (optional)"
                      />
                    </div>

                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity *
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            const newQuantity = Math.max(1, quantity - 1);
                            setQuantity(newQuantity);
                            setRfqForm(prev => ({ ...prev, quantity: newQuantity }));
                          }}
                          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={quantity}
                          onChange={(e) => {
                            const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                            setQuantity(newQuantity);
                            setRfqForm(prev => ({ ...prev, quantity: newQuantity }));
                          }}
                          min="1"
                          className="w-20 text-center px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newQuantity = quantity + 1;
                            setQuantity(newQuantity);
                            setRfqForm(prev => ({ ...prev, quantity: newQuantity }));
                          }}
                          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Requirements
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={rfqForm.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe any specific requirements or questions..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand text-white py-3 px-6 rounded-lg hover:bg-red-800 transition-colors font-medium"
                    >
                      Submit RFQ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
    </>
  );
}

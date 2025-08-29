'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3X3, List, Eye, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductsByMainCategory } from '@/store/slices/productSlice';
import { fetchSubCategories } from '@/store/slices/categorySlice';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getImageUrl } from '@/lib/utils';


export default function CategoryProductsPage({ params }) {
  const { mainCategory } = params;
  const dispatch = useAppDispatch();
  const { products, loading, error, filters: productFilters } = useAppSelector((state) => state.products);
  const { subCategories } = useAppSelector((state) => state.categories);
  
  const [localFilters, setLocalFilters] = useState({
    sub_category_id: '',
    search: '',
    sortBy: 'name',
    viewMode: 'grid',
    page: 1
  });

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [showLoader, setShowLoader] = useState(false);

  // Validate main category
  const validCategories = ['men', 'women', 'accessories', 'bags'];
  if (!validCategories.includes(mainCategory)) {
    notFound();
  }

  const categorySubCategories = subCategories[mainCategory] || [];
  
  useEffect(() => {
    if (mainCategory) {
      dispatch(fetchSubCategories(mainCategory));
      dispatch(fetchProductsByMainCategory({ 
        mainCategorySlug: mainCategory, 
        filters: { limit: 100 } 
      }));
    }
  }, [dispatch, mainCategory]);

  // Show loader when component mounts
  useEffect(() => {
    setShowLoader(true);
  }, []);

  // SEO setup for category page
  useEffect(() => {
    // Update document title
    document.title = `${mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)} Fashion - Outre Couture | Luxury ${mainCategory} Collection`;
    
    // Update meta tags
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    const updatePropertyTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Update basic meta tags
    updateMetaTag('description', `Discover our exclusive collection of luxury ${mainCategory} fashion items. Shop designer ${mainCategory} from Outre Couture, featuring premium quality and timeless style.`);
    updateMetaTag('keywords', `${mainCategory}, fashion, luxury, designer, ${mainCategory} collection, Outre Couture, premium ${mainCategory}`);
    
    // Update Open Graph tags
    updatePropertyTag('og:title', `${mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)} Fashion - Outre Couture`);
    updatePropertyTag('og:description', `Discover our exclusive collection of luxury ${mainCategory} fashion items.`);
    updatePropertyTag('og:type', 'website');
    updatePropertyTag('og:site_name', 'Outre Couture');
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products/${mainCategory}`);
    
  }, [mainCategory]);

  // Control loader timing - show for at least 1 second
  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    } else if (products.length === 0) {
      // Show loader for 1 second even when no products
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Has products, hide loader
      setShowLoader(false);
    }
  }, [loading, products.length]);

  useEffect(() => {
    const filters = { 
      limit: 100,
      page: currentPage 
    };
    
    if (selectedSubCategory) {
      filters.sub_category_id = selectedSubCategory;
    }
    
    if (localFilters.search) {
      filters.search = localFilters.search;
    }
    
    if (localFilters.sortBy) {
      filters.sortBy = localFilters.sortBy;
    }
    
    if (mainCategory) {
      dispatch(fetchProductsByMainCategory({ mainCategorySlug: mainCategory, filters }));
    }
  }, [selectedSubCategory, localFilters.search, localFilters.sortBy, currentPage, dispatch, mainCategory]);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'search' || key === 'sortBy') {
      setCurrentPage(1); // Reset to first page when filters change
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    const newSelectedSubCategory = selectedSubCategory === subCategory ? null : subCategory;
    setSelectedSubCategory(newSelectedSubCategory);
    setLocalFilters(prev => ({ ...prev, sub_category_id: newSelectedSubCategory }));
    setCurrentPage(1); // Reset to first page
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page
  };

  const getCategoryTitle = (category) => {
    const titles = {
      men: 'Men\'s Fashion',
      women: 'Women\'s Fashion', 
      accessories: 'Accessories',
      bags: 'Bags & Handbags'
    };
    return titles[category] || category;
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <Image
            src={getImageUrl(product.images[0])}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span>No Image</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
          <Eye size={16} className="text-gray-600" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{product.category_name}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Link 
                              href={`/products/${mainCategory}/${product.seo_slug || product.id}`}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center"
          >
            <Eye size={16} className="mr-2" />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );

  // Always show the main layout structure to prevent shifting
  return (
    <>
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
            <li className="text-gray-900 font-medium capitalize">{mainCategory ? getCategoryTitle(mainCategory) : 'Loading...'}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{mainCategory ? getCategoryTitle(mainCategory) : 'Loading...'}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our collection of high-quality {mainCategory || 'fashion'} products designed for modern lifestyles</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters & Sub-categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Search</h3>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={localFilters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </form>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sort By</h3>
                <select
                  value={localFilters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name A-Z</option>
                  <option value="name_desc">Name Z-A</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {/* Sub-categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sub-categories</h3>
                <div className="space-y-2">
                  {categorySubCategories && categorySubCategories.length > 0 ? (
                    categorySubCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleSubCategorySelect(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          selectedSubCategory === category.id
                            ? 'bg-brand text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm opacity-75">{category.description}</div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      {loading ? 'Loading sub-categories...' : 'No sub-categories found'}
                    </div>
                  )}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">View Mode</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleFilterChange('viewMode', 'grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      localFilters.viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid3X3 size={20} />
                  </button>
                  <button
                    onClick={() => handleFilterChange('viewMode', 'list')}
                    className={`p-2 rounded-lg transition-colors ${
                      localFilters.viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="lg:w-3/4 relative">
            {/* Products Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{getCategoryTitle(mainCategory)} Products</h2>
                  <p className="text-gray-600">
                    {products.length > 0 ? `${currentProducts.length} of ${products.length} products` : (showLoader ? 'Loading products...' : 'No products found')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {products.length > 0 ? `Page ${currentPage} of ${totalPages}` : (showLoader ? 'Loading...' : 'No products')}
                  </span>
                </div>
              </div>
            </div>

                        {/* Main Content Area with Min Height */}
            <div className="min-h-[600px]">
              {/* Main Loading Spinner - Shows until everything loads */}
              {(loading || showLoader) ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-brand mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading products...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => {
                      if (mainCategory) {
                        dispatch(fetchProductsByMainCategory({ mainCategorySlug: mainCategory, filters: { limit: 100 } }));
                      }
                    }}
                    className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : currentProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Package size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
                                  <button
                    onClick={() => {
                      setLocalFilters({ search: '', sortBy: 'name', viewMode: 'grid' });
                      setSelectedSubCategory(null);
                      setCurrentPage(1);
                      if (mainCategory) {
                        dispatch(fetchProductsByMainCategory({ mainCategorySlug: mainCategory, filters: { limit: 100 } }));
                      }
                    }}
                    className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors"
                  >
                    Clear Filters
                  </button>
              </div>
            ) : (
              <>
                {localFilters.viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentProducts.map((product) => (
                      <ProductListItem key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-12">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-brand text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

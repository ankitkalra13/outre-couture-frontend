'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Tag, MessageSquare, TrendingUp, Users, DollarSign, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import { fetchRFQRequests } from '@/store/slices/rfqSlice';
import { setDashboardStats } from '@/store/slices/adminSlice';

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { dashboardStats, loading } = useAppSelector((state) => state.admin);
  const { products } = useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.categories);
  const { rfqRequests } = useAppSelector((state) => state.rfq);

  useEffect(() => {
    fetchStats();
  }, [dispatch]);

  const fetchStats = async () => {
    try {
      // Fetch all data to get counts
      const [productsRes, categoriesRes, rfqRes] = await Promise.all([
        dispatch(fetchProducts({ limit: 1000 })).unwrap(),
        dispatch(fetchCategories()).unwrap(),
        dispatch(fetchRFQRequests({ limit: 1000 })).unwrap()
      ]);

      const newRFQ = rfqRes.rfq_requests?.filter(rfq => rfq.status === 'new').length || 0;

      const stats = {
        products: productsRes.products?.length || 0,
        categories: categoriesRes?.length || 0,
        rfqRequests: rfqRes.rfq_requests?.length || 0,
        newRFQ
      };

      dispatch(setDashboardStats(stats));
    } catch (error) {
      // Handle error silently
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: dashboardStats.products,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Categories',
      value: dashboardStats.categories,
      icon: Tag,
      color: 'bg-green-500',
      change: '+3',
      changeType: 'positive'
    },
    {
      title: 'RFQ Requests',
      value: dashboardStats.rfqRequests,
      icon: MessageSquare,
      color: 'bg-purple-500',
      change: '+5',
      changeType: 'positive'
    },
    {
      title: 'New RFQ',
      value: dashboardStats.newRFQ,
      icon: MessageSquare,
      color: 'bg-orange-500',
      change: 'Pending',
      changeType: 'neutral'
    }
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your business metrics and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp 
                      size={16} 
                      className={`mr-1 ${
                        stat.changeType === 'positive' ? 'text-green-500' : 
                        stat.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                      }`} 
                    />
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Plus size={20} className="text-green-600 mr-3" />
                <span className="font-medium">Add New Product</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Tag size={20} className="text-blue-600 mr-3" />
                <span className="font-medium">Create Category</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <MessageSquare size={20} className="text-purple-600 mr-3" />
                <span className="font-medium">View RFQ Requests</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New product added</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">RFQ request received</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Category updated</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

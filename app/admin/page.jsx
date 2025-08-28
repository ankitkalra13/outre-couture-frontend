'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/store/slices/authSlice';
import { setActiveTab, setShowLoginForm } from '@/store/slices/adminSlice';
import { motion } from 'framer-motion';
import { 
  Package, 
  Tag, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  BarChart3,
  Settings,
  Lock,
  User,
  LogOut
} from 'lucide-react';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminCategories from '@/components/admin/AdminCategories';
import AdminRFQ from '@/components/admin/AdminRFQ';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isAdmin, loading } = useAppSelector((state) => state.auth);
  const { activeTab, showLoginForm } = useAppSelector((state) => state.admin);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      dispatch(setShowLoginForm(true));
    } else if (!loading && isAuthenticated && !isAdmin) {
      router.push('/');
    } else if (!loading && isAuthenticated && isAdmin) {
      // Auto-route to dashboard for admin users
      dispatch(setActiveTab('dashboard'));
      dispatch(setShowLoginForm(false));
    }
  }, [isAuthenticated, isAdmin, loading, router, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(setShowLoginForm(true));
  };

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (showLoginForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter your admin credentials to continue</p>
          </div>
          <AdminLoginForm onSuccess={() => dispatch(setShowLoginForm(false))} />
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (!isAdmin) {
    return null; // Will redirect
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'categories', name: 'Categories', icon: Tag },
    { id: 'rfq', name: 'RFQ Requests', icon: MessageSquare },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <AdminProducts />;
      case 'categories':
        return <AdminCategories />;
      case 'rfq':
        return <AdminRFQ />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
                      <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-gray-600">Welcome back, {user?.username}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>Admin</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-lg p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                                           <button
                       onClick={() => handleTabChange(tab.id)}
                       className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                         activeTab === tab.id
                           ? 'bg-brand text-white'
                           : 'text-gray-700 hover:bg-gray-100'
                       }`}
                     >
                        <Icon size={20} />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Tag, ChevronRight, FolderOpen, Folder } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategoriesForAdmin, createCategory, updateCategory, deleteCategory } from '@/store/slices/categorySlice';
import { useToast } from '@/components/ui/Toast';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function AdminCategories() {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.categories);
  const { success, error, warning } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    type: 'main',
    main_category_id: '',
    slug: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoriesForAdmin());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare category data
      const categoryData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
      };
      
      // Add main_category_id for sub-categories
      if (formData.type === 'sub' && formData.main_category_id) {
        categoryData.main_category_id = formData.main_category_id;
      }
      
      if (editingCategory) {
        await dispatch(updateCategory({ categoryId: editingCategory.id, categoryData })).unwrap();
        setEditingCategory(null);
      } else {
        await dispatch(createCategory(categoryData)).unwrap();
      }
      
      setFormData({ 
        name: '', 
        description: '', 
        type: 'main',
        main_category_id: '',
        slug: ''
      });
      setShowAddModal(false);
      success(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
    } catch (error) {
      error(error || 'Failed to save category');
    }
  };

    const handleDeleteCategory = async (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowDeleteModal(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      await dispatch(deleteCategory(categoryToDelete)).unwrap();
      success('Category deleted successfully!');
    } catch (error) {
      error(error || 'Failed to delete category');
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({ 
      name: category.name, 
      description: category.description,
      type: category.type || 'main',
      main_category_id: category.main_category_id || '',
      slug: category.slug || ''
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingCategory(null);
    setFormData({ 
      name: '', 
      description: '', 
      type: 'main',
      main_category_id: '',
      slug: ''
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categories Management</h2>
          <p className="text-gray-600">Manage your product categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-brand text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Display */}
      <div className="space-y-6">
        {/* Main Categories */}
        {categories.filter(cat => cat.type === 'main').map((mainCategory) => (
          <motion.div
            key={mainCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FolderOpen size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{mainCategory.name}</h3>
                  <p className="text-sm text-gray-500">Main Category</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(mainCategory)}
                  className="text-blue-600 hover:text-blue-900 p-1"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(mainCategory.id)}
                  className="text-red-600 hover:text-red-900 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              {mainCategory.description || 'No description provided'}
            </p>
            
            {/* Sub-categories */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sub-categories:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.filter(cat => cat.type === 'sub' && cat.main_category_id === mainCategory.id).map((subCategory) => (
                  <div key={subCategory.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <Folder size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">{subCategory.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openEditModal(subCategory)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(subCategory.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <span>Created: {new Date(mainCategory.created_at).toLocaleDateString()}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                ID: {mainCategory.id.slice(0, 8)}...
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {categories.filter(cat => cat.type === 'main').length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first main category</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
          >
            Create Main Category
          </button>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Category Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value, main_category_id: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="main">Main Category</option>
                  <option value="sub">Sub Category</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name"
                  required
                />
              </div>
              
              {formData.type === 'sub' && (
                <div>
                  <label htmlFor="main_category_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Main Category
                  </label>
                  <select
                    id="main_category_id"
                    value={formData.main_category_id}
                    onChange={(e) => setFormData({ ...formData, main_category_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a main category</option>
                    {categories.filter(cat => cat.type === 'main').map((mainCat) => (
                      <option key={mainCat.id} value={mainCat.id}>
                        {mainCat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (Optional)
                </label>
                <input
                  type="text"
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Auto-generated if left empty"
                />
                <p className="text-xs text-gray-500 mt-1">URL-friendly version of the name</p>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter category description"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-red-800"
                >
                  {editingCategory ? 'Update' : 'Create'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteCategory}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

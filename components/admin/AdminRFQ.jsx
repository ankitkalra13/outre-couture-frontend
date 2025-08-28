'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRFQRequests, updateRFQStatus } from '@/store/slices/rfqSlice';
import { useToast } from '@/components/ui/Toast';

export default function AdminRFQ() {
  const dispatch = useAppDispatch();
  const { rfqRequests, loading } = useAppSelector((state) => state.rfq);
  const { success, error } = useToast();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    dispatch(fetchRFQRequests({ limit: 1000 }));
  }, [dispatch]);

  const handleStatusUpdate = async (rfqId, newStatus) => {
    try {
      await dispatch(updateRFQStatus({ rfqId, statusData: { status: newStatus } })).unwrap();
      success('RFQ status updated successfully!');
    } catch (error) {
      error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'quoted':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'won':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <AlertCircle size={16} />;
      case 'reviewing':
        return <Clock size={16} />;
      case 'quoted':
        return <MessageSquare size={16} />;
      case 'closed':
        return <XCircle size={16} />;
      case 'won':
        return <CheckCircle size={16} />;
      case 'lost':
        return <XCircle size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  const filteredRFQ = selectedStatus 
    ? rfqRequests.filter(rfq => rfq.status === selectedStatus)
    : rfqRequests;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading RFQ requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">RFQ Requests</h2>
          <p className="text-gray-600">Manage customer quote requests</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['new', 'reviewing', 'quoted', 'won'].map((status) => {
          const count = rfqRequests.filter(rfq => rfq.status === status).length;
          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 capitalize">{status}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-2 rounded-lg ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* RFQ List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requirements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRFQ.map((rfq) => (
                <motion.tr
                  key={rfq.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{rfq.name}</div>
                      <div className="text-sm text-gray-500">{rfq.email}</div>
                      <div className="text-sm text-gray-500">{rfq.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rfq.company}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">
                      {rfq.requirements}
                    </div>
                    {rfq.product_category && (
                      <div className="text-xs text-gray-500 mt-1">
                        Category: {rfq.product_category}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(rfq.status)}`}>
                      {getStatusIcon(rfq.status)}
                      <span className="ml-1 capitalize">{rfq.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(rfq.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRFQ(rfq);
                          setShowDetailModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Eye size={16} />
                      </button>
                      <select
                        value={rfq.status}
                        onChange={(e) => handleStatusUpdate(rfq.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="quoted">Quoted</option>
                        <option value="closed">Closed</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRFQ.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQ requests found</h3>
            <p className="text-gray-600">
              {selectedStatus ? `No requests with status "${selectedStatus}"` : 'No requests yet'}
            </p>
          </div>
        )}
      </div>

      {/* RFQ Detail Modal */}
      {showDetailModal && selectedRFQ && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">RFQ Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedRFQ.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedRFQ.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedRFQ.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium">{selectedRFQ.company}</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                <p className="text-gray-700">{selectedRFQ.requirements}</p>
              </div>

              {/* Additional Info */}
              {selectedRFQ.additional_info && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Information</h4>
                  <p className="text-gray-700">{selectedRFQ.additional_info}</p>
                </div>
              )}

              {/* Project Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Project Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Product Category</p>
                    <p className="font-medium">{selectedRFQ.product_category || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-medium">{selectedRFQ.quantity || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-medium">{selectedRFQ.budget || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="font-medium">{selectedRFQ.timeline || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Update Status</h4>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedRFQ.status}
                    onChange={(e) => handleStatusUpdate(selectedRFQ.id, e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedRFQ.status)}`}>
                    {getStatusIcon(selectedRFQ.status)}
                    <span className="ml-1 capitalize">{selectedRFQ.status}</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

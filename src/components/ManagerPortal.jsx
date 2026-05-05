import React, { useState, useEffect } from 'react';
import { LogOut, Filter, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { US_STATES } from '../constants/data';

export default function ManagerPortal({ onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterState, setFilterState] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    if (filterState !== 'all' && b.state !== filterState) return false;
    return true;
  });

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const exportCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'State', 'Interests', 'Referral', 'Date', 'Time', 'Status'],
      ...filteredBookings.map(b => [
        b.name, b.email, b.phone, b.state,
        (b.interests || []).join('; '),
        b.referral_source, b.date, b.time, b.status
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hr205-bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manager Portal</h1>
            <p className="text-sm text-gray-600">All Bookings & Management</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Total</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{bookings.filter(b => b.status === 'pending').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Confirmed</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{bookings.filter(b => b.status === 'confirmed').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{bookings.filter(b => b.status === 'completed').length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All States</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={exportCSV}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">State</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date/Time</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Referral</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-8 text-gray-500">Loading...</td></tr>
                ) : filteredBookings.length > 0 ? (
                  filteredBookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{b.name}</p>
                        <p className="text-xs text-gray-500">{(b.interests || []).join(', ')}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="text-gray-900">{b.phone}</p>
                        <p className="text-xs text-gray-500">{b.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.state}</td>
                      <td className="px-6 py-4 text-sm">
                        <p>{b.date}</p>
                        <p className="text-xs text-gray-500">{b.time}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="capitalize">{b.referral_source}</p>
                        <p className="text-xs text-gray-500">{b.referral_detail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          b.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="text-sm border border-gray-200 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" className="text-center py-12 text-gray-500">No bookings found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

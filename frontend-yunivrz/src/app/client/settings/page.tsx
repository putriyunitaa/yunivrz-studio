"use client";

import { useEffect, useState } from "react";

export default function ClientSettings() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 tracking-tight mb-2">
          Account Settings
        </h1>
        <p className="text-gray-500">Manage your profile and account preferences.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-8 space-y-8">
        
        {/* Profile Info */}
        <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-heading font-bold text-3xl shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">Client Account</p>
          </div>
        </div>

        {/* Form Dummy */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Full Name</label>
              <input type="text" defaultValue={user?.name} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input type="email" defaultValue={user?.email} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Phone Number</label>
            <input type="tel" defaultValue={user?.phone || ''} placeholder="e.g. 08123456789" className="w-full md:w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
          </div>

          <div className="pt-6">
            <button className="bg-[#111111] text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { getWhatsAppUrl } = useSettings();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token');

        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        
        if (data.role.name !== 'client') {
          router.push('/login');
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error('Auth error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
      }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center font-sans">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mb-4" />
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Overview", path: "/client/dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { name: "Project brief", path: "/client/projects", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { name: "Revisions", path: "/client/revisions", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { name: "Invoices", path: "/client/invoices", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  const getPageTitle = () => {
    if (pathname === '/client/dashboard') return 'Overview';
    if (pathname === '/client/projects') return 'Project brief';
    if (pathname === '/client/revisions') return 'Revisions';
    if (pathname === '/client/invoices') return 'Invoices';
    if (pathname === '/client/settings') return 'Settings';
    return '';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-[#111111]">
      
      {/* Sidebar Desktop */}
      <aside className="w-[280px] bg-[#F8FAFC] border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
        
        {/* Logo */}
        <div className="p-8 pb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </div>
          <span className="font-heading text-xl font-bold tracking-tighter">
            yunivrz
          </span>
        </div>

        {/* Workspace Selector */}
        <div className="px-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:border-purple-200 transition-colors">
            <div className="flex items-center gap-3">
               <div className="text-purple-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
               </div>
               <div>
                  <div className="text-[13px] font-bold text-gray-900">{user?.name}</div>
                  <div className="text-[11px] text-gray-500">Client workspace</div>
               </div>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="px-6 flex-1 flex flex-col gap-1 overflow-y-auto">
          <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3 px-3 mt-2">YOUR PROJECT</div>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-[13px] ${
                  isActive 
                    ? 'bg-purple-50 text-purple-700' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <svg className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Bottom Area */}
        <div className="p-6 pt-0 space-y-6">
           {/* Help Card */}
           <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-3">
                 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="text-[13px] font-bold text-gray-900 mb-1">A little help?</div>
              <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">Your project manager is one message away.</p>
              <a href={getWhatsAppUrl("Halo Kak, saya ingin bertanya terkait proyek saya di portal client.")} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-purple-600 flex items-center gap-1 hover:text-purple-700">
                 Contact studio <span className="text-[14px] leading-none">&rarr;</span>
              </a>
           </div>

           {/* Settings Link */}
           <Link href="/client/settings" className="flex items-center gap-3 px-3 text-gray-500 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-[13px] font-medium">Settings</span>
           </Link>

           <div className="h-px bg-gray-200 w-full" />

           {/* Profile */}
           <div className="flex items-center justify-between px-3">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-[10px]">
                 {user?.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase()}
               </div>
               <div>
                 <div className="text-[13px] font-bold text-gray-900">{user?.name}</div>
                 <div className="text-[11px] text-gray-500">Client account</div>
               </div>
             </div>
             <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all" title="Sign Out">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
             </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden bg-white md:rounded-tl-[2.5rem] md:border-l md:border-t border-gray-200 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5 flex items-center justify-between">
           <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-gray-400">
              <span>B. CLIENT PORTAL</span>
              <span>/</span>
              <span className="text-gray-900">{getPageTitle()}</span>
           </div>
           
           <div className="hidden md:flex items-center gap-6">
              <span className="text-[13px] text-gray-500 font-medium">
                 {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <button className="text-gray-400 hover:text-gray-900 transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-[10px]">
                {user?.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase()}
              </div>
           </div>

           {/* Mobile Menu Button */}
           <button className="md:hidden p-2 text-gray-900">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
           </button>
        </header>

        {/* Content Render */}
        <div className="p-8 md:p-12 lg:p-16 flex-1 w-full max-w-6xl mx-auto">
          {children}
        </div>

      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = async () => {
    if (!confirm("Apakah Anda yakin ingin keluar dari Administrator Workspace?")) {
      return;
    }

    setLoggingOut(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        });
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.location.href = "/admin/login";
    }
  };

  const navItems = [
    { name: "Ringkasan", path: "/admin/dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { name: "Papan Proyek", path: "/admin/projects", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { name: "Katalog & Konten", path: "/admin/catalogs", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { name: "Tagihan", path: "/admin/invoices", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "Direktori Klien", path: "/admin/clients", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { name: "Pengguna & Peran", path: "/admin/users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { name: "Kontak & Sosmed", path: "/admin/settings", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
  ];

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : "AD";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-[#111111]">
      {/* Admin Sidebar */}
      <aside className="w-[280px] bg-[#F8FAFC] border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
        
        <div className="p-8 pb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </div>
          <span className="font-heading text-xl font-bold tracking-tighter text-[#111111]">
            yunivrz <span className="text-purple-600">✦</span>
          </span>
        </div>

        {/* Workspace Selector */}
        <div className="px-6 mb-8 mt-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:border-purple-200 transition-colors">
            <div className="flex items-center gap-3">
               <div className="text-purple-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
               </div>
               <div>
                  <div className="text-[13px] font-bold text-gray-900">Studio workspace</div>
                  <div className="text-[11px] text-gray-500">Internal · Admin</div>
               </div>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-6 flex-1 flex flex-col gap-1 overflow-y-auto">
          <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3 px-3 mt-2">MANAJEMEN STUDIO</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-[13px] ${
                    isActive 
                      ? "bg-purple-50 text-purple-700 font-bold" 
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <svg className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area */}
        <div className="p-6 pt-0 space-y-3">
           <Link
             href="/admin/settings"
             className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
           >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="text-[13px] font-medium">Pengaturan Studio</span>
           </Link>
        </div>

        {/* User Profile & Logout */}
        <div className="mt-auto p-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[11px] border border-purple-200 shrink-0">
               {initials}
            </div>
            <div className="min-w-0">
               <div className="text-[13px] font-bold text-gray-900 truncate">{user?.name || "Admin Yunivrz"}</div>
               <div className="text-[11px] text-gray-500 truncate">{user?.email || "Administrator"}</div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shrink-0"
            title="Keluar / Logout dari Admin"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white/50">
         {/* Top Header */}
         <header className="h-[88px] flex items-center justify-between px-8 md:px-12 border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500">
               <span className="text-gray-400">ADMIN PORTAL</span>
               <span className="text-gray-300">/</span>
               <span className="text-gray-900">{pathname.split('/').pop() || 'Overview'}</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
               <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">Studio Admin</span>
               
               {/* Quick Header Logout Button */}
               <button
                 type="button"
                 onClick={handleLogout}
                 disabled={loggingOut}
                 className="flex items-center gap-2 text-[12px] font-bold text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                 title="Keluar dari Panel Admin"
               >
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                   <polyline points="16 17 21 12 16 7"></polyline>
                   <line x1="21" y1="12" x2="9" y2="12"></line>
                 </svg>
                 <span>{loggingOut ? "Keluar..." : "Keluar"}</span>
               </button>

               <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[11px] border border-purple-200">
                  {initials}
               </div>
            </div>
         </header>
         
         <div className="p-8 md:p-12">
            {children}
         </div>
      </main>
    </div>
  );
}

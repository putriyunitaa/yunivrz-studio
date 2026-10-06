"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Ringkasan", path: "/admin/dashboard" },
    { name: "Papan Proyek", path: "/admin/projects" },
    { name: "Katalog & Layanan", path: "/admin/catalogs" },
    { name: "Basis Klien", path: "/admin/clients" },
  ];

  return (
    <div className="flex h-screen bg-space-50">
      {/* Admin Sidebar */}
      <aside className="w-[280px] border-r border-eclipse-900/5 bg-eclipse-900 flex flex-col hidden md:flex text-space-50">
        
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <Link href="/" className="font-heading text-xl font-bold tracking-tighter text-white">
            yunivrz <span className="text-nebula-500">✦</span>
          </Link>
        </div>

        {/* Global Action */}
        <div className="p-6">
          <button className="w-full py-3 bg-nebula-500 hover:bg-nebula-300 text-eclipse-900 font-bold text-sm rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(107,123,255,0.4)]">
            + Proyek Baru
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4 py-2">
          <p className="px-4 text-[10px] font-bold text-space-50/40 uppercase tracking-widest mb-4">MANAJEMEN STUDIO</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-white/10 shadow-sm text-white border border-white/5" 
                      : "text-space-50/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center ${isActive ? "text-nebula-500" : "text-space-50/40"}`}>
                    <div className="w-3 h-3 border-2 border-current rounded-sm" />
                  </div>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="mt-auto p-6 border-t border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-nebula-500/20 text-nebula-300 flex items-center justify-center font-bold text-sm border border-nebula-500/20">
             Y
          </div>
          <div>
             <p className="text-sm font-bold text-white leading-none mb-1">Yunita</p>
             <p className="text-[10px] text-space-50/60 uppercase tracking-widest">Kreator Independen</p>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
         {/* Top Header */}
         <header className="h-20 flex items-center justify-between px-8 md:px-12 border-b border-eclipse-900/5 bg-space-50/80 backdrop-blur sticky top-0 z-10">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-eclipse-700">
               <span className="text-eclipse-700/50">C. PANEL ADMIN</span>
               <span className="text-eclipse-700/30">/</span>
               <span className="text-eclipse-900">{pathname.split('/').pop() || 'Overview'}</span>
            </div>
            <div className="flex items-center gap-4">
               <button className="w-10 h-10 rounded-full bg-white border border-eclipse-900/10 flex items-center justify-center text-eclipse-700 hover:text-eclipse-900 transition-colors relative shadow-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-nebula-500 border-2 border-white"></span>
               </button>
            </div>
         </header>
         
         <div className="p-8 md:p-12">
            {children}
         </div>
      </main>
    </div>
  );
}
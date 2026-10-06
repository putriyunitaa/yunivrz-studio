"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", path: "/admin/dashboard" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Catalog & content", path: "/admin/catalog" },
    { name: "Invoices", path: "/admin/invoices" },
    { name: "Clients", path: "/admin/clients" }, // Replaced "Users & roles" with "Clients" for Solo Studio
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-[280px] border-r border-eclipse-900/5 bg-space-50 flex flex-col hidden md:flex">
        
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-eclipse-900/5">
          <Link href="/" className="font-heading text-xl font-bold tracking-tighter text-eclipse-900">
            yunivrz <span className="text-nebula-500">✦</span>
          </Link>
        </div>

        {/* Workspace Selector */}
        <div className="p-6">
          <div className="flex items-center justify-between p-3 bg-white border border-eclipse-900/10 rounded-xl shadow-sm cursor-pointer hover:border-eclipse-900/20 transition-colors">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-eclipse-900/5 text-eclipse-900 flex items-center justify-center font-bold text-sm">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
               </div>
               <div>
                 <p className="text-sm font-bold text-eclipse-900 leading-none mb-1">Studio workspace</p>
                 <p className="text-[10px] text-eclipse-700 uppercase tracking-widest">Internal • Admin</p>
               </div>
            </div>
            <svg className="w-4 h-4 text-eclipse-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-2">
          <p className="px-4 text-[10px] font-bold text-eclipse-700 uppercase tracking-widest mb-4">Manage Studio</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-white shadow-sm border border-eclipse-900/5 text-eclipse-900" 
                      : "text-eclipse-700 hover:bg-eclipse-900/5 hover:text-eclipse-900"
                  }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center ${isActive ? "text-nebula-500" : "text-eclipse-700/60"}`}>
                    <div className="w-3 h-3 border-2 border-current rounded-sm" />
                  </div>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Settings Widget */}
        <div className="mt-auto p-6">
           <Link href="/admin/settings" className="flex items-center gap-2 text-sm font-medium text-eclipse-700 hover:text-eclipse-900 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
           </Link>
        </div>

        {/* Solo Admin Profile */}
        <div className="p-6 border-t border-eclipse-900/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-nebula-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
             YS
          </div>
          <div>
             <p className="text-sm font-bold text-eclipse-900 leading-none mb-1">You (Founder)</p>
             <p className="text-[10px] text-eclipse-700 uppercase tracking-widest">Administrator</p>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
         {/* Top Header */}
         <header className="h-20 flex items-center justify-between px-8 md:px-12 border-b border-eclipse-900/5 bg-white/80 backdrop-blur sticky top-0 z-10">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-eclipse-700">
               <span className="text-eclipse-700/50">C. ADMIN PORTAL</span>
               <span className="text-eclipse-700/30">/</span>
               <span className="text-eclipse-900">{pathname.split('/').pop() || 'Overview'}</span>
            </div>
            <div className="flex items-center gap-6">
               <span className="text-sm font-medium text-eclipse-700 hidden sm:inline-block">Tuesday, 6 Oct 2026</span>
               <button className="text-eclipse-700 hover:text-eclipse-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               </button>
               <div className="w-8 h-8 rounded-full bg-nebula-500 text-white flex items-center justify-center font-bold text-xs sm:hidden shadow-sm">
                  YS
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
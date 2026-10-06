"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", path: "/client/dashboard" },
    { name: "Project brief", path: "/client/brief" },
    { name: "Revisions", path: "/client/revisions" },
    { name: "Invoices", path: "/client/invoices" },
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
               <div className="w-8 h-8 rounded-lg bg-nebula-500/10 text-nebula-500 flex items-center justify-center font-bold text-sm">
                 AR
               </div>
               <div>
                 <p className="text-sm font-bold text-eclipse-900 leading-none mb-1">Anindya & Rizky</p>
                 <p className="text-[10px] text-eclipse-700 uppercase tracking-widest">Client workspace</p>
               </div>
            </div>
            <svg className="w-4 h-4 text-eclipse-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-2">
          <p className="px-4 text-[10px] font-bold text-eclipse-700 uppercase tracking-widest mb-4">Your Project</p>
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
                  {/* Fake icons based on name */}
                  <div className={`w-5 h-5 flex items-center justify-center ${isActive ? "text-nebula-500" : "text-eclipse-700/60"}`}>
                    <div className="w-3 h-3 border-2 border-current rounded-sm" />
                  </div>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Help Widget */}
        <div className="mt-auto p-6">
           <div className="bg-white rounded-2xl p-5 border border-eclipse-900/5 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-nebula-500/10 text-nebula-500 flex items-center justify-center mb-3">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-sm font-bold text-eclipse-900 mb-1">A little help?</h4>
              <p className="text-xs text-eclipse-700 mb-4 leading-relaxed">The studio is one message away.</p>
              <Link href="https://wa.me/1234567890" className="text-xs font-medium text-nebula-500 hover:text-eclipse-900 transition-colors flex items-center gap-1">
                 Contact studio &rarr;
              </Link>
           </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-t border-eclipse-900/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-eclipse-900/10 text-eclipse-900 flex items-center justify-center font-bold text-sm">
             AP
          </div>
          <div>
             <p className="text-sm font-bold text-eclipse-900 leading-none mb-1">Anindya Putri</p>
             <p className="text-[10px] text-eclipse-700 uppercase tracking-widest">Client account</p>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
         {/* Top Header */}
         <header className="h-20 flex items-center justify-between px-8 md:px-12 border-b border-eclipse-900/5 bg-white/80 backdrop-blur sticky top-0 z-10">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-eclipse-700">
               <span className="text-eclipse-700/50">B. CLIENT PORTAL</span>
               <span className="text-eclipse-700/30">/</span>
               <span className="text-eclipse-900">{pathname.split('/').pop() || 'Overview'}</span>
            </div>
            <div className="flex items-center gap-6">
               <span className="text-sm font-medium text-eclipse-700 hidden sm:inline-block">Tuesday, 6 Oct 2026</span>
               <button className="text-eclipse-700 hover:text-eclipse-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               </button>
               <div className="w-8 h-8 rounded-full bg-nebula-500/10 text-nebula-500 flex items-center justify-center font-bold text-xs sm:hidden">
                  AP
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
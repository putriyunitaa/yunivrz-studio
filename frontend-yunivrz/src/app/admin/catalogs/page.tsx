"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminCatalogs() {
  return (
    <div className="max-w-5xl">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-2 tracking-tight">
            Editor Konten Katalog
          </h1>
          <p className="text-eclipse-700 text-sm leading-relaxed max-w-xl">
            Sistem manajemen konten (CMS) internal untuk menambah atau memperbarui karya portofolio ke *storefront* publik Anda.
          </p>
        </motion.div>
        
        <div className="flex gap-3">
           <Link href="/catalog" target="_blank" className="px-5 py-2.5 bg-white text-eclipse-900 border border-eclipse-900/10 text-sm font-bold rounded-xl hover:bg-space-50 transition-colors">
              Pratinjau Publik
           </Link>
           <button className="px-5 py-2.5 bg-nebula-500 text-white text-sm font-bold rounded-xl hover:bg-nebula-600 transition-colors shadow-md shadow-nebula-500/20">
              Terbitkan
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Editor Area */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-eclipse-900/5 shadow-sm p-8">
               <input 
                  type="text" 
                  placeholder="Judul Proyek (cth: Sagara Living)" 
                  className="w-full text-3xl font-heading font-bold text-eclipse-900 placeholder:text-eclipse-900/20 bg-transparent border-none focus:outline-none mb-6"
               />
               
               {/* Rich Text Editor Toolbar (Mock) */}
               <div className="flex items-center gap-2 border-y border-eclipse-900/5 py-3 mb-6">
                  <button className="w-8 h-8 rounded-lg hover:bg-space-50 flex items-center justify-center font-serif font-bold text-eclipse-900">B</button>
                  <button className="w-8 h-8 rounded-lg hover:bg-space-50 flex items-center justify-center font-serif italic text-eclipse-900">I</button>
                  <button className="w-8 h-8 rounded-lg hover:bg-space-50 flex items-center justify-center underline text-eclipse-900">U</button>
                  <div className="w-px h-5 bg-eclipse-900/10 mx-2" />
                  <button className="w-8 h-8 rounded-lg hover:bg-space-50 flex items-center justify-center text-eclipse-900">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  </button>
               </div>

               <textarea 
                  rows={8}
                  placeholder="Tuliskan cerita dan detail di balik pembuatan karya ini. Jelaskan tantangan, solusi desain, dan hasil akhirnya..."
                  className="w-full text-sm text-eclipse-700 leading-relaxed bg-transparent border-none focus:outline-none resize-none"
               />
            </div>

            {/* Media Gallery */}
            <div className="bg-white rounded-3xl border border-eclipse-900/5 shadow-sm p-8">
               <h2 className="text-lg font-bold text-eclipse-900 mb-6">Galeri Media</h2>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="aspect-square rounded-2xl bg-space-50 border border-eclipse-900/10 overflow-hidden relative group">
                     <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIiBmaWxsPSJyZ2JhKDIwMCwyMDAsMjAwLDAuMikiPjwvY2lyY2xlPgo8L3N2Zz4=" alt="mock" className="w-full h-full object-cover opacity-50 mix-blend-multiply" />
                     <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                  </div>
                  <div className="aspect-square rounded-2xl border-2 border-dashed border-eclipse-900/20 bg-space-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-space-50 hover:border-nebula-500/50 transition-colors">
                     <svg className="w-6 h-6 text-eclipse-900/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                     <span className="text-xs font-bold text-eclipse-900/60">Tambah Foto</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Settings Sidebar */}
         <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-eclipse-900/5 shadow-sm p-6">
               <h3 className="text-sm font-bold text-eclipse-900 mb-4 border-b border-eclipse-900/5 pb-2">Pengaturan Entri</h3>
               
               <div className="space-y-5">
                  <div>
                     <label className="block text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">Kategori Layanan</label>
                     <select className="w-full px-4 py-2.5 bg-space-50 border border-eclipse-900/10 rounded-xl focus:outline-none focus:border-nebula-500 text-sm font-medium text-eclipse-900 appearance-none">
                        <option>Micro-Moments</option>
                        <option>Milestones</option>
                        <option>Custom Solutions</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">Gaya Tampilan (Grid)</label>
                     <select className="w-full px-4 py-2.5 bg-space-50 border border-eclipse-900/10 rounded-xl focus:outline-none focus:border-nebula-500 text-sm font-medium text-eclipse-900 appearance-none">
                        <option>Landscape (Lebar)</option>
                        <option>Portrait (Tinggi)</option>
                        <option>Square (Kotak)</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">Klien Terkait</label>
                     <input type="text" className="w-full px-4 py-2.5 bg-space-50 border border-eclipse-900/10 rounded-xl focus:outline-none focus:border-nebula-500 text-sm font-medium text-eclipse-900" placeholder="Cari nama klien..." />
                  </div>
               </div>
            </div>
            
            <div className="bg-white rounded-3xl border border-eclipse-900/5 shadow-sm p-6">
               <h3 className="text-sm font-bold text-eclipse-900 mb-4 border-b border-eclipse-900/5 pb-2">SEO & URL</h3>
               <div className="space-y-5">
                  <div>
                     <label className="block text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">Slug URL</label>
                     <div className="flex items-center text-sm font-medium text-eclipse-900/50 bg-space-50 border border-eclipse-900/10 rounded-xl overflow-hidden focus-within:border-nebula-500">
                        <span className="pl-4">/catalog/</span>
                        <input type="text" className="w-full py-2.5 px-1 bg-transparent border-none focus:outline-none text-eclipse-900" placeholder="sagara-living" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}

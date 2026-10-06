"use client";

import { motion } from "framer-motion";

export default function ClientBriefForm() {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-3 tracking-tight">
          Formulir Kuesioner (Brief) Proyek
        </h1>
        <p className="text-eclipse-700 text-sm leading-relaxed max-w-xl mx-auto">
          Mari selami visi Anda. Pengisian form ini membantu saya memahami *brand* dan ekspektasi gaya visual sebelum eksplorasi desain dimulai.
        </p>
      </motion.div>

      <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_40px_-15px_rgba(11,12,16,0.05)] p-8 md:p-12">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-12 border-b border-eclipse-900/5 pb-8">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-nebula-500 text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
              <span className="text-sm font-bold text-eclipse-900">Identitas</span>
           </div>
           <div className="h-px bg-eclipse-900/10 flex-1 mx-4" />
           <div className="flex items-center gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full bg-eclipse-900/10 text-eclipse-900 flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-sm font-bold text-eclipse-900 hidden sm:block">Estetika</span>
           </div>
           <div className="h-px bg-eclipse-900/10 flex-1 mx-4 hidden sm:block" />
           <div className="flex items-center gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full bg-eclipse-900/10 text-eclipse-900 flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-sm font-bold text-eclipse-900 hidden sm:block">Aset</span>
           </div>
        </div>

        <form className="space-y-8">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <label className="block text-xs font-bold tracking-widest uppercase text-eclipse-900/60 mb-2">Nama Klien / Brand</label>
                 <input type="text" className="w-full px-5 py-4 bg-space-50 border border-eclipse-900/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-nebula-500/20 focus:border-nebula-500 transition-all text-sm font-medium" placeholder="Sagara Living" />
              </div>
              <div>
                 <label className="block text-xs font-bold tracking-widest uppercase text-eclipse-900/60 mb-2">Layanan yang Dipilih</label>
                 <select className="w-full px-5 py-4 bg-space-50 border border-eclipse-900/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-nebula-500/20 focus:border-nebula-500 transition-all text-sm font-medium appearance-none">
                    <option>Milestones (Website)</option>
                    <option>Micro-Moments (Undangan)</option>
                    <option>Custom Solutions</option>
                 </select>
              </div>
           </div>

           <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-eclipse-900/60 mb-2">Deskripsikan visi utama (Tujuan proyek ini)</label>
              <textarea rows={4} className="w-full px-5 py-4 bg-space-50 border border-eclipse-900/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-nebula-500/20 focus:border-nebula-500 transition-all text-sm font-medium resize-none" placeholder="Tuliskan cerita singkat tentang apa yang ingin Anda capai..." />
           </div>

           <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-eclipse-900/60 mb-2">Target Audiens</label>
              <input type="text" className="w-full px-5 py-4 bg-space-50 border border-eclipse-900/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-nebula-500/20 focus:border-nebula-500 transition-all text-sm font-medium" placeholder="Orang dewasa 25-40 tahun, menyukai estetika minimalis..." />
           </div>

           {/* Drag and drop upload zone */}
           <div className="pt-4">
              <label className="block text-xs font-bold tracking-widest uppercase text-eclipse-900/60 mb-2">Aset Fotografi (Opsional)</label>
              <div className="w-full h-40 border-2 border-dashed border-eclipse-900/20 rounded-2xl bg-space-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-space-50 hover:border-nebula-500/50 transition-colors">
                 <svg className="w-8 h-8 text-nebula-500/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                 <span className="text-sm font-bold text-eclipse-900 mb-1">Tarik dan lepas file di sini</span>
                 <span className="text-xs text-eclipse-700/60">atau klik untuk menelusuri (Maks 10MB)</span>
              </div>
           </div>

           <div className="pt-8 flex justify-end">
              <button type="button" className="px-8 py-4 bg-eclipse-900 text-white text-sm font-bold rounded-xl hover:bg-eclipse-800 transition-all shadow-[0_15px_30px_-10px_rgba(11,12,16,0.3)] hover:-translate-y-0.5">
                 Langkah Selanjutnya &rarr;
              </button>
           </div>
        </form>

      </div>
    </div>
  );
}

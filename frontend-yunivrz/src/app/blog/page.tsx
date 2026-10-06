"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const articles = [
  { id: 1, title: "Merancang keaslian di dunia yang bising", tag: "Design Journal", date: "12 Okt 2026", height: "h-80" },
  { id: 2, title: "Website pernikahan adalah kesan pertama Anda", tag: "Digital Identity", date: "05 Okt 2026", height: "h-64" },
  { id: 3, title: "Ruang digital personal kembali hadir", tag: "Web Culture", date: "28 Sep 2026", height: "h-96" },
  { id: 4, title: "Mengapa desain minimalis bukan berarti membosankan", tag: "Design Journal", date: "15 Sep 2026", height: "h-64" },
  { id: 5, title: "Pentingnya sistem RSVP transparan untuk acara intim", tag: "Tech Insights", date: "02 Sep 2026", height: "h-80" },
  { id: 6, title: "Berpisah dengan template, menyapa custom web", tag: "Digital Identity", date: "18 Ags 2026", height: "h-72" },
];

export default function BlogPage() {
  return (
    <main className="flex-1 w-full bg-space-50 pt-32 pb-32 relative min-h-screen">
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-eclipse-900 mb-6 tracking-tight">
              Perspektif baru.
            </h1>
            <p className="text-lg text-eclipse-700 leading-relaxed">
              Jurnal dan pemikiran mendalam seputar eksplorasi desain, pengembangan web premium, dan budaya digital.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full md:w-auto relative"
          >
            <input 
              type="text" 
              placeholder="Cari artikel..." 
              className="w-full md:w-72 px-6 py-4 bg-white/60 backdrop-blur-md border border-white rounded-full focus:outline-none focus:ring-4 focus:ring-nebula-500/20 shadow-sm text-sm"
            />
          </motion.div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-16">
          {["Semua", "Design Journal", "Digital Identity", "Web Culture", "Tech Insights"].map((tag, i) => (
             <button key={i} className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
               i === 0 
                 ? "bg-eclipse-900 text-white" 
                 : "bg-white/60 border border-white/80 text-eclipse-700 hover:text-eclipse-900 hover:bg-white"
             }`}>
               {tag}
             </button>
          ))}
        </div>

        {/* Masonry Grid (Approximated with CSS columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {articles.map((article, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={article.id} 
              className="break-inside-avoid group cursor-pointer"
            >
               <div className={`w-full ${article.height} bg-white/60 backdrop-blur-xl border border-white shadow-sm rounded-3xl mb-4 overflow-hidden relative transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(140,155,255,0.15)] group-hover:-translate-y-1`}>
                  {/* Abstract Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EAEAF3] to-[#F4F5F9] mix-blend-multiply opacity-50" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIiBmaWxsPSJyZ2JhKDIwMCwyMDAsMjAwLDAuMikiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-50" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-eclipse-900 font-bold">
                    &rarr;
                  </div>
               </div>
               <div className="px-2">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-nebula-500">{article.tag}</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700/40">{article.date}</span>
                 </div>
                 <h2 className="text-xl font-bold text-eclipse-900 group-hover:text-nebula-500 transition-colors leading-tight">
                    {article.title}
                 </h2>
               </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}

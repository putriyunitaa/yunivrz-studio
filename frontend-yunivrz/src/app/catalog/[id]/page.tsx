"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CatalogDetailPage() {
  const { id } = useParams();
  const [catalog, setCatalog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/catalogs/${id}`, {
          headers: {
            "Accept": "application/json",
          }
        });
        const data = await response.json();
        setCatalog(data);
      } catch (error) {
        console.error("Failed to fetch catalog:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCatalog();
  }, [id]);

  if (loading) {
    return <div className="flex-1 w-full bg-space-50 pt-32 pb-32 text-center">Memuat detail katalog...</div>;
  }

  if (!catalog || catalog.message) {
    return <div className="flex-1 w-full bg-space-50 pt-32 pb-32 text-center">Katalog tidak ditemukan.</div>;
  }

  return (
    <main className="flex-1 w-full bg-space-50 pt-20 pb-32 relative overflow-hidden">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-full h-[700px] bg-gradient-to-b from-[#6B7BFF]/10 via-purple-300/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <Link href="/catalog" className="text-xs font-bold uppercase tracking-widest text-eclipse-700/60 hover:text-eclipse-900 transition-colors flex items-center gap-2 mb-12">
          &larr; Kembali ke Portofolio
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Content (Mockup Showcase) */}
          <div className="lg:w-[55%] relative">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full aspect-[4/5] bg-white/40 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(107,123,255,0.2)] border border-white/80 p-8 flex items-center justify-center relative overflow-hidden group"
             >
                {/* Soft Nebula Blue Aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#6B7BFF]/20 rounded-full blur-[80px]" />
                
                {/* Sleek Smartphone Mockup */}
                <div className="w-[280px] h-[580px] bg-[#FAF9F6] rounded-[2.5rem] shadow-2xl border-8 border-eclipse-900 relative z-10 overflow-hidden transform group-hover:scale-105 transition-transform duration-700">
                   <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
                      <div className="w-24 h-5 bg-eclipse-900 rounded-b-2xl" />
                   </div>
                   {/* Inside Screen */}
                   <div className="pt-16 px-6 text-center h-full bg-[#EBE7DF] flex flex-col">
                      <div className="text-sm font-heading font-bold text-eclipse-900 mb-1">{catalog.title.split(' ')[0]}</div>
                      <div className="text-[10px] text-eclipse-700 italic mb-1">&</div>
                      <div className="text-sm font-heading font-bold text-eclipse-900 mb-6">{catalog.title.split(' ')[1] || 'Project'}</div>
                      <div className="flex-1 rounded-t-full mt-4 flex items-center justify-center overflow-hidden relative">
                         {catalog.thumbnail ? (
                           <img src={catalog.thumbnail} alt={catalog.title} className="w-full h-full object-cover absolute inset-0" />
                         ) : (
                           <div className="w-full h-full bg-[#DCE4FA] flex items-center justify-center absolute inset-0">
                             <span className="text-[10px] font-bold text-eclipse-900/30 uppercase tracking-widest">Image Placeholder</span>
                           </div>
                         )}
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>

          {/* Right Content (Details & Typography) */}
          <div className="lg:w-[45%] flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4 bg-nebula-500/10 inline-block px-3 py-1 rounded-full">
                {catalog.category.replace('_', ' ')}
              </div>
              <h1 className="text-5xl font-heading font-bold text-eclipse-900 mb-6 tracking-tight leading-[1.1]">
                {catalog.title}
              </h1>
              <p className="text-lg text-eclipse-700 mb-10 leading-relaxed">
                {catalog.description}
              </p>

              <div className="grid grid-cols-2 gap-8 border-y border-eclipse-900/10 py-8 mb-10">
                 <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-eclipse-900/40 mb-2">KLIEN</h4>
                    <p className="text-sm font-bold text-eclipse-900">Custom Project</p>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-eclipse-900/40 mb-2">TAHUN</h4>
                    <p className="text-sm font-bold text-eclipse-900">{new Date(catalog.created_at).getFullYear()}</p>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-eclipse-900/40 mb-2">LAYANAN</h4>
                    <p className="text-sm font-bold text-eclipse-900">{catalog.category.replace('_', ' ')}</p>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-eclipse-900/40 mb-2">FITUR</h4>
                    <ul className="text-sm font-medium text-eclipse-900 space-y-1">
                       {catalog.features && catalog.features.map((f: string, i: number) => (
                         <li key={i}>&middot; {f}</li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* Prominent Floating Action Button */}
              <Link 
                href="https://wa.me/1234567890" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-eclipse-900 text-white text-sm font-bold rounded-2xl hover:bg-eclipse-800 transition-all shadow-[0_20px_40px_-10px_rgba(11,12,16,0.3)] hover:-translate-y-1"
              >
                Tanya Kreator via WhatsApp &rarr;
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}

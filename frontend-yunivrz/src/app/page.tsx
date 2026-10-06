"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-6 bg-nebula-500/10 inline-block px-3 py-1 rounded-full">
          STUDIO INDEPENDEN
        </div>
        
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-eclipse-900 mb-6 tracking-tight leading-[1.1]">
          Pengalaman digital minimalis dan elegan.
        </h1>
        
        <p className="text-lg md:text-xl text-eclipse-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          Halo, saya adalah kreator di balik Yunivrz Studio. Saya merancang website premium dan undangan digital yang personal serta penuh makna.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/catalog" 
            className="w-full sm:w-auto px-8 py-4 bg-eclipse-900 text-white font-medium rounded-full hover:bg-eclipse-800 transition-all shadow-[0_10px_20px_-10px_rgba(11,12,16,0.3)]"
          >
            Lihat Portofolio
          </Link>
          <Link 
            href="/about" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-eclipse-900 font-medium rounded-full border border-eclipse-900/10 hover:bg-space-100 transition-all"
          >
            Baca Manifesto
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

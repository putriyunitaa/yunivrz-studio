"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function AboutPage() {
  const { settings } = useSettings();
  return (
    <main className="flex-1 w-full bg-space-50 pt-24 relative overflow-hidden">
      
      {/* Global Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-gradient-to-b from-[#B2BFFF]/10 via-purple-300/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-32">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4 bg-nebula-500/10 inline-block px-4 py-1.5 rounded-full"
            >
              ABOUT STUDIO
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-bold text-eclipse-900 mb-8 tracking-tight leading-[1.1]"
            >
              Sebuah studio independen.<br />
              Semesta yang lebih luas.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-eclipse-700 max-w-md mb-8 leading-relaxed"
            >
              Yunivrz Studio adalah studio digital independen yang merancang pengalaman premium dan penuh perhatian. Berbasis di ruang lingkup digital, terhubung ke mana saja. Mengubah cerita personal menjadi pengalaman yang pantas dikenang.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 w-full aspect-[4/3] rounded-3xl bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(140,155,255,0.1)] relative overflow-hidden flex items-center justify-center"
          >
             {/* Abstract Nebula Placeholder */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#B2BFFF]/30 via-space-50 to-purple-400/20" />
             <div className="absolute w-64 h-64 bg-[#6B7BFF]/20 blur-[60px] rounded-full mix-blend-multiply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
             <div className="w-48 h-48 rounded-full border border-white/80 bg-white/30 backdrop-blur-xl shadow-[0_0_60px_rgba(140,155,255,0.4)] relative z-10 flex items-center justify-center">
                <span className="font-heading text-3xl font-bold text-eclipse-900 opacity-20">Y</span>
             </div>
          </motion.div>
        </div>

      </div>

      {/* Manifesto Section */}
      <section className="bg-eclipse-900/5 py-32 border-y border-eclipse-900/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B2BFFF]/5 to-transparent blur-2xl" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-8 bg-white/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
            OUR MANIFESTO
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-heading font-medium text-eclipse-900 leading-[1.1] max-w-5xl mb-20 tracking-tight">
            Kami percaya pengalaman digital terbaik tidak mengemis perhatian. Mereka membangun koneksi personal yang mendalam.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Manusia, pertama.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">Saya memulai segalanya dari manusia, bukan piksel. Cerita dan kepribadian unik Anda akan membentuk setiap keputusan desain secara natural.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Sedikit, tapi lebih baik.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">Saya memberi ruang untuk hal-hal yang benar-benar bermakna. Setiap detail kecil, spasi, dan tipografi selalu memiliki tujuan yang jelas.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Dibuat secara personal.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">Sebagai studio independen, Anda berkolaborasi langsung dengan sang pembuat. Tanpa perantara, hanya keahlian yang terfokus 100%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Developer Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            
            {/* Avatar Side */}
            <div className="w-full md:w-2/5 relative">
               <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-eclipse-900/5 to-purple-500/10 relative shadow-xl border border-white flex flex-col items-center justify-center p-8 text-center group">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                    <span className="text-sm font-bold text-eclipse-900 bg-white px-4 py-2 rounded-full shadow-lg">Let's connect! ✨</span>
                  </div>
                  
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white/50 mb-6 relative z-0">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-eclipse-900 mb-1">Your Developer</h3>
                  <p className="text-eclipse-700 text-sm mb-8">Founder, Yunivrz Studio</p>

                  <div className="flex items-center gap-4 relative z-20">
                     <a href={settings.github_url || "https://github.com/putriyunitaa"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm hover:shadow hover:-translate-y-1 transition-all" aria-label="GitHub">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                     </a>
                     <a href={settings.linkedin_url || "https://www.linkedin.com/in/ptryntt"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 shadow-sm hover:shadow hover:-translate-y-1 transition-all" aria-label="LinkedIn">
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                     </a>
                     <a href={settings.instagram_developer || "https://www.instagram.com/ptryntaa_/"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-pink-600 shadow-sm hover:shadow hover:-translate-y-1 transition-all" aria-label="Instagram Developer">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                     </a>
                  </div>
               </div>
               
               {/* Decorative elements */}
               <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-400/20 blur-3xl rounded-full -z-10" />
            </div>

            {/* Text Side */}
            <div className="w-full md:w-3/5">
              <div className="text-[10px] font-bold tracking-widest uppercase text-nebula-500 mb-6 inline-block bg-nebula-500/10 px-4 py-1.5 rounded-full">
                ABOUT THE DEVELOPER
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-eclipse-900 mb-6 tracking-tight leading-tight">
                Halo, saya pembuat di balik <br/>Yunivrz Studio.
              </h2>
              
              <div className="space-y-6 text-eclipse-700 leading-relaxed text-[15px]">
                <p>
                  Sebagai seorang mahasiswa dan <span className="font-semibold italic">developer</span>, saya menyadari satu hal: banyak bisnis kecil, UMKM, dan kreator lokal yang berjuang membangun identitas digital karena terkendala biaya agensi yang fantastis.
                </p>
                <p>
                  Dari situlah <strong>Yunivrz Studio</strong> lahir. Sebuah komitmen untuk menghadirkan kualitas website premium—mulai dari undangan pernikahan interaktif hingga aplikasi web khusus—dengan harga yang sangat realistis untuk kantong kita.
                </p>
                <p>
                  Berbeda dengan agensi besar, di sini Anda berkolaborasi langsung dengan saya. Mulai dari coretan konsep di kertas, hingga penulisan baris kode terakhir. Pendekatan 1-on-1 ini memastikan setiap detail sesuai dengan visi Anda, dikerjakan dengan penuh dedikasi (dan beberapa cangkir kopi). ☕
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <span className="bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-eclipse-900">Web Developer</span>
                <span className="bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-eclipse-900">UI/UX Enthusiast</span>
                <span className="bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-eclipse-900">Mahasiswa</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>



    </main>
  );
}

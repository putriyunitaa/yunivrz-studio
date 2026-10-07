"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
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
              Tentang Studio
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
            Manifesto Kami
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

      {/* Timeline Section (Added based on UI Prompt) */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-heading font-bold text-eclipse-900 text-center mb-16 tracking-tight">Perjalanan Studio</h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-eclipse-900/10 before:to-transparent">
             {[
               { year: "2021", title: "Langkah Pertama", desc: "Dimulai dari sebuah hasrat untuk merancang identitas visual yang lebih bermakna untuk kreator lokal." },
               { year: "2023", title: "Evolusi Digital", desc: "Memperluas layanan ke arah undangan digital mewah dan pengalaman web yang interaktif (WebGL & React)." },
               { year: "2025", title: "Studio Independen", desc: "Mendirikan Yunivrz Studio sebagai praktik independen dengan pendekatan premium dan 1-on-1 bersama klien." },
               { year: "2026", title: "Era Headless", desc: "Meluncurkan portal kolaborasi eksklusif untuk memberikan pengalaman klien yang transparan dan tanpa gesekan." }
             ].map((item, idx) => (
               <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-nebula-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white shadow-sm hover:shadow-md transition-all">
                     <div className="text-nebula-500 font-bold text-sm mb-1">{item.year}</div>
                     <h3 className="font-bold text-eclipse-900 mb-2">{item.title}</h3>
                     <p className="text-eclipse-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* The Creator Section */}
      <section className="py-32 bg-eclipse-900 text-white rounded-t-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#B2BFFF]/10 to-[#6B7BFF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
              Kreator di balik layar.
            </h2>
            <p className="text-white/60 max-w-xs text-sm">
              Satu visi yang sama tentang menyempurnakan setiap detail kecil dalam proyek digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square md:aspect-[4/5] rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden backdrop-blur-sm group">
               {/* Profile Image Placeholder with Glassmorphism */}
               <div className="absolute inset-0 bg-gradient-to-t from-eclipse-900/80 via-transparent to-transparent z-10" />
               <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                 <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
               </div>
               <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-1">Yunita Putri</h3>
                  <p className="text-white/60 text-sm">Independent Designer & Developer</p>
               </div>
            </div>
            <div className="max-w-md">
               <p className="text-lg text-white/80 leading-relaxed mb-8">
                 Halo, saya adalah kreator dari Yunivrz Studio. Saya membangun studio independen ini untuk menjembatani jarak antara cerita personal yang intim dengan eksekusi digital yang premium dan canggih.
               </p>
               <p className="text-lg text-white/80 leading-relaxed mb-8">
                 Ketika Anda bekerja bersama Yunivrz, Anda tidak sedang dilempar-lempar antara desainer junior atau manajer akun. Anda sedang berkolaborasi langsung secara transparan dengan tenaga ahli yang berdedikasi tinggi.
               </p>
               <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-eclipse-900 text-sm font-bold rounded-full hover:bg-space-100 transition-all">
                 Lihat karya saya &rarr;
               </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

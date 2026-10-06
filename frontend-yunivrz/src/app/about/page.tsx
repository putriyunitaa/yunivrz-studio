"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-space-50 pt-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-32">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4"
            >
              A. Area Publik / Studio
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
              Yunivrz Studio adalah studio digital independen yang merancang pengalaman premium dan penuh perhatian. Berbasis di Jakarta, terhubung ke mana saja. Sejak 2021, saya telah membantu banyak orang dan *brand* mengubah cerita mereka menjadi pengalaman digital yang pantas dikenang.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                href="https://wa.me/1234567890" 
                className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-white text-eclipse-900 border border-eclipse-900/10 font-medium transition-all hover:bg-space-100 hover:shadow-sm"
              >
                Mulai berdiskusi &rarr;
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 w-full aspect-[4/3] rounded-3xl bg-eclipse-900/5 relative overflow-hidden flex items-center justify-center"
          >
             {/* Abstract Nebula Placeholder */}
             <div className="absolute inset-0 bg-gradient-to-br from-nebula-300/30 via-space-50 to-nebula-500/20 blur-xl" />
             <div className="w-48 h-48 rounded-full border border-white/40 bg-white/10 backdrop-blur-3xl shadow-[0_0_60px_rgba(140,155,255,0.4)]" />
          </motion.div>
        </div>

      </div>

      {/* Manifesto Section */}
      <section className="bg-eclipse-900/5 py-32 border-y border-eclipse-900/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-8">
            Manifesto Kami
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-eclipse-900 leading-[1.2] max-w-4xl mb-20 tracking-tight">
            Kami percaya pengalaman digital terbaik tidak mengemis perhatian. Mereka membangun koneksi.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Manusia, pertama.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">Saya memulai segalanya dari manusia, bukan piksel. Cerita dan kepribadian unik Anda akan membentuk setiap keputusan desain.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Sedikit, tapi lebih baik.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">Saya memberi ruang untuk hal-hal yang benar-benar bermakna. Setiap detail kecil selalu memiliki tujuan yang jelas.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Dibuat secara personal.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">Sebagai studio independen, Anda berkolaborasi langsung dengan sang pembuat. Tanpa perantara, hanya keahlian yang terfokus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Creator Section */}
      <section className="py-32 bg-space-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-eclipse-900 tracking-tight">
              Kreator di balik karya.
            </h2>
            <p className="text-eclipse-700 max-w-xs text-sm">
              Satu visi yang sama tentang menyempurnakan setiap detail kecil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square md:aspect-[3/4] rounded-3xl bg-eclipse-900/5 relative overflow-hidden">
               {/* Profile Image Placeholder */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
               <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-2xl font-bold text-space-50 mb-1">Nama Anda</h3>
                  <p className="text-space-50/80 text-sm">Founder & Lead Designer</p>
               </div>
            </div>
            <div className="max-w-md">
               <p className="text-lg text-eclipse-700 leading-relaxed mb-8">
                 Halo, saya adalah *founder* dari Yunivrz Studio. Saya membangun studio independen ini untuk menjembatani jarak antara cerita personal yang intim dengan eksekusi digital yang premium.
               </p>
               <p className="text-lg text-eclipse-700 leading-relaxed mb-8">
                 Ketika Anda bekerja bersama Yunivrz, Anda tidak sedang berhadapan dengan desainer junior atau manajer akun. Anda sedang berkolaborasi langsung dengan tenaga ahli yang berdedikasi untuk menyempurnakan proyek Anda.
               </p>
               <Link href="/catalog" className="text-nebula-500 font-medium hover:text-eclipse-900 transition-colors">Lihat karya terbaru saya &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
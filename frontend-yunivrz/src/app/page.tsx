"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col bg-space-50">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 px-6 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-6 bg-nebula-500/10 inline-block px-4 py-1.5 rounded-full"
              >
                DESAIN DIGITAL DENGAN TUJUAN
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-[5.5rem] font-heading font-bold text-eclipse-900 mb-6 tracking-tight leading-[1.05]"
              >
                Momen kecil.<br/>
                Kemungkinan<br/>
                tak terbatas.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-eclipse-700 mb-10 max-w-lg leading-relaxed"
              >
                Kami merancang pengalaman digital yang bermakna. Untuk *brand*, pasangan, dan kreator yang menghargai setiap detail kecil.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-6"
              >
                <Link 
                  href="/catalog" 
                  className="px-8 py-4 bg-eclipse-900 text-white text-sm font-medium rounded-full hover:bg-eclipse-800 transition-all shadow-[0_10px_20px_-10px_rgba(11,12,16,0.3)] flex items-center gap-2"
                >
                  Lihat portofolio &rarr;
                </Link>
                <Link 
                  href="/about" 
                  className="px-8 py-4 bg-white text-eclipse-900 text-sm font-medium rounded-full border border-eclipse-900/10 hover:bg-space-100 transition-all flex items-center gap-2"
                >
                  Mulai proyek &rarr;
                </Link>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-nebula-500 font-medium flex items-center gap-2"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nebula-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-nebula-500"></span>
                </span>
                Tersedia untuk proyek baru bulan ini
              </motion.p>
            </div>
            
            {/* Right Hero Visual (Mockups) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1 w-full relative h-[500px] lg:h-[600px] hidden md:block"
            >
               {/* Abstract Background Blur (Lavender & Soft Blue Nebula Glow) */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#B2BFFF]/30 via-purple-300/20 to-[#6B7BFF]/20 blur-3xl rounded-full" />
               <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-400/10 blur-[80px] rounded-full mix-blend-multiply" />
               
               {/* Landscape Mockup */}
               <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] aspect-[4/3] bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl shadow-eclipse-900/10 border border-white/60 p-2 rotate-[-2deg] transition-transform hover:rotate-0 hover:scale-105 duration-500 overflow-hidden">
                  <div className="w-full h-full bg-[#F5F2EE] rounded-xl overflow-hidden flex flex-col relative">
                     <div className="h-6 border-b border-black/5 flex items-center px-3 gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400/80" />
                        <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                        <div className="w-2 h-2 rounded-full bg-green-400/80" />
                     </div>
                     <div className="p-6 flex-1 flex flex-col justify-center relative">
                        <div className="text-xs font-bold text-eclipse-900/40 mb-2 uppercase">Sagara Living</div>
                        <div className="text-3xl font-heading font-bold text-eclipse-900 mb-4 leading-tight">A quieter kind<br/>of extraordinary</div>
                        <div className="w-24 h-8 bg-eclipse-900 rounded-full" />
                        <div className="absolute right-4 bottom-4 w-32 h-40 bg-[#D4CEC4] rounded-lg shadow-inner overflow-hidden flex items-center justify-center">
                           <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Portrait Mobile Mockup */}
               <div className="absolute top-1/2 right-4 -translate-y-[45%] w-[240px] aspect-[9/19] bg-white/60 backdrop-blur-2xl rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(140,155,255,0.3)] border-[4px] border-white/80 p-1.5 rotate-[4deg] transition-transform hover:rotate-0 hover:scale-105 duration-500 overflow-hidden z-10">
                  <div className="w-full h-full bg-[#FAF9F6] rounded-[1.5rem] overflow-hidden flex flex-col relative">
                     <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                        <div className="w-20 h-4 bg-eclipse-900 rounded-b-xl" />
                     </div>
                     <div className="pt-12 px-6 flex-1 flex flex-col items-center text-center relative z-10">
                        <div className="text-lg font-heading font-bold text-eclipse-900 mb-1">Anindya</div>
                        <div className="text-xs text-eclipse-700 italic mb-1">&</div>
                        <div className="text-lg font-heading font-bold text-eclipse-900 mb-6">Rizky</div>
                        <div className="w-full aspect-[3/4] bg-[#E8E6DF] rounded-t-full mt-4 flex items-center justify-center overflow-hidden">
                           <svg className="w-8 h-8 text-black/10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                     </div>
                  </div>
               </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Logo Cloud */}
      <section className="py-10 border-y border-eclipse-900/5 bg-white">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700/50 mb-8">KOLABORASI DENGAN KLIEN TERBAIK</p>
          <div className="w-full flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale">
            <div className="text-xl font-heading font-bold">SAGARA</div>
            <div className="text-xl font-serif font-bold italic">Kopi Kala</div>
            <div className="text-xl font-bold tracking-tighter">aksara.</div>
            <div className="text-xl font-bold tracking-widest">NUSA</div>
            <div className="text-xl font-heading font-medium">RUANG</div>
            <div className="text-xl font-sans font-light">Lumina</div>
          </div>
        </div>
      </section>

      {/* 3. Services / Categories */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4 inline-block">PORTOFOLIO & LAYANAN</div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-eclipse-900 tracking-tight">Sebuah semesta pengalaman digital.</h2>
            </div>
            <p className="text-sm text-eclipse-700 max-w-xs leading-relaxed md:text-right">
              Dari identitas *brand* yang memukau hingga undangan digital yang sangat personal. Semuanya dirancang khusus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
                title: "Micro-Moments",
                desc: "Undangan digital elegan dan website pernikahan yang menceritakan kisah Anda di hari spesial.",
                price: "Mulai dari Rp 4jt",
                color: "text-rose-500",
                bg: "bg-rose-500/10"
              },
              {
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                title: "Milestones",
                desc: "Website responsif untuk bisnis, studio kreatif, dan peluncuran produk dengan estetika tinggi.",
                price: "Mulai dari Rp 8jt",
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                title: "Custom Solutions",
                desc: "Aplikasi web interaktif, platform khusus, dan portal klien yang disesuaikan dengan alur kerja Anda.",
                price: "Berdasarkan Proyek",
                color: "text-nebula-500",
                bg: "bg-nebula-500/10"
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2rem] border border-eclipse-900/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                <div className={`w-12 h-12 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-8`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold text-eclipse-900 mb-4">{service.title}</h3>
                <p className="text-sm text-eclipse-700 leading-relaxed mb-10 flex-1">{service.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-eclipse-900/5">
                  <span className="text-xs font-bold text-eclipse-900">{service.price}</span>
                  <span className="text-eclipse-900 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects */}
      <section className="py-32 px-6 bg-eclipse-900/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4 inline-block">KARYA TERPILIH</div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-eclipse-900 tracking-tight">Dibuat untuk bermakna.</h2>
            </div>
            <Link href="/catalog" className="px-6 py-3 bg-white text-eclipse-900 text-sm font-medium rounded-full border border-eclipse-900/10 hover:bg-space-100 transition-all">
              Lihat semua karya &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Project 1 */}
            <div className="group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-[#EBE7DF] rounded-[2rem] mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                 <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                 {/* Mockup Window */}
                 <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-black/5 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                    <div className="h-4 border-b border-black/5 flex items-center px-2 gap-1 bg-[#F5F2EE]">
                       <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                       <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                       <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                    </div>
                    <div className="p-4 flex gap-4 h-48">
                       <div className="flex-1">
                          <div className="text-[8px] font-bold text-eclipse-900/40 mb-1 uppercase">Sagara Living</div>
                          <div className="text-xl font-heading font-bold text-eclipse-900 mb-2 leading-tight">A quieter kind<br/>of extraordinary</div>
                          <div className="w-16 h-4 bg-eclipse-900 rounded-full" />
                       </div>
                       <div className="w-24 h-full bg-[#D4CEC4] rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-eclipse-900 mb-1">Sagara — A second home</h3>
                  <p className="text-xs text-eclipse-700">Website &middot; Web Design &middot; E-commerce</p>
                </div>
                <span className="text-eclipse-900 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform">&rarr;</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-[#EBF0FF] rounded-[2rem] mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                 <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                 {/* Mobile Mockup */}
                 <div className="w-[180px] h-[360px] bg-white rounded-[2rem] shadow-xl border-[6px] border-eclipse-900 overflow-hidden transition-transform duration-500 group-hover:scale-105 relative">
                    <div className="absolute top-0 inset-x-0 h-4 flex justify-center z-20">
                       <div className="w-16 h-3 bg-eclipse-900 rounded-b-lg" />
                    </div>
                    <div className="pt-10 px-4 flex-1 flex flex-col items-center text-center">
                       <div className="text-sm font-heading font-bold text-eclipse-900 mb-1">Anindya</div>
                       <div className="text-[10px] text-eclipse-700 italic mb-1">&</div>
                       <div className="text-sm font-heading font-bold text-eclipse-900 mb-4">Rizky</div>
                       <div className="w-full flex-1 bg-[#DCE4FA] rounded-t-[3rem] mt-2 flex items-center justify-center overflow-hidden">
                          <svg className="w-6 h-6 text-black/10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-eclipse-900 mb-1">Lumina — Anindya & Rizky</h3>
                  <p className="text-xs text-eclipse-700">Undangan Digital &middot; UI/UX &middot; Development</p>
                </div>
                <span className="text-eclipse-900 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform">&rarr;</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Process Section */}
      <section className="py-32 px-6 border-b border-eclipse-900/5 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-eclipse-900 tracking-tight max-w-xl leading-[1.1]">
              Proses yang jelas.<br />Ruang untuk sedikit keajaiban.
            </h2>
            <p className="text-sm text-eclipse-700 max-w-sm leading-relaxed">
              Kami percaya pada pendekatan yang terstruktur. Hal ini membebaskan pikiran kita untuk berkreasi dan mengeksplorasi batas yang ada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[
              { num: "01", title: "Temukan", desc: "Kita mulai dengan percakapan. Memahami visi, audiens, dan cerita unik di balik proyek Anda." },
              { num: "02", title: "Desain", desc: "Menerjemahkan ide ke dalam konsep visual. Eksplorasi tipografi, tata letak, dan interaksi yang pas." },
              { num: "03", title: "Sempurnakan", desc: "Melalui ulasan kolaboratif di Portal Klien, kami memoles setiap piksel hingga terasa sempurna." },
              { num: "04", title: "Luncurkan", desc: "Menghidupkan desain dengan kode yang bersih dan animasi halus, siap dibagikan ke seluruh dunia." }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-xs font-bold text-nebula-500 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold text-eclipse-900 mb-4">{step.title}</h3>
                <p className="text-sm text-eclipse-700 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dark Section (Stats) */}
      <section className="py-32 px-6 bg-eclipse-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nebula-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row justify-between gap-16">
          <div className="max-w-md">
             <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-6">FILOSOFI STUDIO</div>
             <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight leading-[1.1]">
               Lebih sedikit gangguan.<br />Lebih banyak niat.
             </h2>
             <p className="text-white/60 text-sm leading-relaxed">
               Sebagai kreator tunggal, saya secara sadar membatasi jumlah proyek yang saya kerjakan. Hal ini memastikan setiap karya menerima porsi pemikiran dan detail yang optimal.
             </p>
          </div>

          <div className="flex gap-12 md:gap-24 items-center">
             <div>
               <div className="text-5xl font-bold font-heading mb-2">120+</div>
               <div className="text-[10px] font-bold tracking-widest uppercase text-white/40">PROYEK SUKSES</div>
             </div>
             <div>
               <div className="text-5xl font-bold font-heading mb-2">98%</div>
               <div className="text-[10px] font-bold tracking-widest uppercase text-white/40">KLIEN PUAS</div>
             </div>
             <div>
               <div className="text-5xl font-bold font-heading mb-2">5 <span className="text-3xl">tahun</span></div>
               <div className="text-[10px] font-bold tracking-widest uppercase text-white/40">PENGALAMAN</div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonial */}
      <section className="py-32 px-6 bg-nebula-500/5">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-start">
             <div className="md:w-1/3">
                <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-6">KATA MEREKA</div>
                <h2 className="text-3xl font-heading font-bold text-eclipse-900 tracking-tight leading-snug">
                  Ide yang bagus.<br />Perasaan yang luar biasa.
                </h2>
             </div>
             <div className="md:w-2/3">
                <blockquote className="text-2xl md:text-3xl font-medium text-eclipse-900 leading-relaxed tracking-tight mb-8">
                  "Mereka tidak hanya membuat website kami—mereka memahami jiwa Sagara dan memberikannya tempat yang sangat indah untuk hidup secara online."
                </blockquote>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-eclipse-900/10 text-eclipse-900 flex items-center justify-center font-bold text-sm">
                      AP
                   </div>
                   <div>
                      <div className="font-bold text-eclipse-900 text-sm">Anindya Putri</div>
                      <div className="text-xs text-eclipse-700">Founder, Sagara Living</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 8. Blog / Articles */}
      <section className="py-32 px-6 bg-white border-y border-eclipse-900/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-eclipse-900 tracking-tight">Perspektif baru.</h2>
            <Link href="#" className="text-sm font-medium text-eclipse-900 hover:text-nebula-500 transition-colors hidden sm:block">Lihat semua artikel &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Merancang keaslian di dunia yang bising", tag: "Design Journal" },
              { title: "Website pernikahan adalah kesan pertama Anda", tag: "Digital Identity" },
              { title: "Ruang digital personal kembali hadir", tag: "Web Culture" }
            ].map((article, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="w-full aspect-[16/9] bg-space-100 rounded-2xl mb-6 overflow-hidden flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                   <svg className="w-8 h-8 text-black/10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700/60 mb-3">{article.tag}</div>
                <h3 className="text-lg font-bold text-eclipse-900 mb-3 group-hover:text-nebula-500 transition-colors">{article.title}</h3>
                <span className="text-xs font-bold text-nebula-500 opacity-0 group-hover:opacity-100 transition-opacity">Baca selengkapnya &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-32 px-6 bg-space-50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-16">
             <div className="md:w-1/3">
                <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4">PERTANYAAN UMUM</div>
                <h2 className="text-3xl font-heading font-bold text-eclipse-900 tracking-tight mb-4">Sebelum kita menyapa.</h2>
                <p className="text-sm text-eclipse-700">Beberapa hal yang sering ditanyakan sebelum memulai proyek kolaborasi.</p>
             </div>
             <div className="md:w-2/3 space-y-4">
                {[
                  "Bagaimana proses kerja dengan studio ini?",
                  "Berapa lama rata-rata waktu pengerjaan?",
                  "Apakah Anda menerima proyek dari luar kota?",
                  "Bagaimana sistem pembayaran dilakukan?"
                ].map((q, i) => (
                  <div key={i} className="border-b border-eclipse-900/10 pb-4">
                    <button className="w-full flex justify-between items-center text-left text-eclipse-900 font-medium hover:text-nebula-500 transition-colors">
                      {q}
                      <span className="text-xl font-light">+</span>
                    </button>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="py-32 px-6 text-center bg-white border-t border-eclipse-900/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-6">MENGAMBIL LANGKAH SELANJUTNYA</div>
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-eclipse-900 mb-6 tracking-tight">
            Mari buat sesuatu yang bermakna.
          </h2>
          <p className="text-lg text-eclipse-700 mb-10 max-w-md mx-auto">
            Studio saat ini menerima beberapa proyek baru untuk bulan depan. Ketersediaan slot sangat terbatas.
          </p>
          <Link 
            href="https://wa.me/1234567890" 
            className="inline-flex items-center justify-center px-8 py-4 bg-eclipse-900 text-white font-medium rounded-full hover:bg-eclipse-800 transition-all shadow-[0_10px_20px_-10px_rgba(11,12,16,0.3)]"
          >
            Mulai proyek Anda &rarr;
          </Link>
        </div>
      </section>

    </main>
  );
}

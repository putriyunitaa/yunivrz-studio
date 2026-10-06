"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  const tiers = [
    {
      name: "Micro-Moments",
      price: "Mulai dari Rp 4jt",
      desc: "Sempurna untuk undangan digital mewah, profil personal, atau peluncuran awal yang membutuhkan kesan memukau.",
      features: [
        "Desain Kustom (Hingga 3 Halaman)",
        "Pengembangan Responsif Lanjutan",
        "Animasi & Interaksi Dasar",
        "Setup Domain & Hosting",
        "1 Bulan Dukungan Teknis"
      ],
      highlight: false
    },
    {
      name: "Milestones",
      price: "Mulai dari Rp 8jt",
      desc: "Pengalaman digital komprehensif bagi bisnis, agensi butik, dan merek yang membutuhkan identitas kokoh di internet.",
      features: [
        "Desain Kustom (Hingga 8 Halaman)",
        "Sistem Desain & Panduan Gaya",
        "Animasi Scroll & Mikro-Interaksi",
        "Integrasi CMS Dasar",
        "Optimasi Kecepatan & SEO",
        "3 Bulan Dukungan Teknis"
      ],
      highlight: true
    },
    {
      name: "Custom Solutions",
      price: "Berdasarkan Proyek",
      desc: "Sistem kompleks, platform unik, portal khusus, atau pengalaman interaktif yang mendobrak batas standar.",
      features: [
        "Arsitektur Sistem Skala Penuh",
        "Interaksi 3D & WebGL (Three.js)",
        "Pengembangan Fitur Web App",
        "Integrasi API Pihak Ketiga",
        "Dasbor/Portal Klien Khusus",
        "Maintenance Jangka Panjang"
      ],
      highlight: false
    }
  ];

  return (
    <main className="flex-1 w-full bg-space-50 pt-32 pb-32 relative overflow-hidden">
      
      {/* Background Ambience (Subtle Lavender/Blue Glow) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-300/10 via-[#B2BFFF]/10 to-[#6B7BFF]/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4 inline-block bg-nebula-500/10 px-4 py-1.5 rounded-full">
            Investasi & Harga
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-eclipse-900 mb-6 tracking-tight leading-[1.1]">
            Pendekatan yang jelas untuk hasil yang luar biasa.
          </h1>
          <p className="text-lg text-eclipse-700 leading-relaxed">
            Sebagai studio independen, saya membatasi pengerjaan klien. Hal ini menjamin setiap karya mendapatkan tingkat detail, performa, dan perhatian eksklusif.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {tiers.map((tier, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-2 duration-500 ${
                tier.highlight 
                  ? 'bg-white/60 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(140,155,255,0.3)] border-2 border-white/80 ring-1 ring-nebula-500/30' 
                  : 'bg-white/80 backdrop-blur-xl border border-white shadow-sm'
              }`}
            >
              {/* Highlight Aura */}
              {tier.highlight && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#B2BFFF]/10 to-transparent pointer-events-none" />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase text-nebula-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    Paling Diminati
                  </div>
                </>
              )}
              
              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-bold text-eclipse-900 mb-3">{tier.name}</h3>
                <p className="text-sm leading-relaxed text-eclipse-700 mb-6 h-16">{tier.desc}</p>
                <div className="text-3xl font-heading font-bold tracking-tight text-eclipse-900">
                  {tier.price}
                </div>
              </div>

              <div className="flex-1 relative z-10">
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                       {/* Custom Checkmark matching UI Prompt style */}
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${tier.highlight ? 'bg-nebula-500/10 text-nebula-500' : 'bg-eclipse-900/5 text-eclipse-900'}`}>
                         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                         </svg>
                       </div>
                      <span className="text-sm text-eclipse-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href="https://wa.me/1234567890" 
                className={`w-full py-4 text-center text-sm font-bold rounded-xl transition-all relative z-10 ${
                  tier.highlight 
                    ? 'bg-eclipse-900 hover:bg-eclipse-800 text-white shadow-lg shadow-eclipse-900/20' 
                    : 'bg-white hover:bg-space-100 text-eclipse-900 border border-eclipse-900/10'
                }`}
              >
                Pilih {tier.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Payment Process */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
           <h2 className="text-3xl font-heading font-bold text-eclipse-900 mb-12">Proses Pembayaran Transparan</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-[16%] w-[68%] h-0.5 bg-gradient-to-r from-transparent via-eclipse-900/10 to-transparent" />
              
              <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-sm relative pt-12">
                 <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-white rounded-full border border-eclipse-900/10 shadow-sm flex items-center justify-center font-heading font-bold text-eclipse-900 text-xl">1</div>
                 <h3 className="text-lg font-bold text-eclipse-900 mb-3">Uang Muka 50%</h3>
                 <p className="text-sm text-eclipse-700 leading-relaxed">Untuk mengamankan slot jadwal di studio dan memulai fase riset mendalam serta pembuatan draf konsep awal.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-sm relative pt-12">
                 <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-white rounded-full border border-eclipse-900/10 shadow-sm flex items-center justify-center font-heading font-bold text-eclipse-900 text-xl">2</div>
                 <h3 className="text-lg font-bold text-eclipse-900 mb-3">Draf Final 25%</h3>
                 <p className="text-sm text-eclipse-700 leading-relaxed">Dibayarkan setelah desain visual disetujui 100%, tepat sebelum saya mengeksekusi kode dan animasi tingkat lanjut.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-sm relative pt-12">
                 <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-white rounded-full border border-eclipse-900/10 shadow-sm flex items-center justify-center font-heading font-bold text-eclipse-900 text-xl">3</div>
                 <h3 className="text-lg font-bold text-eclipse-900 mb-3">Peluncuran 25%</h3>
                 <p className="text-sm text-eclipse-700 leading-relaxed">Sisa pelunasan akhir dilakukan saat website siap diluncurkan secara publik ke *domain* pribadi Anda.</p>
              </div>
           </div>
        </motion.div>

      </div>
    </main>
  );
}
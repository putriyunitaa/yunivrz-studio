"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  const tiers = [
    {
      name: "Eksplorasi Esensial",
      price: "Mulai dari Rp 4jt",
      desc: "Sempurna untuk profil personal, portofolio kreatif, atau peluncuran awal yang membutuhkan kesan pertama yang memukau.",
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
      name: "Identitas Menyeluruh",
      price: "Mulai dari Rp 8jt",
      desc: "Pengalaman digital komprehensif bagi bisnis, agensi butik, dan merek yang membutuhkan identitas kokoh.",
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
      name: "Pengalaman Kustom",
      price: "Berdasarkan Proyek",
      desc: "Sistem kompleks, platform unik, web app, atau pengalaman interaktif yang mendobrak batas standar.",
      features: [
        "Arsitektur Sistem Skala Penuh",
        "Interaksi 3D & WebGL (Three.js)",
        "Pengembangan Fitur Kustom",
        "Integrasi API Pihak Ketiga",
        "Portal Klien Khusus",
        "Maintenance Jangka Panjang"
      ],
      highlight: false
    }
  ];

  return (
    <main className="flex-1 w-full bg-space-50 pt-32 pb-32 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-nebula-500/10 to-transparent blur-3xl opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4 inline-block bg-nebula-500/10 px-3 py-1 rounded-full">
            Investasi
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-eclipse-900 mb-6 tracking-tight leading-[1.1]">
            Pendekatan yang jelas untuk hasil yang menawan.
          </h1>
          <p className="text-lg text-eclipse-700 leading-relaxed">
            Sebagai studio independen, saya hanya menangani sedikit proyek pada satu waktu. Hal ini memastikan setiap karya mendapatkan tingkat detail dan perhatian yang pantas ia dapatkan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
          {tiers.map((tier, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden ${
                tier.highlight 
                  ? 'bg-eclipse-900 text-white shadow-2xl shadow-eclipse-900/20 border border-eclipse-800' 
                  : 'bg-white text-eclipse-900 border border-eclipse-900/5 shadow-sm'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-nebula-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              )}
              
              <div className="mb-8 relative z-10">
                <h3 className={`text-xl font-bold mb-2 ${tier.highlight ? 'text-white' : 'text-eclipse-900'}`}>{tier.name}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${tier.highlight ? 'text-white/70' : 'text-eclipse-700'}`}>{tier.desc}</p>
                <div className={`text-3xl font-heading font-bold tracking-tight ${tier.highlight ? 'text-white' : 'text-eclipse-900'}`}>
                  {tier.price}
                </div>
              </div>

              <div className="flex-1 relative z-10">
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <svg className={`w-5 h-5 shrink-0 mt-0.5 ${tier.highlight ? 'text-nebula-500' : 'text-eclipse-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${tier.highlight ? 'text-white/80' : 'text-eclipse-700'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href="https://wa.me/1234567890" 
                className={`w-full py-4 text-center font-medium rounded-xl transition-all relative z-10 ${
                  tier.highlight 
                    ? 'bg-nebula-500 hover:bg-nebula-300 text-eclipse-900' 
                    : 'bg-eclipse-900/5 hover:bg-eclipse-900 hover:text-white text-eclipse-900'
                }`}
              >
                Mulai Proyek
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
           <h2 className="text-3xl font-heading font-bold text-eclipse-900 mb-12">Proses Pembayaran Sederhana</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-8 rounded-3xl border border-eclipse-900/5 shadow-sm relative">
                 <div className="text-[100px] font-heading font-bold text-eclipse-900/5 absolute -top-4 right-4 pointer-events-none">1</div>
                 <h3 className="text-lg font-bold text-eclipse-900 mb-3 relative z-10">Uang Muka 50%</h3>
                 <p className="text-sm text-eclipse-700 leading-relaxed relative z-10">Untuk mengamankan jadwal studio dan memulai riset mendalam serta eksplorasi konsep tahap awal.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-eclipse-900/5 shadow-sm relative">
                 <div className="text-[100px] font-heading font-bold text-eclipse-900/5 absolute -top-4 right-4 pointer-events-none">2</div>
                 <h3 className="text-lg font-bold text-eclipse-900 mb-3 relative z-10">Draf Final 25%</h3>
                 <p className="text-sm text-eclipse-700 leading-relaxed relative z-10">Dibayarkan setelah desain visual disetujui, sebelum memasuki fase pengembangan *coding* dan animasi.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-eclipse-900/5 shadow-sm relative">
                 <div className="text-[100px] font-heading font-bold text-eclipse-900/5 absolute -top-4 right-4 pointer-events-none">3</div>
                 <h3 className="text-lg font-bold text-eclipse-900 mb-3 relative z-10">Peluncuran 25%</h3>
                 <p className="text-sm text-eclipse-700 leading-relaxed relative z-10">Pelunasan akhir dilakukan saat website siap diluncurkan ke *live server* dan diserahkan kepada Anda.</p>
              </div>
           </div>
        </motion.div>

      </div>
    </main>
  );
}
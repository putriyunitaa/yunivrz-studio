"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

const services = [
  {
    id: "micro-moments",
    title: "Micro Moments",
    description: "Digitalisasi interaksi harian bisnis Anda yang mempercepat transaksi dan meningkatkan efisiensi.",
    features: ["Digital Menu / E-Menu", "Katalog Produk Interaktif", "Sistem Reservasi & Antrean", "Tautan Bio (Link in Bio) Premium"],
    icon: (
      <svg className="w-8 h-8 text-eclipse-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: "milestones",
    title: "Milestones",
    description: "Merayakan momen penting dalam hidup Anda dengan sentuhan digital yang elegan dan berkesan.",
    features: ["Undangan Pernikahan Web", "Manajemen Tamu & RSVP", "Buku Tamu Digital", "Galeri Foto Acara Virtual"],
    icon: (
      <svg className="w-8 h-8 text-eclipse-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    description: "Sistem web kustom dan aplikasi skala penuh yang dirancang khusus untuk memecahkan masalah unik Anda.",
    features: ["Company Profile & Landing Page", "Custom Content Management System (CMS)", "Aplikasi Web Internal", "E-Commerce Khusus"],
    icon: (
      <svg className="w-8 h-8 text-eclipse-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: "from-emerald-500/10 to-teal-500/10",
  }
];

export default function ServicesPage() {
  const { getWhatsAppUrl } = useSettings();
  return (
    <div className="bg-space-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-nebula-500/20 to-transparent blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-6 bg-white/50 backdrop-blur-sm border border-nebula-500/20 inline-block px-4 py-2 rounded-full">
              OUR SERVICES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-eclipse-900 mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
              Keahlian teknis berpadu dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-500 to-purple-600">desain emosional.</span>
            </h1>
            <p className="text-lg text-eclipse-700/80 max-w-2xl mx-auto leading-relaxed mb-12">
              Dari interaksi bisnis harian hingga perayaan momen terpenting, kami membangun ruang digital yang berfungsi semulus kelihatannya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-10 shadow-[0_2px_20px_rgba(11,12,16,0.02)] border border-eclipse-900/5 hover:shadow-[0_20px_40px_rgba(11,12,16,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-eclipse-900 mb-4 group-hover:text-nebula-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-eclipse-700/70 text-sm leading-relaxed mb-8 h-16">
                  {service.description}
                </p>
                
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-eclipse-900/40">SERVICE SCOPE</h4>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium text-eclipse-700">
                        <svg className="w-5 h-5 text-nebula-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a 
                    href={getWhatsAppUrl(`Halo Kak, saya tertarik dengan layanan ${service.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-eclipse-900 group-hover:text-nebula-500 transition-colors mt-auto pt-6 border-t border-eclipse-900/5 w-full"
                  >
                    Tanya Harga & Detail 
                    <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-heading font-bold text-eclipse-900 mb-6 tracking-tight">
                Bagaimana kami bekerja.
              </h2>
              <p className="text-eclipse-700/80 mb-10 leading-relaxed text-lg">
                Proses kami dirancang transparan. Anda akan selalu tahu di mana posisi proyek Anda saat ini melalui portal klien khusus kami.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Diskusi & Eksplorasi", desc: "Kita mulai dengan memahami visi, target, dan fungsi yang ingin Anda capai." },
                  { title: "Desain & Pengembangan", desc: "Tim kami merancang antarmuka dan membangun sistem dengan kode yang bersih." },
                  { title: "Revisi & Penyempurnaan", desc: "Anda dapat memberikan umpan balik langsung melalui Portal Klien Yunivrz." },
                  { title: "Peluncuran", desc: "Proyek digital Anda siap diluncurkan dan digunakan oleh audiens Anda." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-space-50 border border-eclipse-900/10 flex items-center justify-center text-eclipse-900 font-bold font-heading">
                        {idx + 1}
                      </div>
                      {idx !== 3 && <div className="w-px h-full bg-eclipse-900/10 my-2" />}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-lg font-bold text-eclipse-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-eclipse-700/70 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
               <div className="aspect-square rounded-full bg-gradient-to-tr from-[#B2BFFF]/30 to-[#E5E9FF]/30 blur-[60px] absolute inset-0 -z-10" />
               <div className="bg-space-50 rounded-[2rem] p-8 border border-eclipse-900/5 shadow-2xl relative">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-eclipse-900/5">
                     <div>
                       <div className="text-xs font-bold text-nebula-500 uppercase tracking-widest mb-1">PROJECT STATUS</div>
                       <div className="text-xl font-bold text-eclipse-900">Nara Cafe E-Menu</div>
                     </div>
                     <div className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        In Progress
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-green-500">✓</div>
                        <div>
                           <div className="text-sm font-bold text-eclipse-900">Proyek Dimulai</div>
                           <div className="text-xs text-eclipse-700/60 mt-1">Pembayaran DP diterima.</div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-green-500">✓</div>
                        <div>
                           <div className="text-sm font-bold text-eclipse-900">Desain Disetujui</div>
                           <div className="text-xs text-eclipse-700/60 mt-1">Revisi wireframe selesai.</div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-eclipse-900 flex items-center justify-center shadow-sm text-white">
                           <span className="animate-pulse">●</span>
                        </div>
                        <div>
                           <div className="text-sm font-bold text-eclipse-900">Pengembangan Web</div>
                           <div className="text-xs text-eclipse-700/60 mt-1">Tim sedang memprogram UI/UX.</div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-eclipse-900/5 flex justify-between items-center">
                     <div className="text-sm text-eclipse-700/60 font-medium">OVERALL PROGRESS</div>
                     <div className="text-sm font-bold text-eclipse-900">65%</div>
                  </div>
                  <div className="w-full bg-eclipse-900/5 h-2 rounded-full mt-3 overflow-hidden">
                     <div className="bg-eclipse-900 h-full w-[65%] rounded-full" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-space-50">
        <div className="container mx-auto max-w-5xl">
           <div className="bg-eclipse-900 rounded-[2.5rem] relative overflow-hidden px-6 py-20 md:py-24 text-center shadow-2xl">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-nebula-500/20 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 tracking-tight">
                  Siap untuk mewujudkan visi digital Anda?
                </h2>
                <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                  Mari diskusikan kebutuhan Anda dan kami akan menyusun solusi khusus untuk bisnis atau acara Anda.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/login" 
                    className="w-full sm:w-auto inline-flex justify-center items-center h-14 px-8 rounded-full bg-white text-eclipse-900 font-bold transition-transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(255,255,255,0.3)]"
                  >
                    Mulai Diskusi Sekarang
                  </Link>
                  <Link 
                    href="/work" 
                    className="w-full sm:w-auto inline-flex justify-center items-center h-14 px-8 rounded-full bg-white/10 text-white font-bold border border-white/20 transition-colors hover:bg-white/20"
                  >
                    Lihat Work
                  </Link>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}

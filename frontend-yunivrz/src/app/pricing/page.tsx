"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { getWhatsAppUrl } = useSettings();
  const plans = [
    {
      name: "Essential",
      subtitle: "Micro-Moments",
      desc: "Sempurna untuk kebutuhan personal seperti undangan pernikahan digital, portofolio mahasiswa, atau landing page sederhana.",
      price: "149",
      period: "mulai dari",
      features: [
        "1 Halaman Website Interaktif",
        "Desain Premium (Template based)",
        "Responsif di HP & Desktop",
        "Waktu Pengerjaan 2-3 Hari",
        "Hosting Dasar (Gratis)"
      ],
      color: "bg-rose-500",
      textColor: "text-rose-500",
      popular: false
    },
    {
      name: "Professional",
      subtitle: "Milestones",
      desc: "Cocok untuk UMKM, startup, dan studio kreatif yang membutuhkan profil bisnis meyakinkan dan fungsional.",
      price: "499",
      period: "mulai dari",
      features: [
        "Hingga 5 Halaman Website",
        "Desain Kustom (Tailored)",
        "Animasi & Interaksi Modern",
        "Optimasi SEO & Kecepatan",
        "Waktu Pengerjaan 1-2 Minggu",
        "Dukungan Domain Kustom"
      ],
      color: "bg-purple-600",
      textColor: "text-purple-600",
      popular: true
    },
    {
      name: "Custom Solutions",
      subtitle: "Tailor-made",
      desc: "Platform berskala besar, portal klien, aplikasi web kustom, atau sistem khusus yang disesuaikan dengan alur kerja Anda.",
      price: "Kustom",
      period: "Sesuai kerumitan fitur",
      features: [
        "Jumlah Halaman Tidak Terbatas",
        "Sistem Backend (Database & API)",
        "Desain UI/UX Tingkat Lanjut",
        "Portal Autentikasi Pengguna",
        "Pemeliharaan & Garansi Bug",
        "Konsultasi Strategi Digital"
      ],
      color: "bg-eclipse-900",
      textColor: "text-eclipse-900",
      popular: false
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans pb-32">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[10px] font-bold tracking-widest uppercase text-purple-600 mb-6">TRANSPARENT PRICING</div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-eclipse-900 tracking-tight mb-6 leading-tight">
              Harga Jujur,<br className="hidden md:block"/> Kualitas Tak Berkompromi.
            </h1>
            <p className="text-base md:text-lg text-eclipse-700 max-w-2xl mx-auto leading-relaxed">
              Kami merancang solusi digital dengan fleksibilitas harga tinggi. Apakah Anda seorang mahasiswa yang butuh portofolio, atau UMKM yang butuh profil bisnis profesional—kami punya opsi yang tepat untuk dompet Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative bg-white rounded-[2rem] p-8 border flex flex-col h-full ${
                  plan.popular ? 'border-purple-600 shadow-xl shadow-purple-900/5 scale-100 md:scale-105 z-10' : 'border-gray-200 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${plan.textColor} mb-2`}>{plan.subtitle}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{plan.desc}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Kustom" && <span className="text-base font-bold text-gray-400">Rp</span>}
                    <span className="text-4xl md:text-5xl font-heading font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Kustom" && <span className="text-base font-bold text-gray-400">rb</span>}
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium mt-1">{plan.period}</div>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  <div className="text-sm font-bold text-gray-900 mb-4">What's included:</div>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <svg className={`w-5 h-5 shrink-0 ${plan.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href={getWhatsAppUrl(`Halo Kak, saya tertarik berdiskusi tentang paket ${plan.name} (${plan.subtitle})`)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-4 rounded-xl text-sm font-bold transition-all ${
                    plan.popular 
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md' 
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Mulai Diskusi
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-32 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Punya pertanyaan seputar biaya? Temukan jawabannya di bawah ini.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "Apakah ada biaya bulanan (langganan)?",
                a: "Tidak ada. Struktur harga kami adalah pembayaran satu kali (one-time payment) untuk desain dan pengembangan. Namun, untuk domain (.com/.id) dan hosting tingkat lanjut (di luar paket gratis), akan ada biaya perpanjangan tahunan langsung ke penyedia hosting yang sangat terjangkau."
              },
              {
                q: "Saya mahasiswa, apakah harganya masih bisa dinegosiasikan?",
                a: "Tentu! Kami sangat mendukung kreativitas mahasiswa. Jika Anda membutuhkan portofolio atau tugas akhir dan terhalang dana, beri tahu kami. Kami akan menyesuaikan fitur agar pas dan super ramah untuk kantong mahasiswa."
              },
              {
                q: "Bagaimana sistem pembayarannya?",
                a: "Kami menggunakan sistem termin (cicilan) yang sangat aman dan terdata rapi melalui Portal Klien Anda. Umumnya dibagi menjadi DP (Down Payment) sebelum pengerjaan dimulai, dan pelunasan setelah proyek selesai, tepat sebelum diluncurkan."
              },
              {
                q: "Berapa lama waktu pengerjaan untuk sebuah website?",
                a: "Sangat bergantung pada kerumitan proyek. Untuk paket Essential biasanya memakan waktu 2-3 hari kerja. Sedangkan paket Professional memakan waktu 1-2 minggu. Kami akan memberikan estimasi waktu yang pasti sebelum proyek dimulai."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                  activeFaq === idx ? 'border-purple-200 shadow-md ring-4 ring-purple-50/50' : 'border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md'
                }`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                  <h4 className={`text-lg font-bold transition-colors ${activeFaq === idx ? 'text-purple-600' : 'text-gray-900'}`}>
                    {faq.q}
                  </h4>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 ${activeFaq === idx ? 'bg-purple-100 text-purple-600 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 mt-4 pt-6">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div className="mt-20 bg-gradient-to-br from-eclipse-900 to-purple-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
             {/* Abstract background shapes */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
             
             <div className="relative z-10">
               <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Masih belum yakin?</h3>
               <p className="text-purple-100 mb-10 max-w-lg mx-auto text-lg">
                 Jangan ragu untuk menyapa kami! Konsultasi gratis, tanpa ada tekanan untuk langsung membeli.
               </p>
               <a 
                 href={getWhatsAppUrl("Halo Kak, saya ingin konsultasi proyek website di Yunivrz Studio")}
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 bg-white text-eclipse-900 font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
               >
                 <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.618-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.393.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" /></svg>
                 Chat WhatsApp Kami
               </a>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}

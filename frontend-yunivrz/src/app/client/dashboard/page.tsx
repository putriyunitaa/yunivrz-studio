"use client";

import { motion } from "framer-motion";

export default function ClientDashboard() {
  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-3 tracking-tight">
          Selamat datang kembali, Anindya.
        </h1>
        <p className="text-eclipse-700 text-sm leading-relaxed max-w-2xl">
          Ruang eksklusif Anda untuk melihat pembaruan proyek, membagikan inspirasi, dan meninjau tahap desain secara langsung. Kami baru saja memperbarui draf tahap awal Anda.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {/* Status Cards */}
         <div className="p-6 rounded-2xl bg-white border border-eclipse-900/5 shadow-[0_10px_30px_-15px_rgba(11,12,16,0.05)]">
            <div className="text-[10px] font-bold tracking-widest uppercase text-nebula-500 mb-2">STATUS SAAT INI</div>
            <div className="text-2xl font-bold text-eclipse-900 mb-1">Draf Tahap 1</div>
            <div className="text-xs text-eclipse-700">Menunggu umpan balik Anda</div>
         </div>
         <div className="p-6 rounded-2xl bg-white border border-eclipse-900/5 shadow-[0_10px_30px_-15px_rgba(11,12,16,0.05)]">
            <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">TENGGAT WAKTU SELANJUTNYA</div>
            <div className="text-2xl font-bold text-eclipse-900 mb-1">12 Okt 2026</div>
            <div className="text-xs text-eclipse-700">Revisi draf final</div>
         </div>
         <div className="p-6 rounded-2xl bg-white border border-eclipse-900/5 shadow-[0_10px_30px_-15px_rgba(11,12,16,0.05)]">
            <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">SISA TAGIHAN</div>
            <div className="text-2xl font-bold text-eclipse-900 mb-1">Rp 1.500.000</div>
            <div className="text-xs text-eclipse-700">Jatuh tempo saat peluncuran</div>
         </div>
      </div>

      <div className="bg-eclipse-900/5 rounded-3xl p-8 md:p-12 border border-eclipse-900/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-nebula-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         
         <div className="relative z-10">
            <div className="text-[10px] font-bold tracking-widest uppercase text-nebula-500 mb-4 bg-white/50 backdrop-blur px-3 py-1 rounded-full inline-block">
               PEMBARUAN TERBARU
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-eclipse-900 mb-4">
               Eksplorasi Desain V1 telah siap.
            </h2>
            <p className="text-sm text-eclipse-700 leading-relaxed max-w-lg mb-8">
               Saya berfokus pada ruang kosong (whitespace) yang luas dan tipografi minimal untuk menonjolkan esensi merek Anda. Silakan tinjau dan berikan catatan Anda sebelum hari Jumat.
            </p>
            <button className="px-6 py-3 bg-eclipse-900 text-white text-sm font-medium rounded-xl hover:bg-eclipse-800 transition-all shadow-[0_10px_20px_-10px_rgba(11,12,16,0.3)]">
               Tinjau Desain V1
            </button>
         </div>
      </div>
    </div>
  );
}
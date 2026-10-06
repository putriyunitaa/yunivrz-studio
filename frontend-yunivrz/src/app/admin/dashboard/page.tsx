"use client";

import { motion } from "framer-motion";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-3 tracking-tight">
          Pusat Komando Studio.
        </h1>
        <p className="text-eclipse-700 text-sm leading-relaxed max-w-2xl">
          Sebagai kreator tunggal, ini adalah kendali penuh Anda. Pantau tagihan yang belum lunas, revisi yang tertunda, dan kesehatan proyek klien di seluruh layanan.
        </p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
         {[
           { label: "PROYEK AKTIF", value: "9", desc: "Tersebar di 3 tahap" },
           { label: "MENUNGGU PERSETUJUAN", value: "2", desc: "Tindakan klien diperlukan" },
           { label: "ESTIMASI PENDAPATAN", value: "Rp 12.5M", desc: "Belum ditagih bulan ini" },
           { label: "KLIEN BARU (Bulan Ini)", value: "3", desc: "+1 dari bulan lalu" }
         ].map((stat, i) => (
           <div key={i} className="p-6 rounded-2xl bg-white border border-eclipse-900/5 shadow-[0_10px_30px_-15px_rgba(11,12,16,0.03)] relative overflow-hidden">
             <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">{stat.label}</div>
             <div className="text-3xl font-bold text-eclipse-900 mb-1 tracking-tight">{stat.value}</div>
             <div className="text-xs text-eclipse-700">{stat.desc}</div>
             {i === 0 && <div className="absolute top-0 right-0 w-32 h-32 bg-nebula-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />}
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-eclipse-900/10 shadow-sm p-8">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-lg font-bold text-eclipse-900">Aktivitas Terakhir Klien</h2>
             <button className="text-xs font-bold tracking-widest uppercase text-nebula-500 hover:text-eclipse-900 transition-colors">Lihat Semua</button>
           </div>
           
           <div className="space-y-6">
             {[
               { client: "Anindya Putri", action: "meninggalkan komentar pada", target: "Draf Desain V1", time: "2 jam yang lalu" },
               { client: "Bagas & Dewi", action: "mengunggah file ke", target: "Aset & Foto", time: "5 jam yang lalu" },
               { client: "Ruang Collective", action: "membayar tagihan untuk", target: "INV-0260 (Uang Muka)", time: "Kemarin" },
               { client: "Nusa Storefront", action: "menyelesaikan pengisian", target: "Kuesioner Proyek", time: "Kemarin" }
             ].map((log, i) => (
               <div key={i} className="flex items-start gap-4">
                 <div className="w-8 h-8 rounded-full bg-eclipse-900/5 flex items-center justify-center shrink-0 mt-0.5">
                   <div className="w-2 h-2 rounded-full bg-eclipse-900/40" />
                 </div>
                 <div>
                   <p className="text-sm text-eclipse-900 leading-relaxed">
                     <span className="font-bold">{log.client}</span> {log.action} <span className="font-bold text-eclipse-700">{log.target}</span>
                   </p>
                   <p className="text-xs text-eclipse-700/60 mt-1">{log.time}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-eclipse-900 rounded-3xl p-8 text-space-50 relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 w-64 h-64 bg-nebula-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
           
           <h2 className="text-lg font-bold text-white mb-6 relative z-10">Jalan Pintas Kreator</h2>
           
           <div className="space-y-3 relative z-10 flex-1">
             <button className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 transition-all flex items-center justify-between">
               <span className="text-sm font-medium">Buat Proyek Klien Baru</span>
               <span className="text-nebula-300">&rarr;</span>
             </button>
             <button className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 transition-all flex items-center justify-between">
               <span className="text-sm font-medium">Buat & Kirim Tagihan</span>
               <span className="text-nebula-300">&rarr;</span>
             </button>
             <button className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 transition-all flex items-center justify-between">
               <span className="text-sm font-medium">Perbarui Item Katalog</span>
               <span className="text-nebula-300">&rarr;</span>
             </button>
           </div>
           
           <div className="mt-8 relative z-10 bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-md">
             <div className="text-[10px] font-bold tracking-widest uppercase text-nebula-300 mb-1">TIP STUDIO</div>
             <p className="text-xs text-white/80 leading-relaxed">
               Anda punya 2 pesan yang belum dibalas dari calon klien di WhatsApp. Jangan lupa untuk menindaklanjutinya!
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
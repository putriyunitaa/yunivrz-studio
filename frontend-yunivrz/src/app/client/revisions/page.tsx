"use client";

import { motion } from "framer-motion";

export default function ClientRevisions() {
  return (
    <div className="max-w-4xl h-[calc(100vh-160px)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-3 tracking-tight">
          Utas Revisi & Kolaborasi
        </h1>
        <p className="text-eclipse-700 text-sm leading-relaxed max-w-2xl">
          Tinggalkan komentar, unggah referensi tambahan, dan diskusikan draf terbaru secara langsung dengan kreator.
        </p>
      </motion.div>

      {/* Chat Interface */}
      <div className="flex-1 bg-white rounded-3xl border border-eclipse-900/10 shadow-sm flex flex-col overflow-hidden relative">
         
         {/* Background Subtle Glow */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-nebula-500/5 rounded-full blur-[80px] pointer-events-none" />

         {/* Chat History */}
         <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 relative z-10">
            
            {/* System Message */}
            <div className="text-center">
               <span className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700/40 bg-space-50 px-3 py-1 rounded-full">Hari ini, 09:41 AM</span>
            </div>

            {/* Creator Message */}
            <div className="flex gap-4 max-w-[80%]">
               <div className="w-10 h-10 rounded-full bg-nebula-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                  Y
               </div>
               <div>
                  <div className="bg-space-50 border border-eclipse-900/5 rounded-2xl rounded-tl-sm p-4 text-sm text-eclipse-900 leading-relaxed shadow-sm">
                     Halo Anindya! Draf eksplorasi visual pertama (Tahap 1) untuk Sagara Living sudah saya unggah. Saya sangat menekankan penggunaan *whitespace* untuk memberi kesan premium seperti yang kita diskusikan. Silakan dilihat dan beri masukan ya.
                  </div>
                  <div className="mt-2 flex gap-2">
                     <div className="w-32 h-24 bg-[#EBE7DF] rounded-lg border border-eclipse-900/10 flex items-center justify-center cursor-pointer hover:border-nebula-500/50 transition-colors">
                        <span className="text-[8px] font-bold uppercase text-eclipse-900/30">Draf_V1_A.pdf</span>
                     </div>
                     <div className="w-32 h-24 bg-[#F5F2EE] rounded-lg border border-eclipse-900/10 flex items-center justify-center cursor-pointer hover:border-nebula-500/50 transition-colors">
                        <span className="text-[8px] font-bold uppercase text-eclipse-900/30">Draf_V1_B.pdf</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Client Message (User) */}
            <div className="flex gap-4 max-w-[80%] self-end flex-row-reverse">
               <div className="w-10 h-10 rounded-full bg-eclipse-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                  AP
               </div>
               <div>
                  <div className="bg-nebula-500 text-white rounded-2xl rounded-tr-sm p-4 text-sm leading-relaxed shadow-md shadow-nebula-500/20">
                     Wah, luar biasa! Saya sangat suka arah desain opsi A. Terasa sangat bersih dan mencerminkan esensi Sagara.
                     <br/><br/>
                     Satu revisi kecil: apakah kita bisa mencoba mengganti warna *button* utama menjadi warna hijau zaitun (*olive*) gelap dari pedoman merek kita?
                  </div>
               </div>
            </div>

            {/* Creator Message */}
            <div className="flex gap-4 max-w-[80%]">
               <div className="w-10 h-10 rounded-full bg-nebula-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                  Y
               </div>
               <div>
                  <div className="bg-space-50 border border-eclipse-900/5 rounded-2xl rounded-tl-sm p-4 text-sm text-eclipse-900 leading-relaxed shadow-sm">
                     Tentu saja! Saya akan sesuaikan warna tombolnya dan memperbarui pratinjaunya besok pagi. Terima kasih atas umpan baliknya yang cepat!
                  </div>
               </div>
            </div>

         </div>

         {/* Input Area */}
         <div className="p-4 border-t border-eclipse-900/10 bg-white/80 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3 bg-space-50 p-2 rounded-2xl border border-eclipse-900/5 focus-within:border-nebula-500/30 focus-within:ring-4 focus-within:ring-nebula-500/10 transition-all">
               <button className="w-10 h-10 flex items-center justify-center rounded-xl text-eclipse-700 hover:bg-eclipse-900/5 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
               </button>
               <input 
                  type="text" 
                  placeholder="Ketik balasan Anda di sini..." 
                  className="flex-1 bg-transparent text-sm focus:outline-none"
               />
               <button className="px-6 py-2.5 bg-eclipse-900 text-white text-sm font-bold rounded-xl hover:bg-eclipse-800 transition-colors shadow-sm">
                  Kirim
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

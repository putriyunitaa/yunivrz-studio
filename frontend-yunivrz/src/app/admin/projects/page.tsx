"use client";

import { motion } from "framer-motion";

// Fake data for Kanban layout
const kanbanColumns = [
  {
    title: "Menunggu",
    count: 3,
    cards: [
      { id: 1, title: "Ruang Collective", category: "Milestones", progress: 0, date: "20 Okt", clientInitials: "BS", designerInitials: "YS", completed: false },
      { id: 2, title: "Aulia & Farhan", category: "Micro-Moments", progress: 0, date: "28 Okt", clientInitials: "AR", designerInitials: "YS", completed: false },
      { id: 3, title: "Nusa portal member", category: "Custom Solutions", progress: 0, date: "18 Nov", clientInitials: "NC", designerInitials: "YS", completed: false },
    ]
  },
  {
    title: "Dalam Proses",
    count: 6,
    cards: [
      { id: 4, title: "Sagara Living", category: "Milestones", progress: 48, date: "24 Okt", clientInitials: "DW", designerInitials: "YS", completed: false },
      { id: 5, title: "Kopi Kala", category: "Milestones", progress: 72, date: "18 Okt", clientInitials: "IP", designerInitials: "YS", completed: false },
      { id: 6, title: "Aksara Studio", category: "Milestones", progress: 35, date: "30 Okt", clientInitials: "BS", designerInitials: "YS", completed: false },
    ]
  },
  {
    title: "Revisi",
    count: 3,
    cards: [
      { id: 7, title: "Anindya & Rizky", category: "Micro-Moments", progress: 65, date: "12 Okt", clientInitials: "AP", designerInitials: "YS", completed: false },
      { id: 8, title: "Nusa storefront", category: "Custom Solutions", progress: 84, date: "16 Okt", clientInitials: "NC", designerInitials: "YS", completed: false },
      { id: 9, title: "Dewi & Bagas", category: "Micro-Moments", progress: 80, date: "14 Okt", clientInitials: "DL", designerInitials: "YS", completed: false },
    ]
  },
  {
    title: "Selesai",
    count: 3,
    cards: [
      { id: 10, title: "Slow Sunday", category: "Micro-Moments", progress: 100, date: "03 Okt", clientInitials: "IP", designerInitials: "YS", completed: true },
      { id: 11, title: "Jurnal Kala", category: "Milestones", progress: 100, date: "01 Okt", clientInitials: "IP", designerInitials: "YS", completed: true },
      { id: 12, title: "Laras & Aditya", category: "Micro-Moments", progress: 100, date: "29 Sep", clientInitials: "LA", designerInitials: "YS", completed: true },
    ]
  },
];

export default function AdminProjects() {
  return (
    <div className="h-full flex flex-col max-w-[1400px]">
      
      {/* Header Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-2 tracking-tight">
            Papan Proyek (Kanban)
          </h1>
          <p className="text-eclipse-700 text-sm leading-relaxed max-w-xl">
            Seret dan letakkan (drag & drop) proyek melintasi berbagai tahap. Anda adalah satu-satunya desainer di setiap kartu. Ini adalah gambaran besar ruang lingkup kerja Anda.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white border border-eclipse-900/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
             <svg className="w-4 h-4 text-eclipse-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             <input type="text" placeholder="Cari klien..." className="text-sm bg-transparent border-none focus:outline-none w-32" />
          </div>
          <button className="bg-eclipse-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-eclipse-800 transition-colors shadow-sm">
            + Proyek
          </button>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full items-start">
          
          {kanbanColumns.map((col, idx) => (
            <div key={idx} className="w-[320px] flex flex-col max-h-full">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-bold text-eclipse-900">{col.title}</h3>
                <span className="text-xs font-bold text-eclipse-700 bg-eclipse-900/5 px-2 py-0.5 rounded-full">
                  {col.count}
                </span>
              </div>
              
              {/* Column Content */}
              <div className="flex-1 bg-eclipse-900/5 rounded-3xl p-3 flex flex-col gap-3 min-h-[150px] border border-eclipse-900/5">
                {col.cards.map((card, cIdx) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: cIdx * 0.05 }}
                    key={card.id} 
                    className="bg-white rounded-2xl p-5 border border-eclipse-900/5 shadow-[0_4px_15px_-10px_rgba(11,12,16,0.1)] cursor-grab active:cursor-grabbing hover:border-nebula-500/30 transition-colors group"
                  >
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-md ${
                        card.category === 'Milestones' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                        card.category === 'Micro-Moments' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' :
                        'bg-[#8B5CF6]/10 text-[#8B5CF6]'
                      }`}>
                        {card.category}
                      </span>
                      <button className="text-eclipse-700/40 hover:text-eclipse-900 opacity-0 group-hover:opacity-100 transition-opacity">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                      </button>
                    </div>
                    
                    <h4 className="text-base font-bold text-eclipse-900 mb-4 leading-tight">{card.title}</h4>
                    
                    {!("completed" in card) || !card.completed ? (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-eclipse-700 mb-1.5">
                          <span>Progress</span>
                          <span className="font-medium">{card.progress}%</span>
                        </div>
                        <div className="w-full bg-space-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-nebula-500 h-1.5 rounded-full" 
                            style={{ width: `${card.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 text-xs font-medium text-[#10B981] flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        Terkirim ke Klien
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-3 border-t border-eclipse-900/5">
                      <div className="text-xs font-medium text-eclipse-700 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {card.date}
                      </div>
                      
                      <div className="flex items-center -space-x-2">
                        {/* Client Avatar */}
                        <div className="w-6 h-6 rounded-full bg-space-100 border-2 border-white text-[9px] font-bold text-eclipse-900 flex items-center justify-center" title="Client">
                          {card.clientInitials}
                        </div>
                        {/* Designer Avatar (Always Studio Owner) */}
                        <div className="w-6 h-6 rounded-full bg-nebula-500 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center" title="Designer">
                          {card.designerInitials}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}
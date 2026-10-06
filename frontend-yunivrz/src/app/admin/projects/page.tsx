"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const kanbanColumns = [
  {
    title: "Pending",
    count: 3,
    cards: [
      { id: 1, title: "Ruang Collective", category: "Milestones", progress: 0, date: "20 Oct", clientInitials: "BS", designerInitials: "YS" },
      { id: 2, title: "Aulia & Farhan", category: "Micro-Moments", progress: 0, date: "28 Oct", clientInitials: "AR", designerInitials: "YS" },
      { id: 3, title: "Nusa member portal", category: "Custom Solutions", progress: 0, date: "18 Nov", clientInitials: "NC", designerInitials: "YS" },
    ]
  },
  {
    title: "In Progress",
    count: 6,
    cards: [
      { id: 4, title: "Sagara Living", category: "Milestones", progress: 48, date: "24 Oct", clientInitials: "DW", designerInitials: "YS" },
      { id: 5, title: "Kopi Kala", category: "Milestones", progress: 72, date: "18 Oct", clientInitials: "IP", designerInitials: "YS" },
      { id: 6, title: "Aksara Studio", category: "Milestones", progress: 35, date: "30 Oct", clientInitials: "BS", designerInitials: "YS" },
    ]
  },
  {
    title: "Revision",
    count: 3,
    cards: [
      { id: 7, title: "Anindya & Rizky", category: "Micro-Moments", progress: 65, date: "12 Oct", clientInitials: "AP", designerInitials: "YS" },
      { id: 8, title: "Nusa storefront", category: "Custom Solutions", progress: 84, date: "16 Oct", clientInitials: "NC", designerInitials: "YS" },
      { id: 9, title: "Dewi & Bagas", category: "Micro-Moments", progress: 80, date: "14 Oct", clientInitials: "DL", designerInitials: "YS" },
    ]
  },
  {
    title: "Completed",
    count: 3,
    cards: [
      { id: 10, title: "Slow Sunday", category: "Micro-Moments", progress: 100, date: "03 Oct", clientInitials: "IP", designerInitials: "YS", completed: true },
      { id: 11, title: "Kala journal", category: "Milestones", progress: 100, date: "01 Oct", clientInitials: "IP", designerInitials: "YS", completed: true },
      { id: 12, title: "Laras & Aditya", category: "Micro-Moments", progress: 100, date: "29 Sep", clientInitials: "LA", designerInitials: "YS", completed: true },
    ]
  },
];

export default function AdminProjectsPage() {
  return (
    <div className="max-w-[1400px]">
      <div className="flex justify-between items-end mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-heading font-bold text-eclipse-900 mb-2 tracking-tight"
          >
            Ideas, moving forward.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-eclipse-700"
          >
            12 active projects. A clear view of what's next.
          </motion.p>
        </div>
        <button className="px-6 py-3 bg-eclipse-900 text-white text-sm font-medium rounded-xl hover:bg-eclipse-800 transition-colors shadow-sm hidden sm:inline-flex items-center gap-2">
          New project
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
         <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
               <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-eclipse-700/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               <input type="text" placeholder="Search projects or clients..." className="w-full pl-9 pr-4 py-2 bg-white border border-eclipse-900/10 rounded-lg text-sm focus:outline-none focus:border-nebula-500 focus:ring-1 focus:ring-nebula-500" />
            </div>
            <select className="bg-white border border-eclipse-900/10 rounded-lg text-sm px-4 py-2 focus:outline-none hidden sm:block">
               <option>All services</option>
            </select>
            <select className="bg-white border border-eclipse-900/10 rounded-lg text-sm px-4 py-2 focus:outline-none hidden sm:block">
               <option>Date added</option>
            </select>
         </div>
         <div className="flex bg-eclipse-900/5 p-1 rounded-lg self-end md:self-auto">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-bold text-nebula-500">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
               Kanban
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium text-eclipse-700 hover:text-eclipse-900">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
               List
            </button>
         </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
         {kanbanColumns.map((col, idx) => (
            <motion.div 
               key={col.title}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 * idx }}
               className="min-w-[320px] max-w-[320px] flex-shrink-0 snap-start bg-space-50/50 rounded-3xl p-4 flex flex-col"
            >
               <div className="flex justify-between items-center mb-4 px-2">
                  <div className="flex items-center gap-2">
                     <h3 className="font-bold text-eclipse-900">{col.title}</h3>
                     <span className="w-5 h-5 rounded-full bg-eclipse-900/10 text-[10px] font-bold text-eclipse-900 flex items-center justify-center">{col.count}</span>
                  </div>
                  <button className="text-eclipse-700 hover:text-eclipse-900">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
               </div>

               <div className="flex flex-col gap-4 flex-1">
                  {col.cards.map(card => (
                     <div key={card.id} className="bg-white rounded-2xl p-5 border border-eclipse-900/10 shadow-sm cursor-grab active:cursor-grabbing hover:border-nebula-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-bold tracking-widest uppercase text-nebula-500">{card.category}</span>
                           <button className="text-eclipse-700/50 hover:text-eclipse-900">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                           </button>
                        </div>
                        <h4 className="text-lg font-bold text-eclipse-900 mb-4">{card.title}</h4>
                        
                        <div className="flex items-center gap-2 mb-6">
                           <div className="w-6 h-6 rounded-full bg-eclipse-900/10 flex items-center justify-center text-[8px] font-bold text-eclipse-900">{card.clientInitials}</div>
                           <span className="text-xs text-eclipse-700">Client Name</span>
                        </div>

                        {!card.completed ? (
                           <div className="mb-6">
                              <div className="flex justify-between text-[10px] font-bold text-eclipse-900 mb-2">
                                 <span className="text-eclipse-700/60 font-normal">Project progress</span>
                                 <span className="text-nebula-500">{card.progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-space-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-nebula-500 rounded-full" style={{ width: `${card.progress}%` }} />
                              </div>
                           </div>
                        ) : (
                           <div className="mb-6">
                              <div className="flex justify-between text-[10px] font-bold text-eclipse-900 mb-2">
                                 <span className="text-eclipse-700/60 font-normal">Ready & live</span>
                                 <span className="text-green-600">100%</span>
                              </div>
                              <div className="h-1.5 w-full bg-space-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-green-500 rounded-full w-full" />
                              </div>
                           </div>
                        )}

                        <div className="flex justify-between items-center pt-4 border-t border-eclipse-900/5">
                           <div className={`text-xs font-medium flex items-center gap-1 ${card.completed ? 'text-green-600' : 'text-eclipse-700/60'}`}>
                              {card.completed ? (
                                 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              ) : (
                                 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              )}
                              {card.date}
                           </div>
                           <div className="w-6 h-6 rounded-full bg-nebula-500 text-white flex items-center justify-center text-[8px] font-bold shadow-sm">{card.designerInitials}</div>
                        </div>
                     </div>
                  ))}
               </div>

               <button className="mt-4 w-full py-3 border border-eclipse-900/10 border-dashed rounded-xl text-xs font-medium text-eclipse-700 hover:bg-white hover:border-eclipse-900/20 transition-all">
                  + Add a project
               </button>
            </motion.div>
         ))}
      </div>
      
      <div className="flex justify-between items-center pt-6 border-t border-eclipse-900/5 text-[10px] text-eclipse-700/60 pb-12">
         <p>Showing 12 of 15 projects · Completed projects are archived after 30 days</p>
         <Link href="#" className="text-nebula-500 hover:text-eclipse-900 font-medium">View archived projects &rarr;</Link>
      </div>

    </div>
  );
}
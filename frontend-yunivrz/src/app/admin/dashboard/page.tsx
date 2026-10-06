"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const recentInvoices = [
  { id: "INV-0261", client: "Anindya & Rizky", project: "Lumière invitation • DP", amount: "Rp 2,000,000", date: "28 Sep 2026", status: "Paid" },
  { id: "INV-0262", client: "Anindya & Rizky", project: "Lumière invitation • Installment", amount: "Rp 2,000,000", date: "12 Oct 2026", status: "Awaiting payment" },
  { id: "INV-0263", client: "Anindya & Rizky", project: "Lumière invitation • Full Payment", amount: "Rp 1,000,000", date: "09 Nov 2026", status: "Scheduled" },
];

export default function AdminDashboardOverview() {
  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-heading font-bold text-eclipse-900 mb-2 tracking-tight"
          >
            Studio at a glance.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-eclipse-700"
          >
            A clear view of your business, and a little room to think ahead.
          </motion.p>
        </div>
        <button className="px-6 py-3 bg-eclipse-900 text-white text-sm font-medium rounded-xl hover:bg-eclipse-800 transition-colors shadow-sm hidden sm:inline-flex items-center gap-2">
          Export report
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
         <div className="text-xs font-bold uppercase tracking-widest text-eclipse-700/50 bg-space-50 px-3 py-1.5 rounded-full">
            October 2026 • Month to date
         </div>
         <div className="flex gap-4">
            <button className="text-sm font-medium text-eclipse-900 border border-eclipse-900/10 bg-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-space-50">
               01–06 Oct 2026
               <svg className="w-4 h-4 text-eclipse-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
            <button className="text-sm font-medium text-eclipse-900 border border-eclipse-900/10 bg-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-space-50">
               Compare periods
               <svg className="w-4 h-4 text-eclipse-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
         </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 border border-eclipse-900/10 shadow-sm flex flex-col justify-between">
           <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-4">Revenue collected</div>
           <h3 className="text-3xl font-heading font-bold text-eclipse-900 mb-4">Rp 48.5m</h3>
           <div className="text-xs font-medium text-nebula-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>
              18.6% vs previous period
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-8 border border-eclipse-900/10 shadow-sm flex flex-col justify-between">
           <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-4">Active projects</div>
           <h3 className="text-3xl font-heading font-bold text-eclipse-900 mb-4">12</h3>
           <p className="text-xs text-nebula-500/80">3 pending · 6 in production · 3 revision</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-8 border border-eclipse-900/10 shadow-sm flex flex-col justify-between">
           <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-4">Completed tasks</div>
           <h3 className="text-3xl font-heading font-bold text-eclipse-900 mb-4">86</h3>
           <div className="text-xs font-medium text-nebula-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>
              12 tasks this week
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl p-8 border border-eclipse-900/10 shadow-sm flex flex-col justify-between">
           <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-4">Outstanding invoices</div>
           <h3 className="text-3xl font-heading font-bold text-eclipse-900 mb-4">Rp 17.0m</h3>
           <p className="text-xs text-nebula-500/80">8 invoices · none overdue</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
         {/* Chart Area */}
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2 bg-white rounded-3xl border border-eclipse-900/10 p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
               <div>
                  <h3 className="text-xl font-bold text-eclipse-900 mb-1">Revenue, in perspective.</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-eclipse-700/50">Collected revenue · last 6 months · IDR</p>
               </div>
               <span className="px-3 py-1 bg-green-500/10 text-green-700 text-[10px] font-bold rounded-full">+18.6%</span>
            </div>
            {/* Fake Chart Graphic */}
            <div className="h-64 relative border-l border-b border-eclipse-900/5">
               {/* Y Axis labels */}
               <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-[10px] text-eclipse-700/40">
                  <span>60m</span><span>45m</span><span>30m</span><span>15m</span><span>0</span>
               </div>
               {/* Grid lines */}
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="w-full border-t border-eclipse-900/5 h-0" />
                  <div className="w-full border-t border-eclipse-900/5 h-0" />
                  <div className="w-full border-t border-eclipse-900/5 h-0" />
                  <div className="w-full border-t border-eclipse-900/5 h-0" />
                  <div className="w-full border-t border-transparent h-0" />
               </div>
               {/* Chart Curve */}
               <svg className="absolute inset-0 w-full h-full preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0 90 C 20 80, 30 40, 50 60 C 70 80, 80 20, 100 30" fill="none" stroke="currentColor" className="text-nebula-500" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 0 100 L 0 90 C 20 80, 30 40, 50 60 C 70 80, 80 20, 100 30 L 100 100 Z" fill="currentColor" className="text-nebula-500/10" />
               </svg>
               {/* Tooltip Fake */}
               <div className="absolute right-[10%] top-[20%] bg-eclipse-900 text-white p-3 rounded-xl text-xs font-medium shadow-lg transform -translate-x-1/2 -translate-y-full">
                  <div className="text-[9px] uppercase tracking-wider text-white/60 mb-1">October</div>
                  Rp 48,500,000
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 bg-eclipse-900 rotate-45" />
               </div>
               {/* X Axis labels */}
               <div className="absolute -bottom-8 left-0 w-full flex justify-between text-[10px] text-eclipse-700/40 px-4">
                  <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
               </div>
            </div>
         </motion.div>

         {/* Distribution / Where we're creating */}
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl border border-eclipse-900/10 p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-eclipse-900 mb-1">Where we're creating</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-eclipse-700/50 mb-10">12 active projects by service</p>
            
            <div className="space-y-8 flex-1">
               <div>
                  <div className="flex justify-between text-sm font-bold text-eclipse-900 mb-2">
                     <span>Micro-Moments</span>
                     <span className="text-eclipse-700/50 font-normal text-xs">6 projects</span>
                  </div>
                  <div className="h-2 w-full bg-space-100 rounded-full overflow-hidden">
                     <div className="h-full bg-nebula-500 rounded-full w-[50%]" />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-sm font-bold text-eclipse-900 mb-2">
                     <span>Milestones</span>
                     <span className="text-eclipse-700/50 font-normal text-xs">4 projects</span>
                  </div>
                  <div className="h-2 w-full bg-space-100 rounded-full overflow-hidden">
                     <div className="h-full bg-nebula-500 rounded-full w-[33%]" />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-sm font-bold text-eclipse-900 mb-2">
                     <span>Custom Solutions</span>
                     <span className="text-eclipse-700/50 font-normal text-xs">2 projects</span>
                  </div>
                  <div className="h-2 w-full bg-space-100 rounded-full overflow-hidden">
                     <div className="h-full bg-nebula-500 rounded-full w-[17%]" />
                  </div>
               </div>
            </div>

            <div className="mt-10 pt-6 border-t border-eclipse-900/5 text-xs font-medium text-green-700 flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               All projects on track this week
            </div>
         </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-3xl border border-eclipse-900/10 shadow-sm overflow-hidden mb-8">
         <div className="p-8 border-b border-eclipse-900/5 flex justify-between items-center">
            <h3 className="text-xl font-bold text-eclipse-900">Recent client invoices</h3>
            <Link href="/admin/invoices" className="text-xs font-medium text-nebula-500 hover:text-eclipse-900">View all invoices &rarr;</Link>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-eclipse-700">
               <thead className="bg-space-50 text-[10px] uppercase tracking-widest font-bold text-eclipse-700/50">
                  <tr>
                     <th className="px-8 py-4">Invoice</th>
                     <th className="px-8 py-4">Client / Project</th>
                     <th className="px-8 py-4">Amount</th>
                     <th className="px-8 py-4">Due Date</th>
                     <th className="px-8 py-4">Status</th>
                     <th className="px-8 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-eclipse-900/5">
                  {recentInvoices.map((inv) => (
                     <tr key={inv.id} className="hover:bg-space-50/50 transition-colors">
                        <td className="px-8 py-5 font-bold text-eclipse-900">{inv.id}</td>
                        <td className="px-8 py-5">
                           <div className="font-bold text-eclipse-900">{inv.client}</div>
                           <div className="text-[10px] text-eclipse-700">{inv.project}</div>
                        </td>
                        <td className="px-8 py-5 font-medium">{inv.amount}</td>
                        <td className="px-8 py-5">{inv.date}</td>
                        <td className="px-8 py-5">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inv.status === 'Paid' ? 'bg-green-500/10 text-green-700' : 
                              inv.status === 'Scheduled' ? 'bg-eclipse-900/5 text-eclipse-700' : 
                              'bg-orange-500/10 text-orange-700'
                           }`}>
                              {inv.status}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <button className="text-eclipse-700 hover:text-eclipse-900">
                              <svg className="w-5 h-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </motion.div>
    </div>
  );
}
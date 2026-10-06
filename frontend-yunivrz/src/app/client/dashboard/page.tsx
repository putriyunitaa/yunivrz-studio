"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ClientDashboardOverview() {
  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-heading font-bold text-eclipse-900 mb-2 tracking-tight"
          >
            Hello, Anindya. ✨
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-eclipse-700"
          >
            A little closer to your big day. Here's how your project is coming along.
          </motion.p>
        </div>
        <Link 
          href="#" 
          className="px-6 py-3 bg-eclipse-900 text-white text-sm font-medium rounded-xl hover:bg-eclipse-800 transition-colors shadow-sm hidden sm:inline-flex"
        >
          View invitation &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Active Project Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-3xl border border-eclipse-900/10 p-8 shadow-sm flex flex-col"
        >
           <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700">Your Active Project • YS-024</span>
              <span className="px-3 py-1 bg-nebula-500/10 text-nebula-500 text-xs font-bold rounded-full">In Revision</span>
           </div>

           <div className="flex gap-8 mb-10">
              <div className="w-32 h-48 bg-space-50 rounded-xl border border-eclipse-900/5 shadow-inner flex items-center justify-center p-2">
                 {/* Fake mobile preview */}
                 <div className="w-full h-full rounded-lg border border-eclipse-900/10 bg-white relative overflow-hidden flex flex-col items-center pt-6">
                    <p className="text-[8px] font-heading font-bold text-eclipse-900 mb-2">Anindya & Rizky</p>
                    <div className="w-20 h-20 bg-eclipse-900/5 rounded-t-full mt-auto" />
                 </div>
              </div>
              <div className="flex-1">
                 <h2 className="text-2xl font-bold text-eclipse-900 mb-2">Anindya & Rizky</h2>
                 <p className="text-sm text-eclipse-700 mb-6">Lumière • Professional package</p>
                 <div className="text-sm text-eclipse-700 mb-6 leading-relaxed">
                    Wedding invitation • 22 November 2026<br/>
                    The Dharmawangsa, Jakarta
                 </div>
                 <div className="flex gap-8">
                    <div>
                       <p className="text-[10px] font-bold text-eclipse-700/50 uppercase tracking-widest mb-1">Kickoff</p>
                       <p className="text-sm font-medium text-eclipse-900">28 Sep 2026</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-eclipse-700/50 uppercase tracking-widest mb-1">Target Live</p>
                       <p className="text-sm font-medium text-eclipse-900">09 Nov 2026</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="mt-auto">
              <div className="flex justify-between text-xs font-bold text-eclipse-900 mb-2">
                 <span>Design is ready for your feedback</span>
                 <span className="text-nebula-500">65% complete</span>
              </div>
              <div className="h-2 w-full bg-space-100 rounded-full overflow-hidden">
                 <div className="h-full bg-nebula-500 rounded-full w-[65%]" />
              </div>
           </div>
        </motion.div>

        {/* Action Required Card (Adapted to solo creator - removed "Maya Santoso") */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-space-50 rounded-3xl border border-eclipse-900/5 p-8 flex flex-col"
        >
           <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-nebula-500 mb-6">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
           </div>
           <h3 className="text-2xl font-heading font-bold text-eclipse-900 mb-4 tracking-tight">Your thoughts, our next move.</h3>
           <p className="text-sm text-eclipse-700 leading-relaxed mb-6">
              The first design is ready. Share your feedback so I can make it feel just right.
           </p>
           <p className="text-xs font-medium text-nebula-500 mb-4">Feedback requested by 12 Oct 2026</p>
           <Link href="/client/revisions" className="w-full py-3.5 bg-eclipse-900 text-white text-sm font-medium rounded-xl text-center hover:bg-eclipse-800 transition-colors shadow-sm mb-6 mt-auto">
              Review & give feedback &rarr;
           </Link>

           <div className="pt-6 border-t border-eclipse-900/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-eclipse-900 text-white flex items-center justify-center font-bold text-[10px]">
                 YS
              </div>
              <div>
                 <p className="text-xs font-bold text-eclipse-900">Yunivrz Studio</p>
                 <p className="text-[10px] text-eclipse-700 uppercase tracking-widest">Independent Creator</p>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl border border-eclipse-900/10 p-8 shadow-sm mb-6"
      >
         <div className="flex justify-between items-end mb-12">
            <h3 className="text-xl font-bold text-eclipse-900">Your project, in motion.</h3>
            <span className="text-xs text-eclipse-700">Estimated launch • 09 Nov 2026</span>
         </div>

         {/* Visual Timeline (Simplified for code) */}
         <div className="relative flex justify-between items-start pt-2">
            <div className="absolute top-4 left-4 right-4 h-[2px] bg-space-100 -z-10" />
            <div className="absolute top-4 left-4 right-1/2 h-[2px] bg-nebula-500 -z-10" />

            <div className="flex flex-col gap-3 z-10 w-32">
               <div className="w-8 h-8 rounded-full bg-nebula-500 text-white flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
               <div>
                  <p className="text-sm font-bold text-eclipse-900">Brief</p>
                  <p className="text-[10px] text-eclipse-700">28 Sep • Complete</p>
               </div>
            </div>

            <div className="flex flex-col gap-3 z-10 w-32">
               <div className="w-8 h-8 rounded-full bg-nebula-500 text-white flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
               <div>
                  <p className="text-sm font-bold text-eclipse-900">Design</p>
                  <p className="text-[10px] text-eclipse-700">06 Oct • Complete</p>
               </div>
            </div>

            <div className="flex flex-col gap-3 z-10 w-32">
               <div className="w-8 h-8 rounded-full bg-white border-2 border-nebula-500 flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-nebula-500" />
               </div>
               <div>
                  <p className="text-sm font-bold text-eclipse-900">Revision</p>
                  <p className="text-[10px] text-nebula-500 font-medium">12 Oct • In progress</p>
               </div>
            </div>

            <div className="flex flex-col gap-3 z-10 w-32">
               <div className="w-8 h-8 rounded-full bg-white border-2 border-eclipse-900/10 flex items-center justify-center shadow-sm" />
               <div>
                  <p className="text-sm font-bold text-eclipse-700/50">Live</p>
                  <p className="text-[10px] text-eclipse-700/50">09 Nov • Upcoming</p>
               </div>
            </div>
         </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl border border-eclipse-900/10 p-8 shadow-sm flex flex-col"
         >
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-eclipse-900">Latest from the studio</h3>
               <Link href="/client/revisions" className="text-xs font-medium text-nebula-500 hover:text-eclipse-900">View thread &rarr;</Link>
            </div>
            
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-eclipse-900/10 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-eclipse-900">AP</div>
                  <div>
                     <p className="text-sm text-eclipse-900 font-medium">You shared 12 wedding photos</p>
                     <p className="text-[10px] text-eclipse-700 mt-1">Today, 09:14</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-nebula-500 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">YS</div>
                  <div>
                     <p className="text-sm text-eclipse-900 font-medium">Studio uploaded Design v1 for review</p>
                     <p className="text-[10px] text-eclipse-700 mt-1">Yesterday, 16:30</p>
                  </div>
               </div>
            </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl border border-eclipse-900/10 p-8 shadow-sm flex flex-col"
         >
            <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-4">Outstanding Balance</div>
            <h3 className="text-4xl font-heading font-bold text-eclipse-900 mb-4">Rp 3,000,000</h3>
            <p className="text-xs text-eclipse-700 leading-relaxed mb-6">
               Rp 2,000,000 paid of Rp 5,000,000<br/>
               Next installment: Rp 2,000,000 · 12 Oct
            </p>
            <div className="inline-flex px-3 py-1 bg-green-500/10 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider mb-8 self-start">
               DP Paid - 28 Sep 2026
            </div>
            <Link href="/client/invoices" className="text-xs font-medium text-nebula-500 hover:text-eclipse-900 mt-auto">
               View invoices & payments &rarr;
            </Link>
         </motion.div>
      </div>
    </div>
  );
}
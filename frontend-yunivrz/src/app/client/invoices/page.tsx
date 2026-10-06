"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const invoices = [
  { id: "INV-0261", type: "DP", amount: "Rp 2,000,000", date: "28 Sep 2026", status: "Paid" },
  { id: "INV-0262", type: "Installment", amount: "Rp 2,000,000", date: "12 Oct 2026", status: "Awaiting payment" },
  { id: "INV-0263", type: "Full Payment", amount: "Rp 1,000,000", date: "09 Nov 2026", status: "Scheduled" },
];

export default function ClientInvoices() {
  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-heading font-bold text-eclipse-900 mb-2 tracking-tight"
          >
            Everything, accounted for.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-eclipse-700"
          >
            Your invoices and payments for Lumière · Anindya & Rizky.
          </motion.p>
        </div>
        <button className="px-6 py-3 bg-eclipse-900 text-white text-sm font-medium rounded-xl hover:bg-eclipse-800 transition-colors shadow-sm hidden sm:inline-flex items-center gap-2">
          Upload Payment Proof
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-nebula-500/5 rounded-3xl p-8 border border-nebula-500/10"
        >
           <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700">Outstanding Balance</span>
              <svg className="w-5 h-5 text-nebula-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
           </div>
           <h3 className="text-3xl font-heading font-bold text-eclipse-900 mb-4">Rp 3,000,000</h3>
           <p className="text-xs text-eclipse-700">Next due · Rp 2,000,000 on 12 Oct 2026</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 border border-eclipse-900/10 shadow-sm"
        >
           <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-4">Paid to Date</div>
           <h3 className="text-3xl font-heading font-bold text-eclipse-900 mb-4">Rp 2,000,000</h3>
           <div className="inline-flex px-3 py-1 bg-green-500/10 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
              DP received - 28 Sep 2026
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 border border-eclipse-900/10 shadow-sm"
        >
           <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-4">Project Total</div>
           <h3 className="text-3xl font-heading font-bold text-eclipse-900 mb-4">Rp 5,000,000</h3>
           <p className="text-xs text-eclipse-700">Professional package · 3 payment milestones</p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl border border-eclipse-900/10 shadow-sm overflow-hidden mb-8"
      >
         <div className="p-8 border-b border-eclipse-900/5 flex justify-between items-center">
            <h3 className="text-xl font-bold text-eclipse-900">Your invoices</h3>
            <div className="flex gap-4">
               <span className="px-3 py-1 bg-eclipse-900/5 text-eclipse-700 text-[10px] font-bold rounded-full uppercase tracking-widest">
                  All invoices · 3
               </span>
               <button className="text-sm font-medium text-eclipse-900 border border-eclipse-900/10 px-4 py-1.5 rounded-lg flex items-center gap-2 hover:bg-space-50">
                  Download all
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               </button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-eclipse-700">
               <thead className="bg-space-50 text-[10px] uppercase tracking-widest font-bold text-eclipse-700/50">
                  <tr>
                     <th className="px-8 py-4">Invoice</th>
                     <th className="px-8 py-4">Payment Type</th>
                     <th className="px-8 py-4">Amount</th>
                     <th className="px-8 py-4">Due Date</th>
                     <th className="px-8 py-4">Status</th>
                     <th className="px-8 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-eclipse-900/5">
                  {invoices.map((inv) => (
                     <tr key={inv.id} className="hover:bg-space-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-eclipse-900">{inv.id}</td>
                        <td className="px-8 py-6">{inv.type}</td>
                        <td className="px-8 py-6">{inv.amount}</td>
                        <td className="px-8 py-6">{inv.date}</td>
                        <td className="px-8 py-6">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inv.status === 'Paid' ? 'bg-green-500/10 text-green-700' : 
                              inv.status === 'Scheduled' ? 'bg-eclipse-900/5 text-eclipse-700' : 
                              'bg-orange-500/10 text-orange-700'
                           }`}>
                              {inv.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="text-eclipse-700 hover:text-eclipse-900">
                              <svg className="w-5 h-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-6 border-t border-eclipse-900/5 text-[10px] text-eclipse-700/50">
            Showing 3 of 3 invoices · Amounts in Indonesian Rupiah (IDR)
         </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 bg-white rounded-3xl border border-eclipse-900/10 p-8 shadow-sm flex flex-col justify-between"
         >
            <div className="flex justify-between items-start mb-10">
               <h3 className="text-xl font-bold text-eclipse-900">A simple way to pay.</h3>
               <span className="px-3 py-1 bg-eclipse-900/5 text-eclipse-700 text-[10px] font-bold rounded-full">Bank transfer</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-12 mb-8">
               <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700/50 mb-2">Bank Central Asia (BCA)</p>
                  <p className="text-3xl font-heading font-bold text-eclipse-900 mb-2">123 456 7890</p>
                  <p className="text-sm text-eclipse-700">PT Yunivrz Kreatif Indonesia</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700/50 mb-2">Payment Reference</p>
                  <p className="text-sm font-bold text-eclipse-900 mb-2">INV-0262 / Anindya Putri</p>
                  <button className="text-[10px] font-bold text-nebula-500 uppercase tracking-widest hover:text-eclipse-900 transition-colors flex items-center gap-1">
                     Copy account details
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
               </div>
            </div>
            <p className="text-[10px] text-eclipse-700/50">
               Please include the invoice number in your transfer notes. Payments are verified within one working day.
            </p>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl border border-eclipse-900/10 p-8 shadow-sm flex flex-col justify-between"
         >
            <div className="w-8 h-8 rounded-full bg-nebula-500/10 text-nebula-500 flex items-center justify-center mb-6">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <h3 className="text-xl font-bold text-eclipse-900 mb-4">Already made a transfer?</h3>
            <p className="text-xs text-eclipse-700 leading-relaxed mb-6">
               Upload a receipt or screenshot so we can match your payment. JPG, PNG or PDF, up to 10 MB.
            </p>
            <button className="w-full py-3 bg-white border border-eclipse-900/10 text-eclipse-900 text-sm font-medium rounded-xl hover:bg-space-50 transition-colors flex items-center justify-center gap-2">
               Upload Payment Proof
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </button>
         </motion.div>
      </div>
      
      <div className="mt-8 flex items-center gap-2 text-xs text-eclipse-700">
         <svg className="w-4 h-4 text-nebula-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
         Secure records, clear milestones. Questions about an invoice? <Link href="#" className="text-nebula-500 hover:text-eclipse-900 font-medium ml-1">Contact the studio &rarr;</Link>
      </div>

    </div>
  );
}
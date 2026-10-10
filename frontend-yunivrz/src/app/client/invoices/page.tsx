"use client";

import { useEffect, useState } from "react";

export default function ClientInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('http://localhost:8000/api/invoices', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded-3xl"></div>
      </div>
    );
  }

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Mock calculations based on invoices array
  const outstandingBalance = invoices.filter(i => i.status !== 'paid').reduce((sum, inv) => sum + Number(inv.amount), 0);
  const paidToDate = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + Number(inv.amount), 0);
  const projectTotal = outstandingBalance + paidToDate;
  const nextDue = invoices.filter(i => i.status !== 'paid').sort((a,b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div>
           <h1 className="text-4xl font-heading font-medium text-gray-900 tracking-tight mb-2">
             Everything, accounted for.
           </h1>
           <p className="text-gray-500 text-[15px]">
             Your invoices and payments for Lumière · Anindya & Rizky.
           </p>
         </div>
         <button className="bg-[#111111] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">
           Upload Payment Proof
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
         </button>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Card 1 */}
         <div className="bg-purple-50/50 border border-purple-100 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500">OUTSTANDING BALANCE</div>
               <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
            <div className="text-4xl font-medium text-gray-900 mb-4">{formatIDR(outstandingBalance)}</div>
            <div className="text-[13px] text-gray-500">
               Next due · {nextDue ? `${formatIDR(nextDue.amount)} on ${formatDate(nextDue.due_date)}` : 'None'}
            </div>
         </div>
         
         {/* Card 2 */}
         <div className="bg-white border border-gray-200 rounded-3xl p-8">
            <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4">PAID TO DATE</div>
            <div className="text-4xl font-medium text-gray-900 mb-4">{formatIDR(paidToDate)}</div>
            <div className="inline-flex bg-green-50 text-green-700 text-[11px] font-bold px-3 py-1 rounded-md">
               DP received · 28 Sep 2026
            </div>
         </div>

         {/* Card 3 */}
         <div className="bg-white border border-gray-200 rounded-3xl p-8">
            <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4">PROJECT TOTAL</div>
            <div className="text-4xl font-medium text-gray-900 mb-4">{formatIDR(projectTotal)}</div>
            <div className="text-[13px] text-gray-500">
               Professional package · 3 payment milestones
            </div>
         </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-medium text-gray-900">Your invoices</h3>
            <div className="flex gap-4">
               <span className="bg-purple-50 text-purple-700 text-[11px] font-bold px-3 py-1.5 rounded-full">All invoices · {invoices.length}</span>
               <button className="text-[13px] font-bold text-gray-900 flex items-center gap-2 hover:text-purple-600 transition-colors">
                  Download all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
               <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                     <th className="pb-4 font-bold w-[15%]">INVOICE</th>
                     <th className="pb-4 font-bold w-[20%]">PAYMENT TYPE</th>
                     <th className="pb-4 font-bold w-[20%]">AMOUNT</th>
                     <th className="pb-4 font-bold w-[20%]">DUE DATE</th>
                     <th className="pb-4 font-bold w-[15%]">STATUS</th>
                     <th className="pb-4 font-bold text-right w-[10%]">ACTION</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {invoices.map(invoice => (
                     <tr key={invoice.id} className="group">
                        <td className="py-6 font-bold text-gray-900">{invoice.invoice_number}</td>
                        <td className="py-6 text-gray-600">{invoice.type === 'dp' ? 'DP' : invoice.type === 'installment' ? 'Installment' : 'Full Payment'}</td>
                        <td className="py-6 font-medium text-gray-900">{formatIDR(invoice.amount)}</td>
                        <td className="py-6 text-gray-500">{formatDate(invoice.due_date)}</td>
                        <td className="py-6">
                           <span className={`text-[11px] font-medium px-3 py-1 rounded-full ${
                              invoice.status === 'paid' ? 'bg-green-50 text-green-700' :
                              invoice.status === 'overdue' ? 'bg-red-50 text-red-700' :
                              'bg-orange-50 text-orange-700'
                           }`}>
                              {invoice.status === 'paid' ? 'Paid' : invoice.status === 'unpaid' ? 'Awaiting payment' : invoice.status}
                           </span>
                        </td>
                        <td className="py-6 text-right">
                           <button className="text-gray-400 hover:text-gray-900 transition-colors p-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <div className="pt-4 text-[11px] text-gray-400 mt-2 border-t border-gray-100">
               Showing {invoices.length} of {invoices.length} invoices · Amounts in Indonesian Rupiah (IDR)
            </div>
         </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Bank Details */}
         <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-medium text-gray-900">A simple way to pay.</h3>
               <span className="bg-gray-200/50 text-gray-600 text-[11px] font-medium px-3 py-1 rounded-full">Bank transfer</span>
            </div>
            <div className="flex gap-12 mb-8">
               <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">BANK CENTRAL ASIA (BCA)</div>
                  <div className="text-2xl font-medium text-gray-900 mb-1">123 456 7890</div>
                  <div className="text-[13px] text-gray-600">PT Yunivrz Kreatif Indonesia</div>
               </div>
               <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">PAYMENT REFERENCE</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{nextDue?.invoice_number || 'INV-XXXX'} / {invoices[0]?.project?.client?.name || 'Client'}</div>
                  <button className="text-[11px] text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1">
                     Copy account details <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
               </div>
            </div>
            <p className="text-[11px] text-gray-500">Please include the invoice number in your transfer notes. Payments are verified within one working day.</p>
         </div>

         {/* Upload Proof */}
         <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between">
            <div>
               <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
               </div>
               <h3 className="text-xl font-medium text-gray-900 mb-3">Already made a transfer?</h3>
               <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  Upload a receipt or screenshot so we can match your payment. JPG, PNG or PDF, up to 10 MB.
               </p>
            </div>
            <button className="w-full sm:w-auto self-start border border-gray-200 text-gray-900 px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors flex items-center gap-2">
               Upload Payment Proof
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </button>
         </div>
      </div>
      
      {/* Footer text */}
      <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-4">
         <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
         Secure records, clear milestones. Questions about an invoice? <a href="#" className="text-purple-600 hover:underline">Contact Maya &rarr;</a>
      </div>

    </div>
  );
}

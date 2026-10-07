"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ClientInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("http://localhost:8080/api/invoices", {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#10B981]">Lunas</span>;
      case 'unpaid':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-nebula-500/10 text-nebula-500">Belum Lunas</span>;
      case 'overdue':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500">Terlambat</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500">Dibatalkan</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex items-end justify-between"
      >
        <div>
           <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-3 tracking-tight">
             Tagihan & Pembayaran
           </h1>
           <p className="text-eclipse-700 text-sm leading-relaxed max-w-xl">
             Tinjau riwayat pembayaran Anda dan selesaikan tagihan yang masih tertunda. 
             Catatan: Sistem hanya mencatat status manual. Pembayaran tidak dilakukan secara otomatis.
           </p>
        </div>
      </motion.div>

      <div className="bg-white rounded-3xl border border-eclipse-900/10 shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-eclipse-900/5 text-[10px] font-bold tracking-widest uppercase text-eclipse-700">
              <tr>
                <th className="px-6 py-4">ID Tagihan</th>
                <th className="px-6 py-4">Proyek</th>
                <th className="px-6 py-4">Jenis Tagihan</th>
                <th className="px-6 py-4">Jatuh Tempo</th>
                <th className="px-6 py-4">Jumlah</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-eclipse-900/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-eclipse-700">Memuat tagihan...</td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-eclipse-700">Belum ada tagihan.</td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-space-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-eclipse-900">{inv.invoice_number}</td>
                    <td className="px-6 py-4 text-eclipse-700 truncate max-w-[150px]">{inv.project?.title || '-'}</td>
                    <td className="px-6 py-4 text-eclipse-700 capitalize">{inv.type.replace('_', ' ')}</td>
                    <td className="px-6 py-4 text-eclipse-700">{new Date(inv.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-6 py-4 font-medium text-eclipse-900">{formatRupiah(inv.amount)}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(inv.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-space-50 border border-eclipse-900/5">
         <h3 className="text-sm font-bold text-eclipse-900 mb-2">Informasi Pembayaran</h3>
         <p className="text-xs text-eclipse-700 mb-4 leading-relaxed max-w-2xl">
            Sesuai kesepakatan studio, proyek dilanjutkan ke tahap akhir (termasuk hosting dan domain) setelah sisa pelunasan (INV-0262) dikonfirmasi. 
            Silakan kirimkan bukti pembayaran ke email studio atau WhatsApp yang tercantum.
         </p>
         <div className="bg-white p-4 rounded-xl border border-eclipse-900/10 inline-block">
            <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-1">REKENING BANK BCA</div>
            <div className="text-lg font-bold text-eclipse-900 font-mono tracking-tight">8732 199 028</div>
            <div className="text-xs text-eclipse-700 mt-1">a.n Yunita Putri</div>
         </div>
      </div>
    </div>
  );
}

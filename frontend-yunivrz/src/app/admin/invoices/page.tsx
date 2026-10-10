"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [type, setType] = useState("dp");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("Transfer BCA: 1234-5678-90 a.n Yunivrz Studio");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = {
        "Accept": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      };

      const [invRes, projRes] = await Promise.allSettled([
        fetch("http://localhost:8000/api/invoices", { headers }).then(r => r.ok ? r.json() : []),
        fetch("http://localhost:8000/api/projects", { headers }).then(r => r.ok ? r.json() : []),
      ]);

      if (invRes.status === "fulfilled" && Array.isArray(invRes.value)) {
        setInvoices(invRes.value);
      }
      if (projRes.status === "fulfilled" && Array.isArray(projRes.value)) {
        setProjects(projRes.value);
        if (projRes.value.length > 0) {
          setProjectId(projRes.value[0].id.toString());
        }
      }
    } catch (err) {
      console.error("Gagal memuat data tagihan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format Currency
  const formatIDR = (val: number | string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(Number(val) || 0);
  };

  // Create Invoice
  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:8000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          project_id: projectId,
          type,
          amount: Number(amount.replace(/[^0-9]/g, "")),
          due_date: dueDate,
          notes,
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Gagal membuat tagihan.");
      }

      await fetchData();
      setIsModalOpen(false);
      setAmount("");
      setDueDate("");
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  // Update Status (Paid / Unpaid)
  const handleUpdateStatus = async (invoiceId: number, newStatus: string) => {
    setActionLoading(invoiceId);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`http://localhost:8000/api/invoices/${invoiceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: newStatus } : inv));
      }
    } catch (err) {
      console.error("Gagal update status tagihan:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Invoice
  const handleDeleteInvoice = async (invoiceId: number, invNumber: string) => {
    if (!confirm(`Hapus tagihan ${invNumber}?`)) return;
    setActionLoading(invoiceId);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`http://localhost:8000/api/invoices/${invoiceId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
      });

      if (res.ok) {
        setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
      }
    } catch (err) {
      console.error("Gagal menghapus tagihan:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Calculations
  const totalAmount = invoices.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const paidAmount = invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const unpaidAmount = invoices.filter(i => i.status === 'unpaid').reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  // Filters
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoice_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.project?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.project?.client?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && inv.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2 tracking-tight">
            Tagihan & Pembayaran
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            Kelola faktur pembayaran klien, pantau status pelunasan DP dan cicilan proyek secara real-time.
          </p>
        </motion.div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-[#1C1D22] text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            + Buat Tagihan Baru
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Nilai Tagihan</div>
          <div className="text-2xl font-bold text-gray-900">{formatIDR(totalAmount)}</div>
          <div className="text-xs text-gray-400 mt-1">{invoices.length} tagihan tercatat</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Sudah Terbayar (Lunas)</div>
          <div className="text-2xl font-bold text-emerald-600">{formatIDR(paidAmount)}</div>
          <div className="text-xs text-emerald-700/60 mt-1">{invoices.filter(i => i.status === 'paid').length} transaksi berhasil</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Menunggu Pembayaran</div>
          <div className="text-2xl font-bold text-amber-600">{formatIDR(unpaidAmount)}</div>
          <div className="text-xs text-amber-700/60 mt-1">{invoices.filter(i => i.status === 'unpaid').length} tagihan belum lunas</div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between bg-white">
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor tagihan, judul proyek..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="unpaid">Menunggu (Unpaid)</option>
              <option value="paid">Lunas (Paid)</option>
              <option value="overdue">Jatuh Tempo (Overdue)</option>
            </select>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/70 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">No. Tagihan</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Proyek & Klien</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Tipe</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Jumlah</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Jatuh Tempo</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                    Memuat data tagihan...
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                    {searchQuery ? "Tidak ada tagihan yang cocok." : "Belum ada data tagihan."}
                  </td>
                </tr>
              ) : filteredInvoices.map((inv) => {
                const isPaid = inv.status === 'paid';
                return (
                  <tr key={inv.id} className="hover:bg-purple-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded inline-block">
                        {inv.invoice_number}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{inv.project?.title || "Proyek Studio"}</div>
                      <div className="text-xs text-gray-400">{inv.project?.client?.name || "Klien Umum"}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="capitalize text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md">
                        {inv.type === 'dp' ? 'DP (Uang Muka)' : inv.type === 'full_payment' ? 'Pelunasan' : 'Cicilan'}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-bold text-gray-900">
                      {formatIDR(inv.amount)}
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-500">
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : "-"}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleUpdateStatus(inv.id, isPaid ? 'unpaid' : 'paid')}
                        disabled={actionLoading === inv.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isPaid 
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                        title="Klik untuk ubah status pembayaran"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {isPaid ? 'Lunas' : 'Belum Bayar'}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDeleteInvoice(inv.id, inv.invoice_number)}
                          disabled={actionLoading === inv.id}
                          className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Hapus Tagihan"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div>Menampilkan {filteredInvoices.length} dari total {invoices.length} tagihan</div>
        </div>
      </div>

      {/* MODAL: BUAT TAGIHAN BARU */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Buat Tagihan Baru</h3>
                  <p className="text-xs text-gray-500">Kirim tagihan pembayaran proyek kepada klien.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pilih Proyek Terkait</label>
                  <select 
                    required
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.client?.name || 'Klien'})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tipe Tagihan</label>
                    <select 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                    >
                      <option value="dp">DP (Down Payment)</option>
                      <option value="installment">Cicilan Termin</option>
                      <option value="full_payment">Pelunasan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Jatuh Tempo</label>
                    <input 
                      type="date" 
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nominal Pembayaran (Rp)</label>
                  <input 
                    type="number" 
                    required
                    min="1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Contoh: 1500000"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Petunjuk Transfer / Catatan Rekening</label>
                  <textarea 
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-[#1C1D22] hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Membuat Tagihan..." : "Buat Tagihan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

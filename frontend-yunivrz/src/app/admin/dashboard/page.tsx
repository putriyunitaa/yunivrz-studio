"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        };

        const [projRes, invRes, catRes, clientRes] = await Promise.allSettled([
          fetch("http://localhost:8000/api/projects", { headers }).then(r => r.ok ? r.json() : []),
          fetch("http://localhost:8000/api/invoices", { headers }).then(r => r.ok ? r.json() : []),
          fetch("http://localhost:8000/api/catalogs?all=1", { headers }).then(r => r.ok ? r.json() : []),
          fetch("http://localhost:8000/api/clients", { headers }).then(r => r.ok ? r.json() : []),
        ]);

        if (projRes.status === "fulfilled" && Array.isArray(projRes.value)) setProjects(projRes.value);
        if (invRes.status === "fulfilled" && Array.isArray(invRes.value)) setInvoices(invRes.value);
        if (catRes.status === "fulfilled" && Array.isArray(catRes.value)) setCatalogs(catRes.value);
        if (clientRes.status === "fulfilled" && Array.isArray(clientRes.value)) setClients(clientRes.value);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Compute metrics
  const activeProjects = projects.filter(p => p.status !== 'completed' && p.status !== 'cancelled').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  
  const paidInvoices = invoices.filter(i => i.status === 'paid');
  const unpaidInvoices = invoices.filter(i => i.status === 'unpaid' || i.status === 'pending');
  
  const totalRevenue = paidInvoices.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const pendingRevenue = unpaidInvoices.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-[1240px] w-full font-sans pb-16">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[11px] font-bold tracking-wider uppercase text-purple-600 mb-1 bg-purple-50 inline-block px-2.5 py-0.5 rounded-full">
            RINGKASAN STUDIO
          </div>
          <h1 className="text-[32px] font-heading font-bold text-gray-900 mb-1 tracking-tight">
            Studio sekilas.
          </h1>
          <p className="text-gray-500 text-[14px] leading-relaxed max-w-2xl">
            Gambaran jelas alur kerja proyek aktif, pendapatan studio, dan portofolio terkini.
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="bg-[#1C1D22] hover:bg-black text-white text-[13px] font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>+ Buka Papan Proyek</span>
          </Link>
          <Link
            href="/admin/catalogs/create"
            className="bg-white border border-gray-200 hover:border-purple-300 text-gray-800 text-[13px] font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <span>+ Tambah Portofolio</span>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1: Revenue */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between h-[150px]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-gray-500">Pendapatan Lunas</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
              IDR
            </span>
          </div>
          <div>
            <div className="text-[26px] font-heading font-bold text-gray-900 mb-0.5 tracking-tight leading-tight">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span>●</span> {paidInvoices.length} transaksi telah diterima
            </div>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between h-[150px]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-gray-500">Proyek Berjalan</span>
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
            </span>
          </div>
          <div>
            <div className="text-[28px] font-heading font-bold text-purple-700 mb-0.5 tracking-tight leading-tight">
              {activeProjects}
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              Dari {projects.length} total pesanan klien ({completedProjects} selesai)
            </div>
          </div>
        </div>

        {/* Card 3: Unpaid Invoices */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between h-[150px]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-gray-500">Tagihan Menunggu</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
          </div>
          <div>
            <div className="text-[26px] font-heading font-bold text-amber-700 mb-0.5 tracking-tight leading-tight">
              {formatCurrency(pendingRevenue)}
            </div>
            <div className="text-[11px] text-amber-600 font-medium">
              {unpaidInvoices.length} invoice belum diselesaikan
            </div>
          </div>
        </div>

        {/* Card 4: Catalogs */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between h-[150px]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-gray-500">Portofolio Publik</span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </span>
          </div>
          <div>
            <div className="text-[28px] font-heading font-bold text-gray-900 mb-0.5 tracking-tight leading-tight">
              {catalogs.length}
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              {catalogs.filter(c => c.is_featured).length} item tampil di Beranda
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Projects & Quick Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Recent Projects Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-[17px] font-heading font-bold text-gray-900">Proyek Terbaru</h2>
              <p className="text-[12px] text-gray-500">Pantau progres proyek pesanan klien yang sedang berjalan.</p>
            </div>
            <Link
              href="/admin/projects"
              className="text-[12px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            {loading ? (
              <div className="py-16 text-center text-gray-400 text-sm">Memuat data proyek...</div>
            ) : projects.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">Belum ada proyek aktif di sistem.</div>
            ) : (
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-gray-50/60 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="py-3 px-6">Judul Proyek</th>
                    <th className="py-3 px-4">Klien</th>
                    <th className="py-3 px-4">Progres</th>
                    <th className="py-3 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.slice(0, 5).map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-6">
                        <Link href="/admin/projects" className="font-bold text-gray-900 hover:text-purple-600 block truncate max-w-[220px]">
                          {project.title}
                        </Link>
                        <span className="text-[11px] text-gray-400 font-mono">
                          {project.project_code || `PRJ-${project.id}`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700">
                        {project.client?.name || "Klien Studio"}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-purple-600 h-full rounded-full"
                              style={{ width: `${project.progress_percent || 0}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-gray-500">
                            {project.progress_percent || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          project.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : project.status === 'in_progress'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : project.status === 'revision' || project.status === 'review'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {project.status === 'completed' ? 'Selesai' :
                           project.status === 'in_progress' ? 'Dalam Proses' :
                           project.status === 'revision' ? 'Revisi' : 'Menunggu'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Menu & Shortcuts (1 Col) */}
        <div className="space-y-6">
          {/* Quick Action Box */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-gray-900 mb-1">Aksi Cepat</h3>
            <p className="text-[12px] text-gray-500 mb-4">Pintasan navigasi penting untuk aktivitas harian.</p>

            <div className="space-y-2">
              <Link
                href="/admin/projects"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-purple-50/60 hover:text-purple-700 transition-colors text-[13px] font-semibold text-gray-700 border border-gray-100"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  Kelola Papan Proyek
                </span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/admin/catalogs"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-purple-50/60 hover:text-purple-700 transition-colors text-[13px] font-semibold text-gray-700 border border-gray-100"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Katalog & Tampilan Beranda
                </span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/admin/invoices"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-purple-50/60 hover:text-purple-700 transition-colors text-[13px] font-semibold text-gray-700 border border-gray-100"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Manajemen Tagihan (Invoice)
                </span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/admin/settings"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-purple-50/60 hover:text-purple-700 transition-colors text-[13px] font-semibold text-gray-700 border border-gray-100"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-pink-600" />
                  Kontak WhatsApp & Sosmed
                </span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-gradient-to-br from-purple-900 to-[#1C1D22] text-white rounded-2xl p-6 shadow-sm">
            <div className="text-[11px] font-bold tracking-widest uppercase text-purple-300 mb-2">
              WORKSPACE AKTIF
            </div>
            <h4 className="text-[17px] font-bold mb-2 leading-snug">
              Semua sistem terhubung.
            </h4>
            <p className="text-[12px] text-gray-300 leading-relaxed mb-4">
              Pembaruan portofolio dan pengaturan nomor WhatsApp akan langsung muncul bagi pengunjung publik.
            </p>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 text-[12px] font-bold bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors backdrop-blur-sm"
            >
              Kunjungi Web Publik &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

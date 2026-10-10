"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Modal create state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newClientId, setNewClientId] = useState<string>("");
  const [newCatalogId, setNewCatalogId] = useState<string>("");
  const [newBrief, setNewBrief] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newStatus, setNewStatus] = useState("pending");
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAllData = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = {
        "Accept": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      };

      const [projRes, clientRes, catRes] = await Promise.allSettled([
        fetch("http://localhost:8000/api/projects", { headers }).then(r => r.ok ? r.json() : []),
        fetch("http://localhost:8000/api/clients", { headers }).then(r => r.ok ? r.json() : []),
        fetch("http://localhost:8000/api/catalogs?all=1", { headers }).then(r => r.ok ? r.json() : []),
      ]);

      if (projRes.status === "fulfilled" && Array.isArray(projRes.value)) {
        setProjects(projRes.value);
      }
      if (clientRes.status === "fulfilled" && Array.isArray(clientRes.value)) {
        setClients(clientRes.value);
        if (clientRes.value.length > 0) {
          setNewClientId(clientRes.value[0].id.toString());
        }
      }
      if (catRes.status === "fulfilled" && Array.isArray(catRes.value)) {
        setCatalogs(catRes.value);
      }
    } catch (error) {
      console.error("Gagal memuat data proyek:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Update Status
  const handleUpdateStatus = async (projectId: number, newStatus: string) => {
    setActionLoading(projectId);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`http://localhost:8000/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          status: newStatus,
          progress_percent: newStatus === 'completed' ? 100 : newStatus === 'in_progress' ? 50 : 10
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: newStatus, progress_percent: updated.progress_percent } : p));
      }
    } catch (err) {
      console.error("Gagal update status proyek:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Project
  const handleDeleteProject = async (projectId: number, title: string) => {
    if (!confirm(`Hapus proyek "${title}"?`)) return;
    setActionLoading(projectId);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`http://localhost:8000/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== projectId));
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus proyek.");
    } finally {
      setActionLoading(null);
    }
  };

  // Create Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientId) {
      setErrorMsg("Pilih klien terlebih dahulu.");
      return;
    }

    setCreateSubmitting(true);
    setErrorMsg("");

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const payload: any = {
        title: newTitle,
        user_id: Number(newClientId),
        brief: newBrief,
        status: newStatus,
      };

      if (newCatalogId) payload.catalog_id = Number(newCatalogId);
      if (newDeadline) payload.deadline = newDeadline;

      const res = await fetch("http://localhost:8000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal membuat proyek baru.");
      }

      setProjects(prev => [data, ...prev]);
      setIsModalOpen(false);
      setNewTitle("");
      setNewBrief("");
      setNewDeadline("");
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan.");
    } finally {
      setCreateSubmitting(false);
    }
  };

  // Filter projects by search
  const filteredProjects = projects.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.title?.toLowerCase().includes(q) ||
           p.client?.name?.toLowerCase().includes(q) ||
           p.project_code?.toLowerCase().includes(q);
  });

  // Kanban Columns
  const columns = [
    { id: 'pending', title: "Menunggu", color: "border-gray-200 bg-gray-50/60 text-gray-700" },
    { id: 'in_progress', title: "Dalam Proses", color: "border-purple-200 bg-purple-50/60 text-purple-700" },
    { id: 'revision', title: "Revisi / Review", color: "border-amber-200 bg-amber-50/60 text-amber-700" },
    { id: 'completed', title: "Selesai", color: "border-emerald-200 bg-emerald-50/60 text-emerald-700" },
  ];

  return (
    <div className="h-full flex flex-col max-w-[1400px] w-full font-sans pb-16">
      {/* Header Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="text-[11px] font-bold tracking-wider uppercase text-purple-600 mb-1 bg-purple-50 inline-block px-2.5 py-0.5 rounded-full">
            PROJECT MANAGEMENT
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2 tracking-tight">
            Papan Proyek Studio
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            Kelola tahapan pengerjaan proyek klien secara langsung. Ubah status, pantau progres, dan buat proyek pesanan baru.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
             <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
             <input
               type="text"
               placeholder="Cari proyek atau klien..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="text-[13px] bg-transparent border-none focus:outline-none w-48 text-gray-800"
             />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1C1D22] hover:bg-black text-white px-5 py-2.5 rounded-xl text-[13px] font-medium transition-colors shadow-sm flex items-center gap-2"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            + Proyek Baru
          </button>
        </div>
      </motion.div>

      {/* Kanban Board */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Memuat papan proyek...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {columns.map(col => {
            const colCards = filteredProjects.filter(p => {
              if (col.id === 'revision') return p.status === 'revision' || p.status === 'review';
              return p.status === col.id;
            });

            return (
              <div key={col.id} className="flex flex-col bg-gray-50/80 border border-gray-200/80 rounded-2xl p-4 min-h-[450px]">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] text-gray-900">{col.title}</span>
                    <span className="w-5 h-5 rounded-full bg-white text-gray-600 text-[11px] font-bold flex items-center justify-center border border-gray-200 shadow-xs">
                      {colCards.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="space-y-3.5 flex-1">
                  {colCards.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs">
                      Belum ada proyek
                    </div>
                  ) : (
                    colCards.map(p => (
                      <div
                        key={p.id}
                        className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow relative group"
                      >
                        {/* Project Code & Delete */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                            {p.project_code || `PRJ-${p.id}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(p.id, p.title)}
                            disabled={actionLoading === p.id}
                            className="text-gray-300 hover:text-red-500 p-1 rounded transition-colors"
                            title="Hapus Proyek"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        </div>

                        {/* Title & Client */}
                        <h4 className="font-bold text-gray-900 text-[14px] mb-1 leading-snug">
                          {p.title}
                        </h4>
                        <p className="text-[12px] text-gray-500 mb-4 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          Klien: <strong className="text-gray-700">{p.client?.name || "Klien Umum"}</strong>
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1 font-medium">
                            <span>Progres</span>
                            <span>{p.progress_percent || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-purple-600 h-full rounded-full transition-all"
                              style={{ width: `${p.progress_percent || 0}%` }}
                            />
                          </div>
                        </div>

                        {/* Action: Quick Status Changer */}
                        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                          <div className="text-[11px] text-gray-400">
                            {p.deadline ? new Date(p.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Tanpa deadline'}
                          </div>

                          <select
                            value={p.status}
                            disabled={actionLoading === p.id}
                            onChange={(e) => handleUpdateStatus(p.id, e.target.value)}
                            className="text-[11px] font-bold bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer transition-colors"
                          >
                            <option value="pending">Menunggu</option>
                            <option value="in_progress">Dalam Proses</option>
                            <option value="revision">Revisi</option>
                            <option value="completed">Selesai</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Tambah Proyek Baru */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-heading font-bold text-gray-900">Buat Proyek Pesanan Baru</h3>
                  <p className="text-[12px] text-gray-500 mt-0.5">Proyek akan otomatis muncul di akun portal klien.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                  ✕
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-100">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-900 mb-1">
                    Judul Proyek <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Undangan Pernikahan Digital Rizky & Ani"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-[13px] border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-900 mb-1">
                      Klien Pemesan <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newClientId}
                      onChange={(e) => setNewClientId(e.target.value)}
                      required
                      className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-900 mb-1">
                      Katalog Terkait (Opsional)
                    </label>
                    <select
                      value={newCatalogId}
                      onChange={(e) => setNewCatalogId(e.target.value)}
                      className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="">-- Tanpa Template --</option>
                      {catalogs.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-900 mb-1">
                      Tahap Awal
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="pending">Menunggu</option>
                      <option value="in_progress">Dalam Proses</option>
                      <option value="revision">Revisi</option>
                      <option value="completed">Selesai</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-900 mb-1">
                      Tenggat Waktu (Deadline)
                    </label>
                    <input
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-900 mb-1">
                    Catatan Brief / Kebutuhan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Catatan konsep desain, revisi yang disepakati, dsb..."
                    value={newBrief}
                    onChange={(e) => setNewBrief(e.target.value)}
                    className="w-full text-[13px] border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={createSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#1C1D22] hover:bg-black text-white text-[13px] font-bold transition-colors shadow-sm disabled:opacity-60"
                  >
                    {createSubmitting ? "Menyimpan..." : "Buat Proyek"}
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

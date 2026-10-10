"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminCatalogsPage() {
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchCatalogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/catalogs?all=1", {
        headers: { "Accept": "application/json" }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setCatalogs(data);
      }
    } catch (error) {
      console.error("Gagal memuat katalog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1-Click Toggle Featured (Tampil di Beranda)
  const handleToggleFeatured = async (id: number, currentFeatured: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    setActionLoading(id);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch(`http://localhost:8000/api/catalogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ is_featured: !currentFeatured }),
      });

      if (response.ok) {
        setCatalogs(prev => prev.map(c => c.id === id ? { ...c, is_featured: !currentFeatured } : c));
        showToast(!currentFeatured ? "Karya sekarang ditampilkan di Beranda!" : "Karya dilepas dari Beranda.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 1-Click Toggle Published Status
  const handleToggleActive = async (id: number, currentActive: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    setActionLoading(id);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch(`http://localhost:8000/api/catalogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ is_active: !currentActive }),
      });

      if (response.ok) {
        setCatalogs(prev => prev.map(c => c.id === id ? { ...c, is_active: !currentActive } : c));
        showToast(!currentActive ? "Status diubah menjadi Diterbitkan." : "Status diubah menjadi Draft.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Item
  const handleDelete = async (id: number, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Hapus item portofolio "${title}" dari katalog?`)) return;

    setActionLoading(id);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch(`http://localhost:8000/api/catalogs/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
      });

      if (response.ok) {
        setCatalogs(prev => prev.filter(c => c.id !== id));
        showToast("Item portofolio berhasil dihapus.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus item.");
    } finally {
      setActionLoading(null);
    }
  };

  // Filtering
  const filteredCatalogs = catalogs.filter(item => {
    const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const countTotal = catalogs.length;
  const countFeatured = catalogs.filter(c => c.is_featured).length;
  const countPublished = catalogs.filter(c => c.is_active).length;
  const countDraft = countTotal - countPublished;

  return (
    <div className="max-w-[1200px] font-sans pb-16 w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-6 right-6 z-50 bg-[#1C1D22] text-white text-[13px] px-5 py-3 rounded-2xl shadow-xl border border-gray-700 flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {toastMessage}
        </motion.div>
      )}

      {/* Header Area */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-purple-600 mb-1 bg-purple-50 inline-block px-2.5 py-0.5 rounded-full">
                SHOWCASE MANAGEMENT
              </div>
              <h1 className="text-[30px] font-heading font-bold text-gray-900 tracking-tight">
                Katalog & Portofolio Karya
              </h1>
              <p className="text-gray-500 text-[13px] mt-1">
                Kelola semua karya dan produk yang ditampilkan di <strong>Beranda</strong> dan halaman <strong>Katalog (/work)</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/work"
                target="_blank"
                className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium px-4 py-2.5 rounded-xl hover:border-purple-300 hover:text-purple-600 transition-colors flex items-center gap-2 shadow-sm"
              >
                Lihat Katalog Publik
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </Link>
              <Link
                href="/admin/catalogs/create"
                className="bg-[#1C1D22] hover:bg-black text-white text-[13px] font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Tambah Portofolio Baru
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[12px] font-bold text-gray-500 mb-1">Total Portofolio</div>
          <div className="text-[26px] font-heading font-bold text-gray-900">{countTotal}</div>
          <div className="text-[11px] text-gray-400 mt-1">Item dalam katalog</div>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[12px] font-bold text-purple-600 mb-1">Tampil di Beranda</div>
          <div className="text-[26px] font-heading font-bold text-purple-700">{countFeatured}</div>
          <div className="text-[11px] text-gray-400 mt-1">Featured di Homepage</div>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[12px] font-bold text-emerald-600 mb-1">Diterbitkan (Aktif)</div>
          <div className="text-[26px] font-heading font-bold text-emerald-700">{countPublished}</div>
          <div className="text-[11px] text-gray-400 mt-1">Bisa dilihat publik</div>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[12px] font-bold text-gray-500 mb-1">Draft (Nonaktif)</div>
          <div className="text-[26px] font-heading font-bold text-gray-700">{countDraft}</div>
          <div className="text-[11px] text-gray-400 mt-1">Belum dipublikasikan</div>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-4 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Cari judul atau kata kunci proyek..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-[13px] text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { label: "Semua", value: "Semua" },
            { label: "Micro-Moments", value: "micro_moments" },
            { label: "Milestones", value: "milestones" },
            { label: "Custom Solutions", value: "custom_solutions" }
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-purple-50 text-purple-700 font-bold border border-purple-200"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-gray-500 text-sm">Memuat data portofolio studio...</p>
          </div>
        ) : filteredCatalogs.length === 0 ? (
          <div className="py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
            <h3 className="text-[17px] font-bold text-gray-900 mb-1">Belum Ada Item Portofolio</h3>
            <p className="text-gray-500 text-[13px] max-w-md mx-auto mb-6">
              Tambahkan item portofolio pertama Anda agar calon klien dapat melihat hasil karya di Beranda dan katalog studio.
            </p>
            <Link
              href="/admin/catalogs/create"
              className="inline-flex items-center gap-2 bg-[#1C1D22] text-white text-[13px] font-medium px-5 py-2.5 rounded-xl hover:bg-black transition-colors"
            >
              + Tambah Item Portofolio Sekarang
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-3.5 px-6">Proyek & Sampul</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4 text-center">Tampil di Beranda</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[13px]">
                {filteredCatalogs.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/30 transition-colors group">
                    {/* Item Title & Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 relative">
                          <img
                            src={item.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as any).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80";
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/catalogs/${item.id}`}
                            className="font-bold text-gray-900 hover:text-purple-600 transition-colors block truncate"
                          >
                            {item.title}
                          </Link>
                          <div className="text-[11px] text-gray-400 truncate mt-0.5 max-w-[280px]">
                            {item.description || item.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-gray-100 text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                        {item.category === "micro_moments"
                          ? "Micro-Moments"
                          : item.category === "milestones"
                          ? "Milestones"
                          : "Custom Solutions"}
                      </span>
                    </td>

                    {/* Toggle Featured */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => handleToggleFeatured(item.id, Boolean(item.is_featured), e)}
                        disabled={actionLoading === item.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all border ${
                          item.is_featured
                            ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                            : "bg-gray-50 text-gray-400 border-gray-200 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                        title="Klik untuk ubah apakah proyek ini tampil di Beranda"
                      >
                        <span className={`text-[13px] ${item.is_featured ? "text-amber-500" : "text-gray-300"}`}>★</span>
                        {item.is_featured ? "Featured" : "Bukan"}
                      </button>
                    </td>

                    {/* Toggle Published */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => handleToggleActive(item.id, Boolean(item.is_active), e)}
                        disabled={actionLoading === item.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all border ${
                          item.is_active
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                        }`}
                        title="Klik untuk ubah status publikasi"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.is_active ? "bg-emerald-500" : "bg-gray-400"}`} />
                        {item.is_active ? "Diterbitkan" : "Draft"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/work/${item.slug || item.id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Lihat Pratinjau Publik"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </Link>
                        <Link
                          href={`/admin/catalogs/${item.id}`}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium text-[12px] flex items-center gap-1"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          Sunting
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(item.id, item.title, e)}
                          disabled={actionLoading === item.id}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Portofolio"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

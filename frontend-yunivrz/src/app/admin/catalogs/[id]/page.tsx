"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCatalogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form states
  const [catalogId, setCatalogId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("milestones");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Fetch catalog on mount
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/catalogs/${id}`);
        if (!response.ok) {
          throw new Error("Item katalog tidak ditemukan.");
        }
        const data = await response.json();
        setCatalogId(data.id);
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setCategory(data.category || "milestones");
        setDescription(data.description || "");
        setThumbnail(data.thumbnail || "");
        setPreviewUrl(data.preview_url || "");
        setFeaturesInput(Array.isArray(data.features) ? data.features.join(", ") : "");
        setIsFeatured(Boolean(data.is_featured));
        setIsActive(Boolean(data.is_active));
      } catch (err: any) {
        setError(err.message || "Gagal memuat data katalog.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const featuresArray = featuresInput
        .split(",")
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const payload = {
        title,
        slug,
        category,
        description,
        thumbnail,
        features: featuresArray,
        preview_url: previewUrl || null,
        is_featured: isFeatured,
        is_active: isActive,
      };

      const targetId = catalogId || id;
      const response = await fetch(`http://localhost:8000/api/catalogs/${targetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui item katalog.");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/admin/catalogs");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memperbarui data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus item "${title}" dari portofolio? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setDeleting(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const targetId = catalogId || id;
      const response = await fetch(`http://localhost:8000/api/catalogs/${targetId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus katalog dari database.");
      }

      router.push("/admin/catalogs");
    } catch (err: any) {
      alert(err.message || "Gagal menghapus data.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1000px] py-16 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 text-sm">Memuat data portofolio...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] font-sans pb-16 w-full">
      {/* Header Area */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
            <Link href="/admin/catalogs" className="hover:text-purple-600 transition-colors">Katalog & Konten</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Edit Portofolio · {title}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[30px] font-heading font-bold text-gray-900 tracking-tight">
                Sunting Portofolio
              </h1>
              <p className="text-gray-500 text-[13px] mt-1">
                Katalog / <strong className="text-gray-800">{title}</strong> · Editor item portofolio
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/work/${slug || id}`}
                target="_blank"
                className="bg-white border border-gray-200 text-gray-700 text-[12px] font-semibold px-4 py-2 rounded-xl hover:border-purple-300 hover:text-purple-600 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Lihat Pratinjau Publik
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[12px] font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                {deleting ? "Menghapus..." : "Hapus Item"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toolbar / Actions */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <Link
          href="/admin/catalogs"
          className="text-[13px] font-bold text-gray-700 flex items-center gap-2 hover:text-purple-600 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Kembali ke daftar katalog
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/catalogs")}
            className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium px-4 py-2.5 rounded-xl hover:border-gray-300 transition-colors shadow-sm"
          >
            Batal
          </button>
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="bg-[#1C1D22] hover:bg-black text-white text-[13px] font-medium px-6 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Perubahan berhasil disimpan! Mengalihkan...</span>
        </div>
      )}

      <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Area (Left Col) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <h2 className="text-[18px] font-heading font-bold text-gray-900 mb-6">
              Informasi Utama Portofolio
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  Judul Proyek / Produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white cursor-pointer"
                  >
                    <option value="micro_moments">Micro-Moments (Undangan Digital / Special Moments)</option>
                    <option value="milestones">Milestones (Website Brand, Cafe, Studio)</option>
                    <option value="custom_solutions">Custom Solutions (Aplikasi Web & Portal Khusus)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  Deskripsi Singkat <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  Fitur Unggulan (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <p className="text-[11px] text-gray-400 mt-1.5">Fitur ini akan muncul sebagai tag bullet point di halaman detail.</p>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  URL Live Demo / Website (Opsional)
                </label>
                <input
                  type="url"
                  placeholder="https://client-demo.yunivrz.com"
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Media & Thumbnail */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <h2 className="text-[18px] font-heading font-bold text-gray-900 mb-4">
              Media & Foto Sampul
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  URL Gambar Thumbnail / Cover <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Preview image */}
              {thumbnail && (
                <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 max-h-[260px] flex items-center justify-center relative">
                  <img
                    src={thumbnail}
                    alt="Preview"
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      (e.target as any).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80";
                    }}
                  />
                  <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-md backdrop-blur-sm">
                    Pratinjau Sampul Aktif
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Controls (Right Col) */}
        <div className="space-y-6">
          {/* Visibility & Home Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h3 className="text-[15px] font-bold text-gray-900 border-b border-gray-100 pb-3">
              Pengaturan Tampilan
            </h3>

            {/* Toggle Featured */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <label className="text-[13px] font-bold text-gray-900 block cursor-pointer" onClick={() => setIsFeatured(!isFeatured)}>
                  Tampilkan di Beranda
                </label>
                <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                  Jika aktif, proyek ini akan muncul di bagian <strong>Featured Work</strong> di halaman Beranda utama.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${
                  isFeatured ? "bg-purple-600 justify-end" : "bg-gray-200 justify-start"
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            {/* Toggle Published */}
            <div className="flex items-start justify-between gap-4 border-t border-gray-100 pt-5">
              <div>
                <label className="text-[13px] font-bold text-gray-900 block cursor-pointer" onClick={() => setIsActive(!isActive)}>
                  Status Publikasi
                </label>
                <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                  Aktifkan agar karya ini dapat dilihat publik di katalog <code>/work</code>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${
                  isActive ? "bg-emerald-600 justify-end" : "bg-gray-200 justify-start"
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            {/* Badge preview */}
            <div className="border-t border-gray-100 pt-5">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status Saat Ini:</div>
              <div className="flex flex-wrap gap-2">
                {isFeatured && (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    ★ Featured di Beranda
                  </span>
                )}
                {isActive ? (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    ● Diterbitkan (Aktif)
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    ○ Draft (Nonaktif)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Submit Card */}
          <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6">
            <h4 className="text-[13px] font-bold text-purple-900 mb-1">Simpan Pembaruan</h4>
            <p className="text-[11px] text-purple-700 mb-4 leading-relaxed">
              Perubahan akan langsung diperbarui ke database dan otomatis sinkron dengan pengunjung web.
            </p>
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-[13px] font-bold py-3 rounded-xl transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

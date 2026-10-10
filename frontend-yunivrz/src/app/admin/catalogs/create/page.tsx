"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCatalogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("milestones");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80");
  const [previewUrl, setPreviewUrl] = useState("");
  const [featuresInput, setFeaturesInput] = useState("Custom Design, Responsive Mobile, Smooth Animations");
  const [isFeatured, setIsFeatured] = useState(true);
  const [isActive, setIsActive] = useState(true);

  // Auto generate slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const featuresArray = featuresInput
        .split(",")
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const payload = {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        description,
        thumbnail,
        features: featuresArray,
        preview_url: previewUrl || null,
        is_featured: isFeatured,
        is_active: isActive,
      };

      const response = await fetch("http://localhost:8000/api/catalogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan portofolio. Silakan periksa kelengkapan form.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/catalogs");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] font-sans pb-16 w-full">
      {/* Header Area */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
            <Link href="/admin/catalogs" className="hover:text-purple-600 transition-colors">Katalog & Konten</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Tambah Portofolio Baru</span>
          </div>
          <h1 className="text-[30px] font-heading font-bold text-gray-900 tracking-tight">
            Tambah Item Portofolio Baru
          </h1>
          <p className="text-gray-500 text-[13px] mt-1">
            Buat showcase project baru untuk ditampilkan di Beranda dan halaman Work.
          </p>
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
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1C1D22] hover:bg-black text-white text-[13px] font-medium px-6 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Simpan & Publikasikan"}
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
          <span>Item portofolio berhasil ditambahkan! Mengalihkan...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  placeholder="Contoh: Sagara Living E-Commerce"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
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
                    placeholder="sagara-living"
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
                  placeholder="Jelaskan ringkasan karya atau produk ini dalam 1-2 kalimat menarik..."
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
                  placeholder="Custom Design, RSVP System, Background Music, Gallery"
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
                  placeholder="https://images.unsplash.com/photo-..."
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Preset suggestions */}
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 items-center">
                <span className="font-semibold">Preset Cepat:</span>
                <button
                  type="button"
                  onClick={() => setThumbnail("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80")}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg transition-colors"
                >
                  Interior/Design
                </button>
                <button
                  type="button"
                  onClick={() => setThumbnail("https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80")}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg transition-colors"
                >
                  Wedding/Couple
                </button>
                <button
                  type="button"
                  onClick={() => setThumbnail("https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80")}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg transition-colors"
                >
                  Studio/Agency
                </button>
                <button
                  type="button"
                  onClick={() => setThumbnail("https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80")}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg transition-colors"
                >
                  Cafe/Food
                </button>
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
                    Pratinjau Sampul
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
            <h4 className="text-[13px] font-bold text-purple-900 mb-1">Siap mempublikasikan?</h4>
            <p className="text-[11px] text-purple-700 mb-4 leading-relaxed">
              Perubahan akan langsung disimpan ke database dan otomatis sinkron dengan pengunjung web.
            </p>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-[13px] font-bold py-3 rounded-xl transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? "Menyimpan Portofolio..." : "Simpan Portofolio"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

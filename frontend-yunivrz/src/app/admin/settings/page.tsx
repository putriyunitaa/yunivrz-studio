"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function AdminSettingsPage() {
  const { settings, refreshSettings, getWhatsAppUrl } = useSettings();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsapp_number || "6285651999928");
  const [instagramBusiness, setInstagramBusiness] = useState(settings.instagram_business || "https://www.instagram.com/heyyunivrz_/");
  const [instagramDeveloper, setInstagramDeveloper] = useState(settings.instagram_developer || "https://www.instagram.com/ptryntaa_/");
  const [githubUrl, setGithubUrl] = useState(settings.github_url || "https://github.com/putriyunitaa");
  const [linkedinUrl, setLinkedinUrl] = useState(settings.linkedin_url || "https://www.linkedin.com/in/ptryntt");
  const [email, setEmail] = useState(settings.email || "yunivrzstudio@gmail.com");

  // Sync when settings loaded
  useEffect(() => {
    if (settings) {
      setWhatsappNumber(settings.whatsapp_number || "6285651999928");
      setInstagramBusiness(settings.instagram_business || "https://www.instagram.com/heyyunivrz_/");
      setInstagramDeveloper(settings.instagram_developer || "https://www.instagram.com/ptryntaa_/");
      setGithubUrl(settings.github_url || "https://github.com/putriyunitaa");
      setLinkedinUrl(settings.linkedin_url || "https://www.linkedin.com/in/ptryntt");
      setEmail(settings.email || "yunivrzstudio@gmail.com");
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const payload = {
        whatsapp_number: whatsappNumber,
        instagram_business: instagramBusiness,
        instagram_developer: instagramDeveloper,
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
        email: email,
      };

      const response = await fetch("http://localhost:8000/api/settings", {
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
        throw new Error(data.message || "Gagal memperbarui pengaturan.");
      }

      await refreshSettings();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan pengaturan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] font-sans pb-16 w-full">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[11px] font-bold tracking-wider uppercase text-purple-600 mb-1 bg-purple-50 inline-block px-2.5 py-0.5 rounded-full">
            STUDIO CONFIGURATION
          </div>
          <h1 className="text-[30px] font-heading font-bold text-gray-900 tracking-tight">
            Kontak & Tautan Sosial Media
          </h1>
          <p className="text-gray-500 text-[13px] mt-1">
            Ubah nomor WhatsApp, akun Instagram bisnis, dan profil sosial developer. Setiap perubahan akan <strong>otomatis terupdate di seluruh halaman website</strong> (Footer, Navbar, About, dan tombol chat).
          </p>
        </motion.div>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div className="font-bold">Berhasil Disimpan!</div>
              <div className="text-[12px] text-emerald-700">Semua tautan kontak dan sosial media telah diperbarui di seluruh website secara otomatis.</div>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-emerald-200/60 text-emerald-800 px-2.5 py-1 rounded-lg">Realtime</span>
        </motion.div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Settings Form (Left 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* WhatsApp & Contact Section */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <div>
                <h2 className="text-[17px] font-heading font-bold text-gray-900">Saluran Kontak Utama</h2>
                <p className="text-[12px] text-gray-500">Nomor WhatsApp & Email yang menerima pesan konsultasi calon klien.</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* WhatsApp Input */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  Nomor WhatsApp Developer / Studio <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      required
                      placeholder="6285651999928"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono"
                    />
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                    title="Uji coba link WhatsApp"
                  >
                    Uji Chat
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">
                  Format disarankan menggunakan kode negara (contoh: <code>6285651999928</code>).
                </p>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  Alamat Email Studio
                </label>
                <input
                  type="email"
                  placeholder="yunivrzstudio@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Instagram Section */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <div>
                <h2 className="text-[17px] font-heading font-bold text-gray-900">Instagram Bisnis & Developer</h2>
                <p className="text-[12px] text-gray-500">Tautan Instagram resmi studio dan personal developer.</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Instagram Bisnis */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1">
                  Instagram Bisnis Studio (Website Official) <span className="text-red-500">*</span>
                </label>
                <div className="text-[11px] text-gray-400 mb-2">Ditampilkan pada Footer publik dan tautan profil resmi studio.</div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://www.instagram.com/heyyunivrz_/"
                    value={instagramBusiness}
                    onChange={(e) => setInstagramBusiness(e.target.value)}
                    className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  <a
                    href={instagramBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    Buka
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>

              {/* Instagram Developer */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1">
                  Instagram Personal Developer
                </label>
                <div className="text-[11px] text-gray-400 mb-2">Ditampilkan pada halaman Tentang Developer (About Studio).</div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/ptryntaa_/"
                    value={instagramDeveloper}
                    onChange={(e) => setInstagramDeveloper(e.target.value)}
                    className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  <a
                    href={instagramDeveloper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    Buka
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub & LinkedIn Section */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <h2 className="text-[17px] font-heading font-bold text-gray-900">GitHub & LinkedIn Developer</h2>
                <p className="text-[12px] text-gray-500">Tautan portofolio kode dan profil profesional developer.</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* GitHub */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  Tautan Profil GitHub
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://github.com/putriyunitaa"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    Buka
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  Tautan Profil LinkedIn
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://www.linkedin.com/in/ptryntt"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full text-[13px] text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    Buka
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status & Action (Right 1 Col) */}
        <div className="space-y-6">
          {/* Action Card */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sticky top-6">
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Simpan Perubahan</h3>
            <p className="text-[12px] text-gray-500 mb-6 leading-relaxed">
              Setelah tombol ditekan, seluruh tautan di Navbar, Footer, About, Work, dan Client Dashboard akan sinkron dengan nomor dan link baru.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1C1D22] hover:bg-black text-white text-[13px] font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 mb-4"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  Simpan Semua Pengaturan
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </>
              )}
            </button>

            {/* Quick Preview Links */}
            <div className="border-t border-gray-100 pt-5 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Pratinjau Halaman Publik:</div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="text-[12px] text-gray-600 hover:text-purple-600 transition-colors flex items-center justify-between"
                >
                  <span>Halaman Beranda</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
                <Link
                  href="/about"
                  target="_blank"
                  className="text-[12px] text-gray-600 hover:text-purple-600 transition-colors flex items-center justify-between"
                >
                  <span>Halaman Tentang Developer</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
                <Link
                  href="/work"
                  target="_blank"
                  className="text-[12px] text-gray-600 hover:text-purple-600 transition-colors flex items-center justify-between"
                >
                  <span>Halaman Katalog Karya</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

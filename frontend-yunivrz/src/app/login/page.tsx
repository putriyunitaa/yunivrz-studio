"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal. Silakan periksa kembali email dan kata sandi Anda.");
      }

      // Simpan token (bisa menggunakan cookie atau localStorage untuk demo saat ini)
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect ke dashboard admin atau klien
      if (data.user?.role_id === 1) { // asumsikan 1 adalah admin
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/client/dashboard";
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex w-full bg-space-50">
      
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 bg-white shadow-[20px_0_60px_rgba(11,12,16,0.02)]">
        
        <Link href="/" className="absolute top-12 left-8 md:left-16 lg:left-24 xl:left-32">
          <span className="font-heading text-xl font-bold tracking-tighter text-eclipse-900">
            yunivrz <span className="text-nebula-500">✦</span>
          </span>
        </Link>
        <Link href="/" className="absolute top-12 right-8 md:right-16 lg:right-24 xl:right-32 text-xs font-bold uppercase tracking-widest text-eclipse-700/60 hover:text-eclipse-900 transition-colors flex items-center gap-2">
          &larr; Beranda
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-6 bg-nebula-500/10 inline-block px-3 py-1 rounded-full">
            PORTAL EKSKLUSIF
          </div>
          <h1 className="text-4xl font-heading font-bold text-eclipse-900 mb-4 tracking-tight">
            Selamat datang kembali.
          </h1>
          <p className="text-eclipse-700 text-sm mb-10 leading-relaxed">
            Akses pembaruan draf, diskusi revisi, dan tagihan proyek Anda secara transparan dan aman dalam satu ruang privat.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-eclipse-900/60 mb-2">Alamat Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="halo@contoh.com"
                className="w-full px-5 py-4 rounded-2xl border border-eclipse-900/10 bg-space-50 focus:outline-none focus:ring-4 focus:ring-nebula-500/20 focus:border-nebula-500 transition-all text-sm font-medium"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                 <label className="block text-xs font-bold uppercase tracking-widest text-eclipse-900/60">Kata Sandi</label>
                 <a href="#" className="text-xs text-nebula-500 font-bold hover:text-eclipse-900 transition-colors">Lupa sandi?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-5 py-4 rounded-2xl border border-eclipse-900/10 bg-space-50 focus:outline-none focus:ring-4 focus:ring-nebula-500/20 focus:border-nebula-500 transition-all text-sm font-medium"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-white text-sm font-bold rounded-2xl transition-all shadow-[0_15px_30px_-10px_rgba(11,12,16,0.3)] hover:-translate-y-0.5 flex justify-center items-center ${loading ? 'bg-eclipse-700 cursor-not-allowed' : 'bg-eclipse-900 hover:bg-eclipse-800'}`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Memproses...
                </span>
              ) : 'Masuk ke Dasbor'}
            </button>
            
            <button 
              type="button"
              className="w-full py-4 bg-white border border-eclipse-900/10 text-eclipse-900 text-sm font-bold rounded-2xl transition-all hover:bg-space-50 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Lanjutkan dengan Google
            </button>
          </form>
          
          <div className="mt-12 text-center text-xs text-eclipse-700/50 max-w-[280px] mx-auto leading-relaxed">
            Portal ini khusus untuk klien aktif Yunivrz Studio yang memiliki akses undangan.
          </div>
        </motion.div>

      </div>

      {/* Right Visual Side (Stunning Abstract 3D Nebula with Glassmorphism) */}
      <div className="hidden lg:flex w-1/2 relative bg-space-100 overflow-hidden items-center justify-center">
         {/* Deep Nebula Gradient Background */}
         <div className="absolute inset-0 bg-gradient-to-br from-purple-200/50 via-space-50 to-[#6B7BFF]/30" />
         
         {/* Floating Glassmorphism Orbs */}
         <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#B2BFFF] to-[#E5E9FF] rounded-full blur-[80px] opacity-60 animate-[pulse_8s_ease-in-out_infinite]" />
         <div className="absolute w-[400px] h-[400px] bg-gradient-to-bl from-purple-400/40 to-pink-300/30 rounded-full blur-[60px] opacity-50 translate-x-1/2 -translate-y-1/4 animate-[spin_40s_linear_infinite]" />

         {/* 3D Glass Object Centerpiece */}
         <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="relative z-20 w-[450px] h-[450px] rounded-[3rem] bg-white/20 backdrop-blur-3xl border border-white/50 shadow-[0_40px_80px_-20px_rgba(107,123,255,0.4)] flex items-center justify-center overflow-hidden rotate-[-4deg] hover:rotate-0 transition-transform duration-700"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/5" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/40 rounded-full blur-2xl" />
            
            <div className="text-center relative z-10 px-12">
               <div className="w-16 h-16 rounded-2xl bg-white/40 backdrop-blur-md flex items-center justify-center mx-auto mb-6 shadow-sm border border-white/50">
                  <span className="font-heading text-2xl font-bold text-eclipse-900">Y<span className="text-nebula-500">✦</span></span>
               </div>
               <h2 className="text-3xl font-heading font-bold text-eclipse-900 leading-tight mb-4 tracking-tight">
                 Ruang privat untuk kreasi publik Anda.
               </h2>
               <p className="text-eclipse-700 text-sm leading-relaxed">
                 Transparansi penuh dalam proses kreatif. Pantau, berikan ulasan, dan setujui karya digital Anda sebelum diluncurkan ke seluruh dunia.
               </p>
            </div>
         </motion.div>
      </div>
    </main>
  );
}

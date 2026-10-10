"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registrasi gagal. Silakan periksa kembali data Anda.");
      }

      setSuccess(true);
      
      setTimeout(() => {
         document.cookie = `auth_token=${data.token}; path=/; max-age=86400;`;
         localStorage.setItem("token", data.token);
         localStorage.setItem("user", JSON.stringify(data.user));
         window.location.href = "/client/dashboard";
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex w-full bg-white font-sans">
      
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen relative z-10 px-8 sm:px-12 md:px-16 lg:px-24 py-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <span className="font-heading text-xl font-bold tracking-tighter text-[#111111]">
              yunivrz <span className="text-purple-600">✦</span>
            </span>
          </Link>
          <Link href="/" className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5">
            &larr; Back to studio
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col max-w-[420px] w-full mx-auto justify-center py-4">
          
          <div className="text-[11px] font-bold tracking-wider uppercase text-purple-600 mb-4 bg-purple-50 inline-flex px-3 py-1.5 rounded-full w-fit">
            A NEW JOURNEY
          </div>
          
          <h1 className="text-[40px] leading-tight font-heading font-bold text-[#111111] mb-2 tracking-tight">
            Sign up.
          </h1>
          <p className="text-gray-500 text-[15px] mb-6">
            Join us to start bringing your ideas to life.
          </p>

          {/* Tabs */}
          <div className="flex p-1 bg-gray-50 rounded-xl mb-6 border border-gray-100">
            <Link href="/login" className="w-1/2 text-center py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors rounded-lg">
              Log In
            </Link>
            <div className="w-1/2 text-center py-2.5 bg-white text-sm font-medium text-gray-900 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-default">
              Sign Up
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-[13px] font-medium border border-red-100">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 rounded-xl bg-green-50 text-green-600 text-[13px] font-medium border border-green-100">
                Registration successful! Redirecting...
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-gray-700">Full name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anindya Putri"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-[14px] placeholder-gray-400"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0812..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-[14px] placeholder-gray-400"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-gray-700">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anindya.putri@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-[14px] placeholder-gray-400"
                required
              />
            </div>
            
            <div className="space-y-1.5 relative">
              <label className="block text-[13px] font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  minLength={8}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-[14px] placeholder-gray-400"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="block text-[13px] font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type your password"
                  minLength={8}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-[14px] placeholder-gray-400"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center pt-2 pb-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-purple-600" />
                <span className="text-[13px] text-gray-500 font-medium group-hover:text-gray-700 transition-colors">Ingat saya</span>
              </label>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading || success}
                className={`w-full py-3.5 text-white text-[15px] font-medium rounded-xl transition-all flex justify-center items-center ${loading || success ? 'bg-gray-800 cursor-not-allowed' : 'bg-[#111111] hover:bg-black shadow-[0_4px_14px_rgba(0,0,0,0.1)]'}`}
              >
                {loading ? 'Processing...' : 'Sign up'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
             <Link href="/login" className="text-[13px] text-gray-500 font-medium hover:text-gray-900 transition-colors">
               Already have an account? Log in &rarr;
             </Link>
             <p className="text-[11px] text-gray-400 mt-4">
               By continuing, you agree to our Terms of Service and Privacy Policy.
             </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-transparent text-[12px] text-gray-400 font-medium">
           <p>&copy; 2026 Yunivrz Studio</p>
           <a href="#" className="hover:text-gray-700 transition-colors">Need help? Contact us ↗</a>
        </div>
      </div>

      {/* Right Visual Side */}
      <div className="hidden lg:flex w-1/2 relative bg-[#F5F7FA] overflow-hidden p-6">
         <div className="absolute inset-0 bg-gradient-to-br from-[#E2E8F6] via-[#F5F7FA] to-[#E5E9FF] opacity-80" />
         
         {/* Particles / Sparkles effect */}
         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.6) 2px, transparent 2px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5) 2px, transparent 2px)', backgroundSize: '100px 100px' }}></div>
         
         <div className="relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col items-center">
            
            {/* Top Badge */}
            <div className="absolute top-8 left-8 z-20">
               <div className="bg-white/60 backdrop-blur-md border border-white/40 text-[10px] font-bold tracking-widest uppercase text-purple-600 px-4 py-2 rounded-full">
                  YOUR DIGITAL CANVAS
               </div>
            </div>

            {/* Glass Object */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[500px] h-[500px] flex items-center justify-center">
               <div className="relative w-[400px] h-[400px] rounded-full border-[40px] border-white/30 backdrop-blur-sm shadow-[inset_0_20px_50px_rgba(255,255,255,0.5),0_20px_50px_rgba(0,0,0,0.05)] rotate-45 transform skew-x-12 flex items-center justify-center">
                  <div className="absolute w-[120px] h-[120px] rounded-full bg-gradient-to-br from-purple-200 to-purple-400 shadow-[0_20px_40px_rgba(168,85,247,0.3)] -translate-y-12 translate-x-12"></div>
               </div>
            </div>

            {/* Bottom Card */}
            <div className="absolute bottom-8 left-8 right-8 z-20">
               <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-white">
                  <h2 className="text-[32px] font-heading font-bold text-[#111111] leading-tight mb-4 tracking-tight">
                    Start a new project<br />with us today.
                  </h2>
                  <p className="text-gray-500 text-[15px] mb-8 leading-relaxed max-w-md">
                    Track progress, manage revisions, and experience a seamless collaboration from concept to delivery.
                  </p>
                  <p className="text-purple-600 text-[13px] font-medium">
                    Creative process, redefined.
                  </p>
               </div>
            </div>

         </div>
      </div>
    </main>
  );
}

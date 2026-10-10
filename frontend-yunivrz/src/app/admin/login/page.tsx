"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/login", {
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

      document.cookie = `auth_token=${data.token}; path=/; max-age=86400;`;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user?.role_id === 1) { 
        window.location.href = "/admin/dashboard";
      } else {
        throw new Error("Akses ditolak. Akun ini tidak memiliki akses administrator.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex w-full bg-white font-sans">
      
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen relative z-10 px-8 sm:px-12 md:px-16 lg:px-24 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
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
        <div className="flex-1 flex flex-col max-w-[420px] w-full mx-auto justify-center">
          
          <div className="text-[11px] font-bold tracking-wider uppercase text-nebula-500 mb-6 bg-nebula-500/10 inline-flex px-3 py-1.5 rounded-full w-fit">
            WORKSPACE ADMIN
          </div>
          
          <h1 className="text-[40px] leading-tight font-heading font-bold text-[#111111] mb-3 tracking-tight">
            Administrator<br />Login.
          </h1>
          <p className="text-gray-500 text-[15px] mb-8">
            Manage projects, clients, and your studio's portfolio.
          </p>

          {/* Removed Tabs for Admin */}
          <div className="flex p-1 bg-gray-50 rounded-xl mb-8 border border-gray-100">
            <div className="w-full text-center py-2.5 bg-white text-sm font-medium text-gray-900 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-default">
              Admin Authentication
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-[13px] font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-gray-700">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anindya.putri@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-[15px] placeholder-gray-400"
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
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-[15px] placeholder-gray-400"
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-purple-600" />
                <span className="text-[13px] text-gray-500 font-medium group-hover:text-gray-700 transition-colors">Keep me signed in</span>
              </label>
              <a href="#" className="text-[13px] text-purple-600 font-medium hover:text-purple-700 transition-colors">Forgot password?</a>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 text-white text-[15px] font-medium rounded-xl transition-all flex justify-center items-center ${loading ? 'bg-gray-800 cursor-not-allowed' : 'bg-[#111111] hover:bg-black shadow-[0_4px_14px_rgba(0,0,0,0.1)]'}`}
              >
                {loading ? 'Processing...' : 'Log In'}
              </button>
            </div>
            
            <div>
              <button 
                type="button"
                className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 text-[15px] font-medium rounded-xl transition-all hover:bg-gray-50 flex items-center justify-center gap-2 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
             <Link href="/register" className="text-[13px] text-gray-500 font-medium hover:text-gray-900 transition-colors">
               New to Yunivrz? Sign up &rarr;
             </Link>
             <p className="text-[11px] text-gray-400 mt-6">
               By continuing, you agree to our Terms of Service and Privacy Policy.
             </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-transparent text-[12px] text-gray-400 font-medium">
           <p>&copy; 2026 Yunivrz Studio</p>
           <a href="#" className="hover:text-gray-700 transition-colors">Need help? Contact us ↗</a>
        </div>
      </div>

      {/* Right Visual Side */}
      <div className="hidden lg:flex w-1/2 relative bg-[#F5F7FA] overflow-hidden p-6">
         <div className="absolute inset-0 bg-gradient-to-br from-[#E2E8F6] via-[#F5F7FA] to-[#E5E9FF] opacity-80" />
         
         {/* Particles / Sparkles effect via radial gradients */}
         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.6) 2px, transparent 2px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5) 2px, transparent 2px)', backgroundSize: '100px 100px' }}></div>
         
         <div className="relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col items-center">
            
            {/* Top Badge */}
            <div className="absolute top-8 left-8 z-20">
               <div className="bg-white/60 backdrop-blur-md border border-white/40 text-[10px] font-bold tracking-widest uppercase text-purple-600 px-4 py-2 rounded-full">
                  A LITTLE SPACE FOR BIG POSSIBILITIES
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
                    Your next chapter,<br />a little closer.
                  </h2>
                  <p className="text-gray-500 text-[15px] mb-8 leading-relaxed max-w-md">
                    Follow your project, share your thoughts, and watch your story come to life. We're glad you're here.
                  </p>
                  <p className="text-purple-600 text-[13px] font-medium">
                    Thoughtfully digital. Deeply human.
                  </p>
               </div>
            </div>

         </div>
      </div>
    </main>
  );
}

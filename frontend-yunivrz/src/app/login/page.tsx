"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for now
    window.location.href = "/client/dashboard";
  };

  return (
    <main className="min-h-screen flex w-full bg-space-50">
      
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        
        <Link href="/" className="absolute top-12 left-8 md:left-16 lg:left-24 xl:left-32">
          <span className="font-heading text-xl font-bold tracking-tighter text-eclipse-900">
            yunivrz <span className="text-nebula-500">✦</span>
          </span>
        </Link>
        <Link href="/" className="absolute top-12 right-8 md:right-16 lg:right-24 xl:right-32 text-sm font-medium text-eclipse-700 hover:text-eclipse-900 transition-colors flex items-center gap-2">
          &larr; Back to studio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-6 bg-nebula-500/10 inline-block px-3 py-1 rounded-full">
            YOUR CLIENT SPACE
          </div>
          <h1 className="text-4xl font-heading font-bold text-eclipse-900 mb-4 tracking-tight">
            Good to have you back.
          </h1>
          <p className="text-eclipse-700 text-sm mb-10">
            Your ideas, updates and next steps. All in one place.
          </p>

          {/* Tabs */}
          <div className="flex p-1 bg-eclipse-900/5 rounded-xl mb-8">
            <button className="flex-1 py-2.5 bg-white text-eclipse-900 text-sm font-medium rounded-lg shadow-sm border border-eclipse-900/5">
              Sign In
            </button>
            <button className="flex-1 py-2.5 text-eclipse-700 hover:text-eclipse-900 text-sm font-medium rounded-lg transition-colors">
              Create an account
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-eclipse-900 mb-2">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full px-4 py-3 rounded-xl border border-eclipse-900/10 bg-white focus:outline-none focus:ring-2 focus:ring-nebula-500/50 focus:border-nebula-500 transition-all text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-eclipse-900 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-eclipse-900/10 bg-white focus:outline-none focus:ring-2 focus:ring-nebula-500/50 focus:border-nebula-500 transition-all text-sm"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-eclipse-900/20 text-nebula-500 focus:ring-nebula-500/50" />
                <span className="text-sm text-eclipse-700">Keep me signed in</span>
              </label>
              <a href="#" className="text-sm text-nebula-500 font-medium hover:text-eclipse-900 transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-eclipse-900 hover:bg-eclipse-800 text-white font-medium rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(11,12,16,0.3)]"
            >
              Sign In
            </button>
            
            <button 
              type="button"
              className="w-full py-4 bg-white border border-eclipse-900/10 text-eclipse-900 font-medium rounded-xl transition-all hover:bg-space-100 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </form>
          
          <div className="mt-12 text-center text-xs text-eclipse-700/60">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </motion.div>

      </div>

      {/* Right Visual Side */}
      <div className="hidden lg:flex w-1/2 relative bg-space-100 overflow-hidden p-8">
         <div className="absolute inset-0 bg-gradient-to-br from-nebula-300/40 via-space-50 to-nebula-500/20" />
         
         <div className="absolute top-12 right-12 z-20">
            <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 bg-white/50 backdrop-blur px-4 py-2 rounded-full shadow-sm">
              A LITTLE SPACE FOR BIG POSSIBILITIES
            </div>
         </div>

         {/* 3D Nebula Mockup Placeholder */}
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full border border-white/40 bg-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(140,155,255,0.4)] animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-32 h-32 rounded-full bg-nebula-500 blur-2xl opacity-50" />
         </div>

         {/* Overlay Card */}
         <div className="mt-auto relative z-20 w-full max-w-xl mx-auto bg-white/70 backdrop-blur-xl border border-white p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(140,155,255,0.15)]">
            <h2 className="text-4xl font-heading font-bold text-eclipse-900 leading-tight mb-6 tracking-tight">
              Your next chapter,<br />a little closer.
            </h2>
            <p className="text-eclipse-700 text-sm leading-relaxed mb-8">
              Follow your project, share your thoughts, and watch your story come to life. We're glad you're here.
            </p>
            <p className="text-nebula-500 text-xs font-medium uppercase tracking-widest">
              Thoughtfully digital. Deeply personal.
            </p>
         </div>
      </div>
    </main>
  );
}
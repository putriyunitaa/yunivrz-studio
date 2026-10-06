"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-space-50 pt-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-32">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-4"
            >
              A. Public Storefront / The Studio
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-bold text-eclipse-900 mb-8 tracking-tight leading-[1.1]"
            >
              An independent studio.<br />
              A wider universe.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-eclipse-700 max-w-md mb-8 leading-relaxed"
            >
              Yunivrz Studio is an independent digital practice crafting thoughtful, premium experiences. Based in Jakarta, connected everywhere. Since 2021, I've helped people and brands turn their stories into digital experiences worth remembering.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                href="https://wa.me/1234567890" 
                className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-white text-eclipse-900 border border-eclipse-900/10 font-medium transition-all hover:bg-space-100 hover:shadow-sm"
              >
                Start a conversation &rarr;
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 w-full aspect-[4/3] rounded-3xl bg-eclipse-900/5 relative overflow-hidden flex items-center justify-center"
          >
             {/* Abstract Nebula Placeholder */}
             <div className="absolute inset-0 bg-gradient-to-br from-nebula-300/30 via-space-50 to-nebula-500/20 blur-xl" />
             <div className="w-48 h-48 rounded-full border border-white/40 bg-white/10 backdrop-blur-3xl shadow-[0_0_60px_rgba(140,155,255,0.4)]" />
          </motion.div>
        </div>

      </div>

      {/* Manifesto Section */}
      <section className="bg-eclipse-900/5 py-32 border-y border-eclipse-900/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-xs font-bold tracking-widest uppercase text-nebula-500 mb-8">
            Our Manifesto
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-eclipse-900 leading-[1.2] max-w-4xl mb-20 tracking-tight">
            We believe the best digital experiences don't ask for attention. They earn a connection.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Human, first.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">I begin with people, not pixels. Your unique story and personality shape every design decision.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Less, but better.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">I make space for the things that matter. Every detail has a clear, intentional purpose.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-eclipse-900 mb-4">Crafted personally.</h3>
              <p className="text-eclipse-700 text-sm leading-relaxed">As an independent studio, you work directly with the creator. No layers, just focused expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Creator Section (Fixed from 4 people to 1 solo expert) */}
      <section className="py-32 bg-space-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-eclipse-900 tracking-tight">
              The creator behind the craft.
            </h2>
            <p className="text-eclipse-700 max-w-xs text-sm">
              One shared obsession with getting the details right.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square md:aspect-[3/4] rounded-3xl bg-eclipse-900/5 relative overflow-hidden">
               {/* Profile Image Placeholder */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
               <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-2xl font-bold text-space-50 mb-1">Your Name</h3>
                  <p className="text-space-50/80 text-sm">Founder & Lead Designer</p>
               </div>
            </div>
            <div className="max-w-md">
               <p className="text-lg text-eclipse-700 leading-relaxed mb-8">
                 Hi, I'm the founder of Yunivrz Studio. I built this independent practice to bridge the gap between highly personal storytelling and premium digital execution.
               </p>
               <p className="text-lg text-eclipse-700 leading-relaxed mb-8">
                 When you work with Yunivrz, you're not getting a junior designer or an account manager. You're collaborating directly with a seasoned expert dedicated to making your project perfect.
               </p>
               <Link href="/catalog" className="text-nebula-500 font-medium hover:text-eclipse-900 transition-colors">View my recent work &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
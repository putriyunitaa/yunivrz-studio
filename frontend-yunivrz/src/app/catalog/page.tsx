"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const categories = ["Semua", "Micro-Moments", "Milestones", "Custom Solutions"];

const projects = [
  { id: 1, title: "Sagara Living", category: "Milestones", desc: "A quieter kind of extraordinary.", style: "landscape" },
  { id: 2, title: "Lumina", category: "Micro-Moments", desc: "Anindya & Rizky Wedding.", style: "portrait" },
  { id: 3, title: "Kopi Kala", category: "Milestones", desc: "Aroma pagi hari dalam layar.", style: "landscape" },
  { id: 4, title: "Nusa Storefront", category: "Custom Solutions", desc: "Platform portal khusus anggota.", style: "square" },
  { id: 5, title: "Slow Sunday", category: "Micro-Moments", desc: "Digital RSVP untuk perayaan kecil.", style: "portrait" },
  { id: 6, title: "Ruang Collective", category: "Milestones", desc: "Studio arsitektur portofolio.", style: "landscape" },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProjects = activeCategory === "Semua" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="flex-1 w-full bg-space-50 pt-32 pb-32 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/20 to-[#6B7BFF]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold text-eclipse-900 mb-8 tracking-tight leading-[1.1] max-w-4xl"
          >
            Arsip karya yang merayakan esensi *brand* Anda.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-2"
          >
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-eclipse-900 text-white shadow-md shadow-eclipse-900/20' 
                    : 'bg-white border border-eclipse-900/10 text-eclipse-700 hover:text-eclipse-900 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              key={project.id} 
              className={`group cursor-pointer ${
                project.style === 'landscape' ? 'md:col-span-2' : 
                project.style === 'portrait' ? 'row-span-2' : ''
              }`}
            >
              <Link href={`/catalog/${project.id}`} className="block h-full">
                <div className={`w-full bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(140,155,255,0.15)] transition-all duration-500 overflow-hidden flex flex-col p-6 relative ${
                  project.style === 'portrait' ? 'min-h-[500px]' : 'min-h-[300px]'
                }`}>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                   
                   {/* Abstract Placeholder Visual */}
                   <div className="flex-1 bg-gradient-to-br from-[#F4F5F9] to-[#EAEAF3] rounded-[1.5rem] mb-6 flex items-center justify-center overflow-hidden relative">
                      <div className="w-full h-full absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIiBmaWxsPSJyZ2JhKDIwMCwyMDAsMjAwLDAuMikiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-50 mix-blend-multiply" />
                      <div className="text-eclipse-900/20 font-bold uppercase tracking-widest relative z-10 text-xs">
                        {project.title}
                      </div>
                   </div>

                   <div className="flex justify-between items-end relative z-20">
                      <div>
                        <div className="text-[10px] font-bold tracking-widest uppercase text-purple-500 mb-2">{project.category}</div>
                        <h3 className="text-xl font-bold text-eclipse-900 mb-1 leading-tight">{project.title}</h3>
                        <p className="text-sm text-eclipse-700">{project.desc}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white border border-eclipse-900/10 flex items-center justify-center text-eclipse-900 group-hover:bg-eclipse-900 group-hover:text-white transition-colors transform group-hover:rotate-45">
                        &rarr;
                      </div>
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const categories = ["Semua", "micro_moments", "milestones", "custom_solutions"];

const DUMMY_CATALOGS = [
  {
    id: 1,
    slug: 'sagara-living',
    title: 'Sagara Living',
    category: 'custom_solutions',
    description: 'A quieter kind of extraordinary. E-commerce website for a premium furniture brand.',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  },
  {
    id: 2,
    slug: 'lumina-wedding',
    title: 'Lumina Wedding',
    category: 'micro_moments',
    description: 'Digital wedding invitation with interactive timeline and RSVP.',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    id: 3,
    slug: 'aksara-studio',
    title: 'Aksara Creative',
    category: 'milestones',
    description: 'Portfolio website for an independent creative agency.',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 4,
    slug: 'kopi-kala',
    title: 'Kopi Kala',
    category: 'milestones',
    description: 'Local coffee shop landing page and menu catalog.',
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
  },
  {
    id: 5,
    slug: 'birthday-gift',
    title: 'Interactive Birthday',
    category: 'micro_moments',
    description: 'A personalized interactive web experience for a special moment.',
    thumbnail: '/images/catalogs/bday.jpg',
  }
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/catalogs", {
          headers: {
            "Accept": "application/json",
          }
        });
        const data = await response.json();
        // If data is empty array, use dummy data so page doesn't look broken
        setCatalogs(data && data.length > 0 ? data : DUMMY_CATALOGS);
      } catch (error) {
        console.error("Failed to fetch catalogs:", error);
        setCatalogs(DUMMY_CATALOGS); // Fallback if backend is down
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogs();
  }, []);

  const filteredProjects = activeCategory === "Semua" 
    ? catalogs 
    : catalogs.filter(p => p.category === activeCategory);

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
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-eclipse-900 mb-8 tracking-tight leading-[1.1] max-w-4xl"
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
        {loading ? (
           <div className="py-20 text-center text-eclipse-700">Memuat katalog...</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              // Create an alternating style for bento grid look
              const style = idx % 3 === 0 ? 'landscape' : (idx % 2 === 0 ? 'portrait' : 'square');
              
              return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                key={project.id} 
                className={`group cursor-pointer ${
                  style === 'landscape' ? 'md:col-span-2' : 
                  style === 'portrait' ? 'row-span-2' : ''
                }`}
              >
                <Link href={`/work/${project.slug || project.id}`} className="block h-full">
                  <div className={`w-full bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(140,155,255,0.15)] transition-all duration-500 overflow-hidden flex flex-col p-6 relative ${
                    style === 'portrait' ? 'min-h-[500px]' : 'min-h-[300px]'
                  }`}>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                     
                     {/* Abstract Placeholder Visual / Thumbnail */}
                     <div className="flex-1 bg-gradient-to-br from-[#F4F5F9] to-[#EAEAF3] rounded-[1.5rem] mb-6 flex items-center justify-center overflow-hidden relative">
                        {project.thumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as any).src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80";
                            }}
                          />
                        ) : (
                          <>
                            <div className="w-full h-full absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIiBmaWxsPSJyZ2JhKDIwMCwyMDAsMjAwLDAuMikiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-50 mix-blend-multiply" />
                            <div className="text-eclipse-900/20 font-bold uppercase tracking-widest relative z-10 text-xs">
                              {project.title}
                            </div>
                          </>
                        )}
                     </div>

                     <div className="flex justify-between items-end relative z-20">
                        <div>
                          <div className="text-[10px] font-bold tracking-widest uppercase text-purple-500 mb-2">{project.category.replace('_', ' ')}</div>
                          <h3 className="text-xl font-bold text-eclipse-900 mb-1 leading-tight">{project.title}</h3>
                          <p className="text-sm text-eclipse-700 line-clamp-2">{project.description}</p>
                        </div>
                        <div className="w-10 h-10 min-w-[40px] ml-4 rounded-full bg-white border border-eclipse-900/10 flex items-center justify-center text-eclipse-900 group-hover:bg-eclipse-900 group-hover:text-white transition-colors transform group-hover:rotate-45">
                          &rarr;
                        </div>
                     </div>
                  </div>
                </Link>
              </motion.div>
            )})}
          </motion.div>
        )}

      </div>
    </main>
  );
}

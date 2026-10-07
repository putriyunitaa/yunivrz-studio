"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("http://localhost:8080/api/clients", {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);
  return (
    <div className="max-w-6xl">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-2 tracking-tight">
            Direktori Klien (CRM)
          </h1>
          <p className="text-eclipse-700 text-sm leading-relaxed max-w-xl">
            Pusat data personal untuk mengelola daftar klien, melihat riwayat proyek, dan mengatur akses *login* Portal Klien mereka.
          </p>
        </motion.div>
        
        <div className="flex gap-3">
           <button className="px-5 py-2.5 bg-eclipse-900 text-white text-sm font-bold rounded-xl hover:bg-eclipse-800 transition-colors shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              Undang Klien Baru
           </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-eclipse-900/10 shadow-sm overflow-hidden flex flex-col">
         
         {/* Toolbar & Search */}
         <div className="p-4 border-b border-eclipse-900/5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-md">
            <div className="relative w-full sm:w-72">
               <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-eclipse-900/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               <input 
                  type="text" 
                  placeholder="Cari nama atau email..." 
                  className="w-full pl-9 pr-4 py-2 bg-space-50 border border-eclipse-900/10 rounded-lg text-sm focus:outline-none focus:border-nebula-500 focus:ring-1 focus:ring-nebula-500 transition-all"
               />
            </div>
            
            <div className="flex gap-2">
               <select className="bg-space-50 border border-eclipse-900/10 rounded-lg text-sm px-3 py-2 focus:outline-none appearance-none font-medium text-eclipse-700">
                  <option>Semua Status</option>
                  <option>Aktif</option>
                  <option>Selesai</option>
               </select>
            </div>
         </div>

         {/* Data Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-space-50/50">
                  <tr>
                     <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-eclipse-700">Klien</th>
                     <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-eclipse-700">Perusahaan/Proyek</th>
                     <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-eclipse-700">Status Akses</th>
                     <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-eclipse-700">Proyek</th>
                     <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-eclipse-700 text-right">Aksi</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-eclipse-900/5">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-eclipse-700">
                        Memuat data klien...
                      </td>
                    </tr>
                  ) : clients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-eclipse-700">
                        Belum ada klien terdaftar.
                      </td>
                    </tr>
                  ) : clients.map((client) => (
                     <tr key={client.id} className="hover:bg-space-50/30 transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-nebula-500/10 text-nebula-500 flex items-center justify-center font-bold text-xs">
                                 {client.name.charAt(0)}
                              </div>
                              <div>
                                 <div className="font-bold text-eclipse-900">{client.name}</div>
                                 <div className="text-xs text-eclipse-700/60">{client.email}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-eclipse-700">{client.company || '-'}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                              client.is_active ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-eclipse-900/5 text-eclipse-700'
                           }`}>
                              {client.is_active ? 'Aktif' : 'Nonaktif'}
                           </span>
                           <div className="text-[10px] text-eclipse-700/50 mt-1 ml-1">ID: {client.id}</div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="font-medium text-eclipse-900">{client.projects_count || 0}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-nebula-500 font-bold hover:text-eclipse-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-space-50 opacity-0 group-hover:opacity-100">
                              Kelola
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         {/* Minimal Pagination */}
         <div className="p-4 border-t border-eclipse-900/5 flex items-center justify-between text-xs text-eclipse-700">
            <div>Menampilkan 1-4 dari 4 klien</div>
            <div className="flex gap-1">
               <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-eclipse-900/10 text-eclipse-900/30 cursor-not-allowed">
                  &larr;
               </button>
               <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-eclipse-900/10 text-eclipse-900 hover:bg-space-50">
                  &rarr;
               </button>
            </div>
         </div>

      </div>

    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [recentLog, setRecentLog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get User from LocalStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 2. Fetch Projects and Invoices
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const headers = {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        };

        // Fetch Projects
        const projRes = await fetch("http://localhost:8080/api/projects", { headers });
        const projData = await projRes.json();
        let activeProject = null;
        if (projData && projData.length > 0) {
          activeProject = projData[0];
          setProject(activeProject);
        }

        // Fetch Invoices
        const invRes = await fetch("http://localhost:8080/api/invoices", { headers });
        const invData = await invRes.json();
        
        let unpaid = 0;
        if (Array.isArray(invData)) {
            invData.forEach(inv => {
                if (inv.status === 'unpaid' || inv.status === 'overdue') {
                    unpaid += parseFloat(inv.amount);
                }
            });
        }
        setTotalUnpaid(unpaid);

        // Fetch Recent Log
        if (activeProject) {
          const logRes = await fetch(`http://localhost:8080/api/project-logs?project_id=${activeProject.id}`, { headers });
          const logData = await logRes.json();
          if (Array.isArray(logData) && logData.length > 0) {
             setRecentLog(logData[0]);
          }
        }

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
     return <div className="max-w-4xl pt-10">Memuat dasbor...</div>;
  }

  // Format currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-3 tracking-tight">
          Selamat datang kembali, {user?.name?.split(' ')[0] || 'Klien'}.
        </h1>
        <p className="text-eclipse-700 text-sm leading-relaxed max-w-2xl">
          Ruang eksklusif Anda untuk melihat pembaruan proyek, membagikan inspirasi, dan meninjau tahap desain secara langsung.
        </p>
      </motion.div>

      {project ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             {/* Status Cards */}
             <div className="p-6 rounded-2xl bg-white border border-eclipse-900/5 shadow-[0_10px_30px_-15px_rgba(11,12,16,0.05)]">
                <div className="text-[10px] font-bold tracking-widest uppercase text-nebula-500 mb-2">PROYEK & STATUS</div>
                <div className="text-2xl font-bold text-eclipse-900 mb-1">{project.title}</div>
                <div className="text-xs text-eclipse-700">{project.status === 'pending' ? 'Menunggu diproses' : (project.progress_percent + '% Selesai')}</div>
             </div>
             <div className="p-6 rounded-2xl bg-white border border-eclipse-900/5 shadow-[0_10px_30px_-15px_rgba(11,12,16,0.05)]">
                <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">TENGGAT WAKTU</div>
                <div className="text-2xl font-bold text-eclipse-900 mb-1">
                  {project.deadline ? new Date(project.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Belum Ditentukan'}
                </div>
                <div className="text-xs text-eclipse-700">Estimasi penyelesaian</div>
             </div>
             <div className="p-6 rounded-2xl bg-white border border-eclipse-900/5 shadow-[0_10px_30px_-15px_rgba(11,12,16,0.05)]">
                <div className="text-[10px] font-bold tracking-widest uppercase text-eclipse-700 mb-2">SISA TAGIHAN</div>
                <div className="text-2xl font-bold text-eclipse-900 mb-1">{formatRupiah(totalUnpaid)}</div>
                <div className="text-xs text-eclipse-700">{totalUnpaid > 0 ? 'Menunggu pembayaran' : 'Lunas'}</div>
             </div>
          </div>

          <div className="bg-eclipse-900/5 rounded-3xl p-8 md:p-12 border border-eclipse-900/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-nebula-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             
             <div className="relative z-10">
                <div className="text-[10px] font-bold tracking-widest uppercase text-nebula-500 mb-4 bg-white/50 backdrop-blur px-3 py-1 rounded-full inline-block">
                   PEMBARUAN TERBARU
                </div>
                {recentLog ? (
                  <>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-eclipse-900 mb-4 capitalize">
                       {recentLog.action.replace(/_/g, ' ')}
                    </h2>
                    <p className="text-sm text-eclipse-700 leading-relaxed max-w-lg mb-8">
                       {recentLog.description}
                       <br />
                       <span className="text-xs opacity-70 mt-2 block">{new Date(recentLog.created_at).toLocaleString('id-ID')}</span>
                    </p>
                    <Link href="/client/revisions" className="px-6 py-3 bg-eclipse-900 text-white text-sm font-medium rounded-xl hover:bg-eclipse-800 transition-all shadow-[0_10px_20px_-10px_rgba(11,12,16,0.3)]">
                       Tinjau Utas Kolaborasi
                    </Link>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-eclipse-900 mb-4">
                       Belum ada pembaruan proyek.
                    </h2>
                    <p className="text-sm text-eclipse-700 leading-relaxed max-w-lg mb-8">
                       Desainer kami akan segera memberikan pembaruan pertama untuk Anda di sini.
                    </p>
                  </>
                )}
             </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-eclipse-900/10">
          <p className="text-eclipse-700">Belum ada proyek aktif. Silakan hubungi admin.</p>
        </div>
      )}
    </div>
  );
}

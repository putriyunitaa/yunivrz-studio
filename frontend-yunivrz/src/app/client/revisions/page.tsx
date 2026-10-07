"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ClientRevisions() {
  const [user, setUser] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [revisions, setRevisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // 1. Get User
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // 2. Fetch Projects and Revisions
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const headers = {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        };

        const projRes = await fetch("http://localhost:8080/api/projects", { headers });
        const projData = await projRes.json();
        
        let activeProject = null;
        if (projData && projData.length > 0) {
          activeProject = projData[0];
          setProject(activeProject);
        }

        if (activeProject) {
          const revRes = await fetch(`http://localhost:8080/api/project-revisions?project_id=${activeProject.id}`, { headers });
          const revData = await revRes.json();
          // Sort ascending for chat UI
          if (Array.isArray(revData)) {
            setRevisions(revData.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
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

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !project) return;
    
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("http://localhost:8080/api/project-revisions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          project_id: project.id,
          content: newMessage
        })
      });

      if (response.ok) {
        const rev = await response.json();
        setRevisions(prev => [...prev, rev]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (loading) {
    return <div className="max-w-4xl pt-10">Memuat utas revisi...</div>;
  }

  if (!project) {
    return <div className="max-w-4xl pt-10">Belum ada proyek aktif untuk direvisi.</div>;
  }

  return (
    <div className="max-w-4xl h-[calc(100vh-160px)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-heading font-bold text-eclipse-900 mb-3 tracking-tight">
          Utas Revisi & Kolaborasi
        </h1>
        <p className="text-eclipse-700 text-sm leading-relaxed max-w-2xl">
          Tinggalkan komentar, unggah referensi tambahan, dan diskusikan draf terbaru secara langsung dengan kreator.
        </p>
      </motion.div>

      {/* Chat Interface */}
      <div className="flex-1 bg-white rounded-3xl border border-eclipse-900/10 shadow-sm flex flex-col overflow-hidden relative">
         
         {/* Background Subtle Glow */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-nebula-500/5 rounded-full blur-[80px] pointer-events-none" />

         {/* Chat History */}
         <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 relative z-10">
            {revisions.length === 0 ? (
               <div className="text-center text-eclipse-700">Belum ada riwayat percakapan.</div>
            ) : (
               revisions.map((rev) => {
                  const isClient = rev.user?.role_id === 2; // Assuming 2 is client
                  const isMe = rev.user_id === user?.id;

                  return (
                    <div key={rev.id} className={`flex gap-4 max-w-[80%] ${isMe ? 'self-end flex-row-reverse' : ''}`}>
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-md ${
                          isMe ? 'bg-eclipse-900 text-white' : 'bg-nebula-500 text-white'
                       }`}>
                          {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : 'Y'}
                       </div>
                       <div>
                          <div className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                             isMe 
                               ? 'bg-nebula-500 text-white rounded-tr-sm shadow-nebula-500/20' 
                               : 'bg-space-50 border border-eclipse-900/5 text-eclipse-900 rounded-tl-sm'
                          }`}>
                             {rev.content}
                          </div>
                          {rev.preview_url && (
                             <div className="mt-2 text-[10px] uppercase font-bold text-eclipse-700">
                               <a href={rev.preview_url} target="_blank" rel="noopener noreferrer" className="text-nebula-500 underline hover:text-eclipse-900">Lihat Pratinjau</a>
                             </div>
                          )}
                       </div>
                    </div>
                  );
               })
            )}
         </div>

         {/* Input Area */}
         <div className="p-4 border-t border-eclipse-900/10 bg-white/80 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3 bg-space-50 p-2 rounded-2xl border border-eclipse-900/5 focus-within:border-nebula-500/30 focus-within:ring-4 focus-within:ring-nebula-500/10 transition-all">
               <button className="w-10 h-10 flex items-center justify-center rounded-xl text-eclipse-700 hover:bg-eclipse-900/5 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
               </button>
               <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ketik balasan Anda di sini..." 
                  className="flex-1 bg-transparent text-sm focus:outline-none"
               />
               <button 
                  onClick={handleSendMessage}
                  className="px-6 py-2.5 bg-eclipse-900 text-white text-sm font-bold rounded-xl hover:bg-eclipse-800 transition-colors shadow-sm"
               >
                  Kirim
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

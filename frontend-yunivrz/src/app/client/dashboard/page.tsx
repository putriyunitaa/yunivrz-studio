"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getWhatsAppUrl } = useSettings();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        };

        const [userRes, projRes, invRes] = await Promise.all([
          fetch('http://localhost:8000/api/user', { headers }),
          fetch('http://localhost:8000/api/projects', { headers }),
          fetch('http://localhost:8000/api/invoices', { headers })
        ]);
        
        const userData = await userRes.json();
        const projData = await projRes.json();
        const invData = await invRes.json();

        setUser(userData);
        setProjects(projData);
        setInvoices(invData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="animate-pulse flex gap-6"><div className="w-2/3 h-64 bg-gray-200 rounded-2xl"></div><div className="w-1/3 h-64 bg-gray-200 rounded-2xl"></div></div>;
  }

  const activeProjects = projects.filter(p => p.status !== 'completed' && p.status !== 'cancelled');
  const unpaidInvoices = invoices.filter(i => i.status === 'unpaid');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 tracking-tight mb-2">
          Welcome back, {user?.name.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500">Berikut adalah ringkasan progres proyek dan status tagihan Anda saat ini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Projects */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-heading font-bold text-gray-900">Active Projects</h2>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">{activeProjects.length} Ongoing</span>
            </div>

            {activeProjects.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 px-6">
                <p className="text-gray-500 text-sm">Saat ini Anda belum memiliki proyek yang sedang berjalan. Mari ciptakan sesuatu yang luar biasa bersama!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {activeProjects.map(project => (
                  <div key={project.id} className="group border border-gray-100 rounded-2xl p-6 hover:border-purple-200 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-xs font-bold text-gray-400 mb-1">{project.project_code}</div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{project.title}</h3>
                      </div>
                      <span className="text-xs font-bold capitalize bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                        <span>Progress</span>
                        <span>{project.progress_percent}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                          style={{ width: `${project.progress_percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          
          {/* Action Required / Invoices */}
          <div className="bg-[#111111] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
            <h2 className="text-xl font-heading font-bold mb-6 relative z-10">Pending Invoices</h2>
            
            {unpaidInvoices.length === 0 ? (
              <p className="text-gray-400 text-sm relative z-10">Semua tagihan telah lunas. Anda tidak memiliki tagihan yang tertunda.</p>
            ) : (
              <div className="space-y-4 relative z-10">
                {unpaidInvoices.map(invoice => (
                  <div key={invoice.id} className="bg-white/10 rounded-xl p-4 border border-white/5 hover:bg-white/20 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-white/50">{invoice.invoice_number}</span>
                      <span className="text-[10px] uppercase font-bold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded">Unpaid</span>
                    </div>
                    <div className="font-bold text-lg mb-1">
                      Rp {number_format(invoice.amount, 0, ',', '.')}
                    </div>
                    <div className="text-xs text-white/60">
                      Jatuh Tempo: {new Date(invoice.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 bg-white text-[#111111] py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
                  Bayar Sekarang
                </button>
              </div>
            )}
          </div>
          
          {/* Support Widget */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-500 mb-6">Tim desainer dan developer kami selalu siap sedia membantu mewujudkan visi Anda.</p>
            <a href={getWhatsAppUrl("Halo Tim Yunivrz Studio, saya butuh bantuan untuk proyek saya.")} target="_blank" rel="noopener noreferrer" className="w-full bg-[#F5F7FA] text-gray-900 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
              Chat Support
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper to format number
function number_format(number: number, decimals: number, dec_point: string, thousands_sep: string) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s: any = '',
        toFixedFix = function (n: number, prec: number) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

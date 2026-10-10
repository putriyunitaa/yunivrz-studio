"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

export default function Footer() {
  const pathname = usePathname();
  const { settings, getWhatsAppUrl } = useSettings();
  
  // Hide footer on specific routes
  const hideFooterRoutes = ["/login", "/register", "/client", "/admin"];
  const shouldHide = hideFooterRoutes.some(route => pathname.startsWith(route));

  if (shouldHide) return null;

  return (
    <footer className="bg-eclipse-900 text-white pt-24 pb-12 rounded-t-[3rem] relative overflow-hidden">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nebula-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
       
       <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
             
             {/* Brand Column */}
             <div className="lg:col-span-2">
                <Link href="/" className="inline-block font-heading text-3xl font-bold tracking-tighter text-white mb-6">
                  yunivrz <span className="text-nebula-500">✦</span>
                </Link>
                <p className="text-white/60 max-w-sm text-sm leading-relaxed mb-8">
                  Sebuah studio digital independen yang merancang website premium dan identitas visual menawan dengan presisi serta tujuan yang jelas.
                </p>
                <a 
                  href={getWhatsAppUrl("Halo Yunivrz Studio, saya tertarik untuk membuat proyek digital...")} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-eclipse-900 text-sm font-bold rounded-full hover:bg-space-100 transition-colors"
                >
                  Let's Talk &rarr;
                </a>
             </div>

             {/* Links Column 1 */}
             <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-6">NAVIGATION</h4>
                <ul className="space-y-4">
                   <li><Link href="/work" className="text-white/70 hover:text-white transition-colors text-sm">Work</Link></li>
                   <li><Link href="/pricing" className="text-white/70 hover:text-white transition-colors text-sm">Pricing & Packages</Link></li>
                   <li><Link href="/about" className="text-white/70 hover:text-white transition-colors text-sm">About Studio</Link></li>
                   <li><Link href="/login" className="text-white/70 hover:text-white transition-colors text-sm">Client Portal</Link></li>
                </ul>
             </div>

             {/* Links Column 2 */}
             <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-6">SOCIAL MEDIA</h4>
                <ul className="space-y-4">
                   <li>
                     <a 
                       href={settings.instagram_business || "https://www.instagram.com/heyyunivrz_/"} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1.5"
                     >
                       Instagram
                     </a>
                   </li>
                   <li>
                     <a 
                       href={settings.linkedin_url || "https://www.linkedin.com/in/ptryntt"} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-white/70 hover:text-white transition-colors text-sm"
                     >
                       LinkedIn
                     </a>
                   </li>
                   <li>
                     <a 
                       href={settings.github_url || "https://github.com/putriyunitaa"} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-white/70 hover:text-white transition-colors text-sm"
                     >
                       GitHub
                     </a>
                   </li>
                   <li>
                     <a 
                       href={settings.instagram_developer || "https://www.instagram.com/ptryntaa_/"} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-white/70 hover:text-white transition-colors text-sm"
                     >
                       Developer IG
                     </a>
                   </li>
                </ul>
             </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/40 gap-4">
             <p>&copy; {new Date().getFullYear()} Yunivrz Studio. All Rights Reserved.</p>
             <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             </div>
          </div>
       </div>
    </footer>
  );
}

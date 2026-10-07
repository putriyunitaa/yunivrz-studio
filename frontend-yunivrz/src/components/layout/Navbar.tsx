"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar on specific routes
  const hideNavRoutes = ["/login", "/client", "/admin"];
  const shouldHide = hideNavRoutes.some(route => pathname.startsWith(route));

  if (shouldHide) return null;

  const navLinks = [
    { name: "Karya", path: "/catalog" },
    { name: "Layanan", path: "/services" },
    { name: "Harga", path: "/pricing" },
    { name: "Tentang", path: "/about" },
    { name: "Jurnal", path: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-space-50/90 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-heading text-xl font-bold tracking-tighter text-eclipse-900 group-hover:text-nebula-500 transition-colors">
            yunivrz <span className="text-nebula-500">✦</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-[13px] font-medium transition-colors hover:text-eclipse-900 ${
                pathname === link.path ? "text-eclipse-900" : "text-eclipse-700/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-[13px] font-medium text-eclipse-700/80 hover:text-eclipse-900 transition-colors"
          >
            Client Login
          </Link>
          <Link
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-eclipse-900 text-white text-[13px] font-medium transition-all hover:bg-eclipse-800 shadow-[0_4px_10px_rgba(11,12,16,0.15)] flex gap-2 group"
          >
            Mulai Proyek 
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

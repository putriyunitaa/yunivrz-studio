"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Portofolio", path: "/catalog" },
    { name: "Paket Harga", path: "/pricing" },
    { name: "Tentang", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-eclipse-900/5 bg-space-50/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
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
              className={`text-sm font-medium transition-colors hover:text-nebula-500 relative ${
                pathname === link.path ? "text-eclipse-900" : "text-eclipse-700"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-nebula-500 rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm font-medium text-eclipse-700 hover:text-eclipse-900 transition-colors"
          >
            Client Login
          </Link>
          <Link
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-eclipse-900 text-space-50 text-sm font-medium transition-all hover:bg-eclipse-800 hover:shadow-[0_0_15px_rgba(140,155,255,0.3)]"
          >
            Konsultasi Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
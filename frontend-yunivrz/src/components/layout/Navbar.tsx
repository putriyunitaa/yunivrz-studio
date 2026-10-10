"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getWhatsAppUrl } = useSettings();

  // Hide navbar on specific routes
  const hideNavRoutes = ["/login", "/register", "/client", "/admin"];
  const shouldHide = hideNavRoutes.some(route => pathname.startsWith(route));

  if (shouldHide) return null;

  const navLinks = [
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Insights", path: "/insights" },
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
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-[13px] font-medium text-eclipse-700/80 hover:text-eclipse-900 transition-colors"
          >
            Client Login
          </Link>
          <Link
            href="/login"
            className="hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full bg-eclipse-900 text-white text-[13px] font-medium transition-all hover:bg-eclipse-800 shadow-[0_4px_10px_rgba(11,12,16,0.15)] gap-2 group"
          >
            Start Project 
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-eclipse-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-xl font-heading font-bold transition-colors ${
                pathname === link.path ? "text-nebula-500" : "text-eclipse-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-gray-100 w-full my-2" />
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-medium text-eclipse-900"
          >
            Client Portal
          </Link>
          <a
            href={getWhatsAppUrl("Halo Yunivrz Studio, saya ingin memulai proyek digital...")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center h-14 rounded-full bg-eclipse-900 text-white font-medium mt-2"
          >
            Start a Project &rarr;
          </a>
        </div>
      )}
    </header>
  );
}

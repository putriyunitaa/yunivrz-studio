"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Micro",
    description: "Ideal untuk undangan digital pernikahan & kado virtual.",
    price: "149k",
    period: "/ project",
    popular: false,
    features: [
      "Desain template premium",
      "Custom nama & tanggal",
      "Galeri foto (max 10)",
      "Fitur RSVP & Buku Tamu",
      "Background music",
      "Revisi minor 1x",
    ],
  },
  {
    name: "Milestone",
    description: "Sempurna untuk personal branding & website acara besar.",
    price: "499k",
    period: "/ project",
    popular: true,
    features: [
      "Semua fitur Micro",
      "Desain semi-custom",
      "Custom domain (.com/.id)",
      "Galeri foto (unlimited)",
      "Integrasi form custom",
      "Revisi 3x",
      "Prioritas support WA",
    ],
  },
  {
    name: "Enterprise",
    description: "Solusi website bisnis & portal khusus dengan backend.",
    price: "Custom",
    period: "",
    popular: false,
    features: [
      "Desain UI/UX eksklusif (Figma)",
      "Pengembangan Full-Stack",
      "Dashboard Admin & CMS",
      "Integrasi Payment Gateway",
      "Optimasi SEO",
      "Revisi unlimited (fase desain)",
      "Maintenance 3 bulan",
    ],
  },
];

const CheckIcon = () => (
  <svg className="w-5 h-5 text-nebula-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function PricingPage() {
  return (
    <main className="flex-1 w-full bg-space-50 py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-nebula-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-eclipse-900 mb-6"
          >
            Investasi untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-eclipse-900 to-nebula-500">Masa Depan Digital</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-eclipse-700 max-w-2xl mx-auto"
          >
            Pilih paket yang sesuai dengan skala proyek Anda. Transparan, tanpa biaya tersembunyi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex flex-col p-8 rounded-[2rem] bg-white border ${
                plan.popular 
                  ? "border-nebula-500/50 shadow-[0_20px_60px_-15px_rgba(140,155,255,0.2)] md:-mt-4" 
                  : "border-eclipse-900/5 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-eclipse-900 text-space-50 text-xs font-bold rounded-full tracking-wider uppercase">
                  Paling Diminati
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-eclipse-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-eclipse-700 min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-4xl font-heading font-bold text-eclipse-900">
                  {plan.price !== "Custom" && "Rp "}
                  {plan.price}
                </span>
                <span className="text-eclipse-700 ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-eclipse-700 text-sm">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="https://wa.me/1234567890"
                target="_blank"
                className={`w-full py-4 text-center rounded-full font-medium transition-all ${
                  plan.popular
                    ? "bg-eclipse-900 text-space-50 hover:bg-eclipse-800 hover:shadow-[0_0_20px_rgba(140,155,255,0.3)]"
                    : "bg-space-100 text-eclipse-900 hover:bg-space-100/80"
                }`}
              >
                Mulai Proyek
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
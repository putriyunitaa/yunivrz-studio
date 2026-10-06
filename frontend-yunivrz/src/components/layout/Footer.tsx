import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-eclipse-900/5 bg-space-50 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold tracking-tighter text-eclipse-900">
                yunivrz <span className="text-nebula-500">✦</span>
              </span>
            </Link>
            <p className="text-eclipse-700 max-w-sm mb-6">
              Merancang semesta digital yang premium dan elegan. Menghadirkan undangan digital, kado virtual, hingga website bisnis.
            </p>
            <div className="flex items-center gap-4 text-eclipse-700">
              {/* Dummy Social Icons */}
              <a href="#" className="hover:text-nebula-500 transition-colors">Instagram</a>
              <a href="#" className="hover:text-nebula-500 transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-nebula-500 transition-colors">Email</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-eclipse-900 mb-4">Layanan</h4>
            <ul className="space-y-3 text-eclipse-700 text-sm">
              <li><Link href="/catalog" className="hover:text-nebula-500 transition-colors">Micro-Moments</Link></li>
              <li><Link href="/catalog" className="hover:text-nebula-500 transition-colors">Milestones</Link></li>
              <li><Link href="/catalog" className="hover:text-nebula-500 transition-colors">Custom Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-eclipse-900 mb-4">Perusahaan</h4>
            <ul className="space-y-3 text-eclipse-700 text-sm">
              <li><Link href="/about" className="hover:text-nebula-500 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/pricing" className="hover:text-nebula-500 transition-colors">Paket Harga</Link></li>
              <li><Link href="/login" className="hover:text-nebula-500 transition-colors">Client Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-eclipse-900/5 text-sm text-eclipse-700/60">
          <p>© {new Date().getFullYear()} Yunivrz Studio. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-eclipse-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-eclipse-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
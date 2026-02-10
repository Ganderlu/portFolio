import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 text-white max-w-7xl mx-auto right-0">
      <div className="text-2xl font-bold flex items-center">
        <Link href="/" className="flex items-center">
          <span className="font-script text-3xl mr-1">Ganderlu</span>
          <span className="font-sans font-light tracking-widest text-sm uppercase opacity-90">
            .Ricchi
          </span>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/about" className="hover:text-white transition-colors">
          About
        </Link>
        <Link href="/portfolio" className="hover:text-white transition-colors">
          Portfolio
        </Link>
        <Link href="/#blog" className="hover:text-white transition-colors">
          Blog
        </Link>
        <Link href="/contact" className="hover:text-white transition-colors">
          Contact
        </Link>
      </div>
      <Link
        href="/contact"
        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30"
      >
        Hire Me <ArrowRight size={16} />
      </Link>
    </nav>
  );
}

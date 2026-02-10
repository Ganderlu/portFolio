"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 text-white max-w-7xl mx-auto right-0">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center relative z-50">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <span className="font-script text-3xl mr-1">Ganderlu</span>
            <span className="font-sans font-light tracking-widest text-sm uppercase opacity-90">
              .Ricchi
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Desktop CTA Button */}
        <Link
          href="/contact"
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30"
        >
          Hire Me <ArrowRight size={16} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 p-2 text-white/90 hover:text-white transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0f0518] z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-fade-in">
          <Link
            href="/"
            className="text-2xl font-medium text-white/90 hover:text-white transition-colors"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-2xl font-medium text-white/90 hover:text-white transition-colors"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/portfolio"
            className="text-2xl font-medium text-white/90 hover:text-white transition-colors"
            onClick={closeMenu}
          >
            Portfolio
          </Link>
          <Link
            href="/#blog"
            className="text-2xl font-medium text-white/90 hover:text-white transition-colors"
            onClick={closeMenu}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-2xl font-medium text-white/90 hover:text-white transition-colors"
            onClick={closeMenu}
          >
            Contact
          </Link>
          
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30 mt-4"
            onClick={closeMenu}
          >
            Hire Me <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </nav>
  );
}

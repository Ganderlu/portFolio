"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, Twitter, Facebook, ChevronDown } from "lucide-react";

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-message-circle"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path
      d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1H15a4 4 0 0 1-4-4Z"
      opacity="0"
    />
    {/* Using a simpler path for WhatsApp-like appearance or just MessageCircle from Lucide if available, 
        but let's use a proper SVG path for WhatsApp brand icon since Lucide doesn't have it. 
        Actually, let's use a path that resembles the brand icon more closely. 
    */}
    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.07 0C5.537 0 .181 5.303.177 11.838c0 2.085.543 4.121 1.573 5.911L.065 24l6.371-1.674a11.817 11.817 0 005.635 1.423h.005c6.535 0 11.889-5.303 11.892-11.839a11.82 11.82 0 00-3.48-8.413Z" />
  </svg>
);

export default function Hero({ data }: { data?: any }) {
  const [heroData, setHeroData] = useState<any>(data || null);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    if (!data) {
      const fetchHeroData = async () => {
        try {
          const response = await fetch("/api/home");
          if (response.ok) {
            const data = await response.json();
            setHeroData(data);
          }
        } catch (error) {
          console.error("Failed to fetch home data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchHeroData();
    }
  }, [data]);

  if (loading) {
    return (
      <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-[#1a0b2e]">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return (
      <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-[#1a0b2e]">
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-white/60">Failed to load hero section data.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-[#1a0b2e]">
      {/* Background Gradients - Diagonal Stripes */}
      <div className="absolute inset-0 w-full h-full bg-[#1a0b2e] z-0">
        {/* Main Background Image */}
        <div className="absolute inset-0 bg-[url('/done.png')] bg-cover bg-center"></div>
        {/* Main Gradient */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-[#1a0b2e] via-[#4c1d95] to-[#2563eb] opacity-80 rotate-12 blur-3xl"></div>
        {/* Lighter Rays */}
        <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-bl from-[#7c3aed]/20 to-transparent skew-x-12 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/20 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-fade-in-up">
          <div>
            <h2 className="text-white/80 text-xl mb-2 font-medium tracking-wide">
              {heroData.greeting}
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              {heroData.name}
            </h1>
            <h3 className="text-2xl md:text-3xl text-blue-200 font-semibold mb-6">
              {heroData.role}
            </h3>
            <p className="text-white/60 max-w-lg text-lg leading-relaxed">
              {heroData.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-medium transition-all flex items-center gap-2 backdrop-blur-sm hover:-translate-y-1"
            >
              Contact Me <ChevronDown size={18} />
            </Link>
          </div>

          {/* SocialLinks component removed */}
        </div>

        <div className="relative z-10 flex justify-center md:justify-end">
          {/* Image Container */}
          <div className="relative w-[350px] h-[450px] md:w-[450px] md:h-[550px]">
            {/* Background blob behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] transform rotate-6 opacity-60 blur-lg scale-95"></div>

            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-[2rem] border border-white/20 overflow-hidden shadow-2xl">
              {/* Placeholder for User Image */}
              <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center text-white/30 p-8 text-center relative overflow-hidden group">
                {/* Simulated Image Content */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${heroData.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-bounce delay-75"></div>
      <div className="absolute top-40 right-10 w-3 h-3 bg-purple-400 rounded-full opacity-30 animate-pulse delay-150"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-40 animate-ping"></div>
    </section>
  );
}

"use client";

import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import {
  CheckCircle,
  Clock,
  Zap,
  Shield,
  ArrowRight,
  Database,
  Layout,
  Server,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Clock,
  Database,
  Layout,
  Server,
};

const COLOR_MAP: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
  green: "text-green-400",
  yellow: "text-yellow-400",
};

const BG_COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-400/10",
  purple: "bg-purple-400/10",
  pink: "bg-pink-400/10",
  green: "bg-green-400/10",
  yellow: "bg-yellow-400/10",
};

const BORDER_HOVER_MAP: Record<string, string> = {
  blue: "hover:border-blue-500/50",
  purple: "hover:border-purple-500/50",
  pink: "hover:border-pink-500/50",
};

export default function HireMePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hire");
        if (response.ok) {
          const hireData = await response.json();
          setData(hireData);
        }
      } catch (error) {
        console.error("Failed to fetch hire data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0f0518] text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </main>
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen bg-[#0f0518] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/done.png')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0518]/90 via-[#0f0518]/95 to-[#0f0518]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {data.hero.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up delay-100">
            {data.hero.titlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {data.hero.titleHighlight}
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 mb-10">
            {data.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              href="#pricing"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              View Pricing <ArrowRight size={18} />
            </Link>
            <Link
              href="#contact-form"
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.valueProps.title}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {data.valueProps.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.valueProps.items.map((item: any, i: number) => {
              const Icon = ICON_MAP[item.icon] || Zap;
              return (
                <div
                  key={i}
                  className="bg-[#1a0b2e] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors"
                >
                  <div
                    className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-20 bg-[#0f0518]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                {data.expertise.title}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                {data.expertise.description}
              </p>

              <div className="space-y-6">
                {data.expertise.items.map((item: any, i: number) => {
                  const Icon = ICON_MAP[item.icon] || Database;
                  const colorClass = item.color === "purple" ? "text-purple-400" : item.color === "blue" ? "text-blue-400" : "text-pink-400";
                  const bgClass = item.color === "purple" ? "bg-purple-600/20" : item.color === "blue" ? "bg-blue-600/20" : "bg-pink-600/20";
                  return (
                    <div key={i} className="flex gap-4">
                      <div className={`w-12 h-12 ${bgClass} rounded-lg flex items-center justify-center ${colorClass} shrink-0`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-white/60">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-3xl opacity-20"></div>
              <div className="bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {data.expertise.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section id="pricing" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.pricing.title}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {data.pricing.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.pricing.models.map((model: any, i: number) => (
              <div
                key={i}
                className={`bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-2 ${BORDER_HOVER_MAP[model.color] || "hover:border-blue-500/50"}`}
              >
                <div className="mb-4">
                  <span className={`${COLOR_MAP[model.color] || "text-blue-400"} font-bold tracking-wider uppercase text-sm`}>
                    {model.type}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">{model.priceRange}</h3>
                <p className="text-white/60 mb-6">{model.durationLabel}</p>
                <p className="text-white/80 mb-8 flex-grow">
                  {model.description}
                </p>
                <ul className="space-y-3 mb-8 text-sm text-white/70">
                  {model.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle size={16} className={COLOR_MAP[model.color] || "text-blue-500"} /> {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact-form"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${BG_COLOR_MAP[model.color] || "bg-blue-400/10"} ${COLOR_MAP[model.color] || "text-blue-400"} hover:opacity-80`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-[#0f0518]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Your Project</h2>
            <p className="text-white/60">
              Fill out the form below and I'll get back to you within 24 hours
              to discuss your project in detail.
            </p>
          </div>
          <div className="bg-[#1a0b2e] border border-white/10 p-8 rounded-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

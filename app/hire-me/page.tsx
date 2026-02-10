"use client";

import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import {
  CheckCircle,
  Clock,
  Code,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  Database,
  Layout,
  Server,
} from "lucide-react";
import Link from "next/link";

export default function HireMePage() {
  return (
    <main className="min-h-screen bg-[#0f0518] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/done.png')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0518]/90 via-[#0f0518]/95 to-[#0f0518]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Available for New Projects
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up delay-100">
            Let's Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Next Big Idea
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 mb-10">
            I help businesses and startups create scalable, high-performance web
            applications. Whether you need a full-stack solution, a robust
            backend, or a stunning frontend, I deliver results that matter.
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
              Why Work With Me?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              I don't just write code; I solve problems. Here is what you can
              expect when we collaborate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Fast & Performant",
                desc: "Optimized applications that load fast and perform smoothly under pressure.",
                color: "text-yellow-400",
                bg: "bg-yellow-400/10",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                desc: "Security best practices built-in from day one to protect your data and users.",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                desc: "Respect for deadlines and clear communication throughout the project lifecycle.",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1a0b2e] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors"
              >
                <div
                  className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-20 bg-[#0f0518]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Expertise That Drives Growth
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Leveraging the latest technologies to build software that scales
                with your business. My tech stack is chosen for reliability,
                speed, and maintainability.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Backend Development
                    </h3>
                    <p className="text-white/60">
                      API design, database management, and server-side logic
                      using Node.js, Python, or Go.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Frontend Development
                    </h3>
                    <p className="text-white/60">
                      Responsive, accessible, and interactive UIs built with
                      React, Next.js, and Tailwind CSS.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center text-pink-400 shrink-0">
                    <Server size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Full Stack Solutions
                    </h3>
                    <p className="text-white/60">
                      End-to-end development handling everything from the
                      database to the client-side experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-3xl opacity-20"></div>
              <div className="bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "PostgreSQL",
                    "MongoDB",
                    "Docker",
                    "AWS",
                    "GraphQL",
                    "Redis",
                    "Git",
                  ].map((tech) => (
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
              Engagement Models
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Flexible options to suit your project needs and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Hourly */}
            <div className="bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 flex flex-col hover:border-blue-500/50 transition-all hover:-translate-y-2">
              <div className="mb-4">
                <span className="text-blue-400 font-bold tracking-wider uppercase text-sm">
                  Hourly
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2">$50 - $100</h3>
              <p className="text-white/60 mb-6">per hour</p>
              <p className="text-white/80 mb-8 flex-grow">
                Perfect for small tasks, bug fixes, or consultation calls where
                scope is variable.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-500" /> Pay as you
                  go
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-500" /> Detailed
                  time tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-500" /> Flexible
                  availability
                </li>
              </ul>
              <Link
                href="#contact-form"
                className="w-full py-3 rounded-xl border border-blue-500/30 text-blue-300 font-medium hover:bg-blue-500/10 transition-colors text-center"
              >
                Choose Hourly
              </Link>
            </div>

            {/* Project Based */}
            <div className="bg-[#1a0b2e] border border-purple-500/50 rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-purple-900/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div className="mb-4">
                <span className="text-purple-400 font-bold tracking-wider uppercase text-sm">
                  Fixed Price
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2">Custom</h3>
              <p className="text-white/60 mb-6">per project</p>
              <p className="text-white/80 mb-8 flex-grow">
                Ideal for well-defined projects like landing pages, MVPs, or
                specific feature implementations.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-500" /> Clear
                  deliverables
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-500" /> Fixed
                  timeline & budget
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-500" /> Post-launch
                  support
                </li>
              </ul>
              <Link
                href="#contact-form"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity text-center shadow-lg shadow-purple-600/20"
              >
                Get a Quote
              </Link>
            </div>

            {/* Retainer */}
            <div className="bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 flex flex-col hover:border-pink-500/50 transition-all hover:-translate-y-2">
              <div className="mb-4">
                <span className="text-pink-400 font-bold tracking-wider uppercase text-sm">
                  Retainer
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2">$2,500+</h3>
              <p className="text-white/60 mb-6">per month</p>
              <p className="text-white/80 mb-8 flex-grow">
                For long-term collaboration. I become a dedicated part of your
                team for set hours per month.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-pink-500" /> Priority
                  support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-pink-500" /> Consistent
                  development
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-pink-500" /> Strategic
                  consulting
                </li>
              </ul>
              <Link
                href="#contact-form"
                className="w-full py-3 rounded-xl border border-pink-500/30 text-pink-300 font-medium hover:bg-pink-500/10 transition-colors text-center"
              >
                Discuss Retainer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Reuse */}
      <section id="contact-form" className="py-24 bg-[#0f0518]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#1a0b2e] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                <p className="text-white/60">
                  Tell me about your project, and I'll get back to you within 24
                  hours with a proposal.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

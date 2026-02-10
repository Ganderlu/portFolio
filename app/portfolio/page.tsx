"use client";

import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import { useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  Zap,
  Smartphone,
  Globe,
} from "lucide-react";

// Expanded Project Data with details
const projects = [
  {
    id: 1,
    title: "Luxe E-commerce Platform",
    category: "Web Design",
    description:
      "A premium shopping experience built for a high-end fashion brand. Features include real-time inventory tracking, AI-powered recommendations, and a seamless checkout process.",
    tags: ["Next.js", "Shopify", "Tailwind CSS"],
    image: "bg-gradient-to-br from-blue-600 to-cyan-500",
    icon: Globe,
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "HealthTrack Mobile App",
    category: "App Design",
    description:
      "A comprehensive health monitoring application that connects with wearable devices to track vitals, sleep patterns, and daily activity. Designed with accessibility in mind.",
    tags: ["React Native", "Firebase", "HealthKit"],
    image: "bg-gradient-to-br from-purple-600 to-pink-500",
    icon: Smartphone,
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "TechCorp Rebranding",
    category: "Branding",
    description:
      "Complete visual identity overhaul for a leading tech consultancy. Included logo design, brand guidelines, stationery, and digital assets.",
    tags: ["Adobe Illustrator", "Figma", "Brand Strategy"],
    image: "bg-gradient-to-br from-orange-500 to-red-500",
    icon: Layers,
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "FinDash Dashboard",
    category: "Web Design",
    description:
      "An intuitive financial dashboard for enterprise clients to visualize complex data streams. Optimized for performance and data density.",
    tags: ["Vue.js", "D3.js", "Sass"],
    image: "bg-gradient-to-br from-emerald-500 to-teal-500",
    icon: Zap,
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "SocialConnect App",
    category: "App Design",
    description:
      "A social networking platform focused on professional communities. Features include real-time messaging, event management, and job boards.",
    tags: ["Flutter", "GraphQL", "AWS"],
    image: "bg-gradient-to-br from-indigo-500 to-violet-500",
    icon: Smartphone,
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "EcoLiving Brand Identity",
    category: "Branding",
    description:
      "Sustainable lifestyle brand identity focused on earth tones and organic shapes. Packaging design and marketing collateral for product launch.",
    tags: ["Photoshop", "Packaging", "Eco-Design"],
    image: "bg-gradient-to-br from-lime-500 to-green-600",
    icon: Layers,
    link: "#",
    github: "#",
  },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <main className="min-h-screen bg-[#1a0b2e]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#1a0b2e] z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-[#1a0b2e] via-[#4c1d95] to-[#2563eb] opacity-40 rotate-12 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-purple-600/20 blur-3xl rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Selected Works
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            A curated collection of projects that showcase my passion for
            design, development, and problem-solving.
          </p>
        </div>
      </section>

      {/* Featured Project (Case Study Style) */}
      <section className="py-20 px-6 bg-white/5 relative z-10 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-9xl font-bold opacity-20">
                    01
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">
                <Zap size={14} /> Featured Project
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                NeonVerse Dashboard
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A futuristic analytics platform designed for Web3 applications.
                This project involved complex data visualization, real-time
                socket connections, and a highly interactive UI built with
                Three.js.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Three.js", "WebSockets", "Node.js"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-md text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-4 flex gap-4">
                <button className="flex items-center gap-2 bg-white text-[#1a0b2e] px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                  View Case Study <ArrowUpRight size={18} />
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                  <Github size={18} /> Source Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <h2 className="text-3xl font-bold text-white">All Projects</h2>

          <div className="flex flex-wrap gap-2">
            {["All", "Web Design", "App Design", "Branding"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeTab === tab
                    ? "bg-white text-purple-900 border-white"
                    : "bg-transparent text-gray-400 border-gray-700 hover:text-white hover:border-white/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 flex flex-col h-full"
            >
              <div
                className={`aspect-[5/3] w-full ${project.image} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md p-2 rounded-lg text-white/80">
                  <project.icon size={20} />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-blue-400 text-xs font-bold tracking-wider uppercase mb-1 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <a
                    href={project.link}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-gray-500 bg-black/20 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Contact />

    </main>
  );
}

"use client";

import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/lib/types";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  Zap,
  Smartphone,
  Globe,
  Briefcase,
} from "lucide-react";

// Helper to get icon component from string name
const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Globe,
    Zap,
    Smartphone,
    Layers,
    Briefcase,
  };
  return icons[iconName] || Globe;
};

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          // Filter out unpublished projects if needed, or handle status
          setProjects(data.filter((p: Project) => p.status === "Published"));
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1a0b2e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </main>
    );
  }

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
                <Image
                  src="/Letsconnet.png"
                  alt="LetsConnet"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">
                <Zap size={14} /> Featured Project
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                LetsConnet
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A dynamic e-commerce platform designed to connect buyers and
                sellers seamlessly. Features include secure payment integration,
                real-time messaging, and a user-friendly interface.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "Tailwind CSS", "E-commerce"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 rounded-md text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
              <div className="pt-4 flex gap-4">
                <a
                  href="https://letsconnet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-[#1a0b2e] px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  Visit Website <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <h2 className="text-3xl font-bold text-white">All Projects</h2>

          <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
            {["All", "Web Design", "App Design", "Branding"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white text-[#1a0b2e] shadow-md shadow-blue-500/30"
                    : "bg-transparent text-gray-300 hover:text-white hover:bg-white/10"
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
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg shadow-black/30 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/10 transition-all duration-300"
            >
              <div
                className={`aspect-[5/3] w-full ${project.image} relative overflow-hidden`}
              >
                {project.imageSrc ? (
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
                )}
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md p-2 rounded-lg text-white/80 z-10">
                  {(() => {
                    const IconComponent = getIconComponent(project.icon);
                    return <IconComponent size={20} />;
                  })()}
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

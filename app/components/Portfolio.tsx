"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    category: "Web Design",
    image: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Mobile App UI",
    category: "App Design",
    image: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Corporate Branding",
    category: "Branding",
    image: "bg-gradient-to-br from-orange-500 to-red-500",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section
      id="portfolio"
      className="py-24 bg-[#1a0b2e] relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/done.png')] bg-cover bg-center"></div>

      {/* Wave Background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Decorative curves */}
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-12">
        <div className="mb-12">
          <h3 className="text-blue-400 font-semibold text-lg mb-2 uppercase tracking-wider">
            My Portfolio
          </h3>
          <h2 className="text-4xl font-bold text-white mb-6">
            Some of My Recent Work
          </h2>

          <div className="flex flex-wrap gap-4 mt-8">
            {["All", "Web Design", "App Design", "Branding"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-full font-medium transition-all duration-300 border ${
                  activeTab === tab
                    ? "bg-white text-purple-900 border-white shadow-lg shadow-white/10 scale-105"
                    : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2 duration-300 shadow-2xl"
            >
              <div
                className={`aspect-[4/3] w-full ${project.image} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                {/* Placeholder Content */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold opacity-30">
                  {project.category.split(" ")[0]}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm mb-4">{project.category}</p>

                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-300"
                >
                  View Details <span>&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[80px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
}

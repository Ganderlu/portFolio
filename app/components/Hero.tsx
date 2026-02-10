import Image from "next/image";
import { Linkedin, Dribbble, Github, Twitter, ChevronDown } from "lucide-react";

export default function Hero() {
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
              Hello, I'm
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              Ganderlu
            </h1>
            <h3 className="text-2xl md:text-3xl text-blue-200 font-semibold mb-6">
              Creative Designer & Developer
            </h3>
            <p className="text-white/60 max-w-lg text-lg leading-relaxed">
              I design and build amazing digital experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1">
              View My Work
            </button>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-medium transition-all flex items-center gap-2 backdrop-blur-sm hover:-translate-y-1">
              Contact Me <ChevronDown size={18} />
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
            >
              <Dribbble size={24} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
            >
              <Twitter size={24} />
            </a>
          </div>
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
                <div className="absolute inset-0 bg-[url('/gander.jpg')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
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

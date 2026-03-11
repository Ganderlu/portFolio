"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hero, about, projects, skills] = await Promise.all([
          fetch("/api/home").then((res) => res.json()),
          fetch("/api/about").then((res) => res.json()),
          fetch("/api/projects").then((res) => res.json()),
          fetch("/api/skills").then((res) => res.json()),
        ]);
        setData({ hero, about, projects, skills });
      } catch (error) {
        console.error("Failed to fetch home page data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Portfolio data={data.projects} />
      <Skills data={data.skills} />
      <Contact />
    </main>
  );
}

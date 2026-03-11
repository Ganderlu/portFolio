"use client";

import { useState, useEffect } from "react";

export default function About({ data }: { data?: any }) {
  const [aboutData, setAboutData] = useState<any>(data || null);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    if (!data) {
      const fetchAboutData = async () => {
        try {
          const response = await fetch("/api/about");
          if (response.ok) {
            const data = await response.json();
            setAboutData(data);
          }
        } catch (error) {
          console.error("Failed to fetch about data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAboutData();
    }
  }, [data]);

  if (loading) {
    return (
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </section>
    );
  }

  if (!aboutData) {
    return (
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-gray-600">Failed to load about section data.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 space-y-8">
          <div className="relative">
            <h3 className="text-blue-600 font-semibold text-lg mb-2 uppercase tracking-wider">
              About Me
            </h3>
            {/* <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {aboutData.tagline}
            </h2> */}
            <div className="w-20 h-1 bg-blue-600 mb-6 rounded-full"></div>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {aboutData.story}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-100">
            <div className="text-left">
              <h4 className="text-4xl font-bold text-gray-900 mb-1">5+</h4>
              <p className="text-gray-500 text-sm font-medium">
                Years Experience
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-4xl font-bold text-gray-900 mb-1">10+</h4>
              <p className="text-gray-500 text-sm font-medium">
                Projects Completed
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-4xl font-bold text-gray-900 mb-1">10+</h4>
              <p className="text-gray-500 text-sm font-medium">Happy Clients</p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/3]">
            {/* Decorative border */}
            <div className="absolute top-[-15px] right-[-15px] w-full h-full border-[3px] border-blue-600 rounded-2xl -z-10"></div>
            <div className="absolute bottom-[-15px] left-[-15px] w-full h-full bg-gray-100 rounded-2xl -z-10"></div>

            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              {/* Simulated Image */}
              <div className="absolute inset-0 bg-[url('/ibird.jpg')] bg-cover bg-center hover:scale-105 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

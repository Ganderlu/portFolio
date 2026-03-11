"use client";

import { useState, useEffect } from "react";
import {
  Monitor,
  Smartphone,
  Server,
  Mail,
  LucideIcon
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor,
  Smartphone,
  Server,
  Mail,
};

export default function Skills({ data }: { data?: any[] }) {
  const [skillsData, setSkillsData] = useState<any[]>(data || []);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    if (!data) {
      const fetchSkillsData = async () => {
        try {
          const response = await fetch("/api/skills");
          if (response.ok) {
            const data = await response.json();
            setSkillsData(data);
          }
        } catch (error) {
          console.error("Failed to fetch skills data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSkillsData();
    }
  }, [data]);

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-white">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h3 className="text-blue-600 font-semibold text-lg mb-2 uppercase tracking-wider">
            My Skills
          </h3>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What I'm Good At
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((skill, index) => {
            const IconComponent = ICON_MAP[skill.iconName || "Monitor"] || Monitor;
            return (
              <div
                key={index}
                className={`p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group ${skill.border || "group-hover:border-blue-200"}`}
              >
                <div
                  className={`w-16 h-16 ${skill.bg || "bg-blue-50"} ${skill.color || "text-blue-600"} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {skill.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

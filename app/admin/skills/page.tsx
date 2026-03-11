"use client";

import { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Monitor,
  Server,
  Mail,
  Smartphone,
} from "lucide-react";

const ICON_OPTIONS = [
  { name: "Monitor", icon: Monitor },
  { name: "Server", icon: Server },
  { name: "Mail", icon: Mail },
  { name: "Smartphone", icon: Smartphone },
];

export default function SkillsAdmin() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [skills, setSkills] = useState<
    {
      title: string;
      desc: string;
      color: string;
      bg: string;
      border: string;
      iconName?: string;
    }[]
  >([]);
  const [newSkill, setNewSkill] = useState({
    title: "",
    desc: "",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
    iconName: "Monitor",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error("Failed to fetch skills", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSkill = () => {
    if (newSkill.title && newSkill.desc) {
      setSkills([...skills, newSkill]);
      setNewSkill({
        title: "",
        desc: "",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "group-hover:border-blue-200",
        iconName: "Monitor",
      });
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skills),
      });

      if (response.ok) {
        alert("Skills updated successfully!");
      } else {
        alert("Failed to update skills.");
      }
    } catch (error) {
      console.error("Error updating skills:", error);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Edit Skills Section</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          Save Changes
        </button>
      </div>

      <div className="bg-[#1a0b2e] border border-white/10 p-6 rounded-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Section Title
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Engineering"
              value={newSkill.title}
              onChange={(e) =>
                setNewSkill({ ...newSkill, title: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <input
              type="text"
              placeholder="What do you do in this area?"
              value={newSkill.desc}
              onChange={(e) =>
                setNewSkill({ ...newSkill, desc: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={handleAddSkill}
            className="md:col-start-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} />
            Add Section
          </button>
        </div>

        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-bold text-white">Current Sections</h3>
          <div className="grid grid-cols-1 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-start justify-between"
              >
                <div className="space-y-1">
                  <p className="font-bold text-white">{skill.title}</p>
                  <p className="text-sm text-gray-400">{skill.desc}</p>
                </div>
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

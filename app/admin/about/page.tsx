"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Plus, Trash2, Briefcase, GraduationCap, Award, Cpu, FileText } from "lucide-react";

export default function AboutAdmin() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    tagline: "",
    story: "",
    resumeUrl: "",
    experience: [] as any[],
    education: [] as any[],
    certifications: [] as string[],
    technicalSkills: [] as any[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          setFormData({
            tagline: data.tagline || "",
            story: data.story || "",
            resumeUrl: data.resumeUrl || "",
            experience: data.experience || [],
            education: data.education || [],
            certifications: data.certifications || [],
            technicalSkills: data.technicalSkills || [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch about data", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = (type: string) => {
    if (type === "experience") {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, { role: "", company: "", duration: "", description: "", color: "purple" }]
      }));
    } else if (type === "education") {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, { degree: "", school: "", duration: "" }]
      }));
    } else if (type === "certifications") {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, ""]
      }));
    } else if (type === "technicalSkills") {
      setFormData(prev => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, { category: "", skills: [], icon: "Code" }]
      }));
    }
  };

  const removeItem = (type: string, index: number) => {
    setFormData(prev => {
      const newList = [...(prev as any)[type]];
      newList.splice(index, 1);
      return { ...prev, [type]: newList };
    });
  };

  const updateListItem = (type: string, index: number, field: string, value: any) => {
    setFormData(prev => {
      const newList = [...(prev as any)[type]];
      if (typeof value === 'object' && !Array.isArray(value)) {
        newList[index] = { ...newList[index], [field]: value };
      } else {
        if (field) {
            newList[index] = { ...newList[index], [field]: value };
        } else {
            newList[index] = value;
        }
      }
      return { ...prev, [type]: newList };
    });
  };

  const handleSkillChange = (groupIndex: number, skillString: string) => {
    const skills = skillString.split(",").map(s => s.trim()).filter(s => s !== "");
    updateListItem("technicalSkills", groupIndex, "skills", skills);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("About section updated successfully!");
      } else {
        alert("Failed to update about section.");
      }
    } catch (error) {
      console.error("Error updating about section:", error);
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
        <h1 className="text-2xl font-bold text-white">Edit About Page</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: "general", label: "General", icon: FileText },
          { id: "experience", label: "Experience", icon: Briefcase },
          { id: "education", label: "Education", icon: GraduationCap },
          { id: "certifications", label: "Certs", icon: Award },
          { id: "skills", label: "Technical Skills", icon: Cpu },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#1a0b2e] border border-white/10 p-6 rounded-xl">
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Tagline (Hero)</label>
              <textarea
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Resume URL</label>
              <input
                type="text"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="/resume.pdf"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">My Story</label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                rows={10}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none font-mono text-sm"
              />
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Experience Timeline</h3>
              <button onClick={() => addItem("experience")} className="flex items-center gap-2 text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-600/30 transition-colors">
                <Plus size={16} /> Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {formData.experience.map((job, index) => (
                <div key={index} className="p-4 border border-white/10 rounded-xl bg-white/5 space-y-4 relative group">
                  <button onClick={() => removeItem("experience", index)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Role"
                      value={job.role}
                      onChange={(e) => updateListItem("experience", index, "role", e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    />
                    <input
                      placeholder="Company"
                      value={job.company}
                      onChange={(e) => updateListItem("experience", index, "company", e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    />
                    <input
                      placeholder="Duration (e.g. 2023 - Present)"
                      value={job.duration}
                      onChange={(e) => updateListItem("experience", index, "duration", e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    />
                    <select
                      value={job.color}
                      onChange={(e) => updateListItem("experience", index, "color", e.target.value)}
                      className="bg-[#1a0b2e] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    >
                      <option value="purple">Purple</option>
                      <option value="blue">Blue</option>
                      <option value="indigo">Indigo</option>
                      <option value="teal">Teal</option>
                      <option value="amber">Amber</option>
                      <option value="pink">Pink</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={job.description}
                    onChange={(e) => updateListItem("experience", index, "description", e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Education History</h3>
              <button onClick={() => addItem("education")} className="flex items-center gap-2 text-sm bg-teal-600/20 text-teal-400 px-3 py-1 rounded-lg hover:bg-teal-600/30 transition-colors">
                <Plus size={16} /> Add Education
              </button>
            </div>
            <div className="space-y-6">
              {formData.education.map((edu, index) => (
                <div key={index} className="p-4 border border-white/10 rounded-xl bg-white/5 space-y-4 relative group">
                  <button onClick={() => removeItem("education", index)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => updateListItem("education", index, "degree", e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    />
                    <input
                      placeholder="School"
                      value={edu.school}
                      onChange={(e) => updateListItem("education", index, "school", e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    />
                    <input
                      placeholder="Duration"
                      value={edu.duration}
                      onChange={(e) => updateListItem("education", index, "duration", e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Certifications</h3>
              <button onClick={() => addItem("certifications")} className="flex items-center gap-2 text-sm bg-amber-600/20 text-amber-400 px-3 py-1 rounded-lg hover:bg-amber-600/30 transition-colors">
                <Plus size={16} /> Add Certificate
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="flex gap-2 group">
                  <input
                    placeholder="Certificate Name"
                    value={cert}
                    onChange={(e) => updateListItem("certifications", index, "", e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                  />
                  <button onClick={() => removeItem("certifications", index)} className="p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Technical Skills Groups</h3>
              <button onClick={() => addItem("technicalSkills")} className="flex items-center gap-2 text-sm bg-pink-600/20 text-pink-400 px-3 py-1 rounded-lg hover:bg-pink-600/30 transition-colors">
                <Plus size={16} /> Add Skill Group
              </button>
            </div>
            <div className="space-y-6">
              {formData.technicalSkills.map((group, index) => (
                <div key={index} className="p-4 border border-white/10 rounded-xl bg-white/5 space-y-4 relative group">
                  <button onClick={() => removeItem("technicalSkills", index)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Category Name"
                      value={group.category}
                      onChange={(e) => updateListItem("technicalSkills", index, "category", e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    />
                    <select
                      value={group.icon}
                      onChange={(e) => updateListItem("technicalSkills", index, "icon", e.target.value)}
                      className="bg-[#1a0b2e] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    >
                      <option value="Code">Code Icon</option>
                      <option value="Database">Database Icon</option>
                      <option value="Cpu">CPU Icon</option>
                      <option value="Wrench">Wrench Icon</option>
                      <option value="Users">Users Icon</option>
                      <option value="Heart">Heart Icon</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Skills (Comma separated)</label>
                    <input
                      placeholder="React, Next.js, TypeScript..."
                      value={group.skills.join(", ")}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

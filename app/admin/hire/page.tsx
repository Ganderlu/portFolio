"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Plus, Trash2, Zap, Shield, Clock, Database, Layout, Server, DollarSign, List, Briefcase, Star } from "lucide-react";

export default function HireAdmin() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("hero");
  const [formData, setFormData] = useState({
    hero: { badge: "", titlePrefix: "", titleHighlight: "", description: "" },
    valueProps: { title: "", subtitle: "", items: [] as any[] },
    expertise: { title: "", description: "", items: [] as any[], techStack: [] as string[] },
    pricing: { title: "", subtitle: "", models: [] as any[] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hire");
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch hire data", error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/hire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) alert("Hire Me page updated successfully!");
      else alert("Failed to update Hire Me page.");
    } catch (error) {
      console.error("Error saving hire data:", error);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const updateHero = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const updateSection = (section: string, field: string, value: any) => {
    setFormData(prev => ({ ...prev, [section]: { ...(prev as any)[section], [field]: value } }));
  };

  const updateListItem = (section: string, listField: string, index: number, field: string, value: any) => {
    setFormData(prev => {
      const sectionData = (prev as any)[section];
      const list = [...sectionData[listField]];
      if (field) {
        list[index] = { ...list[index], [field]: value };
      } else {
        list[index] = value;
      }
      return { ...prev, [section]: { ...sectionData, [listField]: list } };
    });
  };

  const addListItem = (section: string, listField: string, defaultItem: any) => {
    setFormData(prev => {
      const sectionData = (prev as any)[section];
      return { ...prev, [section]: { ...sectionData, [listField]: [...sectionData[listField], defaultItem] } };
    });
  };

  const removeListItem = (section: string, listField: string, index: number) => {
    setFormData(prev => {
      const sectionData = (prev as any)[section];
      const list = [...sectionData[listField]];
      list.splice(index, 1);
      return { ...prev, [section]: { ...sectionData, [listField]: list } };
    });
  };

  if (fetching) return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Edit Hire Me Page</h1>
        <button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50">
          {loading ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: "hero", label: "Hero Section", icon: Star },
          { id: "valueProps", label: "Value Proposition", icon: Zap },
          { id: "expertise", label: "Expertise", icon: Briefcase },
          { id: "pricing", label: "Pricing Models", icon: DollarSign },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#1a0b2e] border border-white/10 p-6 rounded-xl">
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Badge Text</label>
                <input value={formData.hero.badge} onChange={e => updateHero("badge", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Title Prefix</label>
                <input value={formData.hero.titlePrefix} onChange={e => updateHero("titlePrefix", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Title Highlight</label>
                <input value={formData.hero.titleHighlight} onChange={e => updateHero("titleHighlight", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea value={formData.hero.description} onChange={e => updateHero("description", e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white resize-none" />
            </div>
          </div>
        )}

        {activeTab === "valueProps" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Section Title</label>
                <input value={formData.valueProps.title} onChange={e => updateSection("valueProps", "title", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Section Subtitle</label>
                <input value={formData.valueProps.subtitle} onChange={e => updateSection("valueProps", "subtitle", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><h3 className="text-white font-bold">Value Items</h3><button onClick={() => addListItem("valueProps", "items", { icon: "Zap", title: "", desc: "", color: "text-blue-400", bg: "bg-blue-400/10" })} className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center gap-2"><Plus size={16} /> Add Item</button></div>
              {formData.valueProps.items.map((item, idx) => (
                <div key={idx} className="p-4 border border-white/10 rounded-xl bg-white/5 space-y-4 relative group">
                  <button onClick={() => removeListItem("valueProps", "items", idx)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18} /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Title" value={item.title} onChange={e => updateListItem("valueProps", "items", idx, "title", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
                    <select value={item.icon} onChange={e => updateListItem("valueProps", "items", idx, "icon", e.target.value)} className="bg-[#1a0b2e] border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                      <option value="Zap">Zap (Fast)</option><option value="Shield">Shield (Secure)</option><option value="Clock">Clock (On-time)</option>
                    </select>
                  </div>
                  <textarea placeholder="Description" value={item.desc} onChange={e => updateListItem("valueProps", "items", idx, "desc", e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-none" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "expertise" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Section Title</label>
                <input value={formData.expertise.title} onChange={e => updateSection("expertise", "title", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Section Description</label>
                <textarea value={formData.expertise.description} onChange={e => updateSection("expertise", "description", e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white resize-none" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><h3 className="text-white font-bold">Expertise Items</h3><button onClick={() => addListItem("expertise", "items", { icon: "Database", title: "", desc: "", color: "purple" })} className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center gap-2"><Plus size={16} /> Add Expertise</button></div>
              {formData.expertise.items.map((item, idx) => (
                <div key={idx} className="p-4 border border-white/10 rounded-xl bg-white/5 space-y-4 relative group">
                  <button onClick={() => removeListItem("expertise", "items", idx)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18} /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Title" value={item.title} onChange={e => updateListItem("expertise", "items", idx, "title", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
                    <select value={item.icon} onChange={e => updateListItem("expertise", "items", idx, "icon", e.target.value)} className="bg-[#1a0b2e] border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                      <option value="Database">Database (Backend)</option><option value="Layout">Layout (Frontend)</option><option value="Server">Server (Full Stack)</option>
                    </select>
                  </div>
                  <textarea placeholder="Description" value={item.desc} onChange={e => updateListItem("expertise", "items", idx, "desc", e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-none" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Tech Stack (Comma separated)</label>
              <input value={formData.expertise.techStack.join(", ")} onChange={e => updateSection("expertise", "techStack", e.target.value.split(",").map(s => s.trim()).filter(s => s !== ""))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Section Title</label>
                <input value={formData.pricing.title} onChange={e => updateSection("pricing", "title", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Section Subtitle</label>
                <input value={formData.pricing.subtitle} onChange={e => updateSection("pricing", "subtitle", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center"><h3 className="text-white font-bold">Pricing Models</h3><button onClick={() => addListItem("pricing", "models", { type: "", priceRange: "", durationLabel: "", description: "", features: [], color: "blue" })} className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center gap-2"><Plus size={16} /> Add Model</button></div>
              {formData.pricing.models.map((model, idx) => (
                <div key={idx} className="p-4 border border-white/10 rounded-xl bg-white/5 space-y-4 relative group">
                  <button onClick={() => removeListItem("pricing", "models", idx)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18} /></button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input placeholder="Model Type" value={model.type} onChange={e => updateListItem("pricing", "models", idx, "type", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
                    <input placeholder="Price Range" value={model.priceRange} onChange={e => updateListItem("pricing", "models", idx, "priceRange", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
                    <input placeholder="Duration Label" value={model.durationLabel} onChange={e => updateListItem("pricing", "models", idx, "durationLabel", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
                  </div>
                  <textarea placeholder="Description" value={model.description} onChange={e => updateListItem("pricing", "models", idx, "description", e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-none" />
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Features (Comma separated)</label>
                    <input value={model.features.join(", ")} onChange={e => updateListItem("pricing", "models", idx, "features", e.target.value.split(",").map(s => s.trim()).filter(s => s !== ""))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
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

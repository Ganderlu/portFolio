"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Upload } from "lucide-react";

export default function HeroAdmin() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    greeting: "",
    name: "",
    role: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/hero');
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch hero data", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Hero section updated successfully!");
      } else {
        alert("Failed to update hero section.");
      }
    } catch (error) {
      console.error("Error updating hero section:", error);
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
        <h1 className="text-2xl font-bold text-white">Edit Hero Section</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-[#1a0b2e] border border-white/10 p-6 rounded-xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Greeting
            </label>
            <input
              type="text"
              name="greeting"
              value={formData.greeting}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Role / Title
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Profile Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                title="Upload Image"
              >
                <Upload size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Enter image URL or path (e.g., /gander.jpg)
            </p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-[#1a0b2e] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <h3 className="font-medium text-white">Live Preview</h3>
          </div>
          <div className="flex-1 p-8 flex items-center justify-center bg-[#1a0b2e] relative overflow-hidden">
            {/* Preview Content */}
            <div className="text-center relative z-10">
              <h2 className="text-white/80 text-lg mb-2 font-medium tracking-wide">
                {formData.greeting}
              </h2>
              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                {formData.name}
              </h1>
              <h3 className="text-xl text-blue-200 font-semibold mb-6">
                {formData.role}
              </h3>
              <p className="text-white/60 max-w-sm mx-auto leading-relaxed">
                {formData.description}
              </p>
            </div>

            {/* Background Elements for Preview */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-[#1a0b2e] via-[#4c1d95]/20 to-[#2563eb]/20 opacity-50 blur-3xl -z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

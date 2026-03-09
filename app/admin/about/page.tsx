"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";

export default function AboutAdmin() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    tagline: "",
    story: "",
  });

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch about data", error);
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
      const response = await fetch("/api/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        <h1 className="text-2xl font-bold text-white">Edit About Section</h1>
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
              Tagline (Hero)
            </label>
            <textarea
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              My Story (Markdown supported)
            </label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              rows={15}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none font-mono text-sm"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-[#1a0b2e] border border-white/10 rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <h3 className="font-medium text-white">Live Preview</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-8 bg-white relative">
            {/* Preview Content (Simulating Light Mode of About Page) */}
            <div className="max-w-prose mx-auto">
              <div className="mb-8 p-4 bg-[#1a0b2e] rounded-xl text-center">
                <h1 className="text-xl font-bold text-white mb-2">About Me</h1>
                <p className="text-blue-200 text-sm">{formData.tagline}</p>
              </div>

              <div className="prose prose-sm text-gray-600">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  My Story
                </h3>
                <div className="whitespace-pre-wrap leading-relaxed space-y-4">
                  {formData.story}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

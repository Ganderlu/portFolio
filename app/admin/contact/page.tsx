"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Mail, Phone, MapPin, Type, FileText } from "lucide-react";

export default function ContactAdmin() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    email: "",
    phone: "",
    location: "",
    footerCopyright: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/contact");
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch contact data", error);
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Contact section updated successfully!");
      } else {
        alert("Failed to update contact section.");
      }
    } catch (error) {
      console.error("Error updating contact section:", error);
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
        <h1 className="text-2xl font-bold text-white">Edit Contact Section</h1>
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
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Type size={20} className="text-blue-400" />
              Headers
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Subtitle
              </label>
              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Mail size={20} className="text-purple-400" />
              Contact Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText size={20} className="text-teal-400" />
              Footer
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                name="footerCopyright"
                value={formData.footerCopyright}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-[#0f0518] border border-white/10 rounded-xl overflow-hidden flex flex-col h-fit">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <h3 className="font-medium text-white">Live Preview</h3>
          </div>
          <div className="p-8 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">{formData.title}</h2>
              <p className="text-blue-200 text-sm max-w-md mx-auto">{formData.subtitle}</p>
            </div>
            
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                  <Mail size={20} />
                </div>
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400">
                  <Phone size={20} />
                </div>
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 bg-pink-600/20 rounded-full flex items-center justify-center text-pink-400">
                  <MapPin size={20} />
                </div>
                <span>{formData.location}</span>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 text-center">
              <p className="text-xs text-blue-200/40">© {formData.footerCopyright}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

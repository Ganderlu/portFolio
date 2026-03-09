"use client";

import { useEffect, useState } from "react";
import { 
  BarChart, 
  Map, 
  Smartphone, 
  Globe, 
  Monitor, 
  ArrowLeft,
  Users,
  Clock,
  TrendingUp,
  Eye,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function DetailedAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Detailed Analytics</h1>
          <p className="text-gray-400 text-sm">In-depth insights about your visitors and traffic.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
              <Eye size={24} />
            </div>
            <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{analytics?.totalViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-400">Total Views</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
              <Users size={24} />
            </div>
            <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+8%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{analytics?.uniqueVisitors.toLocaleString()}</h3>
          <p className="text-sm text-gray-400">Unique Visitors</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <FileText size={24} />
            </div>
            <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+15%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{analytics?.pageViews?.toLocaleString() || analytics?.totalViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-400">Page Views</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg">
              <Users size={24} />
            </div>
            <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+5%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{analytics?.visitorsBreakdown?.new || 65}% / {analytics?.visitorsBreakdown?.returning || 35}%</h3>
          <p className="text-sm text-gray-400">New vs Returning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Geographic Location */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Map size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Top Locations</h2>
          </div>
          <div className="space-y-4">
            {analytics?.locations?.map((loc: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{loc.country}</span>
                    <span className="text-xs text-gray-500 bg-white/10 px-1.5 py-0.5 rounded">{loc.code}</span>
                  </div>
                  <span className="text-gray-400">{loc.visitors.toLocaleString()} ({loc.percentage}%)</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${loc.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices & Browsers */}
        <div className="space-y-8">
          {/* Device Types */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                <Smartphone size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Device Breakdown</h2>
            </div>
            <div className="space-y-4">
              {analytics?.devices?.map((device: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-3">
                    {device.type === 'Desktop' ? <Monitor size={18} className="text-gray-400" /> : 
                     device.type === 'Mobile' ? <Smartphone size={18} className="text-gray-400" /> : 
                     <Globe size={18} className="text-gray-400" />}
                    <span className="text-white font-medium">{device.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{device.percentage}%</div>
                    <div className="text-xs text-gray-500">{device.count.toLocaleString()} users</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Types */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                <Globe size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Top Browsers</h2>
            </div>
            <div className="flex gap-2">
              {analytics?.browsers?.map((browser: any, index: number) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-xs text-gray-400">{browser.name}</div>
                  <div className="text-xl font-bold text-white">{browser.percentage}%</div>
                  <div 
                    className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1"
                  >
                    <div className="h-full bg-cyan-500" style={{ width: `${browser.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
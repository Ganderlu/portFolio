"use client";

import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Eye,
  TrendingUp,
  Users,
  Clock,
  Globe,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredViews, setFilteredViews] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
          // Default to last 7 days
          if (data.viewsOverTime && data.viewsOverTime.length > 0) {
            const allData = data.viewsOverTime;
            const last7 = allData.slice(-7);
            setFilteredViews(last7);

            // Set date inputs to last 7 days range
            if (last7.length > 0) {
              setDateRange({
                start: last7[0].date,
                end: last7[last7.length - 1].date,
              });
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const handleDateChange = (type: "start" | "end", value: string) => {
    const newRange = { ...dateRange, [type]: value };
    setDateRange(newRange);

    if (newRange.start && newRange.end && analytics?.viewsOverTime) {
      const start = new Date(newRange.start);
      const end = new Date(newRange.end);

      const filtered = analytics.viewsOverTime.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
      setFilteredViews(filtered);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Views",
      value: analytics?.totalViews.toLocaleString() || "0",
      icon: Eye,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Unique Visitors",
      value: analytics?.uniqueVisitors.toLocaleString() || "0",
      icon: Users,
      color: "bg-purple-500",
      change: "+8%",
    },
    {
      title: "Page Views",
      value: analytics?.pageViews?.toLocaleString() || analytics?.totalViews.toLocaleString() || "0",
      icon: FileText,
      color: "bg-indigo-500",
      change: "+15%",
    },
    {
      title: "New vs Returning",
      value: `${analytics?.visitorsBreakdown?.new || 65}% / ${analytics?.visitorsBreakdown?.returning || 35}%`,
      icon: Users,
      color: "bg-orange-500",
      change: "+5%",
    },
    {
      title: "Avg. Session",
      value: analytics?.avgSessionDuration || "0m",
      icon: Clock,
      color: "bg-green-500",
      change: "+5%",
    },
    {
      title: "Bounce Rate",
      value: analytics?.bounceRate || "0%",
      icon: TrendingUp,
      color: "bg-pink-500",
      change: "-2%",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, Ganderlu!
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Here's your portfolio performance overview. Track visitor engagement
            and manage your content all in one place.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              href="/admin/analytics"
              key={index}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group relative overflow-hidden block cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${stat.color} bg-opacity-20 text-white`}
                >
                  <Icon size={24} />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.startsWith("+") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-400 flex items-center gap-1 group-hover:text-purple-300 transition-colors">
                {stat.title}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                  →
                </span>
              </p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white">Traffic Overview</h2>
              {/* Date Inputs */}
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
                <Calendar size={14} className="text-gray-400 ml-2" />
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => handleDateChange("start", e.target.value)}
                  className="bg-transparent text-xs text-white outline-none w-24 p-1"
                />
                <span className="text-gray-500 text-xs">-</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => handleDateChange("end", e.target.value)}
                  className="bg-transparent text-xs text-white outline-none w-24 p-1"
                />
              </div>
            </div>

            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>{" "}
                Views
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>{" "}
                Visitors
              </span>
            </div>
          </div>

          <div className="h-80 flex items-end justify-between gap-4 px-2 overflow-x-auto pb-4 pt-20">
            {filteredViews.length > 0 ? (
              filteredViews.map((item: any, index: number) => {
                // Calculate height percentages (max view assumed 300 for scaling)
                const viewHeight = Math.min((item.views / 300) * 100, 100);
                const visitorHeight = Math.min(
                  (item.visitors / 300) * 100,
                  100,
                );

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 min-w-[40px] flex-1 group relative h-full justify-end"
                  >
                    {/* Tooltip - Adjusted positioning to be fully visible */}
                    <div className={`absolute -top-24 left-1/2 -translate-x-1/2 bg-gray-900 border border-white/20 text-white text-xs py-3 px-4 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none w-max min-w-[140px] transform group-hover:-translate-y-2 ${index < 2 ? 'left-0 translate-x-0' : index > filteredViews.length - 3 ? 'right-0 left-auto translate-x-0' : ''}`}>
                      <div className="font-bold mb-2 border-b border-white/10 pb-2 text-gray-300">
                        {new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-6">
                          <span className="text-purple-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span> Views
                          </span>
                          <span className="font-bold text-sm">{item.views}</span>
                        </div>
                        <div className="flex justify-between items-center gap-6">
                          <span className="text-blue-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></span> Users
                          </span>
                          <span className="font-bold text-sm">{item.visitors}</span>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-white/20 transform rotate-45"></div>
                    </div>

                    {/* Bars Container */}
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {/* Views Bar */}
                      <div
                        className="w-2 md:w-5 bg-purple-500/50 rounded-t-sm group-hover:bg-purple-500 transition-all duration-300 relative"
                        style={{ height: `${viewHeight}%` }}
                      ></div>

                      {/* Visitors Bar */}
                      <div
                        className="w-2 md:w-5 bg-blue-400/50 rounded-t-sm group-hover:bg-blue-400 transition-all duration-300 relative"
                        style={{ height: `${visitorHeight}%` }}
                      ></div>
                    </div>

                    <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full group-hover:text-white transition-colors">
                      {item.date.split("-").slice(1).join("/")}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No data for selected range
              </div>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Top Pages</h2>
          <div className="space-y-4">
            {analytics?.topPages.map((page: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                    <Globe size={16} />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {page.path}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {page.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-6">
          {analytics?.recentActivity.map((activity: any) => (
            <div
              key={activity.id}
              className="flex gap-4 items-start border-b border-white/5 last:border-0 pb-4 last:pb-0"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 shrink-0 animate-pulse"></div>
              <div>
                <p className="text-white text-sm font-medium">
                  {activity.action}
                </p>
                <p className="text-gray-400 text-sm">{activity.details}</p>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

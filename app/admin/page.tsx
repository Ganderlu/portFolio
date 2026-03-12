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
  Share2,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useNotifications } from "@/lib/hooks/useNotifications";

const COLORS = [
  "#3b82f6",
  "#a855f7",
  "#eab308",
  "#ef4444",
  "#0088FE",
  "#00C49F",
];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredViews, setFilteredViews] = useState<any[]>([]);
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const [previousAnalytics, setPreviousAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);

          // Store previous day's data for comparison
          if (data.viewsOverTime && data.viewsOverTime.length > 1) {
            const yesterdayData =
              data.viewsOverTime[data.viewsOverTime.length - 2];
            setPreviousAnalytics(yesterdayData);
          }

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

  const getChange = (current: number, previous: number) => {
    if (previous === 0) return { value: 100, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(Math.round(change)), isPositive: change >= 0 };
  };

  const todayStats =
    analytics?.viewsOverTime?.[analytics.viewsOverTime.length - 1] || {};
  const yesterdayStats = previousAnalytics || {};

  const viewsChange = getChange(todayStats.views, yesterdayStats.views);
  const visitorsChange = getChange(
    todayStats.visitors,
    yesterdayStats.visitors,
  );

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

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "Unknown date";
    if (typeof timestamp.toDate === "function") {
      return timestamp.toDate().toLocaleString();
    }
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
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
      change: viewsChange,
    },
    {
      title: "Unique Visitors",
      value: analytics?.uniqueVisitors.toLocaleString() || "0",
      icon: Users,
      color: "bg-purple-500",
      change: visitorsChange,
    },
    {
      title: "Page Views",
      value:
        analytics?.pageViews?.toLocaleString() ||
        analytics?.totalViews.toLocaleString() ||
        "0",
      icon: FileText,
      color: "bg-indigo-500",
      change: getChange(todayStats.pageViews, yesterdayStats.pageViews),
    },
    {
      title: "New vs Returning",
      value: `${analytics?.visitorsBreakdown?.new || 65}% / ${analytics?.visitorsBreakdown?.returning || 35}%`,
      icon: Users,
      color: "bg-orange-500",
    },
    {
      title: "Avg. Session",
      value: analytics?.avgSessionDuration || "0m",
      icon: Clock,
      color: "bg-green-500",
    },
    {
      title: "Bounce Rate",
      value: analytics?.bounceRate || "0%",
      icon: TrendingUp,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-8 relative overflow-hidden flex justify-between items-start">
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

        {/* Notification Bell */}
        <div className="relative z-20">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Bell size={24} className="text-white" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-[#1a0b2e] bg-red-500" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#1a0b2e] border border-white/10 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={() =>
                      markAsRead(
                        notifications.filter((n) => !n.read).map((n) => n.id),
                      )
                    }
                    className="text-blue-400 text-sm hover:text-blue-300"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <p className="p-4 text-gray-400 text-sm">
                    No new notifications.
                  </p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-white/10 last:border-b-0 ${
                        !notif.read ? "bg-white/5" : ""
                      }`}
                    >
                      <p
                        className={`text-sm ${!notif.read ? "text-white font-medium" : "text-gray-400"}`}
                      >
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimestamp(notif.timestamp)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
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
                {stat.change && (
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.change.isPositive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {stat.change.isPositive ? "+" : "-"}
                    {stat.change.value}%
                  </span>
                )}
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

      {/* Quick Actions Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/home"
            className="flex items-center gap-3 p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg hover:bg-purple-600/20 transition-colors group"
          >
            <div className="p-2 bg-purple-600/20 text-purple-400 rounded-md group-hover:scale-110 transition-transform">
              <FileText size={20} />
            </div>
            <span className="text-white font-medium">Edit Home</span>
          </Link>
          <Link
            href="/admin/about"
            className="flex items-center gap-3 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg hover:bg-blue-600/20 transition-colors group"
          >
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-md group-hover:scale-110 transition-transform">
              <Users size={20} />
            </div>
            <span className="text-white font-medium">Edit About</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-lg hover:bg-indigo-600/20 transition-colors group"
          >
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-md group-hover:scale-110 transition-transform">
              <Briefcase size={20} />
            </div>
            <span className="text-white font-medium">Edit Projects</span>
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center gap-3 p-4 bg-pink-600/10 border border-pink-500/20 rounded-lg hover:bg-pink-600/20 transition-colors group"
          >
            <div className="p-2 bg-pink-600/20 text-pink-400 rounded-md group-hover:scale-110 transition-transform">
              <FileText size={20} />
            </div>
            <span className="text-white font-medium">Edit Skills</span>
          </Link>
        </div>
      </div>

      {/* Admin Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Line Chart */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Traffic Overview</h2>
            </div>
            <Link
              href="/admin/analytics"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              View Details
            </Link>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics?.viewsOverTime?.slice(-7) || []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff10"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  fontSize={10}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a0b2e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  name="Views"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Page Popularity Bar Chart */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Top Pages</h2>
            </div>
            <Link
              href="/admin/analytics"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              View All
            </Link>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.topPages?.slice(0, 5) || []}
                layout="vertical"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff10"
                  horizontal={false}
                />
                <XAxis type="number" stroke="#9ca3af" fontSize={10} hide />
                <YAxis
                  dataKey="path"
                  type="category"
                  stroke="#9ca3af"
                  fontSize={10}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a0b2e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="views"
                  fill="#a855f7"
                  radius={[0, 4, 4, 0]}
                  barSize={15}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visitor Source Pie Chart */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                <Share2 size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Traffic Sources</h2>
            </div>
            <div className="flex gap-4">
              {(analytics?.sources || []).map((source: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs text-gray-400">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={
                    analytics?.sources || [
                      { name: "Direct", visitors: 65 },
                      { name: "Search", visitors: 20 },
                      { name: "Social", visitors: 10 },
                      { name: "Referral", visitors: 5 },
                    ]
                  }
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="visitors"
                >
                  {(analytics?.sources || []).map(
                    (entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ),
                  )}
                  <Cell fill="#3b82f6" />
                  <Cell fill="#a855f7" />
                  <Cell fill="#eab308" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a0b2e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-xl overflow-hidden p-6">
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
    </div>
  );
}

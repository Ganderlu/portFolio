"use client";

import { useEffect, useState } from "react";
import {
  BarChart as BarChartIcon,
  Map,
  Smartphone,
  Globe,
  Monitor,
  ArrowLeft,
  Users,
  Clock,
  TrendingUp,
  Eye,
  FileText,
  Share2,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
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
import WorldMap from "../../components/analytics/WorldMap";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];

export default function DetailedAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
            const yesterdayData = data.viewsOverTime[data.viewsOverTime.length - 2];
            setPreviousAnalytics(yesterdayData);
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

  const todayStats = analytics?.viewsOverTime?.[analytics.viewsOverTime.length - 1] || {};
  const yesterdayStats = previousAnalytics || {};

  const viewsChange = getChange(todayStats.views, yesterdayStats.views);
  const visitorsChange = getChange(todayStats.visitors, yesterdayStats.visitors);
  const bounceRateChange = getChange(analytics?.bounceRate, 50); // Placeholder for previous bounce rate
  const avgSessionDurationChange = getChange(analytics?.avgSessionDuration, 150); // Placeholder for previous avg session duration

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
        <Link
          href="/admin"
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Detailed Analytics</h1>
          <p className="text-gray-400 text-sm">
            In-depth insights about your visitors and traffic.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
              <Eye size={24} />
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                viewsChange.isPositive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {viewsChange.isPositive ? "+" : "-"}
              {viewsChange.value}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">
            {analytics?.totalViews?.toLocaleString() || 0}
          </h3>
          <p className="text-sm text-gray-400">Total Views</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
              <Users size={24} />
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                visitorsChange.isPositive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {visitorsChange.isPositive ? "+" : "-"}
              {visitorsChange.value}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">
            {analytics?.uniqueVisitors?.toLocaleString() || 0}
          </h3>
          <p className="text-sm text-gray-400">Unique Visitors</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                bounceRateChange.isPositive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {bounceRateChange.isPositive ? "+" : "-"}
              {bounceRateChange.value}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">
            {analytics?.bounceRate || 0}%
          </h3>
          <p className="text-sm text-gray-400">Bounce Rate</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Clock size={24} />
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                avgSessionDurationChange.isPositive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {avgSessionDurationChange.isPositive ? "+" : "-"}
              {avgSessionDurationChange.value}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">
            {analytics?.avgSessionDuration || "0m 0s"}
          </h3>
          <p className="text-sm text-gray-400">Avg. Duration</p>
        </div>
      </div>

      {/* Traffic Line Chart */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Visitors Over Time</h2>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics?.viewsOverTime || []}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff10"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a0b2e",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                name="Page Views"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                name="Visitors"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Page Popularity Bar Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Most Visited Pages</h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.topPages || []} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff10"
                  horizontal={false}
                />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  dataKey="path"
                  type="category"
                  stroke="#9ca3af"
                  fontSize={12}
                  width={100}
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
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Source Pie Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
              <Share2 size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Traffic Sources</h2>
          </div>
          <div className="h-80 w-full">
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recruiter Interactions */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Users size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">
              Recruiter Interactions
            </h2>
          </div>
          <div className="space-y-4">
            {(analytics?.topEvents || []).map((event: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                    <TrendingUp size={18} />
                  </div>
                  <span className="text-white font-medium">
                    {event.eventName}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">
                    {event.totalCount}
                  </div>
                  <div className="text-xs text-gray-500">Total Clicks</div>
                </div>
              </div>
            ))}
            {(!analytics?.topEvents || analytics.topEvents.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                No interaction data available yet.
              </div>
            )}
          </div>
        </div>

        {/* Project Performance */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
              <Briefcase size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">
              Project Performance
            </h2>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
            {(analytics?.projectStats || []).map(
              (project: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white">{project.name}</h3>
                    <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded">
                      Avg. {project.avgTimeSpent || "0s"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">
                        {project.views || 0}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                        Views
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-400">
                        {project.demoClicks || 0}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                        Demo
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">
                        {project.githubClicks || 0}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                        Github
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
            {(!analytics?.projectStats ||
              analytics.projectStats.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                No project interaction data available yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* World Map */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Globe size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">
              Geographic Distribution
            </h2>
          </div>
          <div className="h-[400px]">
            <WorldMap data={analytics?.locations || []} />
          </div>
        </div>

        {/* Geographic Location List */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Map size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Top Locations</h2>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
            {(analytics?.locations || []).map((loc: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      {loc.country}
                    </span>
                    <span className="text-xs text-gray-500 bg-white/10 px-1.5 py-0.5 rounded">
                      {loc.code}
                    </span>
                  </div>
                  <span className="text-gray-400">
                    {loc.visitors.toLocaleString()} ({loc.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${loc.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {(!analytics?.locations ||
              analytics.locations.length === 0 ||
              (analytics.locations.length === 1 &&
                analytics.locations[0].country === "Unknown")) && (
              <div className="text-center py-8 text-gray-500">
                No geographic data available yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Device Types */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-500/20 text-pink-400 rounded-lg">
              <Smartphone size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Device Types</h2>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.devices || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="visitors"
                  nameKey="name"
                >
                  {(analytics?.devices || []).map(
                    (entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ),
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a0b2e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Browsers */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Globe size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Top Browsers</h2>
          </div>
          <div className="space-y-4">
            {(analytics?.browsers || [])
              .slice(0, 5)
              .map((browser: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400">
                      <Monitor size={16} />
                    </div>
                    <span className="text-white font-medium">
                      {browser.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">
                      {browser.visitors}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase">
                      Visitors
                    </div>
                  </div>
                </div>
              ))}
            {(!analytics?.browsers || analytics.browsers.length === 0) && (
              <div className="text-center py-8 text-gray-500 italic">
                No browser data yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New vs Returning */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
            <Users size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">
            New vs Returning Visitors
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center h-64 gap-8">
          <div className="flex w-full max-w-md h-8 rounded-full overflow-hidden bg-white/5 border border-white/10">
            <div
              className="h-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white"
              style={{
                width: `${analytics?.uniqueVisitors > 0 ? (analytics.uniqueVisitors / (analytics.uniqueVisitors + analytics.returningVisitors)) * 100 : 65}%`,
              }}
            >
              NEW
            </div>
            <div
              className="h-full bg-purple-500 flex items-center justify-center text-[10px] font-bold text-white"
              style={{
                width: `${analytics?.returningVisitors > 0 ? (analytics.returningVisitors / (analytics.uniqueVisitors + analytics.returningVisitors)) * 100 : 35}%`,
              }}
            >
              RETURNING
            </div>
          </div>
          <div className="flex gap-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {analytics?.uniqueVisitors || 0}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                New
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {analytics?.returningVisitors || 0}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Returning
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

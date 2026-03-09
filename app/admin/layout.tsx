import Sidebar from "@/app/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#1a0b2e] text-white">
      {/* Sidebar */}
      <div className="hidden md:block w-64 fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile Sidebar - Handled inside Sidebar component but we need to ensure layout respects it */}
      <div className="md:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen transition-all duration-300 w-full">
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#1a0b2e]/80 backdrop-blur-md sticky top-0 z-20 w-full">
          <h2 className="text-xl font-bold text-white/90">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white/20"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

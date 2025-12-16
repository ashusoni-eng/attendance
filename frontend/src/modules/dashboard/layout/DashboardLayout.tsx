import Sidebar from "../pages/components/Sidebar";
import Topbar from "../pages/components/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <Topbar />

      <main className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}

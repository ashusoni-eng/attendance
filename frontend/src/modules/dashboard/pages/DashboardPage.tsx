import DashboardLayout from "../layout/DashboardLayout";
import DashboardCards from "../components/DashboardCards";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Welcome, User 👋</h1>
      <DashboardCards />
    </DashboardLayout>
  );
}

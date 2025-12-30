import {
  Users,
  Calendar,
  CheckCircle,
  CalendarDays,
} from "lucide-react";

interface Props {
  title: string;
  value: number;
  color: "indigo" | "emerald" | "green" | "rose";
  icon: "users" | "calendar" | "check" | "calendar-days";
}

export default function DashboardCard({
  title,
  value,
  color,
  icon,
}: Props) {
  const icons = {
    users: Users,
    calendar: Calendar,
    check: CheckCircle,
    "calendar-days": CalendarDays,
  };

  const Icon = icons[icon];

  const colorMap: Record<string, string> = {
    indigo: "from-indigo-500 to-indigo-600",
    emerald: "from-emerald-500 to-emerald-600",
    green: "from-green-500 to-green-600",
    rose: "from-rose-500 to-rose-600",
  };

  return (
    <div
      className={`rounded-2xl p-5 text-white shadow-lg bg-linear-to-br ${colorMap[color]} transition-transform hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>

        <div className="bg-white/20 p-3 rounded-xl">
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}

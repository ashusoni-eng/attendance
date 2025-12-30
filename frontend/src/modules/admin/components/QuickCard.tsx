import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  link: string;
}

export default function QuickCard({ title, description, link }: Props) {
  return (
    <Link
      to={link}
      className="group p-5 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>

        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" />
      </div>
    </Link>
  );
}

import type { Attendance } from "../types/attendance.types";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircleIcon, XCircleIcon, DocumentIcon, FunnelIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ViewModal from "./ViewModal";
import { useAuth } from "../../../providers/AuthProvider";

interface Props {
  data: Attendance[];
  isLoading?: boolean;
}

export default function AttendanceTable({ data, isLoading = false }: Props) {
  const [sortField, setSortField] = useState<keyof Attendance | null>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PRESENT" | "ABSENT">("ALL");
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);

  const { user } = useAuth();
  

  // Filter data based on status
  const filteredData = statusFilter === "ALL" 
    ? data 
    : data.filter(att => att.status === statusFilter);

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sorting
  const handleSort = (field: keyof Attendance) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
    const LocationStatus = (
    status?: "INSIDE_OFFICE" | "OUTSIDE_OFFICE"
  ) => {
    if (status === "INSIDE_OFFICE") {
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
          Inside Office
        </span>
      );
    }

    if (status === "OUTSIDE_OFFICE") {
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
          Outside Office
        </span>
      );
    }

    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
        Not Available
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header with title and filters */}
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          Attendance History
        </h2>
        
        {/* Status filter */}
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-4 w-4 text-gray-500" />
          <div className="flex rounded-md overflow-hidden shadow-sm">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1.5 text-sm font-medium ${
                statusFilter === "ALL"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("PRESENT")}
              className={`px-3 py-1.5 text-sm font-medium ${
                statusFilter === "PRESENT"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-r border-gray-300`}
            >
              Present
            </button>
            <button
              onClick={() => setStatusFilter("ABSENT")}
              className={`px-3 py-1.5 text-sm font-medium ${
                statusFilter === "ABSENT"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-r border-gray-300`}
            >
              Absent
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Head */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center gap-1">
                  Date
                  {sortField === "createdAt" && (
                    sortDirection === "asc" ? 
                    <ChevronUpIcon className="h-4 w-4" /> : 
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center justify-center gap-1">
                  Status
                  {sortField === "status" && (
                    sortDirection === "asc" ? 
                    <ChevronUpIcon className="h-4 w-4" /> : 
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location Status
              </th>
               <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proof
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={`loading-${index}`} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="h-6 bg-gray-200 rounded-full w-16 mx-auto"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                  </td>
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={3} className="px-6 py-12">
                  <div className="flex flex-col items-center justify-center text-center">
                    <DocumentIcon className="h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No attendance records found</h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      {statusFilter !== "ALL" 
                        ? `No ${statusFilter.toLowerCase()} records found. Try changing the filter.`
                        : "There are no attendance records available for the selected period."
                      }
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Data rows
              sortedData.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50 transition-colors">
                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {format(new Date(att.createdAt), "MMM dd, yyyy")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(att.createdAt), "EEEE")}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        att.status === "PRESENT"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {att.status === "PRESENT" ? (
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 mr-1" />
                      )}
                      {att.status}
                    </span>
                  </td>
                   <td className="px-6 py-4 text-center">
                      {LocationStatus(att.locationStatus)}
                    </td>

                  {/* Image / Proof */}
                   <td className="px-6 py-4 text-center">
                      {att.imagePath ? (
                        <button
                          onClick={() => setSelectedAttendance(att)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          View
                        </button>
                      ) : (
                        "—"
                      )}
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedAttendance && (
        <ViewModal
          attendance={selectedAttendance}
          userName={user?.fullName || "User"}
          onClose={() => setSelectedAttendance(null)}
        />
      )}

      {/* Footer with summary */}
      {sortedData.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{sortedData.length}</span> of{" "}
            <span className="font-medium">{data.length}</span> records
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <span className="text-gray-500 mr-1">Present:</span>
              <span className="font-medium text-green-600">
                {data.filter(att => att.status === "PRESENT").length}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-1">Absent:</span>
              <span className="font-medium text-red-600">
                {data.filter(att => att.status === "ABSENT").length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { 
  CalendarIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  GiftIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

export default function DashboardCards() {
  // Calculate percentages for charts
  const totalDays = 32;
  const presentPercentage = Math.round((22 / totalDays) * 100);
  const absentPercentage = Math.round((10 / totalDays) * 100);
  const leavePercentage = Math.round((11 / 22) * 100);
  
  // Performance level based on attendance
  const getPerformanceLevel = () => {
    if (presentPercentage >= 90) return { level: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (presentPercentage >= 75) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (presentPercentage >= 60) return { level: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };
  
  const performance = getPerformanceLevel();

  return (
    <div className="space-y-6 mt-6 ml-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Today's Status - Premium Card */}
        <div className="relative bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
            <div className="w-24 h-24 bg-white rounded-full"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Today
              </span>
            </div>
            <h3 className="text-emerald-100 text-sm font-medium mb-1">Today's Status</h3>
            <p className="text-3xl font-bold mb-3">Present</p>
            <div className="flex items-center text-sm text-emerald-100">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>Check-in: 9:15 AM</span>
            </div>
          </div>
        </div>

        {/* Total Present - Chart Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <UserGroupIcon className="h-8 w-8 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-emerald-600">{presentPercentage}%</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Present</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">22 Days</p>
            
            {/* Mini Chart */}
            <div className="flex items-end justify-between h-16 mb-2">
              {[65, 75, 80, 70, 85, 90, 88, 92, 87, 91, 89, 93].map((height, i) => (
                <div key={i} className="flex-1 mx-0.5">
                  <div 
                    className="bg-emerald-500 rounded-t-sm transition-all duration-300 hover:bg-emerald-600" 
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-1 text-emerald-500" />
              <span>5% from last month</span>
            </div>
          </div>
        </div>

        {/* Total Absent - Gauge Chart */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <XCircleIcon className="h-8 w-8 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-red-600">{absentPercentage}%</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Absent</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">10 Days</p>
            
            {/* Circular Progress */}
            <div className="relative h-20 flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="40" 
                  cy="40" 
                  r="36" 
                  stroke="#ef4444" 
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - absentPercentage / 100)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute">
                <span className="text-lg font-bold text-gray-900">{absentPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining Leaves - Level Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${performance.color} ${performance.bg} px-3 py-1 rounded-full`}>
                {performance.level}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-2">Remaining Leaves</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">11 Days</p>
            
            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Leave Balance</span>
                <span>11/22</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 relative"
                  style={{ width: `${leavePercentage}%` }}
                >
                  <div className="absolute right-0 top-0 h-full w-2 bg-white/30 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Holiday and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Next Holiday - Premium Card */}
        <div className="bg-linear-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm mr-4">
                  <GiftIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-purple-100 text-sm font-medium">Next Holiday</h3>
                  <p className="text-2xl font-bold">Happy New Year</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">JAN 1</p>
                    <p className="text-purple-200 text-sm">thursday, 2026</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl mb-1">🎀🎉</p>
                    <p className="text-sm font-medium">In 2 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview - Advanced Chart */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900 text-lg font-semibold">Performance Overview</h3>
                <p className="text-gray-500 text-sm">Monthly Attendance Rate</p>
              </div>
              <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            
            {/* Advanced Bar Chart */}
            <div className="space-y-3">
              {[
                { label: 'Present', value: 22, color: 'bg-emerald-500', percentage: 69 },
                { label: 'Absent', value: 10, color: 'bg-red-500', percentage: 31 },
                { label: 'Leave', value: 11, color: 'bg-blue-500', percentage: 50 }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">{item.label}</span>
                    <span className="text-gray-900 font-bold">{item.value} days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-700 ${item.color} relative`}
                      style={{ width: `${item.percentage}%` }}
                    >
                      <div className="absolute right-0 top-0 h-full w-2 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Performance Badge */}
            <div className={`mt-6 ${performance.bg} rounded-xl p-4 text-center`}>
              <p className={`text-sm font-medium ${performance.color}`}>Performance Level</p>
              <p className={`text-2xl font-bold ${performance.color} mt-1`}>{performance.level}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
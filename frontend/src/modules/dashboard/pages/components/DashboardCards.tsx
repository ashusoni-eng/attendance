export default function DashboardCards() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Today's Status</h3>
        <p className="text-3xl font-bold mt-2 text-teal-600">Present</p>
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Total Present Days</h3>
        <p className="text-3xl font-bold mt-2">22</p>
      </div>
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Total Absent</h3>
        <p className="text-3xl font-bold mt-2">10</p>
      </div>
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Remians leaves</h3>
        <p className="text-3xl font-bold mt-2">11</p>
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Next Holiday</h3>
        <p className="text-2xl font-bold mt-2 text-blue-600">Christmas Day🎄</p>
      </div>
    </div>
  );
}

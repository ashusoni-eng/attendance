import { useAuth } from "../../../providers/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6 text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-6  max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-teal-600 text-white flex items-center justify-center text-3xl font-bold">
            {user.fullName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {user.fullName}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <hr />

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium">{user.fullName}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-medium">
              {user.accountType === "ADMIN" ? "Admin" : "Employee"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

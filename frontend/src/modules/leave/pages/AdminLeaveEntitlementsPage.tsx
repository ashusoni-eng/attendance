import { useEffect, useState } from "react";
import { employeeApi } from "../../employee/api/employee.api";
import EntitlementTable from "../components/EntitilementTable";
import AssignLeaveModal from "../components/AssignLeaveModal";

export default function AdminLeaveEntitlementsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch ONLY users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await employeeApi.getAll();

      const userList =
        res?.data?.data?.items ||
        res?.data?.items ||
        [];

      setUsers(userList);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leave Entitlements</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          + Assign Leave
        </button>
      </div>

      {/* USERS TABLE */}
      {!selectedUser && (
        <>
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center p-4">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="border p-2">{user.fullName || user.name}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => setSelectedUser(user)}
                        >
                          View Entitlements
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* ENTITLEMENT TABLE */}
      {selectedUser && (
        <EntitlementTable
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
        />
      )}

      {/* ASSIGN MODAL */}
      {showModal && (
        <AssignLeaveModal
          users={users}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            // refresh list if needed
          }}
        />
      )}
    </div>
  );
}

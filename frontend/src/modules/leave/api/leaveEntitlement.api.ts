// import axiosClient from "../../../core/axios/axiosClient";

// export const leaveEntitlementApi = {
//   // ADMIN: assign leave
//   assign: (data: {
//     userId: string;
//     leave_type_id: string;
//     total_leaves: number;
//   }) => axiosClient.post("/admin/leave-entitlement", data),

//   // ADMIN: get all entitlements
//   getAll: async () => {
//     const res = await axiosClient.get("/admin/leave-entitlement");
//     return res.data.data; 
//   },
  

//   // EMPLOYEE: get own entitlements
//    getMyEntitlements: async(userId: string) =>
    
//      await axiosClient.get(`/employee/leave/${userId}`),
// };
import axiosClient from "../../../core/axios/axiosClient";

export const leaveEntitlementApi = {
  // ADMIN: assign leave
  assign: (data: {
    userId: string;
    leave_type_id: string;
    total_leaves: number;
  }) => axiosClient.post("/admin/leave-entitlement", data),

  // ADMIN: get all entitlements
  getAll: async () => {
    const res = await axiosClient.get("/admin/leave-entitlement");
    return res.data.data.items;
  },

  // EMPLOYEE / ADMIN: get entitlements of a specific user
  getByUserId: async (userId: string) => {
    const res = await axiosClient.get(`/employee/leave/${userId}`);
    return res.data;
  },
};

import axiosClient from "../../../core/axios/axiosClient";
import type{ LeaveEntitlement } from "../types/leaveEntitlement.types";

export const leaveEntitlementApi = {
  getMyEntitlements: () =>
    axiosClient.get<LeaveEntitlement[]>("/leave-entitlements/my"),
   getAll: () =>
    axiosClient.get<LeaveEntitlement[]>("/leave-entitlements"),

  // Admin – assign / create entitlement
  create: (data: {
    userId: string;
    leave_type_id: string;
    total_leaves: number;
  }) => axiosClient.post("/leave-entitlements", data),
};

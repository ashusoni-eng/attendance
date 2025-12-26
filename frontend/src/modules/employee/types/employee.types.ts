export interface Employee {
  id: string;
  fullName: string;
  email: string;
  accountType: "ADMIN" | "USER";
  isActive: boolean;
  createdAt: string;
}
export interface user {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  createdAt: string;
}
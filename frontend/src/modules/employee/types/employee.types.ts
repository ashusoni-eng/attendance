export interface Employee {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Employee";
  status: "Active" | "Inactive";
  createdAt: string;


}

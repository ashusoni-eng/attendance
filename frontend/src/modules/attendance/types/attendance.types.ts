    export interface Attendance {
  checkOutTime: any;
  checkInTime: any;
  id: string;
  status: "PRESENT" | "ABSENT";
  createdAt: string;
  imagePath?: string;
  locationStatus?: "INSIDE_OFFICE" | "OUTSIDE_OFFICE";
  
}

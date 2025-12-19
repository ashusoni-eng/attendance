    export interface Attendance {
  id: string;
  status: "PRESENT" | "ABSENT";
  createdAt: string;
  imagePath?: string;
}

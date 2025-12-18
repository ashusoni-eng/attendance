import { LocationStatus, RequestStatus, Status, User } from '@prisma/client';

export type UserToken = {
  sub: string;
} & User;

export type AuthProvider = 'google' | 'facebook' | 'apple' | 'email';

export type SocialUser = {
  fullName: string;
  email: string;
  profilePic: string | null | undefined;
  provider: AuthProvider;
  providerId: string;
};

export type coordinates = {
  latitude: string,
  longitude: string
}
export type AttendanceType = {
  userId: string,
  location: coordinates,
  imagePath: string
  is_available_on_weekend?: { day: string }
  is_available_on_holiday?: {
    id: string,
    name: string
    description?: string|null,
    date: Date
  }
  status:Status,
  locationStatus:LocationStatus
}
export type LeaveRequestType = {
  userId: string,
  leave_entitlements_id: string,
  isApproved?: RequestStatus
}

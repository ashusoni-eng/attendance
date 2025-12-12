import { User } from '@prisma/client';

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

export type coordinates={
  latitude:string,
  longitude:string
}
export type AttendanceType={
  userId:string,
  location:coordinates,
  imagePath:string
}

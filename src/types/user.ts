export interface User {
  id: number;
  uuid: string;

  name: string;
  lastName?: string;

  email: string;
  username?: string;

  avatarUrl?: string;

  role: UserRole;

  isActive: boolean;

  preferences?: UserPreferences;

  createdAt?: string;
  updatedAt?: string;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

export interface UserPreferences {
  language: string;
  theme: ThemeMode;
  autoplay: boolean;
  notifications: boolean;
  showExplicitContent: boolean;
}

export enum ThemeMode {
  LIGHT = "LIGHT",
  DARK = "DARK",
  SYSTEM = "SYSTEM",
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  username?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface UpdateUserRequest {
  name?: string;
  lastName?: string;
  username?: string;
  avatarUrl?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePreferencesRequest {
  language?: string;
  theme?: ThemeMode;
  autoplay?: boolean;
  notifications?: boolean;
  showExplicitContent?: boolean;
}
export interface Program {
  id: number;
  name: string;
  description: string;
  host?: string;
  imageUrl?: string;
  category: ProgramCategory;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isLive: boolean;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export enum ProgramCategory {
  MUSIC = "MUSIC",
  NEWS = "NEWS",
  SPORTS = "SPORTS",
  ENTERTAINMENT = "ENTERTAINMENT",
  CULTURE = "CULTURE",
  INTERVIEWS = "INTERVIEWS",
  PODCAST = "PODCAST",
  VARIETY = "VARIETY",
}

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export interface ProgramResponse {
  programs: Program[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProgramFilters {
  category?: ProgramCategory;
  dayOfWeek?: DayOfWeek;
  search?: string;
  page?: number;
  limit?: number;
}
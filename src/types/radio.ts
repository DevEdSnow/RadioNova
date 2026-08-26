import { Station } from "./station";

export interface RadioState {
  currentStation: Station | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  error: string | null;
}

export interface NowPlaying {
  title: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  duration?: number;
  startedAt?: string;
}

export interface RadioStream {
  url: string;
  format?: AudioFormat;
  bitrate?: number;
  sampleRate?: number;
  codec?: string;
}

export enum AudioFormat {
  MP3 = "MP3",
  AAC = "AAC",
  OGG = "OGG",
  HLS = "HLS",
}

export interface RadioPlayerActions {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  togglePlay: () => Promise<void>;
  setVolume: (volume: number) => void;
  changeStation: (station: Station) => Promise<void>;
}

export interface RadioPlayerContext
  extends RadioState,
    RadioPlayerActions {
  nowPlaying: NowPlaying | null;
}
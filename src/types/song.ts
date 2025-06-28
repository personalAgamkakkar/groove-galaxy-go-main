
export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  isOffline?: boolean;
  language?: string;
}

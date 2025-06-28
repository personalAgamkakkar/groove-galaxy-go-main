
import { Song } from "@/types/song";
import { Music } from "lucide-react";

interface AlbumSectionProps {
  title: string;
  songs: Song[];
  onSongPlay: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  likedSongs: Set<number>;
  language: string;
}

export const AlbumSection = ({ 
  title, 
  songs, 
  onSongPlay, 
  currentSong, 
  isPlaying, 
  likedSongs,
  language 
}: AlbumSectionProps) => {
  const languageSongs = songs.filter(song => 
    song.language?.toLowerCase() === language.toLowerCase()
  ).slice(0, 100);

  const getLanguageGradient = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'hindi':
        return 'from-orange-600 to-red-600';
      case 'punjabi':
        return 'from-green-600 to-yellow-600';
      case 'english':
        return 'from-blue-600 to-purple-600';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  if (languageSongs.length === 0) return null;

  return (
    <div className="mb-8">
      <div className={`bg-gradient-to-r ${getLanguageGradient(language)} p-6 rounded-lg mb-4`}>
        <div className="flex items-center space-x-3">
          <Music className="h-8 w-8 text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-white/80 text-sm">{languageSongs.length} songs</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {languageSongs.slice(0, 20).map((song) => (
          <div
            key={song.id}
            onClick={() => onSongPlay(song)}
            className={`p-4 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-all duration-200 ${
              currentSong?.id === song.id ? 'ring-2 ring-green-500 bg-gray-700' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  {song.artist}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  {likedSongs.has(song.id) && (
                    <span className="text-green-500 text-xs">♥</span>
                  )}
                  {song.isOffline && (
                    <span className="text-blue-500 text-xs">⬇</span>
                  )}
                  {currentSong?.id === song.id && isPlaying && (
                    <span className="text-green-500 text-xs animate-pulse">♪</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {languageSongs.length > 20 && (
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Showing 20 of {languageSongs.length} {language} songs
          </p>
        </div>
      )}
    </div>
  );
};

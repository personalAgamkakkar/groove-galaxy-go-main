
import { Play, Heart, Download } from "lucide-react";
import { Song } from "@/types/song";
import { cn } from "@/lib/utils";

interface SongItemProps {
  song: Song;
  index: number;
  isLiked: boolean;
  toggleLike: (songId: number) => void;
  playSong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

export const SongItem = ({
  song,
  index,
  isLiked,
  toggleLike,
  playSong,
  currentSong,
  isPlaying
}: SongItemProps) => {
  const isCurrentSong = currentSong?.id === song.id;

  return (
    <div
      className={cn(
        "p-3 md:p-4 hover:bg-gray-800/50 transition-colors group cursor-pointer",
        "md:grid md:grid-cols-12 md:gap-4",
        "flex items-center space-x-3 md:space-x-0",
        isCurrentSong && "bg-gray-800/30"
      )}
      onClick={() => playSong(song)}
    >
      {/* Mobile Layout */}
      <div className="md:hidden flex items-center space-x-3 flex-1">
        <div className="flex-shrink-0">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-12 h-12 rounded"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className={cn(
            "font-medium truncate",
            isCurrentSong ? "text-green-500" : "text-white"
          )}>
            {song.title}
          </div>
          <div className="text-gray-400 text-sm truncate">
            {song.artist}
            {song.language && (
              <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                {song.language}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(song.id);
            }}
            className={cn(
              "transition-opacity",
              isLiked ? "opacity-100" : "opacity-60"
            )}
          >
            <Heart
              size={16}
              className={cn(
                isLiked 
                  ? "fill-green-500 text-green-500" 
                  : "text-gray-400"
              )}
            />
          </button>
          {song.isOffline && (
            <Download size={14} className="text-green-500" />
          )}
          {isCurrentSong && isPlaying && (
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="flex space-x-0.5">
                <div className="w-0.5 h-3 bg-green-500 animate-pulse"></div>
                <div className="w-0.5 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-0.5 h-2 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:contents">
        <div className="col-span-1 flex items-center text-gray-400">
          <span className="group-hover:hidden">
            {isCurrentSong && isPlaying ? (
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="flex space-x-0.5">
                  <div className="w-0.5 h-3 bg-green-500 animate-pulse"></div>
                  <div className="w-0.5 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-0.5 h-2 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : (
              index + 1
            )}
          </span>
          <Play size={16} className="hidden group-hover:block text-white" />
        </div>
        
        <div className="col-span-5 flex items-center space-x-3">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-10 h-10 rounded"
          />
          <div>
            <div className={cn(
              "font-medium",
              isCurrentSong ? "text-green-500" : "text-white"
            )}>
              {song.title}
            </div>
            <div className="text-gray-400 text-sm flex items-center space-x-2">
              <span>{song.artist}</span>
              {song.language && (
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                  {song.language}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-span-3 flex items-center text-gray-400 text-sm">
          {song.album}
        </div>
        
        <div className="col-span-2 flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(song.id);
            }}
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-opacity",
              isLiked && "opacity-100"
            )}
          >
            <Heart
              size={16}
              className={cn(
                isLiked 
                  ? "fill-green-500 text-green-500" 
                  : "text-gray-400 hover:text-white"
              )}
            />
          </button>
          <span className="text-gray-400">{song.duration}</span>
          {song.isOffline && (
            <Download size={14} className="text-green-500" />
          )}
        </div>
        
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};

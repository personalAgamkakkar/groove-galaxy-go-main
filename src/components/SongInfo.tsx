
import { Heart } from "lucide-react";
import { Song } from "@/types/song";
import { cn } from "@/lib/utils";

interface SongInfoProps {
  currentSong: Song;
  isLiked: boolean;
  toggleLike: () => void;
  hasError: boolean;
  isLoading: boolean;
}

export const SongInfo = ({ currentSong, isLiked, toggleLike, hasError, isLoading }: SongInfoProps) => {
  return (
    <div className="flex items-center space-x-2 md:space-x-3 w-1/3 md:w-1/4 min-w-0">
      <img
        src={currentSong.coverUrl}
        alt={currentSong.title}
        className="w-12 h-12 md:w-16 md:h-16 rounded flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="text-white font-medium truncate text-sm md:text-base">{currentSong.title}</div>
        <div className="text-gray-400 text-xs md:text-sm truncate">
          {currentSong.artist}
          {hasError && <span className="text-red-400 ml-2">(Error loading)</span>}
          {isLoading && <span className="text-yellow-400 ml-2">(Loading...)</span>}
        </div>
      </div>
      <button
        onClick={toggleLike}
        className="flex-shrink-0 p-1 md:p-2"
      >
        <Heart
          size={16}
          className={cn(
            "md:w-5 md:h-5",
            isLiked 
              ? "fill-green-500 text-green-500" 
              : "text-gray-400 hover:text-white transition-colors"
          )}
        />
      </button>
    </div>
  );
};

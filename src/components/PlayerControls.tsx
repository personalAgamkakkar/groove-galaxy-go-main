
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  isShuffle: boolean;
  setIsShuffle: (shuffle: boolean) => void;
  isRepeat: boolean;
  setIsRepeat: (repeat: boolean) => void;
  hasError: boolean;
  isLoading: boolean;
}

export const PlayerControls = ({
  isPlaying,
  togglePlay,
  playNext,
  playPrevious,
  isShuffle,
  setIsShuffle,
  isRepeat,
  setIsRepeat,
  hasError,
  isLoading
}: PlayerControlsProps) => {
  return (
    <div className="flex items-center space-x-3 md:space-x-4">
      <button
        onClick={() => setIsShuffle(!isShuffle)}
        className={cn(
          "transition-colors p-1",
          isShuffle ? "text-green-500" : "text-gray-400 hover:text-white"
        )}
      >
        <Shuffle size={18} className="md:w-5 md:h-5" />
      </button>
      
      <button
        onClick={playPrevious}
        className="text-gray-400 hover:text-white transition-colors p-1"
      >
        <SkipBack size={20} className="md:w-6 md:h-6" />
      </button>
      
      <button
        onClick={togglePlay}
        disabled={hasError || isLoading}
        className={cn(
          "bg-white text-black rounded-full p-2 md:p-3 hover:scale-105 transition-transform",
          (hasError || isLoading) && "opacity-50 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause size={20} className="md:w-6 md:h-6" />
        ) : (
          <Play size={20} className="md:w-6 md:h-6" />
        )}
      </button>
      
      <button
        onClick={playNext}
        className="text-gray-400 hover:text-white transition-colors p-1"
      >
        <SkipForward size={20} className="md:w-6 md:h-6" />
      </button>
      
      <button
        onClick={() => setIsRepeat(!isRepeat)}
        className={cn(
          "transition-colors p-1",
          isRepeat ? "text-green-500" : "text-gray-400 hover:text-white"
        )}
      >
        <Repeat size={18} className="md:w-5 md:h-5" />
      </button>
    </div>
  );
};

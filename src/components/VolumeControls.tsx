
import { Volume2, Settings, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface VolumeControlsProps {
  volume: number;
  setVolume: (volume: number) => void;
  showEqualizer: boolean;
  setShowEqualizer: (show: boolean) => void;
  showTimer: boolean;
  setShowTimer: (show: boolean) => void;
  timerActive: boolean;
  timerMinutes: number;
}

export const VolumeControls = ({
  volume,
  setVolume,
  showEqualizer,
  setShowEqualizer,
  showTimer,
  setShowTimer,
  timerActive,
  timerMinutes
}: VolumeControlsProps) => {
  return (
    <div className="flex items-center space-x-2 md:space-x-3 w-1/3 md:w-1/4 justify-end">
      {/* Timer Status */}
      {timerActive && (
        <div className="hidden md:flex items-center space-x-1 text-green-500 text-xs">
          <Timer size={14} />
          <span>{timerMinutes}m</span>
        </div>
      )}
      
      {/* Mobile: Show icons vertically */}
      <div className="flex md:hidden flex-col space-y-1">
        <button
          onClick={() => setShowEqualizer(!showEqualizer)}
          className={cn(
            "transition-colors p-1",
            showEqualizer ? "text-green-500" : "text-gray-400 hover:text-white"
          )}
        >
          <Settings size={16} />
        </button>
        <button
          onClick={() => setShowTimer(!showTimer)}
          className={cn(
            "transition-colors p-1",
            timerActive ? "text-green-500" : "text-gray-400 hover:text-white"
          )}
        >
          <Timer size={16} />
        </button>
      </div>
      
      {/* Desktop: Show horizontally with volume */}
      <div className="hidden md:flex items-center space-x-3">
        <button
          onClick={() => setShowEqualizer(!showEqualizer)}
          className={cn(
            "transition-colors",
            showEqualizer ? "text-green-500" : "text-gray-400 hover:text-white"
          )}
        >
          <Settings size={18} />
        </button>
        
        <button
          onClick={() => setShowTimer(!showTimer)}
          className={cn(
            "transition-colors",
            timerActive ? "text-green-500" : "text-gray-400 hover:text-white"
          )}
        >
          <Timer size={18} />
        </button>
        
        <Volume2 size={18} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
};

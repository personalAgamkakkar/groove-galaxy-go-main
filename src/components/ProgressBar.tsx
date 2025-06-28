
interface ProgressBarProps {
  currentTime: number;
  duration: number;
  hasError: boolean;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProgressBar = ({ currentTime, duration, hasError, onSeek }: ProgressBarProps) => {
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-sm md:max-w-lg">
      <span className="text-xs text-gray-400 w-10 text-right">
        {formatTime(currentTime)}
      </span>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={onSeek}
        disabled={hasError}
        className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
      />
      <span className="text-xs text-gray-400 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

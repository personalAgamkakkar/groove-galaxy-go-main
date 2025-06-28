
import { useState } from "react";
import { X, Timer, Play, Square } from "lucide-react";

interface TimerSettingsProps {
  onStartTimer: (minutes: number) => void;
  onCancelTimer: () => void;
  timerActive: boolean;
  timerMinutes: number;
  onClose: () => void;
}

export const TimerSettings = ({ 
  onStartTimer, 
  onCancelTimer, 
  timerActive, 
  timerMinutes, 
  onClose 
}: TimerSettingsProps) => {
  const [selectedMinutes, setSelectedMinutes] = useState(30);

  const timeOptions = [5, 10, 15, 30, 45, 60, 90, 120];

  const handleStartTimer = () => {
    onStartTimer(selectedMinutes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-semibold flex items-center gap-2">
            <Timer size={20} />
            Sleep Timer
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {timerActive ? (
          <div className="text-center">
            <div className="mb-4">
              <div className="text-green-500 text-3xl font-mono mb-2">
                {timerMinutes}:00
              </div>
              <p className="text-gray-300 text-sm">Music will stop automatically</p>
            </div>
            <button
              onClick={onCancelTimer}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <Square size={16} />
              Cancel Timer
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-300 text-sm mb-4 text-center">
              Select how long you want the music to play
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {timeOptions.map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => setSelectedMinutes(minutes)}
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedMinutes === minutes
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {minutes < 60 ? `${minutes}m` : `${minutes / 60}h`}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="text-gray-300 text-sm block mb-2">Custom (minutes)</label>
              <input
                type="number"
                min="1"
                max="480"
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(Number(e.target.value))}
                className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                placeholder="Enter minutes"
              />
            </div>

            <button
              onClick={handleStartTimer}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Play size={16} />
              Start Timer ({selectedMinutes}m)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


import { useState } from "react";
import { X } from "lucide-react";

interface EqualizerProps {
  settings: {
    bass: number;
    mid: number;
    treble: number;
  };
  onSettingsChange: (settings: { bass: number; mid: number; treble: number }) => void;
  onClose: () => void;
}

export const Equalizer = ({ settings, onSettingsChange, onClose }: EqualizerProps) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (type: 'bass' | 'mid' | 'treble', value: number) => {
    const newSettings = { ...localSettings, [type]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const presets = [
    { name: 'Normal', bass: 0, mid: 0, treble: 0 },
    { name: 'Bass Boosted', bass: 5, mid: 1, treble: 0 },
    { name: 'Extra Bass', bass: 5, mid: 2, treble: -1 },
    { name: 'Rock', bass: 3, mid: 1, treble: 2 },
    { name: 'Pop', bass: 2, mid: 2, treble: 1 },
    { name: 'Jazz', bass: 1, mid: 3, treble: 2 },
    { name: 'Classical', bass: 0, mid: 2, treble: 3 },
    { name: 'Electronic', bass: 4, mid: 0, treble: 3 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setLocalSettings(preset);
    onSettingsChange(preset);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-semibold">Equalizer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Presets */}
        <div className="mb-6">
          <h3 className="text-gray-300 text-sm mb-3">Presets</h3>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className={`text-white text-sm py-2 px-3 rounded transition-colors ${
                  preset.name === 'Bass Boosted' || preset.name === 'Extra Bass' 
                    ? 'bg-green-600 hover:bg-green-500' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* EQ Controls */}
        <div className="space-y-6">
          <div className="text-center">
            <label className="text-gray-300 text-sm block mb-2">Bass</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={localSettings.bass}
              onChange={(e) => handleChange('bass', Number(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-gray-400 text-xs">{localSettings.bass > 0 ? '+' : ''}{localSettings.bass}</span>
          </div>

          <div className="text-center">
            <label className="text-gray-300 text-sm block mb-2">Mid</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={localSettings.mid}
              onChange={(e) => handleChange('mid', Number(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-gray-400 text-xs">{localSettings.mid > 0 ? '+' : ''}{localSettings.mid}</span>
          </div>

          <div className="text-center">
            <label className="text-gray-300 text-sm block mb-2">Treble</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={localSettings.treble}
              onChange={(e) => handleChange('treble', Number(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-gray-400 text-xs">{localSettings.treble > 0 ? '+' : ''}{localSettings.treble}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => applyPreset({ name: 'Bass Boosted', bass: 5, mid: 1, treble: 0 })}
            className="bg-green-600 hover:bg-green-500 text-white text-sm py-2 px-4 rounded transition-colors"
          >
            Bass Boost
          </button>
          <button
            onClick={() => applyPreset(presets[0])}
            className="bg-gray-600 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

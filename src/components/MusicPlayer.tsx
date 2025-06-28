
import { useState } from "react";
import { Song } from "@/types/song";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTimer } from "@/hooks/useTimer";
import { SongInfo } from "./SongInfo";
import { PlayerControls } from "./PlayerControls";
import { VolumeControls } from "./VolumeControls";
import { ProgressBar } from "./ProgressBar";
import { Equalizer } from "./Equalizer";
import { TimerSettings } from "./TimerSettings";

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  isLiked: boolean;
  toggleLike: () => void;
}

export const MusicPlayer = ({
  currentSong,
  isPlaying,
  togglePlay,
  playNext,
  playPrevious,
  isLiked,
  toggleLike
}: MusicPlayerProps) => {
  const [volume, setVolume] = useState(50);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [showEqualizer, setShowEqualizer] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [equalizerSettings, setEqualizerSettings] = useState({
    bass: 0,
    mid: 0,
    treble: 0
  });

  const {
    audioRef,
    currentTime,
    duration,
    isLoading,
    hasError,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleError,
    handleEnded,
    handleSeek
  } = useAudioPlayer({ currentSong, isPlaying, playNext, volume, isRepeat });

  const {
    timerMinutes,
    timerActive,
    startTimer,
    cancelTimer
  } = useTimer(togglePlay);

  if (!currentSong) {
    return (
      <div className="h-20 md:h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center">
        <p className="text-gray-400 text-sm md:text-base">Select a song to start playing</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-20 md:h-24 bg-gray-900 border-t border-gray-800 px-3 md:px-4 flex items-center justify-between">
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onError={handleError}
          preload="metadata"
        />
        
        <SongInfo
          currentSong={currentSong}
          isLiked={isLiked}
          toggleLike={toggleLike}
          hasError={hasError}
          isLoading={isLoading}
        />

        <div className="flex flex-col items-center space-y-2 md:space-y-3 w-1/3 md:w-2/4">
          <PlayerControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            playNext={playNext}
            playPrevious={playPrevious}
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
            isRepeat={isRepeat}
            setIsRepeat={setIsRepeat}
            hasError={hasError}
            isLoading={isLoading}
          />
          
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            hasError={hasError}
            onSeek={handleSeek}
          />
        </div>

        <VolumeControls
          volume={volume}
          setVolume={setVolume}
          showEqualizer={showEqualizer}
          setShowEqualizer={setShowEqualizer}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
          timerActive={timerActive}
          timerMinutes={timerMinutes}
        />
      </div>

      {/* Equalizer Modal */}
      {showEqualizer && (
        <Equalizer
          settings={equalizerSettings}
          onSettingsChange={setEqualizerSettings}
          onClose={() => setShowEqualizer(false)}
        />
      )}

      {/* Timer Modal */}
      {showTimer && (
        <TimerSettings
          onStartTimer={startTimer}
          onCancelTimer={cancelTimer}
          timerActive={timerActive}
          timerMinutes={timerMinutes}
          onClose={() => setShowTimer(false)}
        />
      )}
    </>
  );
};

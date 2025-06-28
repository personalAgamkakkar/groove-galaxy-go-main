
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { MainContent } from "@/components/MainContent";
import { Song } from "@/types/song";
import { songs } from "@/data/songs";

const Index = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [showOfflineOnly, setShowOfflineOnly] = useState(false);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  const toggleLike = (songId: number) => {
    const newLikedSongs = new Set(likedSongs);
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId);
    } else {
      newLikedSongs.add(songId);
    }
    setLikedSongs(newLikedSongs);
  };

  const playSong = (song: Song) => {
    console.log("Playing song:", song.title, "URL:", song.audioUrl);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getFilteredSongs = () => {
    return songs.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOffline = showOfflineOnly ? song.isOffline : true;
      const matchesLiked = showLikedOnly ? likedSongs.has(song.id) : true;
      const matchesLanguage = selectedLanguage === "all" || 
                             (song.language && song.language.toLowerCase() === selectedLanguage.toLowerCase());
      
      return matchesSearch && matchesOffline && matchesLiked && matchesLanguage;
    });
  };

  const playNext = () => {
    if (!currentSong) return;
    
    const filteredSongs = getFilteredSongs();
    const currentIndex = filteredSongs.findIndex(song => song.id === currentSong.id);
    
    if (currentIndex === -1) {
      // If current song is not in filtered list, play first song from filtered list
      if (filteredSongs.length > 0) {
        console.log("Current song not in filtered list, playing first available song");
        playSong(filteredSongs[0]);
      }
      return;
    }
    
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    console.log("Playing next song:", filteredSongs[nextIndex].title);
    playSong(filteredSongs[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong) return;
    
    const filteredSongs = getFilteredSongs();
    const currentIndex = filteredSongs.findIndex(song => song.id === currentSong.id);
    
    if (currentIndex === -1) {
      // If current song is not in filtered list, play last song from filtered list
      if (filteredSongs.length > 0) {
        console.log("Current song not in filtered list, playing last available song");
        playSong(filteredSongs[filteredSongs.length - 1]);
      }
      return;
    }
    
    const prevIndex = currentIndex === 0 ? filteredSongs.length - 1 : currentIndex - 1;
    console.log("Playing previous song:", filteredSongs[prevIndex].title);
    playSong(filteredSongs[prevIndex]);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden relative">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          showOfflineOnly={showOfflineOnly}
          setShowOfflineOnly={setShowOfflineOnly}
          showLikedOnly={showLikedOnly}
          setShowLikedOnly={setShowLikedOnly}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          likedSongsCount={likedSongs.size}
        />
        <MainContent
          songs={getFilteredSongs()}
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          playSong={playSong}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showOfflineOnly={showOfflineOnly}
          showLikedOnly={showLikedOnly}
          selectedLanguage={selectedLanguage}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />
      </div>
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        playNext={playNext}
        playPrevious={playPrevious}
        isLiked={currentSong ? likedSongs.has(currentSong.id) : false}
        toggleLike={() => currentSong && toggleLike(currentSong.id)}
      />
    </div>
  );
};

export default Index;

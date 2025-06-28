
import { Song } from "@/types/song";
import { SearchBar } from "./SearchBar";
import { ContentHeader } from "./ContentHeader";
import { SongList } from "./SongList";
import { AlbumSection } from "./AlbumSection";

interface MainContentProps {
  songs: Song[];
  likedSongs: Set<number>;
  toggleLike: (songId: number) => void;
  playSong: (song: Song) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showOfflineOnly: boolean;
  showLikedOnly: boolean;
  selectedLanguage: string;
  currentSong: Song | null;
  isPlaying: boolean;
}

export const MainContent = ({
  songs,
  likedSongs,
  toggleLike,
  playSong,
  searchQuery,
  setSearchQuery,
  showOfflineOnly,
  showLikedOnly,
  selectedLanguage,
  currentSong,
  isPlaying
}: MainContentProps) => {
  const showAlbumSections = !searchQuery && !showOfflineOnly && !showLikedOnly && selectedLanguage === "all";
  
  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="p-3 md:p-6 pt-16 md:pt-6 max-h-screen overflow-y-auto">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {showAlbumSections ? (
          <div className="space-y-8">
            <AlbumSection
              title="Hindi Collection"
              songs={songs}
              onSongPlay={playSong}
              currentSong={currentSong}
              isPlaying={isPlaying}
              likedSongs={likedSongs}
              language="hindi"
            />
            <AlbumSection
              title="Punjabi Collection"
              songs={songs}
              onSongPlay={playSong}
              currentSong={currentSong}
              isPlaying={isPlaying}
              likedSongs={likedSongs}
              language="punjabi"
            />
            <AlbumSection
              title="English Collection"
              songs={songs}
              onSongPlay={playSong}
              currentSong={currentSong}
              isPlaying={isPlaying}
              likedSongs={likedSongs}
              language="english"
            />
          </div>
        ) : (
          <>
            <ContentHeader
              showLikedOnly={showLikedOnly}
              showOfflineOnly={showOfflineOnly}
              selectedLanguage={selectedLanguage}
              songsCount={songs.length}
              searchQuery={searchQuery}
            />

            <SongList
              songs={songs}
              likedSongs={likedSongs}
              toggleLike={toggleLike}
              playSong={playSong}
              currentSong={currentSong}
              isPlaying={isPlaying}
              showLikedOnly={showLikedOnly}
              showOfflineOnly={showOfflineOnly}
              selectedLanguage={selectedLanguage}
              searchQuery={searchQuery}
            />
          </>
        )}
      </div>
    </div>
  );
};


import { Song } from "@/types/song";
import { SongItem } from "./SongItem";

interface SongListProps {
  songs: Song[];
  likedSongs: Set<number>;
  toggleLike: (songId: number) => void;
  playSong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  showLikedOnly: boolean;
  showOfflineOnly: boolean;
  selectedLanguage: string;
  searchQuery: string;
}

export const SongList = ({
  songs,
  likedSongs,
  toggleLike,
  playSong,
  currentSong,
  isPlaying,
  showLikedOnly,
  showOfflineOnly,
  selectedLanguage,
  searchQuery
}: SongListProps) => {
  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg mb-4">No songs found</p>
        <p className="text-gray-500 text-sm">
          {showLikedOnly && "Like some songs to see them here"}
          {showOfflineOnly && "Download songs to see them here"}
          {selectedLanguage !== "all" && `No songs available in ${selectedLanguage}`}
          {searchQuery && `Try a different search term`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black/20 rounded-lg overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-gray-400 text-sm font-medium border-b border-gray-800">
        <div className="col-span-1">#</div>
        <div className="col-span-5">TITLE</div>
        <div className="col-span-3">ALBUM</div>
        <div className="col-span-2">DURATION</div>
        <div className="col-span-1"></div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {songs.map((song, index) => (
          <SongItem
            key={song.id}
            song={song}
            index={index}
            isLiked={likedSongs.has(song.id)}
            toggleLike={toggleLike}
            playSong={playSong}
            currentSong={currentSong}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};


interface ContentHeaderProps {
  showLikedOnly: boolean;
  showOfflineOnly: boolean;
  selectedLanguage: string;
  songsCount: number;
  searchQuery: string;
}

export const ContentHeader = ({
  showLikedOnly,
  showOfflineOnly,
  selectedLanguage,
  songsCount,
  searchQuery
}: ContentHeaderProps) => {
  const getTitle = () => {
    if (showLikedOnly) return "Liked Songs";
    if (showOfflineOnly) return "Offline Songs";
    if (selectedLanguage !== "all") return `${selectedLanguage} Songs`;
    return "Your Music";
  };

  const getDescription = () => {
    let desc = `${songsCount} songs`;
    if (searchQuery) desc += ` found for "${searchQuery}"`;
    if (showLikedOnly) desc += " in your favorites";
    if (showOfflineOnly) desc += " available offline";
    if (selectedLanguage !== "all") desc += ` in ${selectedLanguage}`;
    return desc;
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        {getTitle()}
      </h2>
      <p className="text-gray-400 text-sm md:text-base">
        {getDescription()}
      </p>
    </div>
  );
};

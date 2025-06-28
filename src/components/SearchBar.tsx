
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="mb-4 md:mb-6">
      <div className="relative w-full max-w-lg mx-auto md:mx-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-10 pr-12 py-3 md:py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base md:text-sm transition-all duration-200 ${
            isFocused ? 'shadow-lg' : ''
          }`}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="mt-2 text-center">
          <p className="text-gray-400 text-sm">
            Searching for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

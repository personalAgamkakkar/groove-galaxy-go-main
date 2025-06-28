
import { Home, Heart, Download, Search, Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { songs } from "@/data/songs";

interface SidebarProps {
  showOfflineOnly: boolean;
  setShowOfflineOnly: (show: boolean) => void;
  showLikedOnly: boolean;
  setShowLikedOnly: (show: boolean) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  likedSongsCount: number;
}

export const Sidebar = ({ 
  showOfflineOnly, 
  setShowOfflineOnly,
  showLikedOnly,
  setShowLikedOnly,
  selectedLanguage,
  setSelectedLanguage,
  likedSongsCount
}: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get unique languages from songs
  const availableLanguages = Array.from(
    new Set(songs.map(song => song.language).filter(Boolean))
  ).sort();

  const handleFilterClick = (filterType: 'offline' | 'liked' | 'language', value?: string) => {
    // Reset other filters when selecting a new one
    if (filterType === 'offline') {
      setShowOfflineOnly(!showOfflineOnly);
      setShowLikedOnly(false);
      setSelectedLanguage('all');
    } else if (filterType === 'liked') {
      setShowLikedOnly(!showLikedOnly);
      setShowOfflineOnly(false);
      setSelectedLanguage('all');
    } else if (filterType === 'language' && value) {
      setSelectedLanguage(value);
      setShowOfflineOnly(false);
      setShowLikedOnly(false);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm text-white p-2 rounded-md"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-64 bg-black border-r border-gray-800 p-6 transition-transform duration-300 ease-in-out overflow-y-auto",
        "md:relative md:translate-x-0",
        "fixed inset-y-0 left-0 z-50",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white p-1"
        >
          <X size={20} />
        </button>

        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-green-500">Agam Kakkar</h1>
        </div>
        
        <nav className="space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                setShowOfflineOnly(false);
                setShowLikedOnly(false);
                setSelectedLanguage('all');
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "flex items-center space-x-3 w-full text-left p-2 rounded-md hover:bg-gray-900 transition-colors",
                !showOfflineOnly && !showLikedOnly && selectedLanguage === 'all' 
                  ? "text-white" 
                  : "text-gray-400 hover:text-green-500"
              )}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-green-500 transition-colors p-2 rounded-md hover:bg-gray-900">
              <Search size={20} />
              <span>Search</span>
            </a>
          </div>
          
          <div className="pt-6 border-t border-gray-800">
            <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">Your Library</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleFilterClick('liked')}
                className={cn(
                  "flex items-center justify-between space-x-3 w-full text-left p-2 rounded-md hover:bg-gray-900 transition-colors",
                  showLikedOnly ? "text-green-500" : "text-gray-400 hover:text-green-500"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Heart size={20} />
                  <span>Liked Songs</span>
                </div>
                {likedSongsCount > 0 && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {likedSongsCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => handleFilterClick('offline')}
                className={cn(
                  "flex items-center space-x-3 w-full text-left p-2 rounded-md hover:bg-gray-900 transition-colors",
                  showOfflineOnly ? "text-green-500" : "text-gray-400 hover:text-green-500"
                )}
              >
                <Download size={20} />
                <span>Offline Songs</span>
              </button>
            </div>
          </div>

          {/* Language Filters */}
          {availableLanguages.length > 0 && (
            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">Languages</h3>
              <div className="space-y-2">
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    onClick={() => handleFilterClick('language', language)}
                    className={cn(
                      "flex items-center space-x-3 w-full text-left p-2 rounded-md hover:bg-gray-900 transition-colors",
                      selectedLanguage === language ? "text-green-500" : "text-gray-400 hover:text-green-500"
                    )}
                  >
                    <Globe size={20} />
                    <span>{language}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

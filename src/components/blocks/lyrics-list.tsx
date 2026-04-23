import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import lyricsData from "../Data/Lyrics.json";
import { Search } from "lucide-react";
import "./Lyricslist.css";

interface Song {
  songId: string;
  title: string;
  artist: string;
  coverImage: string;
  lyrics: string;
}

export const LyricsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const uniqueSongs = Array.from(
      new Map(lyricsData.map((song) => [song.songId, song])).values()
    );
    setSongs(uniqueSongs);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const filteredSongs = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSongs);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, songs]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSongClick = (song: Song) => {
    sessionStorage.setItem("selectedSong", JSON.stringify(song));
    navigate(`/lyrics/${song.songId}`);
    setShowSuggestions(false); // Hide suggestions when a song is selected
  };

  return (
    <div className="container1 py-6 flex items-center justify-center flex-col">
      {/* Search Box */}
      <div
        className="fixed top-24 left-1/2 transform -translate-x-1/2 w-1/2 bg-background z-10 p-4 shadow-md input-box-container"
        ref={searchRef}
      >
        <div className="relative input-box">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search for songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 text-white bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full mt-2 bg-black/90 rounded-lg border border-white/20">
              {suggestions.map((song) => (
                <div
                  key={song.songId}
                  onClick={() => handleSongClick(song)}
                  className="flex items-center gap-4 p-4 hover:bg-white/10 cursor-pointer"
                >
                  <img
                    src={song.coverImage || "https://placehold.co/100x100"}
                    alt={song.title}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-white">{song.title}</span>
                    <span className="text-sm text-gray-400">{song.artist}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Song List */}
      <h1 className="text-2xl font-bold text-foreground mb-6 mt-20">Songs</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {songs.map((song) => (
          <div
            key={song.songId}
            onClick={() => handleSongClick(song)}
            className="group relative bg-background/50 border border-border hover:border-primary rounded-md overflow-hidden cursor-pointer"
          >
            <div className="aspect-square">
              <img
                src={song.coverImage || "https://placehold.co/400x400"}
                alt={song.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-3">
              <h2 className="text-sm font-medium text-foreground truncate">
                {song.title}
              </h2>
              <p className="text-xs text-foreground/60 truncate">
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

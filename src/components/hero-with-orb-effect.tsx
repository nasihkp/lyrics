import { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import lyricsData from '../components/Data/Lyrics.json';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverImage?: string;
}

import { AuroraBackground } from './ui/aurora-background';
import { TrendingCard } from './blocks/trending-card';
import { Shuffle } from 'lucide-react';

export default function HeroWithOrbEffect() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSurpriseMe = () => {
    const randomSong = lyricsData[Math.floor(Math.random() * lyricsData.length)];
    if (randomSong) {
      navigate(`/lyrics/${randomSong.songId}`);
    }
  };

  const trendingSongs = lyricsData.slice(0, 4); // Mock trending by taking first 4
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const filteredSongs = lyricsData
        .filter(song =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase())
        )
        .map((song) => ({
          id: song.songId,
          title: song.title,
          artist: song.artist,
          coverImage: song.coverImage,
        }));
      setSuggestions(filteredSongs);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSuggestionClick = (id: string): void => {
    navigate(`/lyrics/${id}`);
  };

  return (
    <AuroraBackground showRadialGradient={true} className="mainHeroSection">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl ">
            Find Your Favorite Song Lyrics
          </h1>
          <p className="max-w-[600px] mt-4 text-gray-200">
          Search through millions of song lyrics. Get instant access to lyrics, meanings, and more.
          </p>

          <button
            onClick={handleSurpriseMe}
            className="mt-6 flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all hover:scale-105 active:scale-95"
          >
            <Shuffle className="w-4 h-4" />
            <span>Surprise Me</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative w-full max-w-2xl mt-16"
          ref={searchRef}
        >
          <div className="relative">
            <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for songs..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              className="w-full h-10 pl-12 pr-4 text-white bg-white/5 rounded-lg backdrop-blur-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 placeholder:text-gray-400 shadow-lg transition-all"
            />
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full mt-2 overflow-hidden bg-black/90 rounded-lg backdrop-blur-lg border border-white/20 z-50">
              {suggestions.map((song) => (
                <div
                  key={song.id}
                  onClick={() => handleSuggestionClick(song.id)} // Handle suggestion click
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-white/10 cursor-pointer"
                >
                  <img
                    src={song.coverImage || 'https://placehold.co/100x100'}
                    alt={song.title}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-white">{song.title}</span>
                    <span className="text-sm text-gray-400">{song.artist}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-full mt-16 max-w-5xl"
        >
          <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
            <span className="h-6 w-1 bg-indigo-500 rounded-full"></span>
            <h2 className="text-xl font-bold text-white text-left">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {trendingSongs.map((song, index) => (
              <TrendingCard
                key={song.songId}
                id={song.songId}
                title={song.title}
                artist={song.artist}
                coverImage={song.coverImage}
                rank={index + 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}

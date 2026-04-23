import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import "./ArtistDetail.css"
import { Heart, User, Instagram, Twitter, Youtube, Music, Play, Users } from "lucide-react";
import artistData from "../Data/Artist.json";
import lyricsData from "../Data/Lyrics.json";
import { useLikes } from "../../context/LikesContext";
import { AuroraBackground } from "../ui/aurora-background";
import { motion } from "framer-motion";

const ArtistDetail = () => {
  const { id } = useParams();
  const { isArtistLiked, toggleArtistLike } = useLikes();
  const artist = artistData.find((a) => a.artistId === id);

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-red-400">Artist not found</div>
      </div>
    );
  }

  const artistSongs = lyricsData.filter((song) => {
    if (!song.artist) return false;
    const songArtists = song.artist
      .toLowerCase()
      .split(",")
      .map((a) => a.trim());
    return songArtists.includes(artist.name.toLowerCase());
  });

  const isLiked = isArtistLiked(artist.artistId);

  // Mock monthly listeners for "Premium" feel
  const monthlyListeners = (Math.floor(Math.random() * 5000000) + 500000).toLocaleString();

  return (
    <AuroraBackground className="min-h-screen">
      <div className="container mx-auto px-4 py-8 relative z-10">

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center mb-12 relative">

          {/* Glow Effect behind profile */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-br from-indigo-500/50 to-purple-500/50 backdrop-blur-md shadow-2xl mb-6"
          >
            <img
              src={artist.profileImage}
              alt={artist.name}
              className="w-full h-full object-cover rounded-full border-4 border-black/20"
            />
            <button
              onClick={() => toggleArtistLike(artist.artistId)}
              className="absolute bottom-2 right-2 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-all border border-white/10 backdrop-blur-sm shadow-xl hover:scale-110 active:scale-95 group"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-white group-hover:text-red-400"
                  }`}
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{artist.name}</h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-6 font-light">{artist.bio}</p>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-8 mb-8 text-sm md:text-base font-medium text-white/80">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>{monthlyListeners} listeners</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <Music className="w-4 h-4 text-purple-400" />
                <span>{artistSongs.length} tracks</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {artist.socialLinks?.instagram && (
                <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/20 rounded-full transition-colors border border-white/10">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              )}
              {artist.socialLinks?.twitter && (
                <a href={artist.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/20 rounded-full transition-colors border border-white/10">
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              )}
              {artist.socialLinks?.youtube && (
                <a href={artist.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/20 rounded-full transition-colors border border-white/10">
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              )}
              {artist.socialLinks?.spotify && (
                <a href={artist.socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/20 rounded-full transition-colors border border-white/10">
                  <FaSpotify className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Songs List */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-indigo-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white">Popular Tracks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artistSongs.length > 0 ? (
              artistSongs.map((song, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  key={song.songId}
                >
                  <Link
                    to={`/lyrics/${song.songId}`}
                    className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src={song.coverImage}
                        alt={song.title}
                        className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{song.title}</h3>
                      <p className="text-gray-400 text-sm truncate">{song.album}</p>
                    </div>

                    <div className="text-gray-500 text-xs font-mono group-hover:text-gray-300">
                      {/* Mock Duration if not available */}
                      {Math.floor(Math.random() * 3) + 2}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                No songs found for this artist.
              </div>
            )}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default ArtistDetail;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, User, Music, Heart, Share2 } from "lucide-react";
import { useLikes } from "../../context/LikesContext";
import lyricsData from "../Data/Lyrics.json";
import "./lyrics-detail.css";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { LyricsCardModal } from "./lyrics-card-modal";

interface LyricsData {
  songId: string;
  title: string;
  artist: string;
  coverImage: string;
  lyrics: string;
  album: string;
  language: string;
  spotifyLink?: string;
}

export default function LyricsDetail() {
  const { id } = useParams<{ id: string }>();
  const { isSongLiked, toggleSongLike } = useLikes();
  const [lyricsDataState, setLyricsDataState] = useState<LyricsData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLine, setActiveLine] = useState<{ index: number, text: string } | null>(null);

  const handleLineClick = (index: number, text: string) => {
    setActiveLine(activeLine?.index === index ? null : { index, text });
  };

  useEffect(() => {
    if (id) {
      const song = lyricsData.find((song) => song.songId === id);
      if (song) setLyricsDataState(song);
    }
  }, [id]);

  // ... inside component
  const handleLike = () => {
    if (lyricsDataState) {
      const isLiked = isSongLiked(lyricsDataState.songId);
      toggleSongLike(lyricsDataState.songId);

      if (!isLiked) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF69B4', '#FF1493', '#C71585'] // Pink/Red hearts colors
        });
      }
    }
  };

  if (!lyricsDataState) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-red-400">Song not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8 sub-container">
        {/* Left Section - Song Cover & Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 md:w-full left-container song-detail-container"
        >
          {/* Cover Image */}
          <div className="relative w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden border border-border cover-image">
            <img
              src={lyricsDataState.coverImage || "https://placehold.co/400x400/1a1a1a/white?text=No+Image"}
              alt={lyricsDataState.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x400/1a1a1a/white?text=No+Image";
              }}
            />
            <button
              onClick={handleLike}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
            >
              <Heart
                className={`w-6 h-6 ${isSongLiked(lyricsDataState.songId) ? "fill-red-500 text-red-500" : "text-white"}`}
              />
            </button>
          </div>

          {/* Song Details */}
          <div className="flex flex-col gap-4 text-left main-details">
            <div className="flex items-start gap-4 text-foreground/60 w-full">
              <Music className="h-7 w-7 text-primary" />
              <span className="text-sm md:text-base font-bold text-primary">{lyricsDataState.title}</span>
            </div>

            <div className="flex items-start gap-4 text-foreground/60 w-full">
              <User className="h-7 w-7 text-primary" />
              <span className="text-sm md:text-base font-bold text-primary">{lyricsDataState.artist}</span>
            </div>

            <div className="flex items-start gap-4 text-foreground/60 w-full">
              <Calendar className="h-7 w-7 text-primary" />
              <span className="text-sm md:text-base font-bold text-primary">{lyricsDataState.album}</span>
            </div>
          </div>

          {/* Spotify Embed */}
          {lyricsDataState.spotifyLink && (
            <div className="w-full spotify-embed">
              <iframe
                style={{ borderRadius: "12px", height: "100%" }}
                src={lyricsDataState.spotifyLink}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          )}
        </motion.div>

        {/* Right Section - Lyrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:w-full right-container relative"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-bold text-primary">Lyrics</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 rounded-full transition-colors font-medium border border-indigo-500/30"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share Card</span>
            </button>
          </div>
          <div className="lyrics-data bg-transparent p-4 rounded-lg text-foreground relative">
            <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-gray-300">
              {lyricsDataState.lyrics.split('\n').map((line, index) => (
                <span
                  key={index}
                  onClick={() => line.trim() && handleLineClick(index, line)}
                  className={`block py-1 px-2 rounded cursor-pointer transition-all duration-200 border-l-2 ${activeLine?.index === index ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'border-transparent hover:bg-white/5 hover:border-gray-600'}`}
                >
                  {line || <br />}
                </span>
              ))}
            </div>

            {/* Analysis Popover/Card */}
            <AnimatePresence>
              {activeLine && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="fixed bottom-4 right-4 md:absolute md:top-20 md:right-[-320px] md:bottom-auto w-[90vw] md:w-80 bg-zinc-900/95 backdrop-blur-xl p-6 rounded-2xl border border-indigo-500/30 shadow-2xl z-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-indigo-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      Genius Analysis
                    </h3>
                    <button onClick={() => setActiveLine(null)} className="text-gray-500 hover:text-white">✕</button>
                  </div>
                  <p className="text-white font-medium mb-4 italic border-l-2 border-gray-700 pl-3 text-sm line-clamp-2">
                    "{activeLine.text}"
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    This line represents a pivotal moment in the song where the artist expresses deep emotion.
                    <span className="block mt-2 text-xs text-gray-500">
                      (Start using the AI features to generate real deep analyses for every line!)
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <LyricsCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={lyricsDataState.title}
        artist={lyricsDataState.artist}
        coverImage={lyricsDataState.coverImage}
        initialLyrics={lyricsDataState.lyrics}
      />
    </div>
  );
}

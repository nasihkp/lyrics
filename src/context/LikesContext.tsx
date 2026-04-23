import React, { createContext, useContext, useState, useEffect } from 'react';

interface LikesContextType {
  likedArtists: string[];
  likedSongs: string[];
  toggleArtistLike: (artistId: string) => void;
  toggleSongLike: (songId: string) => void;
  isArtistLiked: (artistId: string) => boolean;
  isSongLiked: (songId: string) => boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likedArtists, setLikedArtists] = useState<string[]>(() => {
    const saved = localStorage.getItem('likedArtists');
    return saved ? JSON.parse(saved) : [];
  });

  const [likedSongs, setLikedSongs] = useState<string[]>(() => {
    const saved = localStorage.getItem('likedSongs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedArtists', JSON.stringify(likedArtists));
  }, [likedArtists]);

  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleArtistLike = (artistId: string) => {
    setLikedArtists(prev => 
      prev.includes(artistId)
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
    );
  };

  const toggleSongLike = (songId: string) => {
    setLikedSongs(prev => 
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const isArtistLiked = (artistId: string) => likedArtists.includes(artistId);
  const isSongLiked = (songId: string) => likedSongs.includes(songId);

  return (
    <LikesContext.Provider value={{
      likedArtists,
      likedSongs,
      toggleArtistLike,
      toggleSongLike,
      isArtistLiked,
      isSongLiked,
    }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
} 
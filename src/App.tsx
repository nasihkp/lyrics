import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero } from './components/blocks/hero-with-orb-effect';
import { SearchResults } from './components/blocks/search-results';
import { Settings } from './components/blocks/settings';
import { Library } from './components/blocks/library';
import { LyricsList } from './components/blocks/lyrics-list';
import LyricsDetail from './components/blocks/lyrics-detail';
import { AddSongForm } from './components/blocks/add-song-form';
import { NavBar } from './components/ui/tubelight-navbar';
import { Home as HomeIcon, Music2, Search, User, Library as LibraryIcon, Settings as SettingsIcon } from 'lucide-react';
import './App.css';
import { ArtistList } from './components/blocks/artist-list';
import ArtistDetail from './components/blocks/artist-detail';

function App() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Songs', url: '/search', icon: Search },
    { name: 'Artists', url: '/artist', icon: Music2 },
    { name: 'Library', url: '/library', icon: LibraryIcon },
    { name: 'Settings', url: '/settings', icon: SettingsIcon },
    { name: 'Profile', url: '/profile', icon: User }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.setAttribute('data-ad-client', 'ca-pub-3328038490787248'); // Replace with your AdSense publisher ID
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background animate-[spin_60s_linear_infinite] opacity-50 dark:opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl opacity-30" />
      </div>

      <NavBar items={navItems} />
      <div className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <Hero
                  mainHeading="Find Your Favorite Song Lyrics"
                  tagline="Search millions of song lyrics from your favorite artists"
                />
              } />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/library" element={<Library />} />
              <Route path="/lyrics" element={<LyricsList />} />
              <Route path="/lyrics/:title" element={<LyricsDetail />} />
              <Route path="/add-song" element={<AddSongForm />} />
              <Route path="/artist" element={<ArtistList />} />
              <Route path="/artist/:artistId" element={<ArtistDetail />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;


import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import App from './App';
import HeroWithOrbEffect from './components/hero-with-orb-effect';
import { LyricsList } from './components/blocks/lyrics-list';
import { ArtistList } from './components/blocks/artist-list';
import { Profile } from './components/blocks/profile';
import { Library } from './components/blocks/library';
import { Settings } from './components/blocks/settings';
import LyricsDetail from './components/blocks/lyrics-detail';
import ArtistDetail from './components/blocks/artist-detail'; // Import ArtistDetail component
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { LikesProvider } from './context/LikesContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HeroWithOrbEffect />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/lyrics/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LyricsDetail />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LyricsList />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/artist",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ArtistList />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/artist/:artistId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ArtistDetail />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/library",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Library />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Settings />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

export function Router() {
  return (
    <ThemeProvider>
      <LikesProvider>
        <RouterProvider router={router} />
      </LikesProvider>
    </ThemeProvider>
  );
}
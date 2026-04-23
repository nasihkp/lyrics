// import React, { useEffect, useState } from 'react';
// import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// import { searchSongs } from '../../services/genius';
// import { ArrowLeft } from 'lucide-react';

// interface SearchResult {
//   id: number;
//   title: string;
//   artist: string;
//   image: string;
//   artistId?: number;
//   artistImage?: string;
// }

// export const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const query = searchParams.get('q') || '';
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!query) return;

//       setIsLoading(true);
//       setError(null);

//       try {
//         const searchResults = await searchSongs(query);
//         setResults(searchResults);
//       } catch (err) {
//         setError('Failed to fetch search results. Please try again later.');
//         console.error('Search error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   const handleSongClick = (result: SearchResult) => {
//     navigate(`/lyrics/${result.id}`);
//   };

//   const handleArtistClick = (artistId: number | undefined) => {
//     if (artistId) {
//       navigate(`/artist/${artistId}`);
//     }
//   };

//   return (
//     <div className="min-h-screen py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center gap-4 mb-8">
//           <Link to="/" className="text-foreground hover:text-foreground/80">
//             <ArrowLeft size={24} />
//           </Link>
//           <h1 className="text-2xl font-bold text-foreground">
//             Search Results for "{query}"
//           </h1>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500 py-8">{error}</div>
//         ) : results.length === 0 ? (
//           <div className="text-center text-foreground/60 py-8">
//             No results found for "{query}"
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {results.map((result) => (
//               <div
//                 key={result.id}
//                 className="bg-background/50 border border-border rounded-lg overflow-hidden"
//               >
//                 <div 
//                   className="cursor-pointer hover:opacity-90 transition-opacity"
//                   onClick={() => handleSongClick(result)}
//                 >
//                   <img
//                     src={result.image}
//                     alt={result.title}
//                     className="w-full h-48 object-cover"
//                     onError={(e) => {
//                       e.currentTarget.src = "https://placehold.co/400x400/1a1a1a/white?text=No+Image";
//                     }}
//                   />
//                   <div className="p-4">
//                     <h2 className="text-lg font-semibold text-foreground truncate hover:text-primary transition-colors">
//                       {result.title}
//                     </h2>
//                   </div>
//                 </div>

//                 {result.artistId && (
//                   <div 
//                     className="flex items-center gap-3 p-4 border-t border-border cursor-pointer hover:bg-foreground/5 transition-colors"
//                     onClick={() => handleArtistClick(result.artistId)}
//                   >
//                     {result.artistImage && (
//                       <img
//                         src={result.artistImage}
//                         alt={result.artist}
//                         className="w-10 h-10 rounded-full object-cover"
//                         onError={(e) => {
//                           e.currentTarget.src = "https://placehold.co/100x100/1a1a1a/white?text=A";
//                         }}
//                       />
//                     )}
//                     <div>
//                       <p className="text-sm text-foreground/60">Artist</p>
//                       <p className="text-foreground font-medium">{result.artist}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }; 


// import React, { useEffect, useState } from "react";
// import { useSearchParams, Link, useNavigate } from "react-router-dom";
// import { searchSongs } from "../../services/genius";
// import { ArrowLeft } from "lucide-react";

// interface SearchResult {
//   id: number;
//   title: string;
//   artist: string;
//   image: string;
//   artistId?: number;
//   artistImage?: string;
// }

// export const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const query = searchParams.get("q") || "";
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!query) return;

//       setIsLoading(true);
//       setError(null);

//       try {
//         const searchResults = await searchSongs(query);
//         setResults(searchResults);
//       } catch (err) {
//         setError("Failed to fetch search results. Please try again later.");
//         console.error("Search error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   const handleSongClick = (result: SearchResult) => {
//     sessionStorage.setItem(`song_${result.id}`, JSON.stringify(result));
//     navigate(`/lyrics/${result.id}`);
//   };

//   return (
//     <div className="min-h-screen py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center gap-4 mb-8">
//           <Link to="/" className="text-foreground hover:text-foreground/80">
//             <ArrowLeft size={24} />
//           </Link>
//           <h1 className="text-2xl font-bold text-foreground">
//             Search Results for "{query}"
//           </h1>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500 py-8">{error}</div>
//         ) : results.length === 0 ? (
//           <div className="text-center text-foreground/60 py-8">
//             No results found for "{query}"
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {results.map((result) => (
//               <div
//                 key={result.id}
//                 className="bg-background/50 border border-border rounded-lg overflow-hidden"
//                 onClick={() => handleSongClick(result)}
//               >
//                 <img
//                   src={result.image}
//                   alt={result.title}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => {
//                     e.currentTarget.src = "https://placehold.co/400x400/1a1a1a/white?text=No+Image";
//                   }}
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold text-foreground truncate hover:text-primary transition-colors">
//                     {result.title}
//                   </h2>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// SearchResults.tsx

// import React, { useEffect, useState } from "react";
// import { useSearchParams, Link, useNavigate } from "react-router-dom";
// import { searchSongs } from "../../services/geniurl"; 
// import { ArrowLeft } from "lucide-react";

// interface SearchResult {
//   id: number;
//   title: string;
//   artist: string;
//   image: string;
//   artistId?: number;
//   artistImage?: string;
// }

// export const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const query = searchParams.get("q") || "";
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!query) return;

//       setIsLoading(true);
//       setError(null);

//       try {
//         const searchResults = await searchSongs(query); // Now calling searchSongs from geniurl.ts
//         setResults(searchResults);
//       } catch (err) {
//         setError("Failed to fetch search results. Please try again later.");
//         console.error("Search error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   const handleSongClick = (result: SearchResult) => {
//     sessionStorage.setItem(`song_${result.id}`, JSON.stringify(result));
//     navigate(`/lyrics/${result.id}`);
//   };

//   return (
//     <div className="min-h-screen py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center gap-4 mb-8">
//           <Link to="/" className="text-foreground hover:text-foreground/80">
//             <ArrowLeft size={24} />
//           </Link>
//           <h1 className="text-2xl font-bold text-foreground">
//             Search Results for "{query}"
//           </h1>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500 py-8">{error}</div>
//         ) : results.length === 0 ? (
//           <div className="text-center text-foreground/60 py-8">
//             No results found for "{query}"
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {results.map((result) => (
//               <div
//                 key={result.id}
//                 className="bg-background/50 border border-border rounded-lg overflow-hidden"
//                 onClick={() => handleSongClick(result)}
//               >
//                 <img
//                   src={result.image}
//                   alt={result.title}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => {
//                     e.currentTarget.src = "https://placehold.co/400x400/1a1a1a/white?text=No+Image";
//                   }}
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold text-foreground truncate hover:text-primary transition-colors">
//                     {result.title}
//                   </h2>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// import React, { useEffect, useState } from 'react';
// import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

// interface SearchResult {
//   songId: string;
//   title: string;
//   artist: string;
//   coverImage: string;
//   lyrics: string;
// }

// export const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const query = searchParams.get('q') || '';
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!query) return;

//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('http://localhost:3001/api/songs');
//         const songs: SearchResult[] = await response.json();
//         const filteredResults = songs.filter(song =>
//           song.title.toLowerCase().includes(query.toLowerCase()) ||
//           song.artist.toLowerCase().includes(query.toLowerCase())
//         );
//         setResults(filteredResults);
//       } catch (err) {
//         setError('Failed to fetch search results. Please try again later.');
//         console.error('Search error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   const handleSongClick = (result: SearchResult) => {
//     sessionStorage.setItem(`song_${result.songId}`, JSON.stringify(result));
//     navigate(`/lyrics/${result.songId}`);
//   };

//   return (
//     <div className="min-h-screen py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center gap-4 mb-8">
//           <Link to="/" className="text-foreground hover:text-foreground/80">
//             <ArrowLeft size={24} />
//           </Link>
//           <h1 className="text-2xl font-bold text-foreground">
//             Search Results for "{query}"
//           </h1>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500 py-8">{error}</div>
//         ) : results.length === 0 ? (
//           <div className="text-center text-foreground/60 py-8">
//             No results found for "{query}"
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {results.map((result) => (
//               <div
//                 key={result.songId}
//                 className="bg-background/50 border border-border rounded-lg overflow-hidden"
//                 onClick={() => handleSongClick(result)}
//               >
//                 <img
//                   src={result.coverImage}
//                   alt={result.title}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => {
//                     e.currentTarget.src = "https://placehold.co/400x400/1a1a1a/white?text=No+Image";
//                   }}
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold text-foreground truncate hover:text-primary transition-colors">
//                     {result.title}
//                   </h2>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface SearchResult {
  songId: string;
  title: string;
  artist: string;
  coverImage: string;
  lyrics: string;
}

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:3001/api/songs');
        const songs: SearchResult[] = await response.json();
        const filteredResults = songs.filter(song =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSongClick = (result: SearchResult) => {
    sessionStorage.setItem(`song_${result.songId}`, JSON.stringify(result));
    navigate(`/lyrics/${result.songId}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-foreground hover:text-foreground/80">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            Search Results for "{query}"
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : results.length === 0 ? (
          <div className="text-center text-foreground/60 py-8">
            No results found for "{query}"
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result) => (
              <div
                key={result.songId}
                className="bg-background/50 border border-border rounded-lg overflow-hidden"
                onClick={() => handleSongClick(result)}
              >
                <img
                  src={result.coverImage}
                  alt={result.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x400/1a1a1a/white?text=No+Image";
                  }}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-foreground truncate hover:text-primary transition-colors">
                    {result.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
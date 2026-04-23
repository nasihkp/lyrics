import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Particles } from "../ui/particles"
import { useTheme } from "../../context/ThemeContext"
import { Search } from "lucide-react"

type SearchResult = {
  id: number;
  title: string;
  fullTitle: string;
  artist: string;
  primaryArtist: {
    name: string;
    url: string;
    headerImage: string;
    image: string;
  };
  featuredArtists: string[];
  releaseDate: {
    year: number;
    month: number;
    day: number;
  };
  resources: {
    thumbnail: string;
    image: string;
  };
  lyricsState: string;
}

interface HeroProps {
  mainHeading: string
  tagline: string
  buttonLabel?: string
  buttonHref?: string
  inputLabel?: string
  caption?: string
  containerClassName?: string
}

export function Hero({
  mainHeading,
  tagline,
  buttonLabel = "Search",
  buttonHref = "/search",
  inputLabel = "Search for songs or artists...",
  caption = "Powered by Genius API",
  containerClassName,
}: HeroProps) {
  const { theme } = useTheme()
  const particleColor = theme === 'dark' ? "#4F46E5" : "#1E40AF"
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === "") {
        setSuggestions([])
        setError(null)
        setShowSuggestions(false)
        return
      }

      setIsLoading(true)
      setError(null)
      
      try {
        const results = await searchSongs(searchQuery)
        setSuggestions(results.slice(0, 3))
        if (results.length === 0) {
          setError("No songs found matching your search")
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch suggestions"
        if (errorMessage.includes('quota exceeded')) {
          setError("We've hit our API limit. Please try again later.")
        } else {
          setError(errorMessage)
        }
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleSuggestionClick = (result: SearchResult) => {
    sessionStorage.setItem(`song_${result.id}`, JSON.stringify(result));
    navigate(`/lyrics/${result.id}`)
    setShowSuggestions(false)
    setSearchQuery("")
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSuggestions(false)
      setSearchQuery("")
    }
  }

  return (
    <section
      className={cn(
        "relative h-[100vh] flex items-center justify-center",
        "py-12 sm:py-24 md:py-32 px-4",
        containerClassName
      )}
    >
      <Particles
        className="absolute inset-0"
        quantity={300}
        staticity={20}
        ease={50}
        size={1.5}
        color={particleColor}
      />
      <div
        className={cn(
          "relative w-full max-w-6xl mx-auto",
          "p-12 lg:p-20",
          containerClassName
        )}
      >
        <div className="flex flex-col items-center space-y-12 lg:space-y-16 text-center">
          <h1
            className="inline-block animate-fade-in bg-gradient-to-b from-foreground via-foreground/90 
            to-foreground/80 bg-clip-text text-5xl font-bold text-transparent drop-shadow-xl 
            sm:text-6xl lg:text-7xl xl:text-8xl max-w-4xl"
          >
            {mainHeading}
          </h1>

          <p
            className="max-w-2xl animate-fade-in font-medium 
            text-foreground opacity-0 [animation-delay:150ms] sm:text-xl lg:text-2xl"
          >
            {tagline}
          </p>

          <div
            className="relative animate-fade-in opacity-0 [animation-delay:300ms]
            flex flex-col items-center space-y-3 w-full"
          >
            <div className="relative w-full max-w-xl" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={inputLabel}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                    }
                  }}
                  className="w-full h-16 px-8 py-4 text-lg bg-background/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-foreground pr-32"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-2 h-12 px-8 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={20} />
                  <span>{buttonLabel}</span>
                </button>
              </div>

              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute right-32 top-5">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-2xl overflow-hidden shadow-2xl z-50">
                  {error ? (
                    <div className="p-4 text-center text-foreground/60">
                      {error}
                    </div>
                  ) : isLoading ? (
                    <div className="p-4 text-center text-foreground/60">
                      Searching...
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((result) => (
                      <div
                        key={result.id} // Ensure unique key prop
                        className="flex items-center gap-4 p-4 hover:bg-foreground/10 cursor-pointer transition-colors"
                        onClick={() => handleSuggestionClick(result)}
                      >
                        <img 
                          src={result.resources?.image || "https://placehold.co/400x400/1a1a1a/white?text=No+Image"} 
                          alt={result.title}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/400x400/1a1a1a/white?text=No+Image";
                          }}
                        />
                        <div className="flex-1 text-left">
                          <h3 className="text-foreground font-semibold">{result.title}</h3>
                          <p className="text-foreground/60 text-sm">{result.artist}</p>
                        </div>
                        <span className="text-foreground/40 text-sm">
                          View Lyrics
                        </span>
                      </div>
                    ))
                  ) : !isLoading && (
                    <div className="p-4 text-center text-foreground/60">
                      Start typing to search...
                    </div>
                  )}
                </div>
              )}
            </div>
            <span className="text-sm text-foreground/60">
              {caption}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
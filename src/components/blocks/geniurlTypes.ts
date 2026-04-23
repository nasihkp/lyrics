// Type for search result response
export interface GeniurlResponse {
    error: boolean;
    matches: number;
    url: string;
    path: string;
    meta: {
      title: string;
      fullTitle: string;
      artists: string;
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
      id: number;
    };
  }
  
  // Type for lyrics response
  export interface GeniurlLyricsResponse {
    error: boolean;
    lyrics: string;
    url: string;
    path: string;
  }
  
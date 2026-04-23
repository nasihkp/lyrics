

import React from "react";
import { Link } from "react-router-dom";
import { useLikes } from "../../context/LikesContext";
import artistData from "../Data/Artist.json";
import lyricsData from "../Data/Lyrics.json";

export const Library = () => {
  const { likedArtists, likedSongs } = useLikes();

  const likedArtistsList = artistData.filter((artist) =>
    likedArtists.includes(artist.artistId)
  );

  const likedSongsList = lyricsData.filter((song) =>
    likedSongs.includes(song.songId)
  );

  return (
    <div className="container1 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Library</h1>

      <div className="space-y-8">
        {/* Liked Artists Section */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Liked Artists
          </h2>
          {likedArtistsList.length === 0 ? (
            <p className="text-foreground/60">No liked artists yet.</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {likedArtistsList.map((artist) => (
                <Link
                  key={artist.artistId}
                  to={`/artist/${artist.artistId}`}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary">
                    <img
                      src={artist.profileImage}
                      alt={artist.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-foreground mt-2">
                    {artist.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Liked Songs Section */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Liked Songs
          </h2>
          {likedSongsList.length === 0 ? (
            <p className="text-foreground/60">No liked songs yet.</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {likedSongsList.map((song) => (
                <Link
                  key={song.songId}
                  to={`/lyrics/${song.songId}`}
                  className="group relative bg-background/50 border border-border hover:border-primary rounded-md overflow-hidden transition-colors"
                >
                  <div className="aspect-square">
                    <img
                      src={song.coverImage}
                      alt={song.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {song.title}
                    </h3>
                    <p className="text-xs text-foreground/60 truncate">
                      {song.artist}
                    </p>
                    <p className="text-[10px] text-foreground/40 truncate">
                      {song.album}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

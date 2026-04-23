import React from "react";
import { Link } from "react-router-dom";
import artistData from "../Data/Artist.json";

export const ArtistList = () => {
  return (
    <div className="container1 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Artists</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artistData.map((artist) => (
          <Link
            key={artist.artistId} // Ensure unique key prop
            to={`/artist/${artist.artistId}`}
            className="group relative bg-background/50 border border-border hover:border-primary rounded-lg overflow-hidden transition-colors h-full"
          >
            <div className="aspect-square">
              <img
                src={artist.profileImage}
                alt={artist.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-3">
              <h2 className="text-base font-medium text-foreground truncate">{artist.name}</h2>
              <p className="text-sm text-foreground/60 line-clamp-2 mt-1">{artist.bio}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(artist.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform} // Ensure unique key prop
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-foreground/60 hover:text-primary transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
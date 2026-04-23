import { writeFileSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct paths to JSON (inside src/components/Data)
const artistPath = path.join(__dirname, "src/components/Data/Artist.json");
const lyricsPath = path.join(__dirname, "src/components/Data/Lyrics.json");

const SITE_URL = "https://lyricsstall.vercel.app";

const artists = JSON.parse(readFileSync(artistPath, "utf-8"));
const songs = JSON.parse(readFileSync(lyricsPath, "utf-8"));

const today = new Date().toISOString().split("T")[0];

const staticPages = ["/", "/artists", "/songs", "/about", "/contact"];

function makeUrl(path, priority = 0.7, freq = "weekly") {
  return `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

let urls = "";

// Static
staticPages.forEach((page) => {
  urls += makeUrl(page, page === "/" ? 1.0 : 0.9, "daily");
});

// Artists
artists.forEach((artist) => {
  urls += makeUrl(`/artist/${artist.artistId}`, 0.8, "weekly");
});


// Songs
songs.forEach((song) => {
  urls += makeUrl(`/lyrics/${song.songId}`, 0.8, "weekly");
});


const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

writeFileSync(path.join(__dirname, "public/sitemap.xml"), sitemap);

console.log("✅ Sitemap generated with", artists.length, "artists and", songs.length, "songs.");

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// export const AddSongForm = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     songId: '',
//     title: '',
//     artist: '',
//     album: '',
//     language: '',
//     coverImage: '',
//     lyrics: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       console.log('Submitting song:', formData); // Debug log

//       const response = await fetch('http://localhost:3001/api/songs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Song added successfully!');
//         navigate('/search');
//       } else {
//         throw new Error(data.error || 'Failed to add song');
//       }
//     } catch (error) {
//       console.error('Error adding song:', error);
//       alert(error instanceof Error ? error.message : 'Error adding song. Please check if the server is running.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-center">Add New Song</h1>
//           <Link
//             to="/search"
//             className="text-blue-500 hover:underline"
//           >
//             Back to songs
//           </Link>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="songId" className="block text-sm font-medium mb-2">
//               Song ID
//             </label>
//             <input
//               type="text"
//               id="songId"
//               name="songId"
//               value={formData.songId}
//               onChange={handleChange}
//               className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="title" className="block text-sm font-medium mb-2">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="artist" className="block text-sm font-medium mb-2">
//               Artist
//             </label>
//             <input
//               type="text"
//               id="artist"
//               name="artist"
//               value={formData.artist}
//               onChange={handleChange}
//               className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="album" className="block text-sm font-medium mb-2">
//               Album
//             </label>
//             <input
//               type="text"
//               id="album"
//               name="album"
//               value={formData.album}
//               onChange={handleChange}
//               className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="language" className="block text-sm font-medium mb-2">
//               Language
//             </label>
//             <input
//               type="text"
//               id="language"
//               name="language"
//               value={formData.language}
//               onChange={handleChange}
//               className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
//               Cover Image URL
//             </label>
//             <input
//               type="url"
//               id="coverImage"
//               name="coverImage"
//               value={formData.coverImage}
//               onChange={handleChange}
//               className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="lyrics" className="block text-sm font-medium mb-2">
//               Lyrics
//             </label>
//             <textarea
//               id="lyrics"
//               name="lyrics"
//               value={formData.lyrics}
//               onChange={handleChange}
//               rows={10}
//               className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md transition-colors ${
//               isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
//             }`}
//           >
//             {isLoading ? 'Adding Song...' : 'Add Song'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const AddSongForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    songId: "",
    title: "",
    artist: "",
    album: "",
    language: "",
    coverImage: "",
    lyrics: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting song:", formData); // Debug log

      const response = await fetch("http://localhost:3001/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Song added successfully!");
        navigate("/search");
      } else {
        throw new Error(data.error || "Failed to add song");
      }
    } catch (error) {
      console.error("Error adding song:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Error adding song. Please check if the server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Add New Song</h1>
          <Link to="/search" className="text-blue-500 hover:underline">
            Back to songs
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="songId" className="block text-sm font-medium mb-2">
              Song ID
            </label>
            <input
              type="text"
              id="songId"
              name="songId"
              value={formData.songId}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="artist" className="block text-sm font-medium mb-2">
              Artist
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="album" className="block text-sm font-medium mb-2">
              Album
            </label>
            <input
              type="text"
              id="album"
              name="album"
              value={formData.album}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="language"
              className="block text-sm font-medium mb-2"
            >
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium mb-2"
            >
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lyrics" className="block text-sm font-medium mb-2">
              Lyrics
            </label>
            <textarea
              id="lyrics"
              name="lyrics"
              value={formData.lyrics}
              onChange={handleChange}
              rows={10}
              className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Adding Song..." : "Add Song"}
          </button>
        </form>
      </div>
    </div>
  );
};


import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrendingCardProps {
    id: string;
    title: string;
    artist: string;
    coverImage: string;
    rank: number;
}

export const TrendingCard = ({ id, title, artist, coverImage, rank }: TrendingCardProps) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/lyrics/${id}`)}
            className="group relative flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
        >
            {/* Rank Number */}
            <span className="text-4xl font-bold text-white/5 absolute -right-2 -bottom-4 select-none group-hover:text-white/10 transition-colors">
                {rank}
            </span>

            {/* Cover */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                    src={coverImage || "https://placehold.co/100x100"}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col min-w-0 z-10">
                <h3 className="text-white font-semibold truncate group-hover:text-indigo-400 transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm truncate">{artist}</p>
            </div>
        </motion.div>
    );
};

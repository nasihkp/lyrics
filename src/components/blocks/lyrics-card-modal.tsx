
import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, X, Share2, Music, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LyricsCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    artist: string;
    coverImage: string;
    initialLyrics?: string;
}

export const LyricsCardModal = ({
    isOpen,
    onClose,
    title,
    artist,
    coverImage,
    initialLyrics = "",
}: LyricsCardModalProps) => {
    const [customLyrics, setCustomLyrics] = useState(
        initialLyrics.slice(0, 150) + (initialLyrics.length > 150 ? "..." : "")
    );
    const cardRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        if (cardRef.current === null) {
            return;
        }

        setIsGenerating(true);

        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement("a");
            link.download = `${title}-${artist}-lyrics-card.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Could not generate image", err);
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-4xl flex flex-col md:flex-row gap-8 shadow-2xl overflow-y-auto max-h-[90vh]"
                >
                    {/* Editor Section */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-indigo-400" />
                                Create Lyrics Card
                            </h3>
                            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Select/Edit Lyrics snippet</label>
                            <textarea
                                value={customLyrics}
                                onChange={(e) => setCustomLyrics(e.target.value)}
                                className="w-full h-40 bg-black/50 border border-zinc-700 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                placeholder="Paste or type lyrics here..."
                            />
                        </div>

                        <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-end">
                            <button
                                onClick={handleDownload}
                                disabled={isGenerating}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    "Generating..."
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        Download Image
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="flex-1 flex flex-col items-center justify-center bg-black/30 rounded-xl p-4 min-h-[400px]">
                        <div
                            ref={cardRef}
                            className="relative w-[320px] h-[480px] bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden shadow-2xl flex flex-col"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-30"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(100,100,255,0.2) 0%, transparent 50%)`
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 flex-1 p-8 flex flex-col justify-between">
                                {/* Lyrics Text */}
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 leading-relaxed drop-shadow-sm font-serif italic">
                                        "{customLyrics}"
                                    </p>
                                </div>

                                {/* Footer Info */}
                                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                                    <img
                                        src={coverImage}
                                        crossOrigin="anonymous"
                                        alt="cover"
                                        className="w-12 h-12 rounded-md object-cover shadow-lg border border-white/10"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-sm tracking-wide flex items-center gap-1">
                                            <Music className="w-3 h-3 text-indigo-400" /> {title}
                                        </span>
                                        <span className="text-gray-400 text-xs flex items-center gap-1">
                                            <User className="w-3 h-3 text-purple-400" /> {artist}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">Preview (1080x1620 px equivalent)</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

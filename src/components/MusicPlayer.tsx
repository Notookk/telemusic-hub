
import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Track {
  title: string;
  artist: string;
  duration: number;
  thumbnail?: string;
}

interface MusicPlayerProps {
  groupId: string;
  currentTrack?: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const MusicPlayer = ({
  groupId,
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}: MusicPlayerProps) => {
  const [volume, setVolume] = useState(80);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-player-bg bg-opacity-95 backdrop-blur-lg border-t border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            {currentTrack?.thumbnail && (
              <div className="w-12 h-12 rounded-md overflow-hidden">
                <img
                  src={currentTrack.thumbnail}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-player-text text-sm font-medium truncate">
                {currentTrack?.title || "No track playing"}
              </h3>
              <p className="text-player-muted text-xs truncate">
                {currentTrack?.artist || "Select a track"}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={onPrevious}
              className="text-player-text hover:text-player-accent transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={onPlayPause}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-player-accent text-player-bg hover:bg-opacity-90 transition-all",
                "transform active:scale-95"
              )}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={onNext}
              className="text-player-text hover:text-player-accent transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Volume2 className="text-player-muted" size={20} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-24 accent-player-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

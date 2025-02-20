
import { cn } from "@/lib/utils";
import { Play, SkipForward, Trash2 } from "lucide-react";

interface QueueTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail?: string;
}

interface QueueProps {
  tracks: QueueTrack[];
  currentTrackId?: string;
  isAdmin: boolean;
  onSkip?: (trackId: string) => void;
  onRemove?: (trackId: string) => void;
}

export const Queue = ({ tracks, currentTrackId, isAdmin, onSkip, onRemove }: QueueProps) => {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-4">
      <h2 className="text-player-text text-lg font-semibold mb-4">Queue</h2>
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={cn(
              "flex items-center space-x-3 p-2 rounded-md transition-all",
              "hover:bg-white hover:bg-opacity-10",
              currentTrackId === track.id && "bg-player-accent bg-opacity-20"
            )}
          >
            {track.thumbnail && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden group transition-transform hover:scale-105">
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-full h-full object-cover rounded-full transition-transform group-hover:scale-110"
                />
                {currentTrackId === track.id && (
                  <div className="absolute inset-0 bg-player-accent bg-opacity-20 flex items-center justify-center rounded-full">
                    <div className="w-3 h-3 bg-player-accent rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-player-text text-sm font-medium truncate">
                {track.title}
              </p>
              <p className="text-player-muted text-xs truncate">
                {track.artist}
              </p>
            </div>
            <span className="text-player-muted text-xs">{track.duration}</span>
            {isAdmin && currentTrackId !== track.id && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSkip?.(track.id)}
                  className="p-2 text-player-muted hover:text-player-accent transition-colors"
                >
                  <SkipForward size={16} />
                </button>
                <button
                  onClick={() => onRemove?.(track.id)}
                  className="p-2 text-player-muted hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

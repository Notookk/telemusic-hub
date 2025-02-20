
import { cn } from "@/lib/utils";

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
}

export const Queue = ({ tracks, currentTrackId }: QueueProps) => {
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
              <img
                src={track.thumbnail}
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
              />
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
          </div>
        ))}
      </div>
    </div>
  );
};

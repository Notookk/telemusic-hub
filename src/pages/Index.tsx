
import { useState } from "react";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Queue } from "@/components/Queue";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Mockup data - This will be replaced with real data from your Telegram bot
  const mockupQueue = [
    {
      id: "1",
      title: "Mockup Song 1",
      artist: "Artist 1",
      duration: "3:45",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: "2",
      title: "Mockup Song 2",
      artist: "Artist 2",
      duration: "4:20",
      thumbnail: "https://picsum.photos/200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Session Info */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-block bg-player-accent bg-opacity-20 text-player-accent px-3 py-1 rounded-full text-sm mb-2">
            Active Session
          </span>
          <h1 className="text-4xl font-bold mb-2">Telegram Music Player</h1>
          <p className="text-player-muted">
            Group ID: <span className="text-player-text">example_group</span>
          </p>
        </div>

        {/* Queue Section */}
        <div className="mb-24 animate-slide-up">
          <Queue tracks={mockupQueue} currentTrackId="1" />
        </div>

        {/* Player */}
        <MusicPlayer
          groupId="example_group"
          currentTrack={{
            title: "Mockup Song 1",
            artist: "Artist 1",
            duration: 225,
            thumbnail: "https://picsum.photos/200",
          }}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => console.log("Next track")}
          onPrevious={() => console.log("Previous track")}
        />
      </div>
    </div>
  );
};

export default Index;

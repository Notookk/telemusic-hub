
import { useState } from "react";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Queue } from "@/components/Queue";
import { VoiceChat } from "@/components/VoiceChat";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdmin] = useState(true); // This will come from your auth system

  // Mockup data - This will be replaced with real data from your Telegram bot
  const mockupQueue = [
    {
      id: "1",
      title: "Mockup Song 1",
      artist: "Artist 1",
      duration: "3:45",
      thumbnail: "https://picsum.photos/400",
    },
    {
      id: "2",
      title: "Mockup Song 2",
      artist: "Artist 2",
      duration: "4:20",
      thumbnail: "https://picsum.photos/400",
    },
  ];

  // Mockup participants data
  const mockupParticipants = [
    {
      id: "1",
      name: "John Admin",
      isAdmin: true,
      avatar: "https://picsum.photos/200",
    },
    {
      id: "2",
      name: "Alice Member",
      isAdmin: false,
      avatar: "https://picsum.photos/201",
    },
    {
      id: "3",
      name: "Bob Member",
      isAdmin: false,
      avatar: "https://picsum.photos/202",
    },
  ];

  const handleSkip = (trackId: string) => {
    if (isAdmin) {
      console.log("Skipping track:", trackId);
    }
  };

  const handleRemove = (trackId: string) => {
    if (isAdmin) {
      console.log("Removing track:", trackId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/30 to-black text-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(45,212,191,0.1),rgba(45,212,191,0)_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),rgba(139,92,246,0)_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Session Info */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="inline-block bg-player-accent bg-opacity-20 text-player-accent px-3 py-1 rounded-full text-sm mb-2">
                Active Session
              </span>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Telegram Music Player
              </h1>
              <p className="text-player-muted">
                Group ID: <span className="text-player-text">example_group</span>
              </p>
            </div>
            <a
              href="https://t.me/your_bot?startgroup=example_group"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-player-accent hover:bg-opacity-90 text-black font-medium px-6 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] active:scale-95"
            >
              Add Bot to Group
            </a>
          </div>
        </div>

        {/* Current Track Thumbnail */}
        <div className="mb-12 animate-fade-in">
          <div className="relative aspect-square w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-player-accent/20 to-transparent opacity-50" />
            <img
              src="https://picsum.photos/800"
              alt="Current Track"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-player-accent rounded-full animate-pulse shadow-[0_0_20px_rgba(45,212,191,0.5)]" />
              </div>
            )}
            <div className="absolute -inset-1 bg-gradient-to-r from-player-accent/30 to-purple-500/30 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
          </div>
        </div>

        {/* Queue Section */}
        <div className="mb-12 animate-slide-up">
          <Queue
            tracks={mockupQueue}
            currentTrackId="1"
            isAdmin={isAdmin}
            onSkip={(trackId) => console.log("Skipping track:", trackId)}
            onRemove={(trackId) => console.log("Removing track:", trackId)}
          />
        </div>

        {/* Voice Chat Section */}
        <div className="mb-24 animate-slide-up">
          <VoiceChat participants={mockupParticipants} />
        </div>

        {/* Player */}
        <MusicPlayer
          groupId="example_group"
          currentTrack={{
            title: "Mockup Song 1",
            artist: "Artist 1",
            duration: 225,
            thumbnail: "https://picsum.photos/400",
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

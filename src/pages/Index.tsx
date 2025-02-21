
import { useState, useEffect } from "react";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Queue } from "@/components/Queue";
import { VoiceChat } from "@/components/VoiceChat";
import { useRoom } from "@/hooks/useRoom";
import { useQueue } from "@/hooks/useQueue";
import { useCurrentTrack } from "@/hooks/useCurrentTrack";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isAdmin] = useState(true); // This will come from your auth system
  const { toast } = useToast();
  
  // For demo purposes, we're using a fixed room ID
  const roomId = "example_group";
  
  const { room, isRoomLoading } = useRoom(roomId);
  const { queue, isQueueLoading, removeFromQueue } = useQueue(roomId);
  const { currentTrack, updateCurrentTrack } = useCurrentTrack(roomId);

  const handlePlayPause = async () => {
    if (!currentTrack) return;
    
    try {
      await updateCurrentTrack.mutateAsync({
        ...currentTrack,
        is_playing: !currentTrack.is_playing,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update playback state",
        variant: "destructive",
      });
    }
  };

  const handleSkip = async (trackId: string) => {
    if (!isAdmin) return;
    
    try {
      await removeFromQueue.mutateAsync(trackId);
      toast({
        title: "Success",
        description: "Track skipped successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to skip track",
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (trackId: string) => {
    if (!isAdmin) return;
    
    try {
      await removeFromQueue.mutateAsync(trackId);
      toast({
        title: "Success",
        description: "Track removed from queue",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove track",
        variant: "destructive",
      });
    }
  };

  // Mockup participants data (will be replaced with real data later)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/30 to-black text-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(45,212,191,0.1),rgba(45,212,191,0)_50%)] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),rgba(139,92,246,0)_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Session Info */}
        <div className="mb-12 animate-fade-in backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="inline-block bg-player-accent bg-opacity-20 text-player-accent px-3 py-1 rounded-full text-sm mb-2 shadow-lg shadow-player-accent/20">
                {currentTrack?.is_playing ? "Now Playing" : "Paused"}
              </span>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {room?.name || "Telegram Music Player"}
              </h1>
              <p className="text-player-muted">
                Group ID: <span className="text-player-text">{roomId}</span>
              </p>
            </div>
            <a
              href={`https://t.me/your_bot?startgroup=${roomId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-player-accent hover:bg-opacity-90 text-black font-medium px-8 py-4 rounded-2xl transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] active:scale-95 backdrop-blur-sm"
            >
              Add Bot to Group
            </a>
          </div>
        </div>

        {/* Current Track Thumbnail */}
        <div className="mb-16 animate-fade-in">
          <div className="relative aspect-square w-56 h-56 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-player-accent/20 to-transparent opacity-50" />
            <img
              src={currentTrack?.thumbnail || "https://picsum.photos/800"}
              alt={currentTrack?.title || "No track playing"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {currentTrack?.is_playing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 bg-player-accent rounded-full animate-pulse shadow-[0_0_30px_rgba(45,212,191,0.5)]" />
              </div>
            )}
            <div className="absolute -inset-1 bg-gradient-to-r from-player-accent/30 to-purple-500/30 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="absolute -inset-[2px] bg-gradient-to-r from-player-accent to-purple-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>
        </div>

        {/* Queue Section */}
        <div className="mb-16 animate-slide-up">
          <Queue
            tracks={queue.map(track => ({
              id: track.id,
              title: track.title,
              artist: track.artist || "",
              duration: track.duration?.toString() || "0:00",
              thumbnail: track.thumbnail,
            }))}
            currentTrackId={currentTrack?.id}
            isAdmin={isAdmin}
            onSkip={handleSkip}
            onRemove={handleRemove}
          />
        </div>

        {/* Voice Chat Section */}
        <div className="mb-24 animate-slide-up">
          <VoiceChat participants={mockupParticipants} />
        </div>

        {/* Player */}
        <MusicPlayer
          groupId={roomId}
          currentTrack={currentTrack ? {
            title: currentTrack.title,
            artist: currentTrack.artist || "",
            duration: currentTrack.duration || 0,
            thumbnail: currentTrack.thumbnail,
          } : undefined}
          isPlaying={currentTrack?.is_playing || false}
          onPlayPause={handlePlayPause}
          onNext={() => console.log("Next track")}
          onPrevious={() => console.log("Previous track")}
        />
      </div>
    </div>
  );
};

export default Index;

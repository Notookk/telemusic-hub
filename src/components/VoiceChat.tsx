
import { User } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isAdmin: boolean;
  avatar?: string;
}

interface VoiceChatProps {
  participants: Participant[];
}

export const VoiceChat = ({ participants }: VoiceChatProps) => {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-4 mt-6">
      <h2 className="text-player-text text-lg font-semibold mb-4 flex items-center gap-2">
        <User size={20} className="text-player-accent" />
        Voice Chat Participants
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center space-x-3 p-2 rounded-md bg-white bg-opacity-5 hover:bg-opacity-10 transition-all"
          >
            {participant.avatar ? (
              <div className="relative">
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-10 h-10 rounded-full transition-transform hover:scale-105"
                />
                {participant.isAdmin && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-player-accent rounded-full border-2 border-black" />
                )}
              </div>
            ) : (
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-player-accent bg-opacity-20 flex items-center justify-center transition-transform hover:scale-105">
                  <User size={16} className="text-player-accent" />
                </div>
                {participant.isAdmin && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-player-accent rounded-full border-2 border-black" />
                )}
              </div>
            )}
            <div>
              <p className="text-player-text text-sm font-medium truncate">
                {participant.name}
              </p>
              {participant.isAdmin && (
                <span className="text-player-accent text-xs">Admin</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

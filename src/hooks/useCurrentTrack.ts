
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export const useCurrentTrack = (roomId: string) => {
  const queryClient = useQueryClient();

  const { data: currentTrack, isLoading: isCurrentTrackLoading } = useQuery({
    queryKey: ["currentTrack", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("current_track")
        .select("*")
        .eq("room_id", roomId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const updateCurrentTrack = useMutation({
    mutationFn: async (track: {
      title: string;
      artist: string;
      duration: number;
      url: string;
      requested_by: string;
      is_playing: boolean;
    }) => {
      const { data, error } = await supabase
        .from("current_track")
        .upsert({ ...track, room_id: roomId });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentTrack", roomId] });
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("current_track_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "current_track",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["currentTrack", roomId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, queryClient]);

  return { currentTrack, isCurrentTrackLoading, updateCurrentTrack };
};

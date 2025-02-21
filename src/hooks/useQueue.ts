
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export const useQueue = (roomId: string) => {
  const queryClient = useQueryClient();

  const { data: queue = [], isLoading: isQueueLoading } = useQuery({
    queryKey: ["queue", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("queue")
        .select("*")
        .eq("room_id", roomId)
        .order("position", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  const addToQueue = useMutation({
    mutationFn: async (track: {
      title: string;
      artist: string;
      duration: number;
      url: string;
      requested_by: string;
    }) => {
      const position = queue.length;
      const { data, error } = await supabase
        .from("queue")
        .insert([{ ...track, room_id: roomId, position }]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queue", roomId] });
    },
  });

  const removeFromQueue = useMutation({
    mutationFn: async (trackId: string) => {
      const { error } = await supabase
        .from("queue")
        .delete()
        .eq("id", trackId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queue", roomId] });
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("queue_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "queue",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["queue", roomId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, queryClient]);

  return { queue, isQueueLoading, addToQueue, removeFromQueue };
};

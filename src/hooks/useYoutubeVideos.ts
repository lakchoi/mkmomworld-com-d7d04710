import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface YoutubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  views?: string;
}

interface FeedResponse {
  channelHandle: string;
  videos: YoutubeVideo[];
}

export const useYoutubeVideos = () => {
  return useQuery({
    queryKey: ["youtube-videos"],
    queryFn: async (): Promise<FeedResponse> => {
      const { data, error } = await supabase.functions.invoke("youtube-feed");
      if (error) throw error;
      return data as FeedResponse;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};

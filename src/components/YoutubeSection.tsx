import { useState } from "react";
import { useYoutubeVideos } from "@/hooks/useYoutubeVideos";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play, Youtube, ExternalLink } from "lucide-react";

const CHANNEL_URL = "https://www.youtube.com/@%EC%86%A1%EC%9A%B0%EC%84%A0-e4m";

const YoutubeSection = () => {
  const { data, isLoading, isError } = useYoutubeVideos();
  const videos = data?.videos ?? [];
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string; url: string } | null>(null);

  return (
    <section
      id="youtube"
      className="py-20 bg-background"
      aria-labelledby="youtube-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary">
            <Youtube className="w-6 h-6" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              YouTube
            </span>
          </div>
          <h2
            id="youtube-heading"
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            영상으로 만나는 송우선
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            엄마들을 위한 따뜻한 메시지와 인사이트를 영상으로 확인해보세요
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-3xl bg-muted animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && videos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {videos.slice(0, 5).map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVideo({ id: v.id, title: v.title, url: v.url })}
                className="group block text-left"
                aria-label={`유튜브 영상 재생: ${v.title}`}
              >
                <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-muted">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                      <Play
                        className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs md:text-sm font-medium line-clamp-2 mb-1">
                      {v.title}
                    </p>
                    {v.views && (
                      <p className="text-white/70 text-xs">조회수 {v.views}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="text-center text-muted-foreground py-8">
            영상을 불러오는 중 문제가 발생했습니다. 채널에서 직접 확인해주세요.
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="rounded-full text-base px-8"
          >
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="송우선 유튜브 채널 바로가기"
            >
              <Youtube className="w-5 h-5 mr-2" aria-hidden="true" />
              유튜브 채널 바로가기
            </a>
          </Button>
        </div>
      </div>

      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent
          className="max-w-sm md:max-w-md p-0 overflow-hidden bg-black border-none"
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">{activeVideo?.title ?? "YouTube 영상"}</DialogTitle>
          {activeVideo && (
            <div className="flex flex-col">
              <div className="relative w-full aspect-[9/16] bg-black">
                <iframe
                  key={activeVideo.id}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className="absolute inset-0 flex items-end justify-center p-6 pointer-events-none">
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground text-xs font-medium shadow-lg backdrop-blur opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    YouTube에서 열기
                  </a>
                </div>
              </div>
              <div className="p-4 bg-card">
                <p className="text-foreground text-sm font-medium line-clamp-2 mb-2">
                  {activeVideo.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  영상이 검은 화면이거나 재생되지 않으면{" "}
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    YouTube에서 보기
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                  를 이용해주세요.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default YoutubeSection;

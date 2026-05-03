import { useYoutubeVideos } from "@/hooks/useYoutubeVideos";
import { Button } from "@/components/ui/button";
import { Play, Youtube } from "lucide-react";

const CHANNEL_URL = "https://www.youtube.com/@%EC%86%A1%EC%9A%B0%EC%84%A0-e4m";

const YoutubeSection = () => {
  const { data, isLoading, isError } = useYoutubeVideos();
  const videos = data?.videos ?? [];

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
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label={`유튜브 영상 보기: ${v.title}`}
              >
                <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-muted">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <p className="text-white/70 text-xs">
                      {formatDate(v.publishedAt)}
                    </p>
                  </div>
                </div>
              </a>
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
    </section>
  );
};

export default YoutubeSection;

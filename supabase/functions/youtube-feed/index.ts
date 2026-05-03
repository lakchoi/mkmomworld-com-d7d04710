// YouTube channel scraper — extracts shorts/videos from public channel pages.
// No API key required. Falls back gracefully if YouTube changes its markup.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHANNEL_ID = 'UCsd52y0hqyS__r87paYfnwg'; // @송우선-e4m
const SHORTS_URL = `https://www.youtube.com/channel/${CHANNEL_ID}/shorts`;

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  views?: string;
}

function extractInitialData(html: string): unknown | null {
  const m = html.match(/var ytInitialData\s*=\s*({[\s\S]*?});\s*<\/script>/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

function findShorts(node: unknown, out: Video[]): void {
  if (out.length >= 15) return;
  if (Array.isArray(node)) {
    for (const v of node) findShorts(v, out);
    return;
  }
  if (node && typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    const lockup = obj.shortsLockupViewModel as Record<string, unknown> | undefined;
    if (lockup) {
      const onTap = (lockup.onTap as Record<string, unknown>)?.innertubeCommand as Record<string, unknown> | undefined;
      const reel = onTap?.reelWatchEndpoint as Record<string, unknown> | undefined;
      const videoId = reel?.videoId as string | undefined;
      const accessibilityText = lockup.accessibilityText as string | undefined;
      if (videoId) {
        // accessibilityText format examples:
        //   en: "TITLE, N views - play Short"
        //   ko: "TITLE, 조회수 N회 - Shorts 동영상 재생"
        let title = (accessibilityText ?? '').trim();
        let views: string | undefined;
        // Strip the trailing " - play Short" / " - Shorts 동영상 재생"
        title = title.replace(/\s*[-–]\s*(?:play Short|Shorts\s*동영상\s*재생)\s*$/u, '').trim();
        // Now strip the trailing ", N views" / ", 조회수 N회"
        const lastComma = title.lastIndexOf(',');
        if (lastComma > 0) {
          const tail = title.slice(lastComma + 1).trim();
          if (/^(?:조회수\s+[\d.,]+\s*[가-힣]?회|[\d.,KMB\s]+views)$/u.test(tail)) {
            views = tail.replace(/^조회수\s+/, '');
            title = title.slice(0, lastComma).trim();
          }
        }
        if (!out.find((v) => v.id === videoId)) {
          out.push({
            id: videoId,
            title,
            url: `https://www.youtube.com/shorts/${videoId}`,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            views,
          });
        }
      }
    }
    for (const v of Object.values(obj)) findShorts(v, out);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  try {
    const res = await fetch(SHORTS_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
      },
    });
    if (!res.ok) throw new Error(`Channel page fetch failed: ${res.status}`);
    const html = await res.text();
    const data = extractInitialData(html);
    if (!data) throw new Error('ytInitialData not found');
    const videos: Video[] = [];
    findShorts(data, videos);

    return new Response(
      JSON.stringify({ channelHandle: '송우선-e4m', videos: videos.slice(0, 12) }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        },
      },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('youtube-feed error:', msg);
    return new Response(JSON.stringify({ error: msg, videos: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

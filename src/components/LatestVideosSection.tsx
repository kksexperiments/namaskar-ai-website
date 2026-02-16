import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, ExternalLink, Play, Video } from "lucide-react";
import facebookVideosRaw from "@/content/facebookVideos.json";
import { Content } from "@/types/language";
import { ensureFacebookSdk } from "@/lib/facebookSdk";

type FacebookVideoItem = {
  title: string;
  url: string;
  publishedAt: string;
};

function formatPublishedDate(value: string, locale: "en" | "as"): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  try {
    return date.toLocaleDateString(locale === "as" ? "as-IN" : "en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return value;
  }
}

function normalizeFacebookVideoUrl(url: string): string {
  // Basic guardrails so we don't attempt to embed obviously invalid values.
  const trimmed = (url ?? "").trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) return "";
  return trimmed;
}

function LazyFacebookVideoEmbed({
  url,
  title,
  watchLabel,
  isAssamese,
}: {
  url: string;
  title: string;
  watchLabel: string;
  isAssamese: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const embedRootRef = useRef<HTMLDivElement | null>(null);
  const parseStartedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const [inView, setInView] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "failed">("idle");

  const safeUrl = useMemo(() => normalizeFacebookVideoUrl(url), [url]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!cardRef.current) return;
    if (inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    if (!safeUrl) return;
    if (state === "ready" || state === "failed") return;
    if (parseStartedRef.current) return;

    let cancelled = false;
    parseStartedRef.current = true;
    setState("loading");

    // Load SDK once globally, then parse only this embed subtree.
    ensureFacebookSdk()
      .then((FB) => {
        if (cancelled) return;
        if (!FB?.XFBML?.parse || !embedRootRef.current) {
          setState("failed");
          return;
        }

        // Parse after the fb-video node is mounted.
        window.setTimeout(() => {
          if (cancelled) return;
          try {
            FB.XFBML?.parse?.(embedRootRef.current ?? undefined);
          } catch {
            // ignore
          }

          const startedAt = Date.now();
          const check = () => {
            if (cancelled) return;
            const iframe = embedRootRef.current?.querySelector("iframe");
            if (iframe) {
              setState("ready");
              return;
            }
            if (Date.now() - startedAt > 12_000) {
              setState("failed");
              return;
            }
            timeoutRef.current = window.setTimeout(check, 250);
          };
          check();
        }, 0);
      })
      .catch(() => {
        if (cancelled) return;
        setState("failed");
      });

    return () => {
      cancelled = true;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [inView, safeUrl, state]);

  return (
    <div ref={cardRef} className="w-full">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border bg-card shadow-card">
        {/* Embed area */}
        <div className="absolute inset-0">
          {safeUrl && state !== "failed" && inView ? (
            <div ref={embedRootRef} className="namaskar-fb-video h-full w-full">
              <div
                className="fb-video"
                data-href={safeUrl}
                data-show-text="false"
                data-allowfullscreen="true"
              />
            </div>
          ) : null}

          {/* Fallback / placeholder */}
          {(!safeUrl || state === "failed") && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted to-background p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-background shadow-sm">
                {safeUrl ? <Video className="h-6 w-6 text-primary" /> : <Play className="h-6 w-6 text-primary" />}
              </div>
              <p className="text-sm font-semibold text-foreground">
                {safeUrl
                  ? isAssamese
                    ? "এই ভিডিঅ’ embed হোৱা নাই"
                    : "This video couldn't be embedded"
                  : isAssamese
                    ? "Facebook ভিডিঅ’ লিংক যোগ কৰক"
                    : "Add a Facebook video link"}
              </p>
              {safeUrl ? (
                <Button asChild variant="outline" size="sm" className="min-h-[40px]">
                  <a href={safeUrl} target="_blank" rel="noreferrer noopener">
                    {watchLabel}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          )}
        </div>

        {/* Loading overlay */}
        {safeUrl && state === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <div className="flex items-center gap-2 rounded-full border bg-card/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span>{isAssamese ? "লোড হৈ আছে…" : "Loading…"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Title + link */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="line-clamp-2 text-sm font-semibold text-foreground">{title}</p>
        {safeUrl ? (
          <a
            href={safeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            aria-label={watchLabel}
          >
            {watchLabel}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

interface LatestVideosSectionProps {
  t: Content;
}

const LatestVideosSection = ({ t }: LatestVideosSectionProps) => {
  const isAssamese = t.latestVideos.headline.includes("ভিডিঅ");

  const videos = useMemo(() => {
    const items = (facebookVideosRaw as FacebookVideoItem[]).slice(0, 6);
    // Ensure stable shape and avoid runtime surprises from JSON edits.
    return items.map((v) => ({
      title: String(v?.title ?? ""),
      url: String(v?.url ?? ""),
      publishedAt: String(v?.publishedAt ?? ""),
    }));
  }, []);

  const facebookProfileUrl =
    "https://www.facebook.com/people/NamaskarAI/61578782241757/";
  const instagramProfileUrl = "https://www.instagram.com/namaskar.ai";
  const threadsProfileUrl = "https://www.threads.com/@namaskar.ai";

  return (
    <section className="bg-gradient-hero py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-6 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <Facebook className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold gradient-text sm:text-4xl">
              {t.latestVideos.headline}
            </h2>
          </div>
          <p className="text-muted-foreground">{t.latestVideos.description}</p>
        </div>

        {/* Videos */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <div
              key={`${video.url || "empty"}-${index}`}
              className="rounded-2xl border border-primary/10 bg-card/60 p-4 shadow-card"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  <Video className="h-4 w-4" />
                  {isAssamese ? "Facebook Reel" : "Facebook Reel"}
                </span>
                {video.publishedAt ? (
                  <span className="text-xs text-muted-foreground">
                    {formatPublishedDate(
                      video.publishedAt,
                      isAssamese ? "as" : "en"
                    )}
                  </span>
                ) : null}
              </div>

              <LazyFacebookVideoEmbed
                url={video.url}
                title={video.title}
                watchLabel={t.latestVideos.watchOnFacebook}
                isAssamese={isAssamese}
              />
            </div>
          ))}
        </div>

        {/* Follow links (no more embeds beyond 6) */}
        <div className="flex flex-col items-stretch justify-center gap-3 text-center sm:flex-row sm:items-center">
          <Button asChild className="min-h-[44px] rounded-xl">
            <a href={facebookProfileUrl} target="_blank" rel="noreferrer noopener">
              <Facebook className="h-5 w-5" />
              {t.latestVideos.followFacebook}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>

          <Button asChild variant="outline" className="min-h-[44px] rounded-xl">
            <a href={instagramProfileUrl} target="_blank" rel="noreferrer noopener">
              <Instagram className="h-5 w-5" />
              {t.latestVideos.followInstagram}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="min-h-[40px] rounded-xl"
          >
            <a href={threadsProfileUrl} target="_blank" rel="noreferrer noopener">
              {t.latestVideos.followThreads}
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestVideosSection;


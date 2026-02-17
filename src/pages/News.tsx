import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Lightbulb,
  PlayCircle,
  Search,
  Sparkles,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { NEWS_FEED_ITEMS } from "@/data/newsHubFeed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AS_MONTHS = [
  "জানুৱাৰী",
  "ফেব্ৰুৱাৰী",
  "মাৰ্চ",
  "এপ্ৰিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগষ্ট",
  "ছেপ্টেম্বৰ",
  "অক্টোবৰ",
  "নৱেম্বৰ",
  "ডিচেম্বৰ",
];

const toAssameseDigits = (value: string) =>
  value
    .replace(/0/g, "০")
    .replace(/1/g, "১")
    .replace(/2/g, "২")
    .replace(/3/g, "৩")
    .replace(/4/g, "৪")
    .replace(/5/g, "৫")
    .replace(/6/g, "৬")
    .replace(/7/g, "৭")
    .replace(/8/g, "৮")
    .replace(/9/g, "৯");

const formatDateLabel = (isoDate: string, isAssamese: boolean) => {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (isAssamese) {
    return `${toAssameseDigits(String(day))} ${AS_MONTHS[monthIndex]} ${toAssameseDigits(String(year))}`;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const visualClassNames = [
  "bg-[linear-gradient(135deg,rgba(112,167,124,0.38),rgba(176,211,158,0.35),rgba(232,244,220,0.5))]",
  "bg-[linear-gradient(135deg,rgba(99,149,171,0.38),rgba(162,196,211,0.35),rgba(223,240,247,0.45))]",
  "bg-[linear-gradient(135deg,rgba(168,139,94,0.34),rgba(211,188,152,0.35),rgba(244,234,216,0.45))]",
  "bg-[linear-gradient(135deg,rgba(128,123,176,0.35),rgba(182,176,219,0.36),rgba(232,228,248,0.45))]",
  "bg-[linear-gradient(135deg,rgba(138,166,103,0.35),rgba(188,214,157,0.36),rgba(236,246,223,0.45))]",
];

const News = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/news", language);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  const localizedItems = useMemo(
    () =>
      NEWS_FEED_ITEMS.map((item) => ({
        ...item,
        title: isAssamese ? item.titleAs : item.titleEn,
        summary: isAssamese ? item.summaryAs : item.summaryEn,
        imageLabel: isAssamese ? item.imageLabelAs : item.imageLabelEn,
        dateLabel: formatDateLabel(item.publishedAt, isAssamese),
      })).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)),
    [isAssamese],
  );

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return localizedItems;
    }

    return localizedItems.filter((item) => {
      const searchable = `${item.title} ${item.summary} ${item.sourceName}`.toLowerCase();
      return searchable.includes(term);
    });
  }, [localizedItems, searchTerm]);

  const latestItems = filteredItems.slice(0, 5);
  const archiveItems = filteredItems.slice(5, 25);

  const selectedStory = useMemo(
    () => localizedItems.find((item) => item.id === selectedStoryId) || null,
    [localizedItems, selectedStoryId],
  );

  const text = {
    title: isAssamese ? "AI খবৰ আৰু গাইড" : "AI News and Guides",
    subtitle: isAssamese ? "প্ৰতি ২ দিনত নতুন আপডেট — অসমীয়া শিক্ষাৰ্থীৰ বাবে" : "Fresh updates every 2 days for Assamese learners",
    heroBody: isAssamese
      ? "Assam আৰু ভাৰতৰ AI খবৰ, সহজ explainers আৰু আপোনাৰ কেৰিয়াৰত কেনেকৈ ব্যৱহাৰ কৰিব।"
      : "Assam, India, and global AI updates explained simply with practical career relevance.",
    back: isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home",
    searchPlaceholder: isAssamese ? "খবৰ সন্ধান কৰক..." : "Search news updates...",
    todayUpdates: isAssamese ? "সাম্প্ৰতিক আপডেট" : "Latest Updates",
    archiveTitle: isAssamese ? "আগৰ আপডেটসমূহ (Archive)" : "Archive (Past Updates)",
    readButton: isAssamese ? "পঢ়ক" : "Read",
    originalLink: isAssamese ? "Original Link" : "Original Link",
    videoSoon: isAssamese ? "Explainer ভিডিঅ’ শীঘ্ৰেই" : "Explainer video coming soon",
    noResults: isAssamese
      ? "এই শব্দ-এ কোনো update পোৱা নগ'ল। অনুগ্ৰহ কৰি search সলনি কৰক।"
      : "No matching updates found. Please try a different search term.",
    whyTitle: isAssamese ? "Why this matters for Assam" : "Why this matters for Assam",
    whyPoints: isAssamese
      ? [
          "আজি যি খবৰ, কাইলৈ সেয়াই skill requirement হব পাৰে।",
          "Assam-ত local tech সুযোগ বৃদ্ধি পাই আছে — আপুনি প্রস্তুত থাকক।",
          "AI tool practical ভাবে ব্যৱহাৰ কৰিলে চাকৰি আৰু business-ত speed বাড়ে।",
        ]
      : [
          "Today's updates become tomorrow's skill requirements.",
          "Local tech opportunities in Assam are growing, so preparedness matters.",
          "Practical AI usage improves speed in both jobs and businesses.",
        ],
    ctaTitle: isAssamese ? "এইমুহূৰ্তে আৰম্ভ কৰক" : "Start Right Now",
    ctaBody: isAssamese
      ? "খবৰ পঢ়ি থকাৰ লগে লগে practical prompt workflow-এ অভ্যাস আৰম্ভ কৰক।"
      : "Pair every news update with practical prompt workflows and start executing.",
    ctaButton: isAssamese ? "Prompt Packs খোলক" : "Open Prompt Packs",
  };

  const latestDateLabel = latestItems[0] ? formatDateLabel(latestItems[0].publishedAt, isAssamese) : formatDateLabel("2026-02-16", isAssamese);

  const feedSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: text.title,
    description: text.heroBody,
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    url: toAbsoluteSiteUrl(canonicalPath),
    hasPart: latestItems.map((item, index) => ({
      "@type": "NewsArticle",
      position: index + 1,
      headline: item.title,
      datePublished: item.publishedAt,
      publisher: { "@type": "Organization", name: item.sourceName },
      url: item.sourceUrl,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isAssamese ? "ঘৰ" : "Home",
        item: toAbsoluteSiteUrl(toLocalePath("/", language)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: text.title,
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "AI খবৰ আৰু গাইড | নমস্কাৰ AI" : "AI News and Guides | Namaskar AI"}
        description={text.heroBody}
        path={canonicalPath}
        language={language}
        keywords={["AI news Assam", "AI India updates", "Assamese AI explainers", "Namaskar AI news hub"]}
        structuredData={[feedSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell space-y-6">
          <Link
            to={toLocalePath("/", language)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {text.back}
          </Link>

          <Card className="relative overflow-hidden border-primary/20 bg-[linear-gradient(135deg,hsl(var(--card)),rgba(194,227,197,0.2),rgba(227,243,214,0.16))] p-6 shadow-elegant sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(112,166,124,0.22),transparent_38%),repeating-linear-gradient(45deg,rgba(126,178,136,0.07)_0,rgba(126,178,136,0.07)_2px,transparent_2px,transparent_12px)]" />
            <div className="relative z-10">
              <div className="mb-3 inline-flex items-center rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {text.subtitle}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">{text.title}</h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">{text.heroBody}</p>

              <div className="mt-4 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={text.searchPlaceholder}
                    className="border-primary/25 bg-card/90 pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <Card className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-2xl font-semibold text-foreground">
                  {text.todayUpdates} ({latestDateLabel})
                </h2>

                {latestItems.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">{text.noResults}</p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {latestItems.map((item, index) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden border-primary/20 bg-[linear-gradient(160deg,hsl(var(--card)),rgba(183,217,186,0.14),rgba(216,237,207,0.14))] p-0"
                      >
                        <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
                          <div className={`relative min-h-[180px] ${visualClassNames[index % visualClassNames.length]}`}>
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
                              <PlayCircle className="h-10 w-10 text-foreground/70" />
                              <p className="text-sm font-semibold text-foreground/85">{item.imageLabel}</p>
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge variant="secondary">{item.dateLabel}</Badge>
                              <Badge variant="outline">{item.sourceName}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button variant="outline" onClick={() => setSelectedStoryId(item.id)}>
                                {text.readButton}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                              <Button asChild variant="ghost">
                                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                                  {text.originalLink}
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-2xl font-semibold">{text.archiveTitle}</h2>
                <Accordion type="single" collapsible className="mt-4">
                  {archiveItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex flex-col">
                          <span className="font-semibold">{item.title}</span>
                          <span className="text-xs text-muted-foreground">{item.dateLabel}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                        <div className="mt-3">
                          <Button asChild variant="ghost" className="px-0 text-primary hover:text-primary">
                            <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                              {text.originalLink}
                              <ExternalLink className="ml-1 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>

            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Card className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <Lightbulb className="h-4 w-4" />
                  <h3 className="text-lg font-semibold">{text.whyTitle}</h3>
                </div>
                <div className="space-y-2">
                  {text.whyPoints.map((point) => (
                    <p key={point} className="rounded-lg border border-border bg-muted/35 p-3 text-sm leading-relaxed text-muted-foreground">
                      {point}
                    </p>
                  ))}
                </div>
              </Card>

              <Card className="border-primary/15 bg-card/95 p-5">
                <h3 className="text-lg font-semibold">{text.ctaTitle}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text.ctaBody}</p>
                <Button asChild className="mt-4 w-full bg-gradient-primary text-white">
                  <Link to={toLocalePath("/prompt-packs", language)}>{text.ctaButton}</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={Boolean(selectedStory)} onOpenChange={(open) => (!open ? setSelectedStoryId(null) : null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-primary/20">
          {selectedStory ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedStory.title}</DialogTitle>
                <DialogDescription className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {selectedStory.dateLabel}
                  </span>
                  <span>• {selectedStory.sourceName}</span>
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedStory.summary}</p>
              <Button asChild variant="outline" className="w-full">
                <a href={selectedStory.sourceUrl} target="_blank" rel="noreferrer">
                  {text.originalLink}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default News;

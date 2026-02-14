import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Copy, ListFilter, Search, Sparkles, TriangleAlert, Zap } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PromptPacksGuide from "@/components/PromptPacksGuide";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { toLocalePath } from "@/lib/locale";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { Language } from "@/types/language";
import {
  LOCAL_PROMPT_PACKS,
  PROMPT_CATEGORY_LABELS,
  PromptCategory,
  PromptPack,
} from "@/data/promptPacks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type PromptSource = "local" | "supabase";
const RECENT_COPIES_KEY = "namaskar-ai-recent-prompt-copies";

interface SupabasePromptRow {
  id: number;
  title: string | null;
  prompt: string | null;
  category: string | null;
  tags: Json | null;
}

interface DisplayPrompt extends PromptPack {
  source: PromptSource;
}

interface RecentCopyRecord {
  id: string;
  titleAs: string;
  titleEn: string;
  category: string;
  copiedAt: string;
}

const toTagList = (value: Json | null): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((tag): tag is string => typeof tag === "string");
};

const normalizeSupabasePrompt = (row: SupabasePromptRow): DisplayPrompt | null => {
  if (!row.title || !row.prompt) {
    return null;
  }

  return {
    id: `supabase-${row.id}`,
    category: row.category || "general",
    tags: toTagList(row.tags),
    title: {
      as: row.title,
      en: row.title,
    },
    prompt: {
      as: row.prompt,
      en: row.prompt,
    },
    source: "supabase",
  };
};

const getCategoryLabel = (category: string, language: Language): string => {
  const localized = PROMPT_CATEGORY_LABELS[category as PromptCategory];
  if (localized) {
    return localized[language];
  }

  return category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getPromptPreview = (content: string): string => {
  const previewLength = 200;
  if (content.length <= previewLength) {
    return content;
  }

  return `${content.slice(0, previewLength).trimEnd()}...`;
};

const getCategoryTone = (category: string): string => {
  const tones: Record<string, string> = {
    career_and_jobs:
      "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--primary)/0.13),hsl(var(--accent)/0.1))] border-primary/30",
    study_and_skills:
      "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--accent)/0.15),hsl(160_55%_82%/0.35))] border-accent/40",
    business_and_income:
      "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--primary)/0.12),hsl(45_95%_78%/0.35))] border-primary/25",
    teachers_and_training:
      "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--accent)/0.1),hsl(220_75%_85%/0.35))] border-accent/30",
    parents_and_family:
      "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--accent)/0.12),hsl(320_65%_88%/0.33))] border-accent/35",
    government_and_office:
      "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(210_70%_88%/0.3),hsl(var(--primary)/0.08))] border-primary/20",
    content_and_growth:
      "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--primary)/0.15),hsl(var(--accent)/0.16))] border-primary/35",
  };

  return tones[category] ?? "bg-gradient-card border-border/80";
};

const PromptPacks = () => {
  const { language, switchLanguage, t } = useLanguage();
  const { toast } = useToast();
  const enableRemotePrompts = import.meta.env.VITE_ENABLE_REMOTE_PROMPTS === "true";
  const [searchParams] = useSearchParams();
  const initializedFromQueryRef = useRef(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [promptLanguage, setPromptLanguage] = useState<Language>(language);
  const [activePrompt, setActivePrompt] = useState<DisplayPrompt | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showAllTags, setShowAllTags] = useState(false);
  const [recentCopies, setRecentCopies] = useState<RecentCopyRecord[]>([]);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const promptsGridRef = useRef<HTMLDivElement | null>(null);
  const copyFeedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPromptLanguage(language);
  }, [language]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_COPIES_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as RecentCopyRecord[];
      if (Array.isArray(parsed)) {
        setRecentCopies(parsed.slice(0, 8));
      }
    } catch {
      setRecentCopies([]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (copyFeedbackTimerRef.current) {
        clearTimeout(copyFeedbackTimerRef.current);
      }
    };
  }, []);

  const {
    data: supabaseRows = [],
    isLoading: supabaseLoading,
    error: supabaseError,
  } = useQuery<SupabasePromptRow[]>({
    queryKey: ["prompt-packs-supabase"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompts")
        .select("id,title,prompt,category,tags")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data ?? [];
    },
    enabled: enableRemotePrompts,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const localPrompts = useMemo<DisplayPrompt[]>(
    () => LOCAL_PROMPT_PACKS.map((prompt) => ({ ...prompt, source: "local" })),
    [],
  );

  const supabasePrompts = useMemo<DisplayPrompt[]>(() => {
    return supabaseRows
      .map((row) => normalizeSupabasePrompt(row))
      .filter((prompt): prompt is DisplayPrompt => prompt !== null);
  }, [supabaseRows]);

  const prompts = useMemo<DisplayPrompt[]>(() => {
    if (!supabasePrompts.length) {
      return localPrompts;
    }

    const merged = new Map<string, DisplayPrompt>();

    for (const prompt of localPrompts) {
      const key = `${prompt.category.toLowerCase()}::${prompt.title.en.toLowerCase().trim()}`;
      merged.set(key, prompt);
    }

    for (const prompt of supabasePrompts) {
      const key = `${prompt.category.toLowerCase()}::${prompt.title.en.toLowerCase().trim()}`;
      if (!merged.has(key)) {
        merged.set(key, prompt);
      }
    }

    return Array.from(merged.values());
  }, [localPrompts, supabasePrompts]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(prompts.map((prompt) => prompt.category)));
    return ["all", ...uniqueCategories];
  }, [prompts]);

  const tagsWithCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const prompt of prompts) {
      for (const tag of prompt.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }

    return Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.tag.localeCompare(b.tag);
      });
  }, [prompts]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory("all");
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    if (initializedFromQueryRef.current || categories.length === 0) {
      return;
    }

    const queryCategory = searchParams.get("category");
    const queryTag = searchParams.get("tag");
    const querySearch = searchParams.get("q");

    if (queryCategory && categories.includes(queryCategory)) {
      setSelectedCategory(queryCategory);
    }

    if (queryTag) {
      setSelectedTags([queryTag]);
    }

    if (querySearch) {
      setSearchTerm(querySearch);
    }

    initializedFromQueryRef.current = true;
  }, [categories, searchParams]);

  const filteredPrompts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const searchableText = [
        prompt.title.as,
        prompt.title.en,
        prompt.prompt.as,
        prompt.prompt.en,
        ...prompt.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = normalizedSearch.length === 0 || searchableText.includes(normalizedSearch);
      const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => prompt.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [prompts, searchTerm, selectedCategory, selectedTags]);

  useEffect(() => {
    setVisibleCount(12);
  }, [searchTerm, selectedCategory, selectedTags]);

  const visiblePrompts = filteredPrompts.slice(0, visibleCount);
  const hasMorePrompts = filteredPrompts.length > visibleCount;

  const displayedTags = showAllTags ? tagsWithCounts : tagsWithCounts.slice(0, 18);
  const recentPromptItems = recentCopies
    .map((record) => prompts.find((prompt) => prompt.id === record.id))
    .filter((prompt): prompt is DisplayPrompt => Boolean(prompt));

  const toggleTag = (tag: string) => {
    setSelectedTags((previous) =>
      previous.includes(tag) ? previous.filter((item) => item !== tag) : [...previous, tag],
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTags([]);
  };

  const focusSearchInput = () => {
    searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    searchInputRef.current?.focus();
  };

  const jumpToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openSurprisePrompt = () => {
    if (filteredPrompts.length === 0) {
      return;
    }

    const randomPrompt = filteredPrompts[Math.floor(Math.random() * filteredPrompts.length)];
    setActivePrompt(randomPrompt);
    trackEvent("prompt_surprise_opened", {
      prompt_id: randomPrompt.id,
      category: randomPrompt.category,
      prompt_language: promptLanguage,
      source: randomPrompt.source,
    });
    promptsGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyToClipboard = async (prompt: DisplayPrompt) => {
    const promptText = prompt.prompt[promptLanguage];
    const titleText = prompt.title[promptLanguage];

    try {
      await navigator.clipboard.writeText(promptText);

      trackEvent("prompt_copied", {
        prompt_id: prompt.id,
        prompt_title: titleText,
        prompt_language: promptLanguage,
        source: prompt.source,
      });

      const nextRecentCopies: RecentCopyRecord[] = [
        {
          id: prompt.id,
          titleAs: prompt.title.as,
          titleEn: prompt.title.en,
          category: prompt.category,
          copiedAt: new Date().toISOString(),
        },
        ...recentCopies.filter((record) => record.id !== prompt.id),
      ].slice(0, 8);

      setRecentCopies(nextRecentCopies);
      localStorage.setItem(RECENT_COPIES_KEY, JSON.stringify(nextRecentCopies));
      setCopiedPromptId(prompt.id);
      if (copyFeedbackTimerRef.current) {
        clearTimeout(copyFeedbackTimerRef.current);
      }
      copyFeedbackTimerRef.current = setTimeout(() => {
        setCopiedPromptId((previous) => (previous === prompt.id ? null : previous));
      }, 1700);

      toast({
        title: language === "as" ? "কপি সম্পূৰ্ণ হৈছে" : "Copied to clipboard",
        description:
          language === "as"
            ? `"${titleText}" প্ৰম্প্ট কপি কৰা হৈছে।`
            : `"${titleText}" prompt has been copied.`,
      });
    } catch {
      toast({
        title: language === "as" ? "কপি ব্যৰ্থ" : "Copy failed",
        description:
          language === "as"
            ? "অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক অথবা হাতেৰে কপি কৰক।"
            : "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  const text = {
    back: language === "as" ? "পিছলৈ" : "Back",
    subtitle:
      language === "as"
        ? "দ্ৰুত বাছনি, কাৰ্ড-ভিত্তিক নেভিগেশন, আৰু কপি-ৰেডি প্ৰম্প্ট।"
        : "Quick navigation, compact cards, and copy-ready prompts.",
    search: language === "as" ? "প্ৰম্প্ট সন্ধান কৰক..." : "Search prompts...",
    allCategories: language === "as" ? "সকলো শ্ৰেণী" : "All Categories",
    showing: language === "as" ? "মুঠ দেখুওৱা হৈছে" : "Showing",
    prompts: language === "as" ? "টা প্ৰম্প্ট" : "prompts",
    inCategory: language === "as" ? "শ্ৰেণী" : "in",
    activeFilters: language === "as" ? "চলমান ফিল্টাৰ" : "Active Filters",
    clearAll: language === "as" ? "সকলো মচক" : "Clear All",
    promptLanguage: language === "as" ? "প্ৰম্প্ট ভাষা" : "Prompt Language",
    openPrompt: language === "as" ? "প্ৰম্প্ট খোলক" : "Open Prompt",
    copy: language === "as" ? "প্ৰম্প্ট কপি কৰক" : "Copy Prompt",
    copied: language === "as" ? "কপি হৈ গ'ল" : "Copied",
    topTags: language === "as" ? "দ্ৰুত টেগ" : "Quick Tags",
    showAllTags: language === "as" ? "অধিক টেগ দেখুৱাওক" : "Show all tags",
    showLessTags: language === "as" ? "কম টেগ দেখুৱাওক" : "Show fewer tags",
    loadMore: language === "as" ? "আৰু দেখুৱাওক" : "Load more",
    noPromptTitle: language === "as" ? "প্ৰম্প্ট পোৱা নগ’ল" : "No prompts found",
    noPromptBody:
      language === "as"
        ? "সন্ধান বা ফিল্টাৰ সলনি কৰি পুনৰ চেষ্টা কৰক।"
        : "Try adjusting your search or filters.",
    localFallbackTitle:
      language === "as"
        ? "লোকেল প্ৰম্প্ট পেক ব্যৱহাৰ কৰা হৈছে"
        : "Using local prompt packs",
    localFallbackBody:
      language === "as"
        ? "অনলাইন ডাটাবেচ উপলব্ধ নোহোৱাত লোকেল প্ৰম্প্ট লাইব্ৰেৰী দেখুওৱা হৈছে।"
        : "Online prompt tables are unavailable, so the local prompt library is shown.",
    syncing:
      language === "as"
        ? "লোকেল প্ৰম্প্ট দেখুওৱা হৈছে, অনলাইন ডাটা সমন্বয় চলি আছে..."
        : "Showing local prompts while syncing online prompts...",
    streakTitle: language === "as" ? "দৈনিক Prompt Habit" : "Daily Prompt Habit",
    streakBody:
      language === "as"
        ? "প্ৰতিদিনে কমেও ১টা prompt কপি কৰি run কৰক। ১০ মিনিটে শিকাৰ গতি বঢ়ায়।"
        : "Copy and run at least 1 prompt daily. A 10-minute loop compounds learning.",
    recentCopies: language === "as" ? "শেহতীয়াকৈ কপি কৰা" : "Recently Copied",
    quickAudience: language === "as" ? "শ্ৰোতা-কেন্দ্ৰিক Quick Lanes" : "Audience Quick Lanes",
    sourceOnline: language === "as" ? "অনলাইন" : "Online",
    detailsAria:
      language === "as"
        ? "সম্পূৰ্ণ প্ৰম্প্ট কপি বা পঢ়িবলৈ ডায়লগ"
        : "Dialog containing full prompt text and actions.",
    railSearch: language === "as" ? "সন্ধান" : "Search",
    railCategories: language === "as" ? "শ্ৰেণী" : "Categories",
    railSurprise: language === "as" ? "সৰপ্ৰাইজ" : "Surprise",
  };

  const quickLanes = [
    {
      label: language === "as" ? "Career" : "Career",
      description: language === "as" ? "চাকৰি, CV, interview" : "job, CV, interview",
      category: "career_and_jobs",
    },
    {
      label: language === "as" ? "Aspirers" : "Aspirers",
      description: language === "as" ? "study আৰু skill build" : "study and skill build",
      category: "study_and_skills",
    },
    {
      label: language === "as" ? "Business" : "Business",
      description: language === "as" ? "sales আৰু customer reply" : "sales and customer replies",
      category: "business_and_income",
    },
    {
      label: language === "as" ? "Parents" : "Parents",
      description: language === "as" ? "safe AI আৰু child guide" : "safe AI and child guidance",
      category: "parents_and_family",
    },
  ];

  return (
    <div className="platform-page">
      <Seo
        title={language === "as" ? "AI Prompt Packs | নমস্কাৰ AI" : "AI Prompt Packs | Namaskar AI"}
        description={
          language === "as"
            ? "কৰ্মজীৱন, পঢ়া-শুনা, ব্যৱসায়, পৰিয়াল আৰু অফিচৰ বাবে Assamese-friendly copy-ready AI prompts।"
            : "Copy-ready AI prompt packs for career, study, business, family, and office workflows."
        }
        path={toLocalePath("/prompt-packs", language)}
        language={language}
        keywords={[
          "Assamese prompt packs",
          "AI prompts in Assamese",
          "career prompts Assam",
          "student prompts Assamese",
          "Namaskar AI prompts",
        ]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="w-full bg-[radial-gradient(circle_at_8%_0%,hsl(var(--accent)/0.15),transparent_45%),radial-gradient(circle_at_100%_20%,hsl(var(--primary)/0.12),transparent_40%)]">
        <div className="pb-24 pt-8 md:pb-14">
          <div className="platform-shell">
            <div className="mb-4">
              <Link
                to={toLocalePath("/", language)}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{text.back}</span>
              </Link>
            </div>

            <PromptPacksGuide language={language} />

            <Card className="relative mb-6 overflow-hidden border-primary/20 bg-[linear-gradient(135deg,hsl(var(--card)),hsl(var(--accent)/0.08),hsl(var(--primary)/0.07))] p-5 shadow-card sm:p-6">
              <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />

              <div className="relative">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h1 className="text-3xl font-bold font-poppins gradient-text">AI Prompt Packs</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">{text.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border bg-card/80 p-1">
                    <span className="px-2 text-xs text-muted-foreground">{text.promptLanguage}</span>
                    <Button
                      size="sm"
                      variant={promptLanguage === "as" ? "default" : "ghost"}
                      className="h-8 rounded-full px-3 text-xs"
                      onClick={() => setPromptLanguage("as")}
                    >
                      অসমীয়া
                    </Button>
                    <Button
                      size="sm"
                      variant={promptLanguage === "en" ? "default" : "ghost"}
                      className="h-8 rounded-full px-3 text-xs"
                      onClick={() => setPromptLanguage("en")}
                    >
                      English
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    placeholder={text.search}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="border-primary/20 bg-card/90 pl-10"
                  />
                </div>
              </div>
            </Card>

            <div className="mb-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-primary/20 bg-[linear-gradient(145deg,hsl(var(--card)),hsl(var(--primary)/0.08),hsl(var(--accent)/0.1))] p-4">
                <h3 className="mb-2 text-sm font-semibold text-primary">{text.streakTitle}</h3>
                <p className="text-sm text-foreground/90">{text.streakBody}</p>

                {recentPromptItems.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold text-muted-foreground">{text.recentCopies}</p>
                    <div className="flex flex-wrap gap-2">
                      {recentPromptItems.slice(0, 4).map((prompt) => (
                        <button
                          key={`recent-${prompt.id}`}
                          type="button"
                          onClick={() => setActivePrompt(prompt)}
                          className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-medium transition hover:border-primary/60 hover:bg-primary/5"
                        >
                          {prompt.title[promptLanguage]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              <Card className="border-primary/15 bg-card/95 p-4">
                <h3 className="mb-2 text-sm font-semibold text-primary">{text.quickAudience}</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {quickLanes.map((lane) => (
                    <button
                      key={lane.category}
                      type="button"
                      onClick={() => setSelectedCategory(lane.category)}
                      className="rounded-lg border border-border bg-muted/40 p-2.5 text-left transition hover:border-primary/40 hover:bg-primary/5"
                    >
                      <p className="text-sm font-semibold">{lane.label}</p>
                      <p className="text-xs text-muted-foreground">{lane.description}</p>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            <div ref={categoriesRef} className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                const label = category === "all" ? text.allCategories : getCategoryLabel(category, language);
                const count =
                  category === "all"
                    ? prompts.length
                    : prompts.filter((prompt) => prompt.category === category).length;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-xl border px-3 py-2 text-left transition ${isActive
                      ? "border-primary/50 bg-gradient-primary text-white shadow-button"
                      : "border-border bg-card/90 hover:border-primary/35 hover:bg-accent/10"
                      }`}
                  >
                    <div className="text-xs font-semibold">{label}</div>
                    <div className={`text-xs ${isActive ? "text-white/85" : "text-muted-foreground"}`}>{count}</div>
                  </button>
                );
              })}
            </div>

            <Card className="mb-5 border-border/70 bg-card/90 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">{text.topTags}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => setShowAllTags((previous) => !previous)}
                >
                  {showAllTags ? text.showLessTags : text.showAllTags}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {displayedTags.map(({ tag, count }) => {
                  const isActive = selectedTags.includes(tag);
                  return (
                    <Button
                      key={tag}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className="h-8 rounded-full text-xs"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag} <span className="ml-1 text-[11px] opacity-70">{count}</span>
                    </Button>
                  );
                })}
              </div>
            </Card>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {text.showing} {filteredPrompts.length} {text.prompts}
                {selectedCategory !== "all"
                  ? ` ${text.inCategory} ${getCategoryLabel(selectedCategory, language)}`
                  : ""}
              </p>

              {(selectedCategory !== "all" || selectedTags.length > 0 || searchTerm) && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{text.activeFilters}</Badge>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                    {text.clearAll}
                  </Button>
                </div>
              )}
            </div>

            {enableRemotePrompts && supabaseError && (
              <Card className="mb-4 border-amber-300 bg-amber-50/50 p-4 text-amber-900">
                <div className="flex items-start gap-3">
                  <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium">{text.localFallbackTitle}</p>
                    <p className="text-sm">{text.localFallbackBody}</p>
                  </div>
                </div>
              </Card>
            )}

            {enableRemotePrompts && supabaseLoading && !supabaseError && (
              <p className="mb-4 text-xs text-muted-foreground">{text.syncing}</p>
            )}

            {visiblePrompts.length > 0 ? (
              <>
                <div ref={promptsGridRef} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {visiblePrompts.map((prompt) => (
                    <Card
                      key={prompt.id}
                      className={`prompt-card group flex h-full flex-col p-4 transition ${copiedPromptId === prompt.id ? "ring-2 ring-emerald-500/40" : ""} ${getCategoryTone(
                        prompt.category,
                      )}`}
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryLabel(prompt.category, language)}
                        </Badge>
                        {prompt.source === "supabase" && (
                          <Badge variant="outline" className="text-xs">
                            {text.sourceOnline}
                          </Badge>
                        )}
                      </div>

                      <h3 className="mb-2 text-base font-semibold leading-snug">{prompt.title[promptLanguage]}</h3>

                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {getPromptPreview(prompt.prompt[promptLanguage])}
                      </p>

                      <div className="mb-4 mt-auto flex flex-wrap gap-2">
                        {prompt.tags.slice(0, 3).map((tag) => (
                          <Badge key={`${prompt.id}-${tag}`} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 transition duration-300 group-hover:border-primary/45 group-hover:bg-primary/5"
                          onClick={() => setActivePrompt(prompt)}
                        >
                          {text.openPrompt}
                        </Button>
                        <Button
                          size="sm"
                          className={`flex-1 gap-1 transition-all duration-300 ${copiedPromptId === prompt.id
                            ? "bg-emerald-600 text-white hover:bg-emerald-600"
                            : "hover:-translate-y-0.5"
                            }`}
                          onClick={() => copyToClipboard(prompt)}
                        >
                          {copiedPromptId === prompt.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {copiedPromptId === prompt.id ? text.copied : text.copy}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {hasMorePrompts && (
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" onClick={() => setVisibleCount((previous) => previous + 12)}>
                      {text.loadMore}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <Card className="bg-gradient-card p-8 text-center">
                <h3 className="text-lg font-medium">{text.noPromptTitle}</h3>
                <p className="text-muted-foreground">{text.noPromptBody}</p>
              </Card>
            )}
          </div>
        </div>
      </main>

      {activePrompt === null && (
        <div className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom,0px)+0.6rem)] left-1/2 z-40 w-[min(92vw,430px)] -translate-x-1/2 md:hidden">
          <div className="mobile-bottom-rail pointer-events-auto">
            <button type="button" className="mobile-bottom-rail-button" onClick={focusSearchInput}>
              <Search className="h-4 w-4" />
              <span>{text.railSearch}</span>
            </button>
            <button type="button" className="mobile-bottom-rail-button" onClick={jumpToCategories}>
              <ListFilter className="h-4 w-4" />
              <span>{text.railCategories}</span>
            </button>
            <button
              type="button"
              className="mobile-bottom-rail-button"
              onClick={openSurprisePrompt}
              disabled={filteredPrompts.length === 0}
            >
              <Sparkles className="h-4 w-4" />
              <span>{text.railSurprise}</span>
            </button>
          </div>
        </div>
      )}

      <Dialog open={activePrompt !== null} onOpenChange={(open) => !open && setActivePrompt(null)}>
        <DialogContent className="max-h-[86vh] overflow-hidden sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activePrompt?.title[promptLanguage]}</DialogTitle>
            <DialogDescription className="sr-only">{text.detailsAria}</DialogDescription>
          </DialogHeader>

          {activePrompt && (
            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {getCategoryLabel(activePrompt.category, language)}
                </Badge>
                {activePrompt.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="rounded-lg border-l-4 border-primary bg-muted/30 p-4">
                <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {activePrompt.prompt[promptLanguage]}
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  className={`gap-2 transition-all duration-300 ${copiedPromptId === activePrompt.id ? "bg-emerald-600 text-white hover:bg-emerald-600" : ""
                    }`}
                  onClick={() => copyToClipboard(activePrompt)}
                >
                  {copiedPromptId === activePrompt.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedPromptId === activePrompt.id ? text.copied : text.copy}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default PromptPacks;

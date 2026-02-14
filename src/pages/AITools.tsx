import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Code,
  DollarSign,
  ExternalLink,
  Filter,
  Menu,
  Search,
  Users,
  Wand2,
  X,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Tool {
  Tool: string;
  "Starting Cost": string | null;
  Language: string | null;
  "Skill Level": string | null;
  "Use Cases": string | null;
  Category: string | null;
  "Affiliate Link": string | null;
}

const isPresent = <T,>(value: T | null | undefined): value is T => Boolean(value);
const SAVED_TOOLS_KEY = "namaskar-ai-saved-tools";

const LOCAL_TOOLS: Tool[] = [
  {
    Tool: "ChatGPT",
    "Starting Cost": "Free / Plus",
    Language: "English, Assamese support via prompting",
    "Skill Level": "Beginner",
    "Use Cases": "Writing, study help, planning, business drafts",
    Category: "General AI Assistant",
    "Affiliate Link": "https://chatgpt.com",
  },
  {
    Tool: "Google Gemini",
    "Starting Cost": "Free / Advanced",
    Language: "English, Assamese support via prompting",
    "Skill Level": "Beginner",
    "Use Cases": "Research, summaries, idea generation",
    Category: "General AI Assistant",
    "Affiliate Link": "https://gemini.google.com",
  },
  {
    Tool: "Claude",
    "Starting Cost": "Free / Pro",
    Language: "English, Assamese support via prompting",
    "Skill Level": "Intermediate",
    "Use Cases": "Long-form writing, structured analysis",
    Category: "Writing and Analysis",
    "Affiliate Link": "https://claude.ai",
  },
  {
    Tool: "Perplexity",
    "Starting Cost": "Free / Pro",
    Language: "English",
    "Skill Level": "Beginner",
    "Use Cases": "Web research, quick fact finding",
    Category: "Research",
    "Affiliate Link": "https://www.perplexity.ai",
  },
  {
    Tool: "Canva",
    "Starting Cost": "Free / Pro",
    Language: "English",
    "Skill Level": "Beginner",
    "Use Cases": "Social post design, reels cover, banners",
    Category: "Design",
    "Affiliate Link": "https://www.canva.com",
  },
  {
    Tool: "Descript",
    "Starting Cost": "Freemium",
    Language: "English",
    "Skill Level": "Intermediate",
    "Use Cases": "Voice editing, video clips, subtitles",
    Category: "Audio and Video",
    "Affiliate Link": "https://www.descript.com",
  },
  {
    Tool: "Notion AI",
    "Starting Cost": "Paid",
    Language: "English",
    "Skill Level": "Intermediate",
    "Use Cases": "Notes, planning, SOP documentation",
    Category: "Productivity",
    "Affiliate Link": "https://www.notion.so/product/ai",
  },
  {
    Tool: "Grammarly",
    "Starting Cost": "Free / Premium",
    Language: "English",
    "Skill Level": "Beginner",
    "Use Cases": "Email quality, writing correction",
    Category: "Writing and Analysis",
    "Affiliate Link": "https://www.grammarly.com",
  },
  {
    Tool: "CapCut",
    "Starting Cost": "Free / Paid",
    Language: "English",
    "Skill Level": "Beginner",
    "Use Cases": "Short video editing, captions, reels",
    Category: "Audio and Video",
    "Affiliate Link": "https://www.capcut.com",
  },
  {
    Tool: "Looka",
    "Starting Cost": "Paid",
    Language: "English",
    "Skill Level": "Beginner",
    "Use Cases": "Logo drafts, brand starter kits",
    Category: "Design",
    "Affiliate Link": "https://looka.com",
  },
  {
    Tool: "Tome",
    "Starting Cost": "Freemium",
    Language: "English",
    "Skill Level": "Beginner",
    "Use Cases": "Presentation creation, storytelling",
    Category: "Productivity",
    "Affiliate Link": "https://tome.app",
  },
  {
    Tool: "Mailmodo AI Writer",
    "Starting Cost": "Freemium",
    Language: "English",
    "Skill Level": "Intermediate",
    "Use Cases": "Email campaign drafting for local businesses",
    Category: "Marketing",
    "Affiliate Link": "https://www.mailmodo.com",
  },
];

const getCostType = (cost: string | null): "Free" | "Freemium" | "Paid" | "Unknown" => {
  if (!cost) {
    return "Unknown";
  }

  const value = cost.toLowerCase();
  if (value.includes("freemium")) {
    return "Freemium";
  }

  if (value.includes("free") || value === "0" || value === "$0") {
    return "Free";
  }

  return "Paid";
};

const AITools = () => {
  const { language, switchLanguage, t } = useLanguage();
  const { toast } = useToast();
  const isAssamese = language === "as";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedCostType, setSelectedCostType] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [savedToolNames, setSavedToolNames] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [lastSavedToolName, setLastSavedToolName] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const toolsGridRef = useRef<HTMLDivElement | null>(null);
  const saveFeedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    data: remoteTools = [],
    isLoading: remoteLoading,
    error: remoteError,
  } = useQuery<Tool[]>({
    queryKey: ["tools"],
    queryFn: async (): Promise<Tool[]> => {
      const { data, error } = await supabase.from("tools").select("*").order("Tool");

      if (error) {
        throw error;
      }

      return data || [];
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const tools = useMemo<Tool[]>(() => {
    if (remoteTools.length > 0) {
      return remoteTools;
    }

    return LOCAL_TOOLS;
  }, [remoteTools]);

  const usingLocalFallback = remoteTools.length === 0;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_TOOLS_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) {
        setSavedToolNames(parsed);
      }
    } catch {
      setSavedToolNames([]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (saveFeedbackTimerRef.current) {
        clearTimeout(saveFeedbackTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mobileFiltersOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 130);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [mobileFiltersOpen]);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(tools.map((tool) => tool.Category).filter(isPresent)))],
    [tools],
  );

  const skillLevels = useMemo(
    () => ["all", ...Array.from(new Set(tools.map((tool) => tool["Skill Level"]).filter(isPresent)))],
    [tools],
  );

  const costTypes = ["all", "Free", "Freemium", "Paid"];

  const filteredTools = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tools.filter((tool) => {
      const searchable = [tool.Tool, tool["Use Cases"], tool.Category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = normalizedSearch.length === 0 || searchable.includes(normalizedSearch);
      const matchesCategory = selectedCategory === "all" || tool.Category === selectedCategory;
      const matchesSkill = selectedSkillLevel === "all" || tool["Skill Level"] === selectedSkillLevel;
      const costType = getCostType(tool["Starting Cost"]);
      const matchesCost = selectedCostType === "all" || costType === selectedCostType;
      const matchesSaved = !showSavedOnly || savedToolNames.includes(tool.Tool);

      return matchesSearch && matchesCategory && matchesSkill && matchesCost && matchesSaved;
    });
  }, [searchTerm, selectedCategory, selectedSkillLevel, selectedCostType, tools, showSavedOnly, savedToolNames]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSkillLevel("all");
    setSelectedCostType("all");
    setShowSavedOnly(false);
  };

  const focusSearchInput = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024 && !mobileFiltersOpen) {
      setMobileFiltersOpen(true);
      return;
    }

    searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    searchInputRef.current?.focus();
  };

  const scrollToToolsGrid = () => {
    toolsGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleSavedOnly = () => {
    setShowSavedOnly((previous) => !previous);
    scrollToToolsGrid();
  };

  const toggleSavedTool = (toolName: string) => {
    const alreadySaved = savedToolNames.includes(toolName);
    const nextSavedToolNames = alreadySaved
      ? savedToolNames.filter((item) => item !== toolName)
      : [toolName, ...savedToolNames];

    setSavedToolNames(nextSavedToolNames);
    localStorage.setItem(SAVED_TOOLS_KEY, JSON.stringify(nextSavedToolNames));

    setLastSavedToolName(toolName);
    if (saveFeedbackTimerRef.current) {
      clearTimeout(saveFeedbackTimerRef.current);
    }
    saveFeedbackTimerRef.current = setTimeout(() => {
      setLastSavedToolName((previous) => (previous === toolName ? null : previous));
    }, 1600);

    trackEvent("tool_saved_toggled", {
      tool_name: toolName,
      saved: !alreadySaved,
      saved_count: nextSavedToolNames.length,
      filtered_count: filteredTools.length,
    });

    toast({
      title: alreadySaved
        ? isAssamese
          ? "Saved তালিকাৰ পৰা আঁতৰোৱা হ'ল"
          : "Removed from saved tools"
        : isAssamese
          ? "Saved tool-ত সংৰক্ষণ কৰা হ'ল"
          : "Saved to your tools list",
      description: alreadySaved ? toolName : `${toolName} ${isAssamese ? "সংৰক্ষণ কৰা হ'ল" : "saved successfully"}.`,
    });
  };

  const text = {
    title: isAssamese ? "AI Tool Library" : "AI Tool Library",
    subtitle: isAssamese
      ? "অসমীয়াত ব্যাখ্যাসহ practical use-case ভিত্তিক AI tools directory"
      : "Practical AI tools directory with real-world use cases.",
    back: isAssamese ? "পিছলৈ" : "Back",
    search: isAssamese ? "টুল সন্ধান কৰক..." : "Search tools...",
    categories: isAssamese ? "শ্ৰেণী" : "Categories",
    skillLevel: isAssamese ? "Skill Level" : "Skill Level",
    pricing: isAssamese ? "মূল্য" : "Pricing",
    allCategories: isAssamese ? "সকলো শ্ৰেণী" : "All Categories",
    allLevels: isAssamese ? "সকলো স্তৰ" : "All Levels",
    allPricing: isAssamese ? "সকলো মূল্য" : "All Pricing",
    clear: isAssamese ? "Clear All" : "Clear All",
    activeFilters: isAssamese ? "চলমান ফিল্টাৰ" : "Active Filters",
    showing: isAssamese ? "মুঠ দেখা গৈছে" : "Showing",
    noToolsTitle: isAssamese ? "টুল পোৱা নগ'ল" : "No tools found",
    noToolsBody: isAssamese ? "সন্ধান বা ফিল্টাৰ সলনি কৰি পুনৰ চেষ্টা কৰক।" : "Try adjusting search or filters.",
    visit: isAssamese ? "টুল খোলক" : "Visit Tool",
    language: isAssamese ? "ভাষা" : "Language",
    localFallbackTitle: isAssamese ? "লোকেল Tool Library সক্ৰিয়" : "Local tool library active",
    localFallbackBody: isAssamese
      ? "অনলাইন টুল তালিকা অস্থায়ীভাৱে নোপোৱা বাবে curated local তালিকা দেখুওৱা হৈছে।"
      : "Online tool table is unavailable right now, so a curated local list is being shown.",
    filter: isAssamese ? "ফিল্টাৰ" : "Filters",
    applyDaily: isAssamese ? "আজিৰ ১টা টুল বাছনি কৰক আৰু ১০ মিনিট test চলাওক।" : "Pick one tool today and run a 10-minute test.",
    saved: isAssamese ? "Saved" : "Saved",
    save: isAssamese ? "Save" : "Save",
    savedOnly: isAssamese ? "Saved only" : "Saved only",
    savedAdded: isAssamese ? "Saved তালিকাত যোগ হ'ল" : "Added to saved tools",
    savedRemoved: isAssamese ? "Saved তালিকাৰ পৰা আঁতৰোৱা হ'ল" : "Removed from saved tools",
    railSearch: isAssamese ? "সন্ধান" : "Search",
    railFilters: isAssamese ? "ফিল্টাৰ" : "Filters",
    railSaved: isAssamese ? "Saved" : "Saved",
    opening: isAssamese ? "খুলি আছে..." : "Opening...",
  };

  const FilterPanel = ({ className = "" }: { className?: string }) => (
    <Card className={`border-primary/15 bg-card/95 ${className}`}>
      <div className="space-y-5 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder={text.search}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="border-primary/20 bg-card pl-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground">{text.activeFilters}</p>
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={clearAllFilters}>
            {text.clear}
          </Button>
        </div>

        <Button
          type="button"
          variant={showSavedOnly ? "default" : "outline"}
          size="sm"
          className="h-10 w-full justify-between"
          onClick={toggleSavedOnly}
        >
          <span className="inline-flex items-center gap-2">
            {showSavedOnly ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {text.savedOnly}
          </span>
          <span className="text-xs opacity-80">{savedToolNames.length}</span>
        </Button>

        <div>
          <h3 className="mb-2 text-sm font-semibold">{text.categories}</h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const active = selectedCategory === category;
              const label = category === "all" ? text.allCategories : category;
              const count = category === "all" ? tools.length : tools.filter((tool) => tool.Category === category).length;

              return (
                <Button
                  key={category}
                  variant={active ? "default" : "ghost"}
                  size="sm"
                  className="h-10 w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {label}
                  <span className="ml-auto text-xs opacity-70">{count}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold">{text.skillLevel}</h3>
          <div className="space-y-2">
            {skillLevels.map((level) => {
              const active = selectedSkillLevel === level;
              const label = level === "all" ? text.allLevels : level;

              return (
                <Button
                  key={level}
                  variant={active ? "default" : "ghost"}
                  size="sm"
                  className="h-10 w-full justify-start"
                  onClick={() => setSelectedSkillLevel(level)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold">{text.pricing}</h3>
          <div className="space-y-2">
            {costTypes.map((costType) => {
              const active = selectedCostType === costType;
              const label = costType === "all" ? text.allPricing : costType;

              return (
                <Button
                  key={costType}
                  variant={active ? "default" : "ghost"}
                  size="sm"
                  className="h-10 w-full justify-start"
                  onClick={() => setSelectedCostType(costType)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "AI টুলছ | নমস্কাৰ AI" : "AI Tools | Namaskar AI"}
        description={
          isAssamese
            ? "ছাত্ৰ, পেশাজীৱী আৰু ব্যৱসায়ৰ বাবে practical AI tools directory। category, price আৰু skill level অনুসৰি ফিল্টাৰ কৰক।"
            : "Practical AI tools directory for students, professionals, and businesses with smart filtering."
        }
        path="/ai-tools"
        language={language}
        keywords={[
          "Assamese AI tools",
          "best AI tools Assam",
          "AI tools for students",
          "AI tools for business Assam",
          "Namaskar AI tool directory",
        ]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-24 pt-8 md:pb-14">
        <div className="platform-shell">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              {text.back}
            </Link>
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
              <Menu className="mr-2 h-4 w-4" />
              {text.filter}
            </Button>
          </div>

          <Card className="platform-hero-card mb-6">
            <div className="relative z-10">
              <div className="mb-2 platform-chip">
                <Wand2 className="mr-1.5 h-3.5 w-3.5" />
                {text.title}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">{text.title}</h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">{text.subtitle}</p>
              <p className="mt-2 text-xs font-medium text-foreground/80">{text.applyDaily}</p>
            </div>
          </Card>

          {usingLocalFallback && !remoteLoading && (
            <Card className="mb-4 border-amber-300 bg-amber-50/60 p-3 text-amber-900">
              <p className="text-sm font-medium">{text.localFallbackTitle}</p>
              <p className="text-xs">{text.localFallbackBody}</p>
            </Card>
          )}

          <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
            <div className="hidden lg:block">
              <FilterPanel />
            </div>

            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {text.showing} {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={showSavedOnly ? "default" : "outline"}
                    className="h-9 rounded-full px-3 text-xs"
                    onClick={toggleSavedOnly}
                  >
                    {showSavedOnly ? <BookmarkCheck className="mr-1 h-3.5 w-3.5" /> : <Bookmark className="mr-1 h-3.5 w-3.5" />}
                    {text.savedOnly}
                    <span className="ml-1 opacity-80">({savedToolNames.length})</span>
                  </Button>
                  <Badge variant="outline">{text.language}</Badge>
                  <Badge variant="secondary">{isAssamese ? "Assamese-first use cases" : "Assamese-first use cases"}</Badge>
                </div>
              </div>

              {remoteLoading && usingLocalFallback && (
                <p className="mb-3 text-xs text-muted-foreground">
                  {isAssamese
                    ? "লোকেল টুলছ দেখুওৱা হৈছে, অনলাইন ডাটা সমন্বয় চলি আছে..."
                    : "Showing local tools while syncing online data..."}
                </p>
              )}

              <div ref={toolsGridRef}>
                {filteredTools.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {filteredTools.map((tool) => {
                    const costType = getCostType(tool["Starting Cost"]);
                    const isSavedTool = savedToolNames.includes(tool.Tool);
                    const hasSaveFeedback = lastSavedToolName === tool.Tool;
                    return (
                      <Card
                        key={tool.Tool}
                        className={`tool-card border-primary/15 bg-[linear-gradient(150deg,hsl(var(--card)),hsl(var(--accent)/0.08),hsl(var(--primary)/0.06))] p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant ${hasSaveFeedback ? "ring-2 ring-primary/35" : ""}`}
                      >
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {tool.Category && <Badge variant="secondary">{tool.Category}</Badge>}
                            {tool["Skill Level"] && (
                              <Badge variant="outline" className="gap-1">
                                <Users className="h-3 w-3" />
                                {tool["Skill Level"]}
                              </Badge>
                            )}
                            <Badge variant="outline" className="gap-1">
                              <DollarSign className="h-3 w-3" />
                              {costType}
                            </Badge>
                          </div>

                          <Button
                            type="button"
                            size="icon"
                            variant={isSavedTool ? "default" : "outline"}
                            className="h-10 w-10 shrink-0 rounded-full transition-transform active:scale-95"
                            onClick={() => toggleSavedTool(tool.Tool)}
                            aria-label={isSavedTool ? `${text.saved}: ${tool.Tool}` : `${text.save}: ${tool.Tool}`}
                          >
                            {isSavedTool ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                          </Button>
                        </div>

                        <h3 className="text-lg font-semibold">{tool.Tool}</h3>
                        {hasSaveFeedback && (
                          <p className="mt-1 text-xs font-medium text-primary">
                            {isSavedTool ? text.savedAdded : text.savedRemoved}
                          </p>
                        )}

                        {tool["Use Cases"] && (
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tool["Use Cases"]}</p>
                        )}

                        {tool.Language && (
                          <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                            <Code className="h-3 w-3" />
                            {tool.Language}
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <p className="text-xs text-muted-foreground">{tool["Starting Cost"] ?? "Not listed"}</p>
                          {tool["Affiliate Link"] && (
                            <Button
                              asChild
                              className="min-h-10 rounded-full bg-gradient-primary px-4 text-white"
                            >
                              <a
                                href={tool["Affiliate Link"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  trackEvent("tool_visit_clicked", {
                                    tool_name: tool.Tool,
                                    category: tool.Category,
                                    starting_cost: tool["Starting Cost"],
                                  })
                                }
                              >
                                <span>{text.visit}</span>
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
                ) : (
                  <Card className="p-10 text-center">
                    <h3 className="text-lg font-semibold">{text.noToolsTitle}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{text.noToolsBody}</p>
                    <Button variant="outline" className="mt-4 min-h-10 rounded-full px-4" onClick={clearAllFilters}>
                      {text.clear}
                    </Button>
                  </Card>
                )}
              </div>

              {remoteError && (
                <p className="mt-4 text-xs text-muted-foreground">
                  {isAssamese
                    ? "অনলাইন উৎসত সাময়িক সমস্যাৰ বাবে local data দেখুওৱা হৈছে।"
                    : "Local data is shown because the remote source is temporarily unavailable."}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {!mobileFiltersOpen && (
        <div className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom,0px)+0.6rem)] left-1/2 z-40 w-[min(92vw,430px)] -translate-x-1/2 lg:hidden">
          <div className="mobile-bottom-rail pointer-events-auto">
            <button type="button" className="mobile-bottom-rail-button" onClick={focusSearchInput}>
              <Search className="h-4 w-4" />
              <span>{text.railSearch}</span>
            </button>
            <button
              type="button"
              className="mobile-bottom-rail-button"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="h-4 w-4" />
              <span>{text.railFilters}</span>
            </button>
            <button
              type="button"
              className={`mobile-bottom-rail-button ${showSavedOnly ? "border-primary/60 bg-primary/15 text-primary" : ""}`}
              onClick={toggleSavedOnly}
            >
              {showSavedOnly ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              <span>{text.railSaved}</span>
            </button>
          </div>
        </div>
      )}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute left-3 right-3 top-4 max-h-[88vh] overflow-y-auto">
            <Card className="border-primary/20 bg-card">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="font-semibold">{text.filter}</p>
                <Button variant="ghost" size="sm" onClick={() => setMobileFiltersOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterPanel className="border-0 shadow-none" />
              <div className="p-4 pt-0">
                <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                  <Filter className="mr-2 h-4 w-4" />
                  {isAssamese ? "ফিল্টাৰ প্ৰয়োগ কৰক" : "Apply Filters"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default AITools;

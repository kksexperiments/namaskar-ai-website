import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Download, Trash2 } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TrackerEngine = "ChatGPT" | "Perplexity" | "Gemini" | "Claude" | "Grok";
type CitationPosition = "top" | "middle" | "mention_only" | "not_cited";
type QueryLanguage = "en" | "as";

interface TrackerEntry {
  id: string;
  runDate: string;
  engine: TrackerEngine;
  query: string;
  queryLanguage: QueryLanguage;
  citationPosition: CitationPosition;
  score: number;
  mentionedPages: string;
  responseEvidence: string;
  notes: string;
}

interface FormState {
  runDate: string;
  engine: TrackerEngine;
  query: string;
  queryLanguage: QueryLanguage;
  citationPosition: CitationPosition;
  mentionedPages: string;
  responseEvidence: string;
  notes: string;
}

const STORAGE_KEY = "namaskar-geo-tracker-v1";
const SCORE_MAP: Record<CitationPosition, number> = {
  top: 3,
  middle: 2,
  mention_only: 1,
  not_cited: 0,
};

const initialFormState = (): FormState => ({
  runDate: new Date().toISOString().slice(0, 10),
  engine: "ChatGPT",
  query: "",
  queryLanguage: "en",
  citationPosition: "not_cited",
  mentionedPages: "",
  responseEvidence: "",
  notes: "",
});

const GeoTracker = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/geo-tracker", language);
  const [formState, setFormState] = useState<FormState>(() => initialFormState());
  const [entries, setEntries] = useState<TrackerEntry[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter(
          (item): item is TrackerEntry =>
            typeof item?.id === "string" &&
            typeof item?.runDate === "string" &&
            typeof item?.engine === "string" &&
            typeof item?.query === "string" &&
            typeof item?.queryLanguage === "string" &&
            typeof item?.citationPosition === "string" &&
            typeof item?.score === "number" &&
            typeof item?.mentionedPages === "string" &&
            typeof item?.responseEvidence === "string" &&
            typeof item?.notes === "string",
        );
        setEntries(cleaned);
      }
    } catch {
      setEntries([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const summary = useMemo(() => {
    const totalRuns = entries.length;
    const citedRuns = entries.filter((entry) => entry.score > 0).length;
    const averageScore = totalRuns > 0 ? entries.reduce((sum, entry) => sum + entry.score, 0) / totalRuns : 0;
    const citationRate = totalRuns > 0 ? (citedRuns / totalRuns) * 100 : 0;

    const engineTotals = new Map<TrackerEngine, { score: number; count: number }>();
    for (const entry of entries) {
      const existing = engineTotals.get(entry.engine) ?? { score: 0, count: 0 };
      existing.score += entry.score;
      existing.count += 1;
      engineTotals.set(entry.engine, existing);
    }

    let bestEngine: TrackerEngine | null = null;
    let bestAverage = -1;
    for (const [engine, value] of engineTotals.entries()) {
      const engineAverage = value.score / value.count;
      if (engineAverage > bestAverage) {
        bestAverage = engineAverage;
        bestEngine = engine;
      }
    }

    return {
      totalRuns,
      citedRuns,
      averageScore,
      citationRate,
      bestEngine,
    };
  }, [entries]);

  const queryInsights = useMemo(() => {
    const totals = new Map<string, { citations: number; runs: number }>();
    for (const entry of entries) {
      const key = entry.query.trim().toLowerCase();
      if (!key) {
        continue;
      }
      const current = totals.get(key) ?? { citations: 0, runs: 0 };
      current.runs += 1;
      if (entry.score > 0) {
        current.citations += 1;
      }
      totals.set(key, current);
    }

    return Array.from(totals.entries())
      .map(([query, value]) => ({
        query,
        runs: value.runs,
        citationRate: value.runs > 0 ? (value.citations / value.runs) * 100 : 0,
      }))
      .sort((a, b) => b.runs - a.runs)
      .slice(0, 6);
  }, [entries]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleAddEntry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = formState.query.trim();
    if (!trimmedQuery) {
      return;
    }

    const newEntry: TrackerEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      runDate: formState.runDate,
      engine: formState.engine,
      query: trimmedQuery,
      queryLanguage: formState.queryLanguage,
      citationPosition: formState.citationPosition,
      score: SCORE_MAP[formState.citationPosition],
      mentionedPages: formState.mentionedPages.trim(),
      responseEvidence: formState.responseEvidence.trim(),
      notes: formState.notes.trim(),
    };

    setEntries((current) => [newEntry, ...current]);
    setFormState((current) => ({
      ...initialFormState(),
      runDate: current.runDate,
      queryLanguage: current.queryLanguage,
      engine: current.engine,
    }));
  };

  const handleDelete = (entryId: string) => {
    setEntries((current) => current.filter((entry) => entry.id !== entryId));
  };

  const handleClearAll = () => {
    if (typeof window !== "undefined") {
      const confirmation = window.confirm(
        isAssamese ? "সকলো tracker data মচি দিবনে?" : "Delete all GEO tracker data?",
      );
      if (!confirmation) {
        return;
      }
    }
    setEntries([]);
  };

  const handleExportCsv = () => {
    if (entries.length === 0 || typeof window === "undefined") {
      return;
    }

    const header = [
      "run_date",
      "engine",
      "query",
      "query_language",
      "citation_position",
      "score",
      "mentioned_pages",
      "response_evidence",
      "notes",
    ];

    const escapeCell = (value: string | number) => {
      const text = String(value ?? "");
      if (text.includes(",") || text.includes('"') || text.includes("\n")) {
        return `"${text.replace(/"/g, '""')}"`;
      }
      return text;
    };

    const body = entries.map((entry) =>
      [
        entry.runDate,
        entry.engine,
        entry.query,
        entry.queryLanguage,
        entry.citationPosition,
        entry.score,
        entry.mentionedPages,
        entry.responseEvidence,
        entry.notes,
      ]
        .map(escapeCell)
        .join(","),
    );

    const csv = `${header.join(",")}\n${body.join("\n")}\n`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `geo-tracker-export-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isAssamese ? "GEO Tracker (Internal) | নমস্কাৰ AI" : "GEO Tracker (Internal) | Namaskar AI",
    description: isAssamese
      ? "ChatGPT, Perplexity, Gemini, Claude আৰু Grok citation monitoring-ৰ internal tracker।"
      : "Internal tracker for citation monitoring across ChatGPT, Perplexity, Gemini, Claude, and Grok.",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    url: toAbsoluteSiteUrl(canonicalPath),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isAssamese ? "GEO Playbook" : "GEO Playbook",
        item: toAbsoluteSiteUrl(toLocalePath("/geo-tracking-playbook", language)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isAssamese ? "GEO Tracker" : "GEO Tracker",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  const positionLabel = (value: CitationPosition) => {
    if (value === "top") {
      return isAssamese ? "Top citation" : "Top citation";
    }
    if (value === "middle") {
      return isAssamese ? "Middle citation" : "Middle citation";
    }
    if (value === "mention_only") {
      return isAssamese ? "Mention only" : "Mention only";
    }
    return isAssamese ? "Not cited" : "Not cited";
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "GEO Tracker (Internal) | নমস্কাৰ AI" : "GEO Tracker (Internal) | Namaskar AI"}
        description={
          isAssamese
            ? "AI engine citation tracker, score summary আৰু weekly GEO monitoring log।"
            : "Internal GEO citation tracker with score summary and weekly monitoring log."
        }
        path={canonicalPath}
        language={language}
        robots="noindex, nofollow"
        structuredData={[pageSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell space-y-6">
          <Link
            to={toLocalePath("/geo-tracking-playbook", language)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "GEO playbook-লৈ উভতি যাওক" : "Back to GEO playbook"}
          </Link>

          <Card className="platform-hero-card">
            <div className="relative z-10">
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "GEO Tracker (Internal)" : "GEO Tracker (Internal)"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "প্ৰতিটো query run log কৰক, auto score পাওক, আৰু weekly GEO performance trend track কৰক।"
                  : "Log each query run, calculate score automatically, and track weekly GEO performance trends."}
              </p>
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <BarChart3 className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{isAssamese ? "Quick Metrics" : "Quick Metrics"}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-primary/10 bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">{isAssamese ? "Total runs" : "Total runs"}</p>
                <p className="mt-1 text-2xl font-semibold">{summary.totalRuns}</p>
              </div>
              <div className="rounded-lg border border-primary/10 bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">{isAssamese ? "Citation rate" : "Citation rate"}</p>
                <p className="mt-1 text-2xl font-semibold">{summary.citationRate.toFixed(1)}%</p>
              </div>
              <div className="rounded-lg border border-primary/10 bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">{isAssamese ? "Avg score" : "Avg score"}</p>
                <p className="mt-1 text-2xl font-semibold">{summary.averageScore.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border border-primary/10 bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">{isAssamese ? "Best engine" : "Best engine"}</p>
                <p className="mt-1 text-2xl font-semibold">{summary.bestEngine ?? "-"}</p>
              </div>
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "Add Tracking Entry" : "Add Tracking Entry"}</h2>
            <form onSubmit={handleAddEntry} className="mt-4 space-y-3">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">{isAssamese ? "Run date" : "Run date"}</p>
                  <Input
                    type="date"
                    value={formState.runDate}
                    onChange={(event) => updateField("runDate", event.target.value)}
                    required
                  />
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">{isAssamese ? "Engine" : "Engine"}</p>
                  <select
                    value={formState.engine}
                    onChange={(event) => updateField("engine", event.target.value as TrackerEngine)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="ChatGPT">ChatGPT</option>
                    <option value="Perplexity">Perplexity</option>
                    <option value="Gemini">Gemini</option>
                    <option value="Claude">Claude</option>
                    <option value="Grok">Grok</option>
                  </select>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">{isAssamese ? "Query language" : "Query language"}</p>
                  <select
                    value={formState.queryLanguage}
                    onChange={(event) => updateField("queryLanguage", event.target.value as QueryLanguage)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="en">English</option>
                    <option value="as">Assamese</option>
                  </select>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">{isAssamese ? "Citation position" : "Citation position"}</p>
                  <select
                    value={formState.citationPosition}
                    onChange={(event) => updateField("citationPosition", event.target.value as CitationPosition)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="top">{isAssamese ? "Top citation (3)" : "Top citation (3)"}</option>
                    <option value="middle">{isAssamese ? "Middle citation (2)" : "Middle citation (2)"}</option>
                    <option value="mention_only">{isAssamese ? "Mention only (1)" : "Mention only (1)"}</option>
                    <option value="not_cited">{isAssamese ? "Not cited (0)" : "Not cited (0)"}</option>
                  </select>
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">{isAssamese ? "Query" : "Query"}</p>
                <Input
                  placeholder={isAssamese ? "উদাহৰণ: learn AI in Assamese" : "Example: learn AI in Assamese"}
                  value={formState.query}
                  onChange={(event) => updateField("query", event.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">
                    {isAssamese ? "Mentioned pages (comma separated)" : "Mentioned pages (comma separated)"}
                  </p>
                  <Input
                    placeholder="/ai-in-assamese, /faq"
                    value={formState.mentionedPages}
                    onChange={(event) => updateField("mentionedPages", event.target.value)}
                  />
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">
                    {isAssamese ? "Evidence URL বা screenshot link" : "Evidence URL or screenshot link"}
                  </p>
                  <Input
                    placeholder="https://..."
                    value={formState.responseEvidence}
                    onChange={(event) => updateField("responseEvidence", event.target.value)}
                  />
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">{isAssamese ? "Notes / action" : "Notes / action"}</p>
                <Textarea
                  placeholder={
                    isAssamese
                      ? "কোন page আপডেট কৰিব লাগে বা outreach follow-up লিখক"
                      : "Write which page to update or what outreach follow-up is needed"
                  }
                  value={formState.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit">{isAssamese ? "Entry যোগ কৰক" : "Add entry"}</Button>
                <Button type="button" variant="outline" onClick={handleExportCsv} disabled={entries.length === 0}>
                  <Download className="mr-2 h-4 w-4" />
                  {isAssamese ? "CSV Export" : "Export CSV"}
                </Button>
                <Button type="button" variant="outline" onClick={handleClearAll} disabled={entries.length === 0}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isAssamese ? "Clear all" : "Clear all"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <a href="/geo-tracking-template.csv" download>
                    {isAssamese ? "Template Download" : "Download template"}
                  </a>
                </Button>
                <Button type="button" variant="outline" asChild>
                  <a href="/geo-weekly-sheet-latest.csv" download>
                    {isAssamese ? "Week 4 Sheet" : "Week 4 Sheet"}
                  </a>
                </Button>
              </div>
            </form>
          </Card>

          {queryInsights.length > 0 ? (
            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "Query Insights" : "Query Insights"}</h2>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {queryInsights.map((insight) => (
                  <div key={insight.query} className="rounded-lg border border-primary/10 bg-background/50 p-3 text-sm">
                    <p className="font-medium">{insight.query}</p>
                    <p className="mt-1 text-muted-foreground">
                      {isAssamese ? "Runs" : "Runs"}: {insight.runs} | {isAssamese ? "Citation rate" : "Citation rate"}:{" "}
                      {insight.citationRate.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "Recent Entries" : "Recent Entries"}</h2>
            {entries.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                {isAssamese ? "এতিয়ালৈ data নাই। প্ৰথম entry যোগ কৰক।" : "No data yet. Add your first entry."}
              </p>
            ) : (
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-2 py-2 font-medium">{isAssamese ? "Date" : "Date"}</th>
                      <th className="px-2 py-2 font-medium">{isAssamese ? "Engine" : "Engine"}</th>
                      <th className="px-2 py-2 font-medium">{isAssamese ? "Query" : "Query"}</th>
                      <th className="px-2 py-2 font-medium">{isAssamese ? "Position" : "Position"}</th>
                      <th className="px-2 py-2 font-medium">{isAssamese ? "Score" : "Score"}</th>
                      <th className="px-2 py-2 font-medium">{isAssamese ? "Action" : "Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-b border-border/60">
                        <td className="px-2 py-2 text-muted-foreground">{entry.runDate}</td>
                        <td className="px-2 py-2 text-muted-foreground">{entry.engine}</td>
                        <td className="px-2 py-2">
                          <p>{entry.query}</p>
                          {entry.responseEvidence ? (
                            <a
                              href={entry.responseEvidence}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-primary hover:underline"
                            >
                              {isAssamese ? "evidence link" : "evidence link"}
                            </a>
                          ) : null}
                        </td>
                        <td className="px-2 py-2 text-muted-foreground">{positionLabel(entry.citationPosition)}</td>
                        <td className="px-2 py-2 font-semibold text-foreground">{entry.score}</td>
                        <td className="px-2 py-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(entry.id)}
                            className="h-8 px-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default GeoTracker;

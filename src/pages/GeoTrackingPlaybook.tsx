import { Link } from "react-router-dom";
import { ArrowLeft, ClipboardList, ExternalLink, LineChart } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GeoTrackingPlaybook = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/geo-tracking-playbook", language);

  const engines = ["ChatGPT", "Perplexity", "Gemini", "Claude", "Grok"];
  const queryBank = isAssamese
    ? [
        "learn AI in Assamese",
        "best AI course for Assamese speakers",
        "AI শিকিবলৈ কেনেকৈ আৰম্ভ কৰিম",
        "ChatGPT in Assamese guide",
        "Assamese AI tutorial for beginners",
        "Assamese chatbot or LLM guide",
      ]
    : [
        "learn AI in Assamese",
        "best AI course for Assamese speakers",
        "AI শিকিবলৈ কেনেকৈ আৰম্ভ কৰিম",
        "ChatGPT in Assamese guide",
        "Assamese AI tutorial for beginners",
        "Assamese chatbot or LLM guide",
      ];

  const steps = isAssamese
    ? [
        "প্ৰতিটো engine-ত একে query bank run কৰক।",
        "answer-ত Namaskar AI mention/citation আছে নে track কৰক।",
        "position (top/middle/not cited) note কৰক।",
        "quote/context accurate নে না manually যাচাই কৰক।",
        "weekly summary-এ pages/topic prioritize কৰক।",
      ]
    : [
        "Run the same query bank across each engine.",
        "Track whether Namaskar AI is mentioned or cited.",
        "Record position (top, middle, or not cited).",
        "Manually verify quote/context accuracy.",
        "Use weekly summaries to prioritize content updates.",
      ];

  const scoringRules = isAssamese
    ? [
        "Top citation = 3 points",
        "Middle citation = 2 points",
        "Mention only = 1 point",
        "No citation = 0 points",
      ]
    : [
        "Top citation = 3 points",
        "Middle citation = 2 points",
        "Mention only = 1 point",
        "No citation = 0 points",
      ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isAssamese ? "GEO Tracking Playbook | নমস্কাৰ AI" : "GEO Tracking Playbook | Namaskar AI",
    description: isAssamese
      ? "ChatGPT, Perplexity, Gemini, Claude আৰু Grok-ত Namaskar AI citation track কৰাৰ weekly framework।"
      : "Weekly framework to track Namaskar AI citations across ChatGPT, Perplexity, Gemini, Claude, and Grok.",
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
        name: isAssamese ? "ঘৰ" : "Home",
        item: toAbsoluteSiteUrl(toLocalePath("/", language)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isAssamese ? "GEO Tracking Playbook" : "GEO Tracking Playbook",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "GEO Tracking Playbook | নমস্কাৰ AI" : "GEO Tracking Playbook | Namaskar AI"}
        description={
          isAssamese
            ? "AI engine citation performance track, weekly scoring, আৰু query-bank ভিত্তিক GEO monitoring playbook।"
            : "GEO monitoring playbook with query-bank testing, weekly scoring, and citation-performance tracking."
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
            to={toLocalePath("/", language)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home"}
          </Link>

          <Card className="platform-hero-card">
            <div className="relative z-10">
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "GEO Tracking Playbook" : "GEO Tracking Playbook"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "Namaskar AI-ৰ AI search citation performance weekly track কৰিবলৈ ready-to-use monitoring structure।"
                  : "Ready-to-use weekly monitoring framework to track Namaskar AI citation performance in AI search engines."}
              </p>
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <ClipboardList className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{isAssamese ? "Query Bank" : "Query Bank"}</h2>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {queryBank.map((query) => (
                <li key={query}>{query}</li>
              ))}
            </ul>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <LineChart className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{isAssamese ? "Weekly Tracking Steps" : "Weekly Tracking Steps"}</h2>
            </div>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "Scoring Rules" : "Scoring Rules"}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {scoringRules.map((rule) => (
                <div key={rule} className="rounded-lg border border-primary/10 bg-background/40 p-3 text-sm text-muted-foreground">
                  {rule}
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "Tracking Template" : "Tracking Template"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isAssamese
                ? "CSV template download কৰি weekly log maintain কৰক।"
                : "Download the CSV template and maintain a weekly evidence log."}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button asChild>
                <a href="/geo-tracking-template.csv" download>
                  {isAssamese ? "CSV Download" : "Download CSV"}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/geo-weekly-sheet-latest.csv" download>
                  {isAssamese ? "Week 4 Sheet" : "Week 4 Sheet"}
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to={toLocalePath("/press-collaboration", language)}>
                  {isAssamese ? "Press Page খুলক" : "Open Press Page"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={toLocalePath("/geo-tracker", language)}>
                  {isAssamese ? "GEO Tracker খুলক" : "Open GEO Tracker"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5 text-sm text-muted-foreground">
            {isAssamese
              ? "Tip: query run time, location, account-state, and model version নোট কৰিলে trend analysis বহুত স্পষ্ট হয়।"
              : "Tip: include run-time, location, account state, and model version for cleaner trend analysis."}
          </Card>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default GeoTrackingPlaybook;

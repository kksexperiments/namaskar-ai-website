import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Target } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import SourceReferencesCard from "@/components/SourceReferencesCard";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const LearnAIInAssamese30Days = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/learn-ai-in-assamese-30-days", language);

  const planRows = isAssamese
    ? [
        {
          week: "সপ্তাহ ১",
          focus: "মূল prompt কাঠামো",
          output: "দৈনিক ১টা prompt + ১টা refine note",
          time: "১০-১৫ মিনিট/দিন",
        },
        {
          week: "সপ্তাহ ২",
          focus: "Study/Career workflow",
          output: "৫টা বাস্তৱ task-ত AI ব্যৱহাৰ",
          time: "১৫-২০ মিনিট/দিন",
        },
        {
          week: "সপ্তাহ ৩",
          focus: "Tool comparison + selection",
          output: "নিজৰ use-case-ৰ বাবে ২টা tool shortlist",
          time: "২০ মিনিট/দিন",
        },
        {
          week: "সপ্তাহ ৪",
          focus: "Portfolio and repeatable system",
          output: "৩টা documented AI workflow",
          time: "২০ মিনিট/দিন",
        },
      ]
    : [
        {
          week: "Week 1",
          focus: "Core prompt structure",
          output: "1 daily prompt + 1 refinement note",
          time: "10-15 min/day",
        },
        {
          week: "Week 2",
          focus: "Study/Career workflows",
          output: "Use AI on 5 real tasks",
          time: "15-20 min/day",
        },
        {
          week: "Week 3",
          focus: "Tool comparison and selection",
          output: "Shortlist 2 tools for your own goals",
          time: "20 min/day",
        },
        {
          week: "Week 4",
          focus: "Portfolio and repeatable system",
          output: "3 documented AI workflows",
          time: "20 min/day",
        },
      ];

  const compareRows = isAssamese
    ? [
        {
          path: "Free path",
          cost: "₹0",
          speed: "মধ্যম",
          support: "self-learning",
          bestFor: "students আৰু beginner",
        },
        {
          path: "Hybrid path (free + paid tools)",
          cost: "₹500-₹2,000/মাহ",
          speed: "দ্ৰুত",
          support: "community + docs",
          bestFor: "career switch আৰু creators",
        },
        {
          path: "Mentor/Cohort path",
          cost: "course অনুযায়ী",
          speed: "খুব দ্ৰুত",
          support: "direct feedback",
          bestFor: "time-sensitive learners",
        },
      ]
    : [
        {
          path: "Free path",
          cost: "₹0",
          speed: "Moderate",
          support: "Self-learning",
          bestFor: "Students and beginners",
        },
        {
          path: "Hybrid path (free + paid tools)",
          cost: "₹500-₹2,000/month",
          speed: "Fast",
          support: "Community + docs",
          bestFor: "Career switchers and creators",
        },
        {
          path: "Mentor/Cohort path",
          cost: "Depends on course",
          speed: "Fastest",
          support: "Direct feedback",
          bestFor: "Time-sensitive learners",
        },
      ];

  const howToSteps = isAssamese
    ? [
        "এটা নির্দিষ্ট লক্ষ্য লিখক: study, চাকৰি, নে business.",
        "Prompt Packs-ৰ পৰা goal-fit prompt বাছনি কৰি run কৰক।",
        "AI output-ত ৩টা ভুল/সংশোধন লিখি prompt refine কৰক।",
        "সপ্তাহৰ শেষত ১টা usable final output সংৰক্ষণ কৰক।",
      ]
    : [
        "Write one specific goal: study, job, or business.",
        "Pick one goal-fit prompt from Prompt Packs and run it.",
        "List 3 errors/improvements and refine the prompt once.",
        "Save one usable final output at the end of each week.",
      ];

  const highSignal = isAssamese
    ? [
        "ছোট কিন্তু দৈনিক practice",
        "একেটা use-case-ত iteration",
        "output log ৰাখা",
      ]
    : [
        "Short but daily practice",
        "Iteration on one use-case",
        "Maintaining an output log",
      ];

  const lowSignal = isAssamese
    ? [
        "এদিনে বহুত tool try কৰি confusion",
        "copy-paste output verify নকৰা",
        "অভ্যাস tracking নথকা",
      ]
    : [
        "Trying many tools in one day without a plan",
        "Copy-pasting output without verification",
        "No weekly progress tracking",
      ];

  const faqs = isAssamese
    ? [
        {
          question: "৩০ দিনত নিশ্চিত ফল পামনে?",
          answer:
            "যদি আপুনি daily practice + weekly review কৰে, measurable skill improvement খুব সম্ভাব্য। final ফল আপোনাৰ consistency-ৰ ওপৰত নিৰ্ভৰ কৰে।",
        },
        {
          question: "mobile-এ এই plan follow কৰিব পাৰিমনে?",
          answer: "হয়। এই plan mobile-friendly prompt workflow ধৰি তৈয়াৰ কৰা হৈছে।",
        },
        {
          question: "English দুর্বল হলেও শিকা সম্ভৱ নে?",
          answer: "সম্ভৱ। Assamese-first prompt লিখি আৰম্ভ কৰক আৰু ধীরে ধীরে mixed style ব্যৱহাৰ কৰক।",
        },
        {
          question: "দিন মিস কৰিলে কি কৰিম?",
          answer: "missed day-টো next day-ত ২টা সৰু task কৰি compensate কৰক। perfection নহয়, continuity মুখ্য।",
        },
      ]
    : [
        {
          question: "Can I get results in 30 days?",
          answer:
            "With daily practice and weekly review, meaningful skill gains are highly likely. Final outcomes depend on consistency.",
        },
        {
          question: "Can I follow this plan on mobile?",
          answer: "Yes. This plan is designed for mobile-first prompt workflows.",
        },
        {
          question: "Can I start if my English is weak?",
          answer: "Yes. Start with Assamese-first prompts and gradually use mixed Assamese-English instructions.",
        },
        {
          question: "What if I miss a day?",
          answer: "Recover by doing two smaller tasks the next day. Continuity matters more than perfection.",
        },
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isAssamese ? "অসমীয়াত ৩০ দিনত AI শিকাৰ পদ্ধতি" : "How to learn AI in Assamese in 30 days",
    description: isAssamese
      ? "Assamese learner-সকলৰ বাবে daily practical AI learning workflow."
      : "Daily practical AI learning workflow for Assamese-first learners.",
    totalTime: "P30D",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    step: howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: isAssamese ? `ধাপ ${index + 1}` : `Step ${index + 1}`,
      text: step,
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isAssamese ? "অসমীয়াত ৩০ দিনত AI শিকাৰ পরিকল্পনা" : "Learn AI in Assamese in 30 Days",
    description: isAssamese
      ? "Assamese-first beginner-সকলৰ বাবে ৩০ দিনৰ practical AI plan."
      : "A practical 30-day beginner AI plan for Assamese speakers.",
    author: { "@type": "Organization", name: "Namaskar AI Editorial" },
    publisher: { "@type": "Organization", name: "Namaskar AI" },
    datePublished: "2026-02-16",
    dateModified: "2026-02-16",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toAbsoluteSiteUrl(canonicalPath),
    },
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
        name: isAssamese ? "৩০ দিনৰ AI plan" : "30-day AI plan",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  const sourceItems = [
    {
      label: "Google Search Central: Helpful content guidance",
      href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    },
    {
      label: "OpenAI Docs: Prompt engineering basics",
      href: "https://platform.openai.com/docs/guides/prompt-engineering",
    },
    {
      label: "Namaskar AI learning community signals",
      href: "https://www.namaskarai.in/",
      note: isAssamese
        ? "এই পেজত উল্লেখিত learner workflow-সমূহ Namaskar AI-ৰ community-driven practical pattern-ৰ ওপৰত ভিত্তি কৰে।"
        : "The workflows here are based on practical patterns observed in Namaskar AI learner journeys.",
    },
  ];

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "অসমীয়াত ৩০ দিনত AI শিকক | নমস্কাৰ AI" : "Learn AI in Assamese in 30 Days | Namaskar AI"}
        description={
          isAssamese
            ? "Assamese speaker-সকলৰ বাবে ৩০ দিনৰ practical AI learning plan: daily routine, weekly milestone, আৰু tool path."
            : "A practical 30-day AI learning plan for Assamese speakers with daily routine, weekly milestones, and tool paths."
        }
        path={canonicalPath}
        language={language}
        type="article"
        keywords={[
          "learn AI in Assamese",
          "learning AI in Assamese",
          "AI শিকিবলৈ কেনেকৈ আৰম্ভ কৰিম",
          "Assamese AI tutorial",
          "Namaskar AI 30 day plan",
        ]}
        structuredData={[faqSchema, howToSchema, articleSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell">
          <Link to={toLocalePath("/", language)} className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home"}
          </Link>

          <Card className="platform-hero-card mb-6">
            <div className="relative z-10">
              <div className="platform-chip mb-2">
                <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "৩০ দিনৰ roadmap" : "30-day roadmap"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "অসমীয়াত ৩০ দিনত AI শিকক" : "Learn AI in Assamese in 30 Days"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "হয়, coding নজনাকৈও ৩০ দিনৰ within practical AI skill build কৰিব পাৰে, যদি daily ১০-২০ মিনিটৰ structured plan মানে।"
                  : "Yes, you can build practical AI skills in 30 days without coding if you follow a structured 10-20 minute daily plan."}
              </p>
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="border-primary/15 bg-card/95 p-5">
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <Target className="h-4 w-4" />
                <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "৩০ দিনৰ execution plan" : "30-day execution plan"}</h2>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="px-3 py-2">{isAssamese ? "সময়" : "Timeline"}</th>
                      <th className="px-3 py-2">{isAssamese ? "ফোকাস" : "Focus"}</th>
                      <th className="px-3 py-2">{isAssamese ? "ডেলিভাৰেবল" : "Deliverable"}</th>
                      <th className="px-3 py-2">{isAssamese ? "সময়" : "Daily time"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planRows.map((row) => (
                      <tr key={row.week} className="border-t border-border">
                        <td className="px-3 py-2 font-medium">{row.week}</td>
                        <td className="px-3 py-2">{row.focus}</td>
                        <td className="px-3 py-2">{row.output}</td>
                        <td className="px-3 py-2">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "কোন path বাছনি কৰিব?" : "Which learning path should you pick?"}</h2>
              <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="px-3 py-2">{isAssamese ? "Path" : "Path"}</th>
                      <th className="px-3 py-2">{isAssamese ? "খৰচ" : "Cost"}</th>
                      <th className="px-3 py-2">{isAssamese ? "গতি" : "Speed"}</th>
                      <th className="px-3 py-2">{isAssamese ? "Support" : "Support"}</th>
                      <th className="px-3 py-2">{isAssamese ? "কাৰ বাবে" : "Best for"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row) => (
                      <tr key={row.path} className="border-t border-border">
                        <td className="px-3 py-2 font-medium">{row.path}</td>
                        <td className="px-3 py-2">{row.cost}</td>
                        <td className="px-3 py-2">{row.speed}</td>
                        <td className="px-3 py-2">{row.support}</td>
                        <td className="px-3 py-2">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "Daily HowTo workflow" : "Daily HowTo workflow"}</h2>
              <div className="mt-3 space-y-2">
                {howToSteps.map((step, index) => (
                  <div key={step} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                    <span className="mr-2 font-semibold text-primary">{index + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-primary/15 bg-card/95 p-5">
                <h3 className="text-lg font-semibold text-primary">{isAssamese ? "উচ্চ-signal অভ্যাস" : "High-signal habits"}</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {highSignal.map((item) => (
                    <div key={item} className="flex items-start gap-2 rounded-md border border-border bg-muted/35 p-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-primary/15 bg-card/95 p-5">
                <h3 className="text-lg font-semibold text-destructive">{isAssamese ? "এৰাই চলা উচিত" : "Avoid these mistakes"}</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {lowSignal.map((item) => (
                    <div key={item} className="rounded-md border border-border bg-muted/35 p-2.5">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">FAQ</h2>
              <Accordion type="single" collapsible className="mt-3">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            <SourceReferencesCard language={language} items={sourceItems} />

            <Card className="border-primary/15 bg-card/95 p-5">
              <h2 className="text-xl font-semibold">{isAssamese ? "পৰৱৰ্তী practical পদক্ষেপ" : "Next practical steps"}</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/prompt-packs", language)}>
                    {isAssamese ? "Prompt Packs খোলক" : "Open Prompt Packs"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={toLocalePath("/learning-roadmaps", language)}>
                    {isAssamese ? "Learning Roadmaps" : "Learning Roadmaps"}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default LearnAIInAssamese30Days;

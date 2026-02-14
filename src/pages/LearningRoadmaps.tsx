import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, Rocket, Users, Wand2 } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LearningRoadmaps = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";

  const roadmaps = [
    {
      title: isAssamese ? "AI Career Starter (30 Days)" : "AI Career Starter (30 Days)",
      description: isAssamese
        ? "CV, portfolio, interview, আৰু client-facing skill build কৰাৰ step-by-step path।"
        : "A practical path to build CV, portfolio, interview confidence, and market-ready AI skills.",
      level: isAssamese ? "Beginner" : "Beginner",
      duration: isAssamese ? "৪ সপ্তাহ" : "4 weeks",
      learners: "2.7K+",
      modules: isAssamese ? "৮ মডিউল" : "8 modules",
      path: toLocalePath("/prompt-packs?category=career_and_jobs", language),
    },
    {
      title: isAssamese ? "Student Productivity AI" : "Student Productivity AI",
      description: isAssamese
        ? "পঢ়া-শুনা, revision, আৰু exam answer practice-ৰ বাবে prompt workflow।"
        : "Prompt workflows for study planning, revision, and exam-answer preparation.",
      level: isAssamese ? "Beginner" : "Beginner",
      duration: isAssamese ? "৩ সপ্তাহ" : "3 weeks",
      learners: "2.1K+",
      modules: isAssamese ? "৬ মডিউল" : "6 modules",
      path: toLocalePath("/prompt-packs?category=study_and_skills", language),
    },
    {
      title: isAssamese ? "Small Business AI Playbook" : "Small Business AI Playbook",
      description: isAssamese
        ? "বিক্ৰী, customer communication, offer campaign আৰু daily tracking automation।"
        : "Use AI for sales, customer communication, offer campaigns, and daily tracking.",
      level: isAssamese ? "Intermediate" : "Intermediate",
      duration: isAssamese ? "৫ সপ্তাহ" : "5 weeks",
      learners: "1.9K+",
      modules: isAssamese ? "৯ মডিউল" : "9 modules",
      path: toLocalePath("/prompt-packs?category=business_and_income", language),
    },
    {
      title: isAssamese ? "Parents & Safe AI Usage" : "Parents and Safe AI Usage",
      description: isAssamese
        ? "শিশুৰ AI use safety, homework rules, আৰু family charter build কৰক।"
        : "Build family AI rules, homework boundaries, and safe digital habits for children.",
      level: isAssamese ? "All Levels" : "All Levels",
      duration: isAssamese ? "২ সপ্তাহ" : "2 weeks",
      learners: "1.4K+",
      modules: isAssamese ? "৪ মডিউল" : "4 modules",
      path: toLocalePath("/prompt-packs?category=parents_and_family", language),
    },
  ];

  const cadenceSteps = isAssamese
    ? [
        "দিন ১: লক্ষ্য আৰু সময় ঠিক কৰক",
        "দিন ২-৭: দৈনিক ১টা prompt run + note",
        "সপ্তাহ শেষ: output share আৰু review",
      ]
    : [
        "Day 1: set goal and daily time",
        "Day 2-7: run 1 prompt daily and keep notes",
        "Week end: share one output and review progress",
      ];

  const text = {
    title: isAssamese ? "Learning Roadmaps" : "Learning Roadmaps",
    subtitle: isAssamese
      ? "বিভিন্ন লক্ষ্য আৰু বয়সৰ মানুহৰ বাবে structured Assamese-first AI learning paths"
      : "Structured Assamese-first AI learning paths for different goals and age groups.",
    back: isAssamese ? "পিছলৈ" : "Back",
    start: isAssamese ? "এই পথ আৰম্ভ কৰক" : "Start this path",
    routineTitle: isAssamese ? "Weekly Learning Cadence" : "Weekly Learning Cadence",
    routineBody: isAssamese
      ? "Consistency-ই ফল দিব। কম সময়েও নিয়মিত শিকিলে বড় উন্নতি দেখা যায়।"
      : "Consistency drives results. Even short sessions create major progress over weeks.",
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "Learning Roadmaps | নমস্কাৰ AI" : "Learning Roadmaps | Namaskar AI"}
        description={
          isAssamese
            ? "কৰ্মজীৱন, students, small business আৰু parents-ৰ বাবে Assamese AI learning roadmaps।"
            : "Assamese AI learning roadmaps for careers, students, businesses, and parents."
        }
        path={toLocalePath("/learning-roadmaps", language)}
        language={language}
        keywords={[
          "AI roadmap Assamese",
          "learn AI step by step Assam",
          "AI learning path Assamese",
          "career AI roadmap",
        ]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell">
          <Link
            to={toLocalePath("/", language)}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {text.back}
          </Link>

          <Card className="platform-hero-card mb-6">
            <div className="relative z-10">
              <div className="platform-chip mb-2">
                <Wand2 className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "Guided learning" : "Guided learning"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">{text.title}</h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">{text.subtitle}</p>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roadmaps.map((roadmap) => (
              <Card
                key={roadmap.title}
                className="flex h-full flex-col border-primary/15 bg-[linear-gradient(150deg,hsl(var(--card)),hsl(var(--primary)/0.08),hsl(var(--accent)/0.1))] p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{roadmap.level}</Badge>
                  <Badge variant="outline" className="gap-1">
                    <Users className="h-3 w-3" />
                    {roadmap.learners}
                  </Badge>
                </div>

                <h2 className="text-lg font-semibold leading-snug">{roadmap.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{roadmap.description}</p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {roadmap.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {roadmap.modules}
                  </span>
                </div>

                <Button asChild className="mt-5 bg-gradient-primary text-white">
                  <Link to={roadmap.path}>
                    {text.start}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>

          <Card className="mt-6 border-primary/20 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <Rocket className="h-4 w-4" />
              <h3 className="text-base font-semibold">{text.routineTitle}</h3>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">{text.routineBody}</p>
            <div className="grid gap-2 md:grid-cols-3">
              {cadenceSteps.map((step, index) => (
                <div key={step} className="rounded-xl border border-border bg-muted/35 p-3">
                  <div className="mb-1 text-xs font-semibold text-primary">Step {index + 1}</div>
                  <p className="text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default LearningRoadmaps;
